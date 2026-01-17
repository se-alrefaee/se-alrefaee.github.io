/* ========================================
   CYBERSECURITY PORTFOLIO - JAVASCRIPT
   Advanced Cursor, Animations & Interactions
   ======================================== */

// ========================================
// CUSTOM CURSOR FUNCTIONALITY
// ========================================

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Direct cursor position
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';

    // Smooth follower with lerp
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
});

// Detect hover on interactive elements
const interactiveElements = document.querySelectorAll(
    'a, button, .btn, .nav-link, .project-link, .social-link, .skill-badge, ' +
    '.project-card, .about-card, .highlight-item, .contact-item, input, textarea, ' +
    '.about-highlights, .skill-category, .credential-card'
);

interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hover-active');
    });

    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hover-active');
    });
});

// Hide cursor on mouse leave
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
});

// ========================================
// MATRIX RAIN ANIMATION
// ========================================

const matrixElement = document.getElementById('matrix');
const matrixCharacters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function createMatrixRain() {
    const drops = [];
    const numDrops = 15;

    for (let i = 0; i < numDrops; i++) {
        const span = document.createElement('span');
        span.textContent = matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)];
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDuration = (Math.random() * 10 + 8) + 's';
        span.style.animationDelay = Math.random() * 2 + 's';
        matrixElement.appendChild(span);
    }
}

createMatrixRain();

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .skill-category, .about-card, .credential-card').forEach((el) => {
    observer.observe(el);
});

// ========================================
// NAVIGATION MOBILE MENU
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
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

// ========================================
// NAVBAR BACKGROUND ON SCROLL
// ========================================

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(180deg, rgba(5, 8, 18, 0.98) 0%, rgba(5, 8, 18, 0.95) 100%)';
        navbar.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'linear-gradient(180deg, rgba(5, 8, 18, 0.95) 0%, rgba(5, 8, 18, 0.85) 100%)';
        navbar.style.boxShadow = 'none';
    }
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// PROJECT CARD CLICK NAVIGATION
// ========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card) => {
    const link = card.querySelector('.project-link');
    if (link) {
        card.addEventListener('click', (e) => {
            if (e.target !== link && !link.contains(e.target)) {
                window.location.href = link.getAttribute('href');
            }
        });
    }
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            subject: contactForm.querySelector('input[type="text"]:nth-of-type(2)').value,
            message: contactForm.querySelector('textarea').value
        };

        // Validate
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Simulate form submission
        const button = contactForm.querySelector('.btn-primary');
        const originalText = button.innerHTML;
        button.innerHTML = '<span>SENDING...</span><i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I will contact you soon.', 'success');
            contactForm.reset();
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Add CSS for notification
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                animation: slideInRight 0.4s ease-out;
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                letter-spacing: 0.5px;
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
            }

            .notification-success .notification-content {
                background: linear-gradient(135deg, rgba(0, 200, 0, 0.2), rgba(0, 150, 0, 0.1));
                border-left: 3px solid #00c800;
                color: #00ff00;
            }

            .notification-error .notification-content {
                background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(200, 0, 0, 0.1));
                border-left: 3px solid #ff0000;
                color: #ff6b6b;
            }

            .notification-info .notification-content {
                background: linear-gradient(135deg, rgba(0, 100, 255, 0.2), rgba(0, 50, 200, 0.1));
                border-left: 3px solid #0064ff;
                color: #64b5f6;
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ========================================
// PARALLAX SCROLL EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const orbs = document.querySelectorAll('.orb');
    const scrollY = window.scrollY;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-cta, .profile-image-container');
    heroElements.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
    });
});

// ========================================
// ACTIVE LINK HIGHLIGHTING
// ========================================

const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach((item) => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--primary-red)';
            item.style.textShadow = '0 0 15px var(--primary-red)';
        } else {
            item.style.color = '';
            item.style.textShadow = '';
        }
    });
});

// ========================================
// SKILL BADGE ANIMATION ON HOVER
// ========================================

const skillBadges = document.querySelectorAll('.skill-badge');

skillBadges.forEach((badge) => {
    badge.addEventListener('mouseover', function() {
        this.style.animation = 'pulse 0.6s ease-out';
    });
});

// ========================================
// DYNAMIC BACKGROUND GRADIENT
// ========================================

function updateBackgroundGradient() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const hue = (scrollPercent * 3.6) % 360;
    
    // Optional: Apply subtle hue shift as user scrolls
    // document.body.style.filter = `hue-rotate(${hue}deg)`;
}

window.addEventListener('scroll', updateBackgroundGradient);

// ========================================
// RIPPLE EFFECT ON BUTTONS
// ========================================

const buttons = document.querySelectorAll('.btn, .skill-badge, .project-card');

buttons.forEach((button) => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.innerHTML = `
                .btn, .skill-badge, .project-card {
                    position: relative;
                    overflow: hidden;
                }

                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
                    transform: scale(0);
                    animation: rippleAnimation 0.6s ease-out;
                    pointer-events: none;
                }

                @keyframes rippleAnimation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.appendChild(ripple);
    });
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Tab navigation with custom highlight
    if (e.key === 'Tab') {
        document.body.style.tabIndex = 0;
    }
});

// ========================================
// PERFORMANCE: REQUEST ANIMATION FRAME
// ========================================

let ticking = false;

function updateCursorSmooth() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}

document.addEventListener('mousemove', updateCursorSmooth);

// ========================================
// LOG INITIALIZATION
// ========================================

console.log('%c🔴 SAIF EDDIN ALREFAEE - RED TEAM OPERATOR 🔴', 'color: #FF0000; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #FF0000;');
console.log('%cPenetration Tester | Network Security Specialist | Python Developer', 'color: #b0b0b0; font-size: 14px;');
console.log('%cExploit. Execute. Dominate.', 'color: #FF1744; font-size: 12px; font-weight: bold; font-style: italic;');
console.log('%c© 2026 All rights reserved.', 'color: #777; font-size: 10px;');
