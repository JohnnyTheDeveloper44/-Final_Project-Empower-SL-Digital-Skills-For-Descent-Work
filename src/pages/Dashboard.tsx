import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";
import { getCurrentUser } from "@/utils/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GamificationStats } from "@/components/GamificationStats";
import { useLanguage } from "@/hooks/useLanguage";

const Dashboard = () => {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const enrolledCourses = [
    {
      id: "2",
      title: "Web Development Bootcamp",
      progress: 45,
      instructor: "Mohamed Sesay",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      nextLesson: "JavaScript Basics"
    },
    {
      id: "1",
      title: "Digital Marketing Fundamentals",
      progress: 70,
      instructor: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=250&fit=crop",
      nextLesson: "Social Media Strategy"
    },
    {
      id: "3",
      title: "Entrepreneurship & Business Planning",
      progress: 20,
      instructor: "Fatmata Koroma",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
      nextLesson: "Market Research"
    }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8 animate-fade-in flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {t('Welcome back')}, <span className="text-primary">{user.name}</span>!
          </h1>
          <p className="text-muted-foreground">{t('Continue your learning journey')}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Course Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t('Enrolled Courses')}
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in flex flex-col" style={{ animationDelay: '100ms' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t('Hours Learned')}
                  </CardTitle>
                  <Clock className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.5</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in flex flex-col" style={{ animationDelay: '200ms' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t('Certificates')}
                  </CardTitle>
                  <Award className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in flex flex-col" style={{ animationDelay: '300ms' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t('Avg. Progress')}
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45%</div>
                </CardContent>
              </Card>
            </div>

            {/* Continue Learning Section */}
            <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{t('Continue Learning')}</CardTitle>
                    <CardDescription>{t('Pick up where you left off')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {enrolledCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className="flex gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-all duration-300 hover:shadow-md"
                      style={{ animationDelay: `${(index + 5) * 100}ms` }}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-32 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t('Progress')}</span>
                            <span className="font-medium text-primary">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1.5" />
                        </div>
                        <div className="text-sm">
                          {t('Next')}: <span className="font-medium">{course.nextLesson}</span>
                        </div>
                      </div>
                      <Link to={`/course/${course.id}`}>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                          {t('Continue')}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Gamification */}
          <div className="lg:col-span-1">
            <GamificationStats />
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="animate-fade-in flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t('Recommended for You')}</h2>
            <Link to="/courses">
              <Button variant="outline">{t('View All')}</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in flex flex-col">
              <CardHeader>
                <CardTitle>Graphic Design Mastery</CardTitle>
                <CardDescription>Perfect match for your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/courses">
                  <Button variant="outline" className="w-full">{t('Explore Course')}</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in flex flex-col" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <CardTitle>Data Analysis with Python</CardTitle>
                <CardDescription>Boost your technical skills</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/courses">
                  <Button variant="outline" className="w-full">{t('Explore Course')}</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in flex flex-col" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Social Media Marketing</CardTitle>
                <CardDescription>Expand your marketing knowledge</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/courses">
                  <Button variant="outline" className="w-full">{t('Explore Course')}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
