
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
        <div className="game-board">
            <Header timeRemaining={timeRemaining} score={score} streak={streak} />
            <WordChain wordChain={wordChain} />
            <div className="word-input-container">
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