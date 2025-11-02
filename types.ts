type GameStatus = 'LOADING' | 'INITIAL' | 'STARTING' | 'PLAYING' | 'GAME_OVER';

interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    check: (score: number, streak: number, word: string) => boolean;
}

interface LeaderboardEntry {
    name: string;
    score: number;
}

declare module 'silabas' {
  interface SyllableInfo {
    syllable: string;
  }
  interface SilabasResult {
    syllables: SyllableInfo[];
  }
  function silabas(word: string): SilabasResult;
  export default silabas;
}
