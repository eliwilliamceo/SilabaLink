import React from 'react';
import { allAchievements } from '../data/achievements';

interface AchievementsModalProps {
    unlockedIds: Set<string>;
    onClose: () => void;
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({ unlockedIds, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Logros</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    {allAchievements.map(ach => {
                        const isUnlocked = unlockedIds.has(ach.id);
                        const itemClasses = `achievement-item ${isUnlocked ? 'is-unlocked' : ''}`;
                        return (
                            <div key={ach.id} className={itemClasses}>
                                <div className="achievement-icon">{ach.icon}</div>
                                <div className="achievement-details">
                                    <h3 className="achievement-name">{ach.name}</h3>
                                    <p className="achievement-description">{ach.description}</p>
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