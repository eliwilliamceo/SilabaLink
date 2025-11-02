import { useState, useEffect, useCallback, useRef } from 'react';
import { getStartingWord } from '../services/geminiService';
import { getSyllablesLocally } from '../services/syllableService';
import { allAchievements } from '../data/achievements';
import { getLeaderboard, saveToLeaderboard, getUnlockedAchievements, saveUnlockedAchievements } from '../utils/storage';

const INITIAL_TIME = 60;
const TIME_BONUS_PER_WORD = 3;
const LEADERBOARD_SIZE = 10;

export const useGameLogic = (username: string | null, onApiKeyError: () => void) => {
    const [status, setStatus] = useState<GameStatus>('LOADING');
    const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [wordChain, setWordChain] = useState<string[]>([]);
    const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
    const [lastSyllable, setLastSyllable] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [achievementNotification, setAchievementNotification] = useState<Achievement | null>(null);
    const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
    const [isHighScore, setIsHighScore] = useState(false);

    const timerRef = useRef<number | null>(null);
    const notificationTimeoutRef = useRef<number | null>(null);
    const dictionaryRef = useRef<Set<string> | null>(null);

    useEffect(() => {
        const loadDictionary = async () => {
            try {
                const response = await fetch('/es_dictionary.json');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const words = await response.json();
                dictionaryRef.current = new Set(words);
                setStatus('INITIAL');
            } catch (error) {
                console.error("Failed to load dictionary:", error);
                setErrorMessage("No se pudo cargar el diccionario. Por favor, recarga la página.");
            }
        };
        loadDictionary();
        setUnlockedAchievements(getUnlockedAchievements());
    }, []);

    const checkAchievements = useCallback((currentScore: number, currentStreak: number, word: string) => {
        allAchievements.forEach(achievement => {
            if (!unlockedAchievements.has(achievement.id) && achievement.check(currentScore, currentStreak, word)) {
                const newUnlocked = new Set<string>(unlockedAchievements).add(achievement.id);
                setUnlockedAchievements(newUnlocked);
                saveUnlockedAchievements(newUnlocked);

                setAchievementNotification(achievement);
                if (notificationTimeoutRef.current) {
                    clearTimeout(notificationTimeoutRef.current);
                }
                notificationTimeoutRef.current = window.setTimeout(() => {
                    setAchievementNotification(null);
                }, 3000);
            }
        });
    }, [unlockedAchievements]);

    const handleError = useCallback((error: unknown, defaultMessage: string): string => {
        let displayMessage = defaultMessage;
        if (error instanceof Error) {
            if (error.message.includes("Requested entity was not found")) {
                onApiKeyError();
                return "La clave API no es válida. Por favor, selecciona una clave de nuevo.";
            }
            if (error.message.toLowerCase().includes("api key")) {
                displayMessage = "Error de configuración: La clave API de Gemini no está disponible o no es válida.";
            } else {
                displayMessage = `Error: ${error.message}`;
            }
        }
        return displayMessage;
    }, [onApiKeyError]);

    const startGame = useCallback(async () => {
        setStatus('STARTING');
        setIsHighScore(false);
        setErrorMessage(null);
        try {
            const startWord = await getStartingWord();
            const syllables = getSyllablesLocally(startWord);
            
            if (syllables.length < 2) {
                // If the starting word is invalid, try again.
                console.warn("Starting word had less than 2 syllables, retrying...");
                startGame();
                return;
            }

            setWordChain([startWord]);
            setUsedWords(new Set([startWord.toLowerCase()]));
            setLastSyllable(syllables[syllables.length - 1]);
            setScore(0);
            setStreak(0);
            setTimeRemaining(INITIAL_TIME);
            setStatus('PLAYING');
        } catch (error) {
            const displayMessage = handleError(error, "No se pudo iniciar el juego. Inténtalo de nuevo.");
            setErrorMessage(displayMessage);
            setStatus('INITIAL');
        }
    }, [handleError]);
    
    const handleGameOver = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setStatus('GAME_OVER');

        const leaderboard = getLeaderboard();
        const lowestHighScore = leaderboard.length < LEADERBOARD_SIZE ? 0 : leaderboard[leaderboard.length - 1].score;

        if (score > lowestHighScore) {
            setIsHighScore(true);
            if (username) {
                saveToLeaderboard({ name: username, score });
            }
        } else {
            setIsHighScore(false);
        }
        checkAchievements(score, streak, '');
    }, [score, streak, checkAchievements, username]);


    useEffect(() => {
        if (status === 'PLAYING' && timeRemaining <= 0) {
             handleGameOver();
        }
    }, [timeRemaining, status, handleGameOver]);

    useEffect(() => {
        if (status === 'PLAYING') {
            timerRef.current = window.setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
             if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current);
            }
        };
    }, [status]);
    
    const resetGame = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setStatus('INITIAL');
        setTimeRemaining(INITIAL_TIME);
        setScore(0);
        setStreak(0);
        setWordChain([]);
        setUsedWords(new Set());
        setLastSyllable('');
        setErrorMessage(null);
        setIsHighScore(false);
    }, []);

    const handleSubmitWord = useCallback((word: string) => {
        const trimmedWord = word.trim().toLowerCase();
        if (!trimmedWord) return;

        setErrorMessage(null);

        if (usedWords.has(trimmedWord)) {
            setErrorMessage('¡Palabra repetida!');
            setStreak(0);
            return;
        }
        
        if (!dictionaryRef.current?.has(trimmedWord)) {
            setErrorMessage('¡Esa palabra no existe!');
            setStreak(0);
            return;
        }

        const syllables = getSyllablesLocally(trimmedWord);
        if (syllables.length < 2) {
            setErrorMessage('La palabra debe tener al menos 2 sílabas.');
            setStreak(0);
            return;
        }

        const firstSyllable = syllables[0];
        if (firstSyllable.toLowerCase() !== lastSyllable.toLowerCase()) {
            setErrorMessage(`La palabra debe empezar con "${lastSyllable}"`);
            setStreak(0);
            return;
        }

        const newStreak = streak + 1;
        const newScore = score + 10 + (trimmedWord.length > 5 ? 5 : 0) + newStreak * 2;
        
        setScore(newScore);
        setStreak(newStreak);
        setTimeRemaining(prev => prev + TIME_BONUS_PER_WORD);
        setWordChain(prev => [...prev, trimmedWord]);
        setUsedWords(prev => new Set(prev).add(trimmedWord));
        setLastSyllable(syllables[syllables.length - 1]);
        checkAchievements(newScore, newStreak, trimmedWord);

    }, [lastSyllable, score, streak, usedWords, checkAchievements]);
    
    return {
        status,
        timeRemaining,
        score,
        streak,
        wordChain,
        lastSyllable,
        errorMessage,
        startGame,
        handleSubmitWord,
        resetGame,
        achievementNotification,
        unlockedAchievements,
        isHighScore,
    };
};
