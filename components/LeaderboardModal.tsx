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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Mejores Puntuaciones</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    {leaderboard.length > 0 ? (
                        <ol className="leaderboard-list">
                            {leaderboard.map((entry, index) => (
                                <li key={index} className="leaderboard-item">
                                    <div className="leaderboard-rank-name">
                                        <span className="leaderboard-rank">{index + 1}.</span>
                                        <span className="leaderboard-name">{entry.name}</span>
                                    </div>
                                    <span className="leaderboard-score">{entry.score}</span>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="empty-state-message">Aún no hay puntuaciones. ¡Sé el primero!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeaderboardModal;