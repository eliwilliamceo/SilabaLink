
import React from 'react';
import Header from './Header';
import WordChain from './WordChain';
import WordInput from './WordInput';

interface GameBoardProps {
    timeRemaining: number;
    score: number;
    streak: number;
    wordChain: string[];
    lastSyllable: string;
    errorMessage: string | null;
    onSubmitWord: (word: string) => void;
    isLoading: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
    timeRemaining,
    score,
    streak,
    wordChain,
    lastSyllable,
    errorMessage,
    onSubmitWord,
    isLoading,
}) => {
    return (
        <div className="flex flex-col h-[70vh] max-h-[600px] bg-slate-800 rounded-2xl shadow-2xl p-4 md:p-6 space-y-4 relative">
            <Header timeRemaining={timeRemaining} score={score} streak={streak} />
            <WordChain wordChain={wordChain} />
            <div className="mt-auto pt-4">
                 <WordInput 
                    lastSyllable={lastSyllable}
                    onSubmit={onSubmitWord}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    );
};

export default GameBoard;
