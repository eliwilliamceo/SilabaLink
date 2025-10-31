
import React from 'react';

const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.98 9.11c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
const FireIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1014.12 11.88a3 3 0 00-4.242 4.242z" /></svg>;

interface HeaderProps {
    timeRemaining: number;
    score: number;
    streak: number;
}

const Header: React.FC<HeaderProps> = ({ timeRemaining, score, streak }) => {
    const timeColor = timeRemaining <= 10 ? 'text-red-500' : 'text-cyan-400';
    const timePulse = timeRemaining <= 10 ? 'animate-pulse' : '';
    
    return (
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className={`bg-slate-900/50 p-3 rounded-lg flex items-center justify-center ${timeColor} ${timePulse}`}>
                <ClockIcon />
                <span className="font-bold text-2xl">{timeRemaining}</span>
            </div>
             <div className="bg-slate-900/50 p-3 rounded-lg flex items-center justify-center text-pink-400">
                <StarIcon />
                <span className="font-bold text-2xl">{score}</span>
                {streak > 1 && (
                     <div className="ml-3 flex items-center text-orange-400 text-sm font-semibold bg-orange-400/10 px-2 py-1 rounded-full">
                        <FireIcon />
                        x{streak}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
