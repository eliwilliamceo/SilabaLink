
import React from 'react';

const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.98 9.11c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
const FireIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1014.12 11.88a3 3 0 00-4.242 4.242z" /></svg>;

interface HeaderProps {
    timeRemaining: number;
    score: number;
    streak: number;
}

const Header: React.FC<HeaderProps> = ({ timeRemaining, score, streak }) => {
    const timeClasses = `stat-item ${timeRemaining <= 10 ? 'time-warning' : ''}`;
    
    return (
        <div className="game-stats">
            <div className={timeClasses}>
                <ClockIcon />
                <span className="stat-value">{timeRemaining}</span>
            </div>
             <div className="stat-item score">
                <StarIcon />
                <span className="stat-value">{score}</span>
                {streak > 1 && (
                     <div className="streak-indicator">
                        <FireIcon />
                        x{streak}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;