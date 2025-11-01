
import React, { useEffect, useRef } from 'react';

interface WordChainProps {
    wordChain: string[];
}

const WordChain: React.FC<WordChainProps> = ({ wordChain }) => {
    const endOfChainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfChainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [wordChain]);
    
    if (wordChain.length === 0) {
        return <div className="word-chain-empty">Cargando juego...</div>;
    }

    return (
        <div className="word-chain-container">
            {wordChain.map((word, index) => {
                const key = `${word}-${index}`; 
                const isLast = index === wordChain.length - 1;
                const bubbleClasses = `word-bubble ${isLast ? 'is-last' : ''}`;

                return (
                    <React.Fragment key={key}>
                       <div className={bubbleClasses}>
                           {word}
                       </div>
                       {!isLast && (
                           <div className="word-connector"></div>
                       )}
                    </React.Fragment>
                );
            })}
             <div ref={endOfChainRef} />
        </div>
    );
};

export default WordChain;