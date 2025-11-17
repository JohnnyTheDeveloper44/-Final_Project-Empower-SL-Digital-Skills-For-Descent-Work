import badgesData from '@/data/badges.json';

export interface UserProgress {
  xp: number;
  level: number;
  badges: string[];
  lessonsCompleted: number;
  quizzesPassed: number;
  perfectQuizzes: number;
  dailyStreak: number;
  lastStudyDate: string;
  coursesCompleted: number;
  exercisesCompleted: number;
  aiQuestionsAsked: number;
  voiceTranslationsUsed: number;
  projectsApplied: number;
  usedKrio: boolean;
  studiedEarly: boolean;
  studiedLate: boolean;
  sharedProgress: boolean;
  completedCourses?: string[];
  completedLessons?: string[];
}

export interface Badge {
  id: string;
  name: string;
  nameKrio: string;
  description: string;
  descriptionKrio: string;
  icon: string;
  requirement: string;
  requirementCount: number;
  xpReward: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'special';
}

const STORAGE_KEY = 'learnhub_user_progress';

/**
 * Calculate level from XP using exponential curve
 */
export function calculateLevel(xp: number): number {
  // Formula: level = floor(0.1 * sqrt(xp))
  // This creates a smooth progression where each level requires more XP
  return Math.floor(0.1 * Math.sqrt(xp)) + 1;
}

/**
 * Calculate XP required for next level
 */
export function xpForNextLevel(currentLevel: number): number {
  // Inverse of level formula: xp = (level / 0.1)^2
  return Math.pow((currentLevel + 1) / 0.1, 2);
}

/**
 * Calculate XP required for current level
 */
export function xpForCurrentLevel(currentLevel: number): number {
  if (currentLevel <= 1) return 0;
  return Math.pow(currentLevel / 0.1, 2);
}

/**
 * Calculate progress percentage to next level
 */
export function calculateLevelProgress(xp: number, level: number): number {
  const currentLevelXP = xpForCurrentLevel(level);
  const nextLevelXP = xpForNextLevel(level);
  const xpInCurrentLevel = xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  
  return Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForLevel) * 100));
}

/**
 * Get user progress from localStorage
 */
export function getUserProgress(): UserProgress {
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Default progress for new users
  const defaultProgress: UserProgress = {
    xp: 0,
    level: 1,
    badges: [],
    lessonsCompleted: 0,
    quizzesPassed: 0,
    perfectQuizzes: 0,
    dailyStreak: 0,
    lastStudyDate: new Date().toISOString().split('T')[0],
    coursesCompleted: 0,
    exercisesCompleted: 0,
    aiQuestionsAsked: 0,
    voiceTranslationsUsed: 0,
    projectsApplied: 0,
    usedKrio: false,
    studiedEarly: false,
    studiedLate: false,
    sharedProgress: false,
  };
  
  saveUserProgress(defaultProgress);
  return defaultProgress;
}

/**
 * Save user progress to localStorage
 */
export function saveUserProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

/**
 * Add XP and check for level up
 */
export function addXP(amount: number): { leveledUp: boolean; newLevel: number; newXP: number } {
  const progress = getUserProgress();
  const oldLevel = progress.level;
  
  progress.xp += amount;
  progress.level = calculateLevel(progress.xp);
  
  saveUserProgress(progress);
  
  return {
    leveledUp: progress.level > oldLevel,
    newLevel: progress.level,
    newXP: progress.xp,
  };
}

/**
 * Get all available badges
 */
export function getAllBadges(): Badge[] {
  return badgesData as Badge[];
}

/**
 * Get earned badges
 */
export function getEarnedBadges(): Badge[] {
  const progress = getUserProgress();
  const allBadges = getAllBadges();
  
  return allBadges.filter(badge => progress.badges.includes(badge.id));
}

/**
 * Get available badges (not yet earned)
 */
export function getAvailableBadges(): Badge[] {
  const progress = getUserProgress();
  const allBadges = getAllBadges();
  
  return allBadges.filter(badge => !progress.badges.includes(badge.id));
}

/**
 * Check if user earned a new badge
 */
export function checkForNewBadges(): Badge[] {
  const progress = getUserProgress();
  const availableBadges = getAvailableBadges();
  const newBadges: Badge[] = [];
  
  availableBadges.forEach(badge => {
    let earned = false;
    
    switch (badge.requirement) {
      case 'completeLesson':
        earned = progress.lessonsCompleted >= badge.requirementCount;
        break;
      case 'passQuiz':
        earned = progress.quizzesPassed >= badge.requirementCount;
        break;
      case 'perfectQuiz':
        earned = progress.perfectQuizzes >= badge.requirementCount;
        break;
      case 'dailyStreak':
        earned = progress.dailyStreak >= badge.requirementCount;
        break;
      case 'completeCourse':
        earned = progress.coursesCompleted >= badge.requirementCount;
        break;
      case 'useKrio':
        earned = progress.usedKrio;
        break;
      case 'completeExercise':
        earned = progress.exercisesCompleted >= badge.requirementCount;
        break;
      case 'useAI':
        earned = progress.aiQuestionsAsked >= badge.requirementCount;
        break;
      case 'useVoice':
        earned = progress.voiceTranslationsUsed >= badge.requirementCount;
        break;
      case 'studyEarly':
        earned = progress.studiedEarly;
        break;
      case 'studyLate':
        earned = progress.studiedLate;
        break;
      case 'applyProject':
        earned = progress.projectsApplied >= badge.requirementCount;
        break;
      case 'shareProgress':
        earned = progress.sharedProgress;
        break;
      case 'reachLevel':
        earned = progress.level >= badge.requirementCount;
        break;
    }
    
    if (earned) {
      progress.badges.push(badge.id);
      newBadges.push(badge);
      // Add badge XP reward
      progress.xp += badge.xpReward;
      progress.level = calculateLevel(progress.xp);
    }
  });
  
  if (newBadges.length > 0) {
    saveUserProgress(progress);
  }
  
  return newBadges;
}

/**
 * Record lesson completion
 */
export function recordLessonComplete(): { xpGained: number; newBadges: Badge[]; leveledUp: boolean } {
  const progress = getUserProgress();
  progress.lessonsCompleted += 1;
  
  // Update daily streak
  const today = new Date().toISOString().split('T')[0];
  const lastDate = new Date(progress.lastStudyDate);
  const todayDate = new Date(today);
  const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    progress.dailyStreak += 1;
  } else if (diffDays > 1) {
    progress.dailyStreak = 1;
  }
  progress.lastStudyDate = today;
  
  // Check study time
  const hour = new Date().getHours();
  if (hour < 8) progress.studiedEarly = true;
  if (hour >= 22) progress.studiedLate = true;
  
  saveUserProgress(progress);
  
  const { leveledUp } = addXP(50);
  const newBadges = checkForNewBadges();
  
  return { xpGained: 50, newBadges, leveledUp };
}

/**
 * Record quiz completion
 */
export function recordQuizComplete(score: number, maxScore: number): { xpGained: number; newBadges: Badge[]; leveledUp: boolean } {
  const progress = getUserProgress();
  const percentage = (score / maxScore) * 100;
  
  if (percentage >= 60) {
    progress.quizzesPassed += 1;
    
    if (percentage === 100) {
      progress.perfectQuizzes += 1;
    }
    
    saveUserProgress(progress);
    
    const xpGained = percentage === 100 ? 150 : 100;
    const { leveledUp } = addXP(xpGained);
    const newBadges = checkForNewBadges();
    
    return { xpGained, newBadges, leveledUp };
  }
  
  return { xpGained: 0, newBadges: [], leveledUp: false };
}

/**
 * Record AI assistant usage
 */
export function recordAIUsage(): void {
  const progress = getUserProgress();
  progress.aiQuestionsAsked += 1;
  saveUserProgress(progress);
  checkForNewBadges();
}

/**
 * Record voice translation usage
 */
export function recordVoiceUsage(): void {
  const progress = getUserProgress();
  progress.voiceTranslationsUsed += 1;
  saveUserProgress(progress);
  checkForNewBadges();
}

/**
 * Record Krio language usage
 */
export function recordKrioUsage(): void {
  const progress = getUserProgress();
  progress.usedKrio = true;
  saveUserProgress(progress);
  checkForNewBadges();
}

/**
 * Record project application
 */
export function recordProjectApplication(): void {
  const progress = getUserProgress();
  progress.projectsApplied += 1;
  saveUserProgress(progress);
  checkForNewBadges();
}

/**
 * Get earned badges with unlock dates
 */
export function getUnlockedBadges(): Array<{ badgeId: string; unlockedAt: Date }> {
  const progress = getUserProgress();
  return progress.badges.map(badgeId => ({
    badgeId,
    unlockedAt: new Date()
  }));
}

/**
 * Get rarity color
 */
export function getRarityColor(rarity: Badge['rarity']): string {
  const colors = {
    common: 'hsl(var(--muted-foreground))',
    uncommon: 'hsl(142 76% 36%)',
    rare: 'hsl(221 83% 53%)',
    epic: 'hsl(271 91% 65%)',
    legendary: 'hsl(45 93% 47%)',
    special: 'hsl(199 89% 48%)',
  };
  
  return colors[rarity];
}

/**
 * Check if user has completed at least one course and can access jobs
 */
export function hasJobsAccess(): boolean {
  const progress = getUserProgress();
  return progress.coursesCompleted > 0;
}

/**
 * Complete a course
 */
export function completeCourse(courseId: string): { 
  xpGained: number; 
  newBadges: Badge[]; 
  leveledUp: boolean;
  newLevel: number;
} {
  const progress = getUserProgress();
  
  // Check if course already completed
  if (progress.completedCourses?.includes(courseId)) {
    return { xpGained: 0, newBadges: [], leveledUp: false, newLevel: progress.level };
  }
  
  // Add course to completed list
  if (!progress.completedCourses) {
    progress.completedCourses = [];
  }
  progress.completedCourses.push(courseId);
  progress.coursesCompleted = (progress.coursesCompleted || 0) + 1;
  
  // Award XP
  const xpGained = 500;
  const { leveledUp, newLevel } = addXP(xpGained);
  
  // Check for new badges
  const newBadges = checkForNewBadges();
  
  return { xpGained, newBadges, leveledUp, newLevel };
}

/**
 * Complete a lesson
 */
export function completeLesson(lessonId: string): { 
  xpGained: number; 
  newBadges: Badge[]; 
  leveledUp: boolean;
  newLevel: number;
} {
  const progress = getUserProgress();
  
  // Check if lesson already completed
  if (progress.completedLessons?.includes(lessonId)) {
    return { xpGained: 0, newBadges: [], leveledUp: false, newLevel: progress.level };
  }
  
  // Add lesson to completed list
  if (!progress.completedLessons) {
    progress.completedLessons = [];
  }
  progress.completedLessons.push(lessonId);
  
  // Use existing recordLessonComplete functionality
  const result = recordLessonComplete();
  
  return { 
    xpGained: result.xpGained, 
    newBadges: result.newBadges, 
    leveledUp: result.leveledUp,
    newLevel: getUserProgress().level
  };
}
