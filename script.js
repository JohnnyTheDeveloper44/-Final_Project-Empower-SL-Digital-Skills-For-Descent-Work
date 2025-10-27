// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
  html.classList.add('dark');
  sunIcon.classList.remove('hidden');
  moonIcon.classList.add('hidden');
  localStorage.setItem('theme', 'dark');
} else {
  html.classList.remove('dark');
  sunIcon.classList.add('hidden');
  moonIcon.classList.remove('hidden');
}

themeToggle.addEventListener('click', () => {
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Smooth scrolling for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Close mobile menu if open
      mobileMenu.classList.remove('open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      
      // Smooth scroll to target
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active link
      document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Animated Counter for Statistics
function animateCounter(element, target, suffix = '') {
  const duration = 2000; // 2 seconds
  const steps = 50;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.floor(increment * step), target);
    
    if (suffix) {
      element.textContent = current.toLocaleString() + suffix;
    } else {
      element.textContent = current.toLocaleString();
    }

    if (step >= steps) {
      clearInterval(timer);
      element.textContent = target.toLocaleString() + suffix;
    }
  }, duration / steps);
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValues = entry.target.querySelectorAll('.stat-value');
      statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        animateCounter(stat, target, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe the stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}