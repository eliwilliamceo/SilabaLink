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
  // The 'silabas' library is async and returns a promise with an array of strings.
  function silabas(word: string): Promise<string[]>;
  export default silabas;
}