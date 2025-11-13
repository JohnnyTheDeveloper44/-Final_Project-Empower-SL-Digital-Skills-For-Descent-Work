import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { getCurrentUser, logout } from "@/utils/auth";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50 shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 animate-fade-in">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold transition-all duration-300">
              LearnHub <span className="text-primary group-hover:text-accent">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              Home
            </Link>
            <Link to="/courses" className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              Courses
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              About
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-110 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground transition-transform duration-300 hover:scale-110"
          >
            {isOpen ? <X className="transition-transform duration-300 rotate-90" /> : <Menu className="transition-transform duration-300" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link to="/" className="block text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/courses" className="block text-foreground/80 hover:text-primary transition-colors">
              Courses
            </Link>
            <Link to="/about" className="block text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="block text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}>
                    <Button className="w-full" variant="ghost">Dashboard</Button>
                  </Link>
                  <Button onClick={handleLogout} className="w-full" variant="outline">Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button className="w-full" variant="ghost">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
