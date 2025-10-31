import React, { useState, useEffect } from 'react';
import type { Achievement } from '../types';

interface AchievementNotificationProps {
    achievement: Achievement | null;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({ achievement }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (achievement) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2500); // Animation is 0.5s, so it stays for 2s

            return () => clearTimeout(timer);
        }
    }, [achievement]);

    if (!achievement) {
        return null;
    }

    const animationClass = visible ? 'animate-toast-in' : 'animate-toast-out';

    return (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-sm p-4 z-50 ${animationClass}`}>
            <div className="bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg shadow-2xl p-4 flex items-center space-x-4">
                <div className="text-4xl">{achievement.icon}</div>
                <div>
                    <h3 className="font-bold text-slate-900">¡Logro Desbloqueado!</h3>
                    <p className="text-slate-800">{achievement.name}</p>
                </div>
            </div>
        </div>
    );
};

export default AchievementNotification;
