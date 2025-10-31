
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
        return <div className="flex-grow text-center text-slate-400 p-8">Cargando juego...</div>;
    }

    return (
        <div className="flex-grow h-64 overflow-y-auto p-4 bg-slate-900/50 rounded-lg flex flex-col items-center space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            {wordChain.map((word, index) => {
                const key = `${word}-${index}`; 
                const isLast = index === wordChain.length - 1;

                return (
                    <React.Fragment key={key}>
                       <div 
                         className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${isLast ? 'bg-cyan-500 text-slate-900 scale-110 shadow-lg shadow-cyan-500/30' : 'bg-slate-700 text-slate-300'}`}
                       >
                           {word}
                       </div>
                       {!isLast && (
                           <div className="h-4 w-1 bg-slate-600 rounded-full"></div>
                       )}
                    </React.Fragment>
                );
            })}
             <div ref={endOfChainRef} />
        </div>
    );
};

export default WordChain;
