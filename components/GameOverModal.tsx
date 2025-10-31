import React from 'react';

interface GameOverModalProps {
    score: number;
    onRestart: () => void;
    isHighScore: boolean;
    onViewLeaderboard: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart, isHighScore, onViewLeaderboard }) => {
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 text-center w-full max-w-sm animate-fade-in-up">
                <h2 className="text-3xl font-bold text-pink-500 mb-2">¡Tiempo!</h2>
                <div className="mb-6">
                    <p className="text-lg text-slate-400">Puntuación Final</p>
                    <p className="text-6xl font-bold text-cyan-400">{score}</p>
                </div>

                {isHighScore && (
                     <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500 rounded-lg">
                        <p className="font-bold text-yellow-400">¡Nueva Puntuación Alta!</p>
                        <p className="text-sm text-yellow-600">Tu puntuación ha sido guardada.</p>
                    </div>
                )}

                <div className="space-y-3">
                     <button 
                        onClick={onRestart}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/30"
                    >
                        Jugar de Nuevo
                    </button>
                    <button 
                        onClick={onViewLeaderboard}
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition"
                    >
                        Ver Mejores Puntuaciones
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;