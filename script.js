// ==========================================
// NAVIGATION & MOBILE MENU
// ==========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        updateActiveLink(link);
    });
});

// ==========================================
// ACTIVE LINK HIGHLIGHTING
// ==========================================

function updateActiveLink(currentLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    currentLink.classList.add('active');
}

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = [
        { id: 'home', element: document.getElementById('home') },
        { id: 'about', element: document.getElementById('about') },
        { id: 'projects', element: document.getElementById('projects') },
        { id: 'skills', element: document.getElementById('skills') },
        { id: 'contact', element: document.getElementById('contact') }
    ];

    sections.forEach(({ id, element }) => {
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
                current = id;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// DARK MODE / LIGHT MODE
// ==========================================

function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
    } else {
        document.documentElement.setAttribute('data-color-scheme', 'light');
    }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
    } else {
        document.documentElement.setAttribute('data-color-scheme', 'light');
    }
});

initializeTheme();

// ==========================================
// FORM HANDLING
// ==========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            console.log('Form submitted:', { name, email, message });
            
            // Reset form
            contactForm.reset();
            
            // Show success message (optional)
            const btn = contactForm.querySelector('.btn-primary');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        }
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .cert-item').forEach(element => {
    observer.observe(element);
});

// ==========================================
// CURSOR EFFECTS (Disabled - not using moving cursor)
// ==========================================

// Custom cursor tracking is disabled for better UX
// Users can enable by uncommenting below if desired

/*
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', (e) => {
    if (cursorDot) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    }
    
    if (cursorRing) {
        cursorRing.style.left = (e.clientX - 16) + 'px';
        cursorRing.style.top = (e.clientY - 16) + 'px';
    }
});

document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        if (cursorRing) cursorRing.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
        if (cursorRing) cursorRing.classList.remove('active');
    }
});
*/

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Get element safe selector
function $(selector) {
    return document.querySelector(selector);
}

// Get all elements
function $$(selector) {
    return document.querySelectorAll(selector);
}

// Add event listener to multiple elements
function addEventListenerToAll(selector, event, callback) {
    $$(selector).forEach(element => {
        element.addEventListener(event, callback);
    });
}

// Log app initialization
console.log('Portfolio loaded and ready!');
console.log('View portfolio on: http://localhost:3000');
