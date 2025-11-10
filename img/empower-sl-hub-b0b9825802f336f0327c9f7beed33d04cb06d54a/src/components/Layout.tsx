import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, ArrowUp, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';

export default function Layout({ children, className }: { children: React.ReactNode; className?: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  useEffect(() => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.classList.toggle('dark', savedTheme === 'dark');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = savedTheme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = savedTheme === 'dark' ? 'none' : 'block';
    }

    themeToggle?.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'block' : 'none';
        moonIcon.style.display = isDark ? 'none' : 'block';
      }
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    mobileMenuToggle?.addEventListener('click', () => {
      mobileMenu?.classList.add('active');
    });

    mobileMenuClose?.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu?.classList.remove('active');
      });
    });

    // Navbar Scroll Effect
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }

      // Scroll Progress Bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }

      // Parallax Effect
      const parallax = document.querySelector('.parallax-bg') as HTMLElement;
      if (parallax) {
        const scrolledY = window.pageYOffset;
        parallax.style.transform = `translateY(${scrolledY * 0.5}px)`;
      }

      // Back to Top Button
      const backToTopBtn = document.getElementById('backToTopBtn');
      if (window.pageYOffset > 300) {
        backToTopBtn?.classList.add('visible');
      } else {
        backToTopBtn?.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Animated Statistics
    const animateCounter = (element: Element, target: number, suffix: string = '') => {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + suffix;
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + suffix;
        }
      }, 20);
    };

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const value = parseInt(target.dataset.target || '0');
          const suffix = target.dataset.suffix || '';
          animateCounter(target, value, suffix);
          statsObserver.unobserve(target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(stat => {
      statsObserver.observe(stat);
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const wasActive = faqItem?.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
        });

        if (!wasActive) {
          faqItem?.classList.add('active');
        }
      });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Scroll Animations
    const scrollAnimObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          scrollAnimObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .testimonial-card, .course-card, .career-card').forEach(card => {
      scrollAnimObserver.observe(card);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      <div className="scroll-progress">
        <div className="scroll-progress-bar" id="progressBar"></div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span>Empower SL</span>
              </Link>
            </div>

            <div className="nav-links">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
              <Link to="/start-learning" className={`nav-link ${location.pathname === '/start-learning' ? 'active' : ''}`}>Learn</Link>
              <Link to="/explore-opportunities" className={`nav-link ${location.pathname === '/explore-opportunities' ? 'active' : ''}`}>Opportunities</Link>
              <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>Admin</Link>
              <a href="/#contact" className="nav-link">Contact</a>
            </div>

            <div className="nav-actions">
              <button id="themeToggle" className="theme-toggle" aria-label="Toggle theme">
                <Sun id="sunIcon" className="theme-icon" size={20} />
                <Moon id="moonIcon" className="theme-icon" size={20} style={{ display: 'none' }} />
              </button>
              <button onClick={handleLogout} className="logout-button" aria-label="Logout">
                Logout
              </button>
              <button id="mobileMenuToggle" className="mobile-menu-toggle" aria-label="Open menu">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mobile-menu" id="mobileMenu">
        <div className="mobile-menu-header">
          <div className="logo">
            <span>Empower SL</span>
          </div>
          <button id="mobileMenuClose" className="mobile-menu-close" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <div className="mobile-nav-links">
          <Link to="/" className="mobile-nav-link">Home</Link>
          <Link to="/start-learning" className="mobile-nav-link">Learn</Link>
          <Link to="/explore-opportunities" className="mobile-nav-link">Opportunities</Link>
          <Link to="/admin" className="mobile-nav-link">Admin</Link>
          <a href="/#contact" className="mobile-nav-link">Contact</a>
        </div>
      </div>

      {children}

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">Empower SL</h3>
              <p>Empowering Sierra Leone's youth with digital skills and opportunities.</p>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/start-learning">Start Learning</Link></li>
                <li><Link to="/explore-opportunities">Opportunities</Link></li>
                <li><a href="/#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Resources</h4>
              <ul className="footer-links">
                <li><a href="#courses">Courses</a></li>
                <li><a href="#certifications">Certifications</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#facebook" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#twitter" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#instagram" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#whatsapp" aria-label="WhatsApp">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Empower SL. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <button id="backToTopBtn" className="back-to-top" aria-label="Back to top">
        <ArrowUp size={20} />
      </button>
    </>
  );
}
