export const allAchievements: Achievement[] = [
    // Streak Achievements
    {
        id: 'streak_5',
        name: '¡En Racha!',
        description: 'Consigue una racha de 5 palabras.',
        icon: '🔥',
        check: (_, streak) => streak >= 5,
    },
    {
        id: 'streak_10',
        name: 'Imparable',
        description: 'Consigue una racha de 10 palabras.',
        icon: '🚀',
        check: (_, streak) => streak >= 10,
    },
    {
        id: 'streak_15',
        name: 'Fiebre de Sílabas',
        description: 'Consigue una racha de 15 palabras.',
        icon: '☄️',
        check: (_, streak) => streak >= 15,
    },
    // Score Achievements
    {
        id: 'score_250',
        name: 'Principiante',
        description: 'Alcanza 250 puntos.',
        icon: '🥉',
        check: (score) => score >= 250,
    },
    {
        id: 'score_500',
        name: 'Intermedio',
        description: 'Alcanza 500 puntos.',
        icon: '🥈',
        check: (score) => score >= 500,
    },
    {
        id: 'score_1000',
        name: 'Maestro de Sílabas',
        description: 'Alcanza 1000 puntos.',
        icon: '🏆',
        check: (score) => score >= 1000,
    },
    // Word Achievements
    {
        id: 'word_long',
        name: 'Elocuente',
        description: 'Usa una palabra de 10 o más letras.',
        icon: '📚',
        check: (_, __, word) => word.length >= 10,
    },
    {
        id: 'word_pro',
        name: 'Polisílabo',
        description: 'Usa una palabra de 12 o más letras.',
        icon: '🎓',
        check: (_, __, word) => word.length >= 12,
    },
];
