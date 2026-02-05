/* ==========================================

SAIF EDDIN ALREFAEE - PORTFOLIO
Drake Theme with Red Accent
JavaScript Functionality

========================================== */

// ==========================================
// NAVIGATION
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    hamburger.classList.toggle('active');
  });
}

// Close menu when link is clicked (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    if (hamburger) {
      hamburger.classList.remove('active');
    }
  });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('.content-section');
  
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
// SMOOTH SCROLLING
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 100; // Offset for fixed navbar
      const targetPosition = target.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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
      subject: document.getElementById('subject')?.value || '',
      message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Show success message
    showNotification('Message sent successfully! Thank you for reaching out.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Log form data (in production, this would send to a server)
    console.log('Form Data:', formData);
  });
}

// ==========================================
// NOTIFICATIONS
// ==========================================

function showNotification(message, type = 'info') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;

  // Add to document
  document.body.appendChild(notification);

  // Style notification
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    padding: '16px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: '10001',
    animation: 'slideIn 0.3s ease-out',
    maxWidth: '350px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)'
  });

  // Set colors based on type
  const colors = {
    success: { bg: '#ff0000', text: 'white' },
    error: { bg: '#ff0000', text: 'white' },
    info: { bg: '#666666', text: 'white' }
  };

  const color = colors[type] || colors.info;
  notification.style.backgroundColor = color.bg;
  notification.style.color = color.text;

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add notification animation styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
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
document.head.appendChild(notificationStyle);

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      entry.target.style.opacity = '1';
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.content-section, .project-card, .timeline-item, .skill-category'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    scrollObserver.observe(el);
  });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add shadow on scroll
  if (scrollTop > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScrollTop = scrollTop;
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
// UTILITY FUNCTIONS
// ==========================================

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success');
  }).catch(err => {
    showNotification('Failed to copy', 'error');
    console.error('Copy error:', err);
  });
}

// Debounce function for performance
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

// Throttle function for performance
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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Enter key on buttons
  if (e.key === 'Enter') {
    const focused = document.activeElement;
    if (focused && (focused.tagName === 'BUTTON' || focused.classList.contains('btn-download') || focused.classList.contains('btn-submit'))) {
      focused.click();
    }
  }
  
  // Escape key to close mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    if (hamburger) {
      hamburger.classList.remove('active');
    }
  }
});

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
  body.keyboard-nav *:focus {
    outline: 2px solid #ff0000;
    outline-offset: 2px;
  }
`;
document.head.appendChild(focusStyle);

// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded successfully!');
  initializePortfolio();
  
  // Add entrance animation to profile card
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    profileCard.style.animation = 'fadeInUp 0.8s ease-out';
  }
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
    } else {
      console.log(`✗ ${id} not found (optional)`);
    }
  });
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==========================================
// PROJECT CARD INTERACTIONS
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ==========================================
// EXPORT FUNCTIONS (for debugging)
// ==========================================

window.PortfolioDebug = {
  showNotification: showNotification,
  copyToClipboard: copyToClipboard,
  detectTheme: detectTheme,
  debounce: debounce,
  throttle: throttle
};

console.log('Portfolio JavaScript loaded. Access debug functions via window.PortfolioDebug');
