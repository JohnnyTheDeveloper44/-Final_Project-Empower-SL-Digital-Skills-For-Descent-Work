// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  html.classList.add('dark');
  sunIcon.classList.remove('hidden');
  moonIcon.classList.add('hidden');
} else {
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

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
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