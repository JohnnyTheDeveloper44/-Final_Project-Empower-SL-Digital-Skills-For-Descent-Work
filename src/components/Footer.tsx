import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-card border-t border-border mt-20 animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand */}
          <div className="space-y-4 animate-scale-in">
            <div className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                LearnHub <span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering learners worldwide with quality education and practical skills.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-scale-in" style={{
          animationDelay: '100ms'
        }}>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-scale-in" style={{
          animationDelay: '200ms'
        }}>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm hover:translate-x-1 inline-block">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="animate-scale-in" style={{
          animationDelay: '300ms'
        }}>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 inline-block">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 inline-block">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 inline-block">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1 inline-block">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 LearnHub Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;