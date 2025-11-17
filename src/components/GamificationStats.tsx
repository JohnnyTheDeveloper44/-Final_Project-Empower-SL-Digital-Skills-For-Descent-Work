import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Zap, Target } from 'lucide-react';
import { getUserProgress, getUnlockedBadges } from '@/utils/gamification';
import badgesData from '@/data/badges.json';
import { useLanguage } from '@/hooks/useLanguage';

export function GamificationStats() {
  const progress = getUserProgress();
  const unlockedBadges = getUnlockedBadges();
  const { language } = useLanguage();

  const xpToNextLevel = progress.level * 1000;
  const xpProgress = (progress.xp / xpToNextLevel) * 100;

  return (
    <div className="space-y-6">
      {/* Level & XP Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            {language === 'krio' ? 'Yu Prɔgres' : 'Your Progress'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">Level {progress.level}</div>
              <div className="text-sm text-muted-foreground">
                {progress.xp} / {xpToNextLevel} XP
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <Progress value={xpProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {language === 'krio' ? 'Lɛsɔn dɛm we dɔn' : 'Lessons Complete'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.lessonsCompleted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {language === 'krio' ? 'Tɛst dɛm we pas' : 'Quizzes Passed'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.quizzesPassed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {language === 'krio' ? 'De dɛm we yu wok' : 'Day Streak'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-1">
              {progress.dailyStreak}
              <Star className="h-5 w-5 text-primary fill-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {language === 'krio' ? 'Awad dɛm we yu gɛt' : 'Badges Earned'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unlockedBadges.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            {language === 'krio' ? 'Awad dɛm we nyu' : 'Recent Badges'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {unlockedBadges.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {unlockedBadges.slice(0, 4).map((badge) => {
                const badgeData = badgesData.find(b => b.id === badge.badgeId);
                if (!badgeData) return null;
                
                return (
                  <div
                    key={badge.badgeId}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <div className="text-3xl">{badgeData.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {language === 'krio' ? badgeData.nameKrio : badgeData.name}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        +{badgeData.xpReward} XP
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{language === 'krio' ? 'Kɔmplit lɛsɔn dɛm fɔ gɛt awad!' : 'Complete lessons to earn badges!'}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
