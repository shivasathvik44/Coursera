// DOM Elements
const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');
const currentYearElement = document.getElementById('currentYear');

// Update copyright year
currentYearElement.textContent = new Date().getFullYear();

// Scroll Header Effect
function toggleHeaderBackground() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Mobile Menu Toggle
function toggleMenu() {
  navLinks.classList.toggle('active');
  if (navLinks.classList.contains('active')) {
    menuToggle.querySelector('.fa-bars').style.display = 'none';
    menuToggle.querySelector('.fa-times').style.display = 'block';
  } else {
    menuToggle.querySelector('.fa-bars').style.display = 'block';
    menuToggle.querySelector('.fa-times').style.display = 'none';
  }
}

// Close Mobile Menu When Clicking a Link
function closeMenu() {
  navLinks.classList.remove('active');
  menuToggle.querySelector('.fa-bars').style.display = 'block';
  menuToggle.querySelector('.fa-times').style.display = 'none';
}

// Smooth Scrolling for Internal Links
function smoothScroll(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  
  if (targetElement) {
    const headerOffset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    closeMenu();
  }
}

// Section Animation on Scroll
function animateSections() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.85) {
      section.classList.add('visible');
    }
  });
}

// Form Validation
function validateForm(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Reset previous error messages
  document.querySelectorAll('.error-message').forEach(error => {
    error.textContent = '';
  });
  
  // Simple validation
  let isValid = true;
  
  if (name.length < 2) {
    document.getElementById('nameError').textContent = 'Name must be at least 2 characters.';
    isValid = false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    isValid = false;
  }
  
  if (subject.length < 2) {
    document.getElementById('subjectError').textContent = 'Subject must be at least 2 characters.';
    isValid = false;
  }
  
  if (message.length < 10) {
    document.getElementById('messageError').textContent = 'Message must be at least 10 characters.';
    isValid = false;
  }
  
  // If form is valid, simulate form submission
  if (isValid) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call with timeout (in real application, this would be an actual API call)
    setTimeout(() => {
      alert('Your message has been sent successfully!');
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', toggleHeaderBackground);
  window.addEventListener('scroll', animateSections);
  
  menuToggle.addEventListener('click', toggleMenu);
  
  navLinksItems.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
  });
  
  if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
  }
  
  // Initial animations
  toggleHeaderBackground();
  animateSections();
});