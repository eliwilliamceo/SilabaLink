import React from 'react';
import { allAchievements } from '../data/achievements';

interface AchievementsModalProps {
    unlockedIds: Set<string>;
    onClose: () => void;
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({ unlockedIds, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-cyan-400">Logros</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                    {allAchievements.map(ach => {
                        const isUnlocked = unlockedIds.has(ach.id);
                        return (
                            <div key={ach.id} className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${isUnlocked ? 'bg-slate-700' : 'bg-slate-900/50'}`}>
                                <div className={`text-4xl transition-transform ${isUnlocked ? '' : 'filter grayscale scale-90 opacity-60'}`}>{ach.icon}</div>
                                <div className="flex-1">
                                    <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>{ach.name}</h3>
                                    <p className="text-sm text-slate-400">{ach.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default AchievementsModal;
