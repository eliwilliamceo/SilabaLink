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
    const [appState, setAppState] = useState<'SPLASH' | 'API_KEY' | 'LOGIN' | 'GAME'>('SPLASH');
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    
    const handleApiKeyError = () => {
        setAppState('API_KEY');
    };

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
    } = useGameLogic(currentUser, handleApiKeyError);
    
    const [showAchievements, setShowAchievements] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            // @ts-ignore - aistudio is available in the execution environment.
            const aistudio = window.aistudio;

            // Use a promise chain for safer handling of potentially undefined objects.
            Promise.resolve(aistudio?.hasSelectedApiKey?.())
                .then(hasApiKey => {
                    if (!hasApiKey) {
                        setAppState('API_KEY');
                        return;
                    }
                    
                    const user = getCurrentUser();
                    if (user) {
                        setCurrentUser(user);
                        setAppState('GAME');
                    } else {
                        setAppState('LOGIN');
                    }
                })
                .catch(error => {
                    console.error("Could not verify API key, prompting user to select one.", error);
                    setAppState('API_KEY');
                });
        }, 2500);

        return () => clearTimeout(splashTimer);
    }, []);

    const handleKeySelected = () => {
        // Assume key is selected, move to next state.
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setAppState('GAME');
        } else {
            setAppState('LOGIN');
        }
    };

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

    if (appState === 'API_KEY') {
        return (
            <div className="login-screen">
                <div className="login-wrapper">
                    <header>
                        <h1 className="app-title">
                            Sílaba<span className="app-title--highlight">Link</span>
                        </h1>
                        <p className="user-greeting" style={{marginTop: '1rem', lineHeight: '1.5'}}>
                            Para poder comunicarnos con el modelo de IA de Gemini, necesitamos que selecciones una clave API.
                        </p>
                    </header>
                    <div className="login-form">
                        <button
                            onClick={async () => {
                                // @ts-ignore - aistudio is available in the execution environment.
                                await window.aistudio.openSelectKey();
                                handleKeySelected();
                            }}
                            className="btn btn-primary"
                        >
                            Seleccionar Clave API
                        </button>
                         <p style={{marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--color-slate-400)', textAlign: 'center', lineHeight: '1.5'}}>
                             Asegúrate de tener la facturación habilitada para tu proyecto. <br/>
                             <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" style={{color: 'var(--color-cyan-400)', textDecoration: 'underline'}}>
                                 Más información sobre la facturación
                             </a>
                         </p>
                    </div>
                </div>
            </div>
        );
    }

    if (appState === 'LOGIN') {
        return <LoginScreen onLogin={handleLogin} />;
    }

    const getStartButtonText = () => {
        if (status === 'LOADING') return 'Cargando Diccionario...';
        if (status === 'STARTING') return 'Empezando...';
        return 'Empezar a Jugar';
    }

    return (
        <div className="app-container">
            <div className="game-wrapper">
                <header className="app-header">
                    <h1 className="app-title">
                        Sílaba<span className="app-title--highlight">Link</span>
                    </h1>
                     <div className="user-info">
                        <p className="user-greeting">Bienvenido, <span className="username">{currentUser}</span>.</p>
                        <button onClick={handleLogout} className="logout-button" title="Cambiar de usuario">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                     </div>
                </header>

                <main>
                    {(status === 'LOADING' || status === 'INITIAL' || status === 'STARTING') && (
                        <div className="initial-screen animate-fade-in-up">
                            <button 
                                onClick={startGame}
                                disabled={status === 'LOADING' || status === 'STARTING'}
                                className="btn btn-primary"
                            >
                                {getStartButtonText()}
                            </button>
                             <div className="button-group">
                                <button 
                                    onClick={() => setShowAchievements(true)}
                                    className="btn btn-secondary"
                                >
                                    Logros
                                </button>
                                <button 
                                    onClick={() => setShowLeaderboard(true)}
                                    className="btn btn-secondary"
                                >
                                    Mejores Puntuaciones
                                </button>
                            </div>
                            {errorMessage && (
                                <p className="error-message">{errorMessage}</p>
                            )}
                        </div>
                    )}

                    {(status === 'PLAYING' || status === 'STARTING') && (
                         <GameBoard
                            timeRemaining={timeRemaining}
                            score={score}
                            streak={streak}
                            wordChain={wordChain}
                            lastSyllable={lastSyllable}
                            errorMessage={errorMessage}
                            onSubmitWord={handleSubmitWord}
                            isLoading={status === 'STARTING'}
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
