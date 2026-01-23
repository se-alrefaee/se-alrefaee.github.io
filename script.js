/* ==========================================

RED TEAM CYBERSECURITY PORTFOLIO

JavaScript Functionality with Advanced Animations

========================================== */

// ==========================================
// TERMINAL TEXT ANIMATION
// ==========================================

const terminalText = "Cybersecurity Penetration Tester";
let index = 0;
const terminalElement = document.querySelector('.terminal-text');

function typeWriter() {
  if (index < terminalText.length) {
    const span = document.createElement('span');
    span.textContent = terminalText[index];
    
    // Clear the span placeholder and append character
    if (index === 0) {
      terminalElement.textContent = '';
    }
    
    terminalElement.appendChild(span);
    index++;
    setTimeout(typeWriter, 80); // Typing speed
  }
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Wait for page to be ready, then start typing
  setTimeout(typeWriter, 500);
});

// ==========================================
// NUMBER COUNTER ANIMATION
// ==========================================

function animateCounter(element, target) {
  const duration = 2000; // 2 seconds
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for triggering counter animations
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      entry.target.classList.add('counted');
      counterObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(element => {
  counterObserver.observe(element);
});

// ==========================================
// NAVIGATION
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    updateActiveLink(link);
  });
});

// Update active link
function updateActiveLink(clickedLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  clickedLink.classList.add('active');
}

// Update active link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// FORM HANDLING
// ==========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email', 'error');
      return;
    }

    // Show success message
    showNotification('Message sent successfully! Thank you for reaching out.', 'success');
    
    // Reset form
    contactForm.reset();
    console.log('Form Data:', formData);
  });
}

// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  // Add to document
  document.body.appendChild(notification);

  // Style notification
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: '10001',
    animation: 'slideInNotification 0.3s ease-out',
    maxWidth: '300px',
    textAlign: 'center'
  });

  // Set colors based on type
  const colors = {
    success: { bg: '#C01F2F', text: 'white' },
    error: { bg: '#C01F2F', text: 'white' },
    info: { bg: '#626C71', text: 'white' }
  };

  const color = colors[type] || colors.info;
  notification.style.backgroundColor = color.bg;
  notification.style.color = color.text;

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutNotification 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInNotification {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOutNotification {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .arsenal-item, .contact-form-wrapper, .experience-item, .competition-card, .education-card, .language-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ==========================================
// THEME DETECTION
// ==========================================

function detectTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// Detect theme on load
detectTheme();

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success');
  }).catch(err => {
    showNotification('Failed to copy', 'error');
  });
}

// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded successfully!');
  initializePortfolio();
});

function initializePortfolio() {
  console.log('Initializing portfolio components...');
  const requiredElements = [
    'hamburger',
    'navMenu',
    'contactForm'
  ];

  requiredElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      console.log(`✓ ${id} found`);
    }
  });
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for frequent events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ==========================================
// ACCESSIBILITY
// ==========================================

// Keyboard navigation for buttons
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const focused = document.activeElement;
    if (focused && focused.className.includes('btn')) {
      focused.click();
    }
  }
});

// ==========================================
// EXPORT FUNCTIONS (for debugging)
// ==========================================

window.PortfolioDebug = {
  showNotification: showNotification,
  copyToClipboard: copyToClipboard,
  formatDate: formatDate,
  updateActiveLink: updateActiveLink,
  detectTheme: detectTheme,
  animateCounter: animateCounter,
  typeWriter: typeWriter
};

console.log('Portfolio JavaScript loaded. Access debug functions via window.PortfolioDebug');
