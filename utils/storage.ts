import type { LeaderboardEntry } from '../types';

const LEADERBOARD_KEY = 'silabaLinkLeaderboard';
const ACHIEVEMENTS_KEY = 'silabaLinkAchievements';
const LEADERBOARD_SIZE = 10;

// Leaderboard Functions
export const getLeaderboard = (): LeaderboardEntry[] => {
    try {
        const data = localStorage.getItem(LEADERBOARD_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to parse leaderboard from localStorage", error);
        return [];
    }
};

export const saveToLeaderboard = (newEntry: LeaderboardEntry): void => {
    const leaderboard = getLeaderboard();
    const newLeaderboard = [...leaderboard, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, LEADERBOARD_SIZE);
    
    try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(newLeaderboard));
    } catch (error) {
        console.error("Failed to save leaderboard to localStorage", error);
    }
};


// Achievements Functions
export const getUnlockedAchievements = (): Set<string> => {
    try {
        const data = localStorage.getItem(ACHIEVEMENTS_KEY);
        return data ? new Set(JSON.parse(data)) : new Set();
    } catch (error) {
        console.error("Failed to parse achievements from localStorage", error);
        return new Set();
    }
};

export const saveUnlockedAchievements = (unlockedIds: Set<string>): void => {
    try {
        localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(Array.from(unlockedIds)));
    } catch (error) {
        console.error("Failed to save achievements to localStorage", error);
    }
};

// User Session Functions
const USER_KEY = 'silabaLinkUser';

export const saveCurrentUser = (name: string): void => {
    try {
        localStorage.setItem(USER_KEY, name);
    } catch (error) {
        console.error("Failed to save user to localStorage", error);
    }
};

export const getCurrentUser = (): string | null => {
    try {
        return localStorage.getItem(USER_KEY);
    } catch (error) {
        console.error("Failed to get user from localStorage", error);
        return null;
    }
};

export const clearCurrentUser = (): void => {
    try {
        localStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error("Failed to clear user from localStorage", error);
    }
};