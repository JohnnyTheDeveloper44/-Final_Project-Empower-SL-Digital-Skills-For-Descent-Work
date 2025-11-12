import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Award, BookOpen } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To democratize access to quality digital education and empower learners worldwide to achieve their full potential through innovative online learning."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To become the world's most trusted and accessible platform for digital skills development, creating opportunities for millions of learners."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "We believe in accessibility, excellence, innovation, and community-driven learning that transforms lives and creates lasting impact."
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: BookOpen, value: "200+", label: "Courses Available" },
    { icon: Award, value: "15K+", label: "Certificates Issued" },
    { icon: Users, value: "100+", label: "Expert Instructors" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Former educator passionate about making quality education accessible to everyone."
    },
    {
      name: "Michael Chen",
      role: "Head of Education",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      bio: "15+ years in curriculum development and instructional design."
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Technology Officer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      bio: "Tech innovator focused on creating seamless learning experiences."
    },
    {
      name: "David Kim",
      role: "Head of Content",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      bio: "Content strategist ensuring the highest quality learning materials."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6 animate-fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
              About <span className="text-primary">LearnHub Pro</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Empowering learners worldwide with accessible, high-quality digital education that transforms careers and lives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="p-6 md:p-8 hover:shadow-lg transition-all hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl mb-4 md:mb-6">
                  <value.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{value.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Our Impact in <span className="text-primary">Numbers</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center space-y-2 md:space-y-4 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-full mb-2 md:mb-4">
                  <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12">
              Our <span className="text-primary">Story</span>
            </h2>
            <Card className="p-6 md:p-8 lg:p-12">
              <div className="space-y-4 md:space-y-6 text-sm md:text-base text-muted-foreground">
                <p>
                  LearnHub Pro was founded in 2020 with a simple yet powerful vision: to make high-quality digital education accessible to everyone, everywhere. Our founders, experienced educators and technologists, recognized that traditional education systems weren't keeping pace with the rapidly evolving digital landscape.
                </p>
                <p>
                  What started as a small collection of coding tutorials has grown into a comprehensive learning platform with over 200 courses spanning web development, data science, digital marketing, design, and more. We've helped over 50,000 students worldwide acquire the skills they need to thrive in the digital economy.
                </p>
                <p>
                  Our platform is built on the belief that education should be engaging, practical, and relevant to real-world applications. Every course is designed by industry experts and continuously updated to reflect the latest trends and technologies. We're not just teaching skills—we're building careers and transforming lives.
                </p>
                <p>
                  Today, LearnHub Pro continues to innovate in online education, offering interactive learning experiences, personalized learning paths, and a supportive community of learners and mentors. We're committed to our mission of democratizing education and empowering the next generation of digital innovators.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Passionate educators and innovators dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="p-4 md:p-6 text-center hover:shadow-lg transition-all hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4"
                />
                <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">{member.name}</h3>
                <p className="text-xs md:text-sm text-primary mb-2 md:mb-3">{member.role}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;