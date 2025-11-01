export type GameStatus = 'LOADING' | 'INITIAL' | 'STARTING' | 'PLAYING' | 'GAME_OVER';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    check: (score: number, streak: number, word: string) => boolean;
}

export interface LeaderboardEntry {
    name: string;
    score: number;
}