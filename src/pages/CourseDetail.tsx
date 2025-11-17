import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Clock, BookOpen, Award, CheckCircle, PlayCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";
import { completeLesson, completeCourse, getUserProgress } from "@/utils/gamification";
import { QuizComponent } from "@/components/QuizComponent";
import quizzesData from "@/data/quizzes.json";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const progress = getUserProgress();
  const completedLessons = progress.completedLessons || [];
  const courseCompleted = progress.completedCourses?.includes(id || '') || false;

  useEffect(() => {
    import('@/data/courses.json').then(module => {
      const foundCourse = module.default.find((c: any) => c.id === id);
      setCourse(foundCourse);
    });
  }, [id]);

  const handleCompleteLesson = (lessonId: string) => {
    const result = completeLesson(lessonId);
    toast({
      title: t("Lesson Completed!"),
      description: `${t("You earned")} ${result.xpGained} XP!`,
    });
    if (result.leveledUp) {
      setTimeout(() => {
        toast({
          title: t("Level Up!"),
          description: t("You've reached a new level!"),
        });
      }, 1000);
    }
  };

  const handleCompleteCourse = () => {
    if (!id) return;
    const result = completeCourse(id);
    toast({
      title: t("Course Completed!"),
      description: `${t("You earned")} ${result.xpGained} XP!`,
    });
    setTimeout(() => {
      toast({
        title: t("Jobs Section Unlocked!"),
        description: t("You can now browse job opportunities"),
      });
    }, 2000);
  };

  if (!course) {
    return <div className="min-h-screen bg-background pt-24"><Navbar /><div className="container mx-auto px-4"><p className="text-center">Loading...</p></div></div>;
  }

  const lessons = [
    { id: "1", title: "Introduction to HTML", duration: "45 min" },
    { id: "2", title: "CSS Fundamentals", duration: "60 min" },
    { id: "3", title: "JavaScript Basics", duration: "75 min" },
  ];

  const quiz = quizzesData.find((q: any) => q.id === "1");
  const allLessonsCompleted = lessons.every(l => completedLessons.includes(l.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start animate-fade-in">
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <div className="space-y-4 flex flex-col">
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {course.category}
                </span>
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-bold">{course.title}</h1>
              
              <p className="text-lg text-muted-foreground">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm animate-scale-in">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">{course.enrolled.toLocaleString()}</span>
                  <span className="text-muted-foreground">Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="font-medium">{course.lessons}</span>
                  <span className="text-muted-foreground">Lessons</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                  <p className="font-semibold">{course.instructor}</p>
                </div>
              </div>
            </div>

            <img 
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Enrollment Card */}
          <div className="lg:col-span-1 flex flex-col">
            <Card className="sticky top-24 border-2 animate-scale-in hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Enroll in This Course</CardTitle>
                <CardDescription>Get lifetime access to all lessons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">FREE</div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{course.lessons} video lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>Downloadable resources</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Enroll Now
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Join {course.enrolled.toLocaleString()} students already enrolled
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content Tabs */}
        <Tabs defaultValue="curriculum" className="space-y-6 animate-fade-in flex flex-col">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>{lessons.length} lessons • {course.duration}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      {completedLessons.includes(lesson.id) ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <PlayCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                    {!completedLessons.includes(lesson.id) && (
                      <Button size="sm" onClick={() => handleCompleteLesson(lesson.id)}>
                        {t("Complete Lesson")}
                      </Button>
                    )}
                  </div>
                ))}
                
                {allLessonsCompleted && !courseCompleted && (
                  <Button className="w-full mt-4" onClick={handleCompleteCourse}>
                    {t("Complete Course")}
                  </Button>
                )}
                
                {courseCompleted && (
                  <div className="flex items-center justify-center gap-2 p-4 bg-primary/10 rounded-lg text-primary">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">{t("Course Completed!")}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quiz">
            {quiz ? (
              <QuizComponent 
                quizId={quiz.id}
                title={quiz.title}
                questions={quiz.questions}
              />
            ) : (
              <Card><CardContent className="p-8 text-center"><p className="text-muted-foreground">No quiz available yet.</p></CardContent></Card>
            )}
          </TabsContent>

          <TabsContent value="about">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                  <p>Master the fundamentals of {course.title.toLowerCase()}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                  <p>Build real-world projects to add to your portfolio</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                  <p>Learn industry best practices and professional techniques</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                  <p>Gain practical skills for career advancement</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">• Basic computer literacy</p>
                <p className="text-muted-foreground">• Internet connection</p>
                <p className="text-muted-foreground">• Willingness to learn and practice</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 flex flex-col">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.enrolled} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`}
                        alt="Student"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">Student {i}</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          Excellent course! The instructor explains everything clearly and the projects are very practical.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
