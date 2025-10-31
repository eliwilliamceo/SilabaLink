import React, { useState, useEffect } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import AchievementNotification from './components/AchievementNotification';
import AchievementsModal from './components/AchievementsModal';
import LeaderboardModal from './components/LeaderboardModal';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import { getCurrentUser, saveCurrentUser, clearCurrentUser } from './utils/storage';

const App: React.FC = () => {
    const [appState, setAppState] = useState<'SPLASH' | 'LOGIN' | 'GAME'>('SPLASH');
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    
    const {
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
    } = useGameLogic(currentUser);
    
    const [showAchievements, setShowAchievements] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    useEffect(() => {
        const user = getCurrentUser();
        const splashTimer = setTimeout(() => {
            if (user) {
                setCurrentUser(user);
                setAppState('GAME');
            } else {
                setAppState('LOGIN');
            }
        }, 2500);

        return () => clearTimeout(splashTimer);
    }, []);

    const handleLogin = (name: string) => {
        setCurrentUser(name);
        saveCurrentUser(name);
        setAppState('GAME');
    };

    const handleLogout = () => {
        clearCurrentUser();
        resetGame();
        setCurrentUser(null);
        setAppState('LOGIN');
    };

    const handleRestart = () => {
        resetGame();
        startGame();
    };
    
    if (appState === 'SPLASH') {
        return <SplashScreen />;
    }

    if (appState === 'LOGIN') {
        return <LoginScreen onLogin={handleLogin} />;
    }

    return (
        <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 antialiased">
            <div className="w-full max-w-md mx-auto">
                <header className="text-center mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-wider">
                        Sílaba<span className="text-pink-500">Link</span>
                    </h1>
                     <div className="flex items-center justify-center mt-2 space-x-2">
                        <p className="text-slate-400">Bienvenido, <span className="font-bold text-cyan-300">{currentUser}</span>.</p>
                        <button onClick={handleLogout} className="text-slate-500 hover:text-pink-500 transition-colors" title="Cambiar de usuario">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                     </div>
                </header>

                <main>
                    {status === 'INITIAL' && (
                        <div className="text-center space-y-4 animate-fade-in-up">
                            <button 
                                onClick={startGame}
                                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/30"
                            >
                                Empezar a Jugar
                            </button>
                             <div className="flex space-x-4">
                                <button 
                                    onClick={() => setShowAchievements(true)}
                                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                >
                                    Logros
                                </button>
                                <button 
                                    onClick={() => setShowLeaderboard(true)}
                                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                >
                                    Mejores Puntuaciones
                                </button>
                            </div>
                            {errorMessage && (
                                <p className="text-red-400 text-center mt-4 font-semibold">{errorMessage}</p>
                            )}
                        </div>
                    )}

                    {(status === 'PLAYING' || status === 'VALIDATING') && (
                         <GameBoard
                            timeRemaining={timeRemaining}
                            score={score}
                            streak={streak}
                            wordChain={wordChain}
                            lastSyllable={lastSyllable}
                            errorMessage={errorMessage}
                            onSubmitWord={handleSubmitWord}
                            isLoading={status === 'VALIDATING'}
                         />
                    )}
                </main>
            </div>

            {status === 'GAME_OVER' && (
                <GameOverModal 
                  score={score} 
                  onRestart={handleRestart} 
                  isHighScore={isHighScore}
                  onViewLeaderboard={() => setShowLeaderboard(true)}
                />
            )}
            
            {showAchievements && <AchievementsModal unlockedIds={unlockedAchievements} onClose={() => setShowAchievements(false)} />}
            {showLeaderboard && <LeaderboardModal onClose={() => setShowLeaderboard(false)} />}

            <AchievementNotification achievement={achievementNotification} />
        </div>
    );
};

export default App;