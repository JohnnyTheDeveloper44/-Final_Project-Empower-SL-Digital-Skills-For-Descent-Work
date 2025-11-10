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

// Scroll Progress Bar
const progressBar = document.getElementById('progressBar');

function updateScrollProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
  
  progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Parallax Effect for Hero Section
let lastScrollY = window.pageYOffset;

function parallaxScroll() {
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    const scrolled = window.pageYOffset;
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  lastScrollY = window.pageYOffset;
}

window.addEventListener('scroll', parallaxScroll);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    if (isActive) {
      item.classList.remove('active');
    } else {
      item.classList.add('active');
    }
  });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleBackToTop);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Reset errors
    clearErrors();
    
    // Validate
    let isValid = true;
    
    if (name.value.trim().length < 2) {
      showError(name, 'Name must be at least 2 characters');
      isValid = false;
    }
    
    if (!isValidEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }
    
    if (message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters');
      isValid = false;
    }
    
    if (isValid) {
      // Show success message (in real app, this would submit to server)
      showSuccessMessage('Thank you! Your message has been sent successfully.');
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        hideSuccessMessage();
      }, 5000);
    }
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.form-error');
  
  input.classList.add('error');
  errorElement.textContent = message;
}

function clearErrors() {
  const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
  const errors = contactForm.querySelectorAll('.form-error');
  
  inputs.forEach(input => input.classList.remove('error'));
  errors.forEach(error => error.textContent = '');
}

function showSuccessMessage(message) {
  // Check if message element exists, if not create it
  let messageDiv = contactForm.querySelector('.form-message');
  if (!messageDiv) {
    messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
  }
  
  messageDiv.textContent = message;
  messageDiv.classList.add('success');
  messageDiv.classList.remove('error');
}

function hideSuccessMessage() {
  const messageDiv = contactForm.querySelector('.form-message');
  if (messageDiv) {
    messageDiv.classList.remove('success');
  }
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (isValidEmail(email)) {
      // Show success (in real app, this would submit to server)
      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    } else {
      alert('Please enter a valid email address');
    }
  });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe feature cards, testimonials, and other elements
const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .stat-card');
animatedElements.forEach(el => {
  fadeInObserver.observe(el);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }});
    }
  });
  window.addEventListener('scroll', highlightNavigation);
}

