// ==========================================
//  RED TEAM CYBERSECURITY PORTFOLIO
//  Advanced JavaScript - Interactive Features
// ==========================================

// DOM Elements
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const notification = document.getElementById('notification');

// ==========================================
//  CUSTOM CURSOR SYSTEM
// ==========================================

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor with smooth following
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursorDot.style.left = mouseX - 4 + 'px';
    cursorDot.style.top = mouseY - 4 + 'px';

    cursorRing.style.left = cursorX - 16 + 'px';
    cursorRing.style.top = cursorY - 16 + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interaction with clickable elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .badge, .skill-category, .cert-item, input, textarea');

interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('active');
    });
});

// Hide system cursor
document.body.style.cursor = 'none';

// ==========================================
//  HAMBURGER MENU
// ==========================================

hamburger.addEventListener('click', () => {
    hamburger.style.animation = 'none';
    setTimeout(() => {
        hamburger.style.animation = '';
    }, 10);
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==========================================
//  SMOOTH SCROLL NAVIGATION
// ==========================================

navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
//  ACTIVE LINK HIGHLIGHTING
// ==========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
//  SCROLL REVEAL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .cert-item, .info-item').forEach((el) => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==========================================
//  PARALLAX EFFECT
// ==========================================

const floatingOrbs = document.querySelector('.floating-orbs');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    if (floatingOrbs) {
        floatingOrbs.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }
});

// ==========================================
//  PROJECT CARD INTERACTIONS
// ==========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ==========================================
//  CONTACT FORM HANDLING
// ==========================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('input, textarea');
        const isValid = Array.from(inputs).every((input) => input.value.trim() !== '');

        if (isValid) {
            // Show notification
            showNotification('Message sent successfully! 🔴', 'success');

            // Reset form
            contactForm.reset();

            // You can add backend integration here
            console.log('Form submitted successfully');
        } else {
            showNotification('Please fill in all fields! ⚠️', 'error');
        }
    });
}

// ==========================================
//  NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.style.display = 'block';
    notification.className = `notification ${type}`;
    notification.style.animation = 'slideInUp 0.4s ease-out';

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.4s ease-out forwards';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 400);
    }, 4000);
}

// ==========================================
//  KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }

    // Tab navigation for accessibility
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement) {
            cursorRing.classList.add('active');
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement === document.body) {
            cursorRing.classList.remove('active');
        }
    }
});

// ==========================================
//  SKILL BADGES INTERACTION
// ==========================================

const badges = document.querySelectorAll('.badge');

badges.forEach((badge) => {
    badge.addEventListener('click', (e) => {
        e.preventDefault();
        badge.style.animation = 'none';
        setTimeout(() => {
            badge.style.animation = 'pulse 0.5s ease-out';
        }, 10);
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeOut {
        from { 
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: 600;
        display: none;
        background: rgba(255, 0, 0, 0.2);
        color: white;
        border: 1px solid rgba(255, 0, 0, 0.5);
    }
    
    .notification.success {
        background: rgba(0, 255, 0, 0.2);
        border-color: rgba(0, 255, 0, 0.5);
    }
    
    .notification.error {
        background: rgba(255, 0, 0, 0.3);
        border-color: rgba(255, 0, 0, 0.7);
    }

    .nav-link.active {
        color: #FF0000;
        text-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    }
`;
document.head.appendChild(style);

// ==========================================
//  FORM INPUT INTERACTIONS
// ==========================================

const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.parentElement.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.2)';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.boxShadow = 'none';
    });

    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.style.borderColor = '#FF0000';
        } else {
            input.style.borderColor = 'rgba(255, 0, 0, 0.2)';
        }
    });
});

// ==========================================
//  PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy load images (for future image optimization)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));
}

// ==========================================
//  WINDOW RESIZE HANDLER
// ==========================================

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});

// ==========================================
//  PAGE LOAD INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔴 Red Team Portfolio Loaded Successfully');
    console.log('Ready to dominate the cybersecurity landscape!');

    // Add loading animation
    document.body.style.opacity = '1';
});

// ==========================================
//  DOWNLOAD RESUME FUNCTIONALITY
// ==========================================

document.querySelectorAll('a[download]').forEach((link) => {
    link.addEventListener('click', () => {
        showNotification('Downloading resume... 📥', 'success');
    });
});

// ==========================================
//  MATRIX RAIN TEXT EFFECT (Optional Background Enhancement)
// ==========================================

const matrixRain = document.querySelector('.matrix-rain');

function createMatrixCharacter() {
    const characters = '01アカサタナハマヤラワガザダバパ';
    const char = characters[Math.floor(Math.random() * characters.length)];
    return char;
}

// You can enhance this further if needed

// ==========================================
//  ERROR HANDLING
// ==========================================

window.addEventListener('error', (event) => {
    console.error('Error occurred:', event.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// ==========================================
//  END OF SCRIPT
// ========================================== 
