// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Update active state
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      const sidebarItem = document.querySelector('.nav-item[href="' + this.getAttribute('href') + '"]');
      if (sidebarItem) sidebarItem.classList.add('active');
    }
  });
});

// Update active nav item on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item[href^="#"]');
const observerOptions = {
  threshold: 0.3,
  rootMargin: '-20% 0px -70% 0px'
};

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.getAttribute('id');
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === id) {
          item.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Animate stats counter - FIXED
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const suffix = element.dataset.suffix || '';
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValues = entry.target.querySelectorAll('.stat-value');
      statValues.forEach((stat, index) => {
        const text = stat.textContent.replace(/\D/g, '');
        if (text) {
          const value = parseInt(text, 10);
          stat.textContent = '0' + (stat.dataset.suffix || '');
          setTimeout(() => {
            animateValue(stat, 0, value, 1500);
          }, index * 200);
        }
      });

      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(element => statsObserver.observe(element));

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.reveal').forEach(element => {
  revealObserver.observe(element);
});

// Stagger reveal for multiple elements
const staggeredElements = document.querySelectorAll('.project-card.reveal, .timeline-item.reveal, .contact-card.reveal');
let staggerDelay = 0;
staggeredElements.forEach((el, index) => {
  el.style.transitionDelay = (index * 0.1) + 's';
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Animate timeline items
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateX(-20px)';
        entry.target.style.transition = 'all 0.6s ease';
        requestAnimationFrame(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        });
      }, index * 150);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));

// Parallax effect for hero section (disabled on mobile)
const isMobile = window.innerWidth < 768;
if (!isMobile) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroVisual = document.querySelector('.hero-right');
        if (heroVisual) {
          const ratio = scrolled / window.innerHeight;
          heroVisual.style.transform = `translateY(${ratio * 30}px)`;
          heroVisual.style.opacity = String(Math.max(0, 1 - ratio));
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Cursor tracking - FIXED FOR SPEED
const cursor = document.querySelector('.cursor-progress');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Lerp for smooth follow (0.15 = speed, higher = faster)
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  
  if (cursor) {
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
  }
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Ripple effect for clickable elements
const addRipple = (e) => {
  const button = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');

  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
};

const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(139, 92, 246, 0.3);
    transform: scale(0);
    animation: rippleEffect 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes rippleEffect {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }
  .nav-item,
  .contact-card,
  .project-card {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

document.querySelectorAll('.nav-item, .contact-card').forEach(element => {
  element.addEventListener('click', addRipple);
});

// Animate tech tags on hover
document.querySelectorAll('.tech-tag, .tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px)';
    this.style.transition = 'all 0.2s ease';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});

// Welcome message
console.log('%c Welcome to Saif\'s Portfolio ', 'color: #8B5CF6; font-size: 20px; font-weight: bold;');
console.log('%c Cybersecurity Student', 'color: #6B7280; font-size: 14px;');

// Reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}
