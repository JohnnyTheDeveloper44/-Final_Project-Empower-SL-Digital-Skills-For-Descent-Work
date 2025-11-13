import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, TrendingUp, Star, ArrowRight, CheckCircle, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  image: string;
  rating: number;
  enrolled: number;
  level: string;
  duration: string;
}
const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    // Load courses directly from import
    import('@/data/courses.json').then(module => {
      setCourses(module.default.slice(0, 6));
    });
  }, []);
  const testimonials = [{
    name: "Aminata Kamara",
    role: "Digital Marketer, Freetown",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata",
    quote: "The digital marketing course changed my life. I went from unemployed to running my own social media agency in just 6 months!",
    rating: 5
  }, {
    name: "Mohamed Sesay",
    role: "Full Stack Developer, Bo",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
    quote: "Learning web development here opened doors I never imagined. Now I work remotely for international clients!",
    rating: 5
  }, {
    name: "Fatmata Koroma",
    role: "E-commerce Entrepreneur, Kenema",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatmata",
    quote: "The entrepreneurship program gave me the skills and confidence to start my e-commerce business. Today I employ 5 people!",
    rating: 5
  }];
  return <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background -z-10 animate-fade-in" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200')] bg-cover bg-center opacity-5 -z-10 animate-scale-in" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-scale-in hover:scale-105 transition-transform duration-300">
              <TrendingUp className="h-4 w-4 animate-pulse" />
              Empowering Through Education
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Unlock Your Digital Future in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sierra Leone
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access world-class digital skills training, connect with inspiring mentors, and discover opportunities that transform careers and communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">Start Learning Now<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary/50 hover:bg-primary/10 hover:scale-105 transition-all duration-300">
                  Explore Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4 animate-fade-in flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Popular <span className="text-primary">Courses</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our most popular courses designed to help you build in-demand skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {courses.map((course, index) => <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 overflow-hidden animate-fade-in flex flex-col" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.enrolled.toLocaleString()} students</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">by {course.instructor}</p>
                </CardContent>
                
                <CardFooter>
                  <Link to={`/course/${course.id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>)}
          </div>

          <div className="text-center mt-12 animate-fade-in flex justify-center">
            <Link to="/courses">
              <Button size="lg" variant="outline" className="hover:scale-105 transition-all duration-300">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4 animate-fade-in flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose <span className="text-primary">Empower SL</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build a successful digital career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/50 group hover:-translate-y-1 animate-scale-in flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Free Learning Resources</h3>
              <p className="text-muted-foreground">
                Access world-class courses in digital skills, entrepreneurship, and technology—completely free.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/50 group hover:-translate-y-1 animate-scale-in flex flex-col items-center" style={{
            animationDelay: '100ms'
          }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Inspiring Success Stories</h3>
              <p className="text-muted-foreground">
                Learn from Sierra Leonean youth who transformed their lives through digital skills and innovation.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/50 group hover:-translate-y-1 animate-scale-in flex flex-col items-center" style={{
            animationDelay: '200ms'
          }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Real Opportunities</h3>
              <p className="text-muted-foreground">
                Discover scholarships, training programs, and job opportunities to kickstart your digital career.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center space-y-2 animate-scale-in flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4 hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary">15,000</div>
              <div className="text-muted-foreground">Active Learners</div>
            </div>
            
            <div className="text-center space-y-2 animate-scale-in flex flex-col items-center" style={{
            animationDelay: '100ms'
          }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4 hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent">50+</div>
              <div className="text-muted-foreground">Free Courses</div>
            </div>
            
            <div className="text-center space-y-2 animate-scale-in flex flex-col items-center" style={{
            animationDelay: '200ms'
          }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4 hover:scale-110 transition-transform duration-300">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary">120+</div>
              <div className="text-muted-foreground">Opportunities</div>
            </div>
            
            <div className="text-center space-y-2 animate-scale-in flex flex-col items-center" style={{
            animationDelay: '300ms'
          }}>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4 hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4 animate-fade-in flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Success <span className="text-primary">Stories</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real people, real transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {testimonials.map((testimonial, index) => <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in hover:-translate-y-1 flex flex-col" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}
                </div>
                <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of learners who are building successful careers in the digital economy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/courses">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white hover:scale-105 transition-all duration-300 text-slate-50 bg-slate-950 hover:bg-slate-800">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Home;