// ============ NAVIGATION ============
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');

// Smooth scroll navigation
window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
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

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============ SMOOTH SCROLL ============
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

// ============ FORM SUBMISSION ============
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    showNotification('Message sent successfully! 🎯', 'success');
    form.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#f5f5f5' : '#f5f5f5'};
        border-left: 4px solid ${type === 'success' ? '#00aa00' : '#dc143c'};
        color: ${type === 'success' ? '#00aa00' : '#dc143c'};
        border-radius: 4px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.4s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ============ ANIMATIONS ============
const style = document.createElement('style');
style.textContent = `
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

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and elements
document.querySelectorAll('.project-card, .skill-category, .highlight-item, .contact-method').forEach((el, index) => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============ PARALLAX EFFECT ============
document.addEventListener('mousemove', (e) => {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg && window.innerWidth > 768) {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 10;
        profileImg.style.transform = `scale(1.02) translate(${moveX}px, ${moveY}px)`;
    }
});

// ============ ACCESSIBILITY ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ============ PERFORMANCE ============
console.log('%c🔴 RED TEAM OPERATOR ACTIVATED 🔴', 'color: #dc143c; font-size: 16px; font-weight: bold;');
console.log('%cExploit • Execute • Dominate', 'color: #888888; font-size: 12px;');
