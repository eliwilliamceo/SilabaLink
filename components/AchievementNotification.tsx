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
        <div className={`achievement-notification ${animationClass}`}>
            <div className="notification-content">
                <div className="notification-icon">{achievement.icon}</div>
                <div>
                    <h3 className="notification-title">¡Logro Desbloqueado!</h3>
                    <p className="notification-description">{achievement.name}</p>
                </div>
            </div>
        </div>
    );
};

export default AchievementNotification;