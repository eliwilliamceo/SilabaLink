import React from 'react';

interface GameOverModalProps {
    score: number;
    onRestart: () => void;
    isHighScore: boolean;
    onViewLeaderboard: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart, isHighScore, onViewLeaderboard }) => {
    
    return (
        <div className="modal-overlay">
            <div className="modal-content game-over">
                <h2 className="modal-title">¡Tiempo!</h2>
                <div className="final-score-container">
                    <p className="modal-subtitle">Puntuación Final</p>
                    <p className="final-score">{score}</p>
                </div>

                {isHighScore && (
                     <div className="highscore-banner">
                        <p className="highscore-title">¡Nueva Puntuación Alta!</p>
                        <p className="highscore-text">Tu puntuación ha sido guardada.</p>
                    </div>
                )}

                <div className="modal-actions">
                     <button 
                        onClick={onRestart}
                        className="btn btn-primary"
                    >
                        Jugar de Nuevo
                    </button>
                    <button 
                        onClick={onViewLeaderboard}
                        className="btn btn-secondary"
                    >
                        Ver Mejores Puntuaciones
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;