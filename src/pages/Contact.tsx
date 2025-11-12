import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@learnhubpro.com",
      link: "mailto:support@learnhubpro.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+232 30 548 655",
      link: "tel:+23230548655"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "123 Learning Street, Education City, EC 12345",
      link: null
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
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className="p-4 md:p-6 text-center hover:shadow-lg transition-all hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-3 md:mb-4">
                  <info.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2">{info.title}</h3>
                {info.link ? (
                  <a 
                    href={info.link} 
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-xs md:text-sm text-muted-foreground">{info.value}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6 md:p-8 lg:p-12 animate-scale-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
                Send us a <span className="text-primary">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    className="w-full resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base md:text-lg"
                  disabled={loading}
                >
                  {loading ? "Sending..." : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">How do I enroll in a course?</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Simply browse our course catalog, select the course you're interested in, and click the "Enroll" button. If you're not logged in, you'll be prompted to create a free account first.
                </p>
              </Card>

              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">Are the courses really free?</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Yes! All our courses are completely free to access. We believe in democratizing education and making quality learning accessible to everyone.
                </p>
              </Card>

              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">Do I get a certificate upon completion?</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Absolutely! Once you complete all lessons and pass the final quiz with a score of 70% or higher, you'll receive a certificate of completion that you can share on your professional profiles.
                </p>
              </Card>

              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">How long do I have access to the courses?</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Once enrolled, you have lifetime access to the course materials. Learn at your own pace without any time restrictions.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;