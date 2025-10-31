import React, { useState, useEffect } from 'react';
import type { LeaderboardEntry } from '../types';
import { getLeaderboard } from '../utils/storage';

interface LeaderboardModalProps {
    onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ onClose }) => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        setLeaderboard(getLeaderboard());
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-cyan-400">Mejores Puntuaciones</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-3xl">&times;</button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    {leaderboard.length > 0 ? (
                        <ol className="space-y-2">
                            {leaderboard.map((entry, index) => (
                                <li key={index} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                                    <div className="flex items-center">
                                        <span className="text-lg font-bold w-8 text-slate-400">{index + 1}.</span>
                                        <span className="font-semibold text-white">{entry.name}</span>
                                    </div>
                                    <span className="font-bold text-xl text-cyan-400">{entry.score}</span>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-center text-slate-400 py-8">Aún no hay puntuaciones. ¡Sé el primero!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeaderboardModal;
