// ============ CUSTOM CURSOR ============
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    const cursorRing = document.querySelector('.cursor-ring');

    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    cursorRing.style.left = (e.clientX - 16) + 'px';
    cursorRing.style.top = (e.clientY - 16) + 'px';
});

// Cursor interactions
document.addEventListener('mousedown', () => {
    document.querySelector('.cursor').classList.add('active');
    document.querySelector('.cursor-ring').classList.add('active');
});

document.addEventListener('mouseup', () => {
    document.querySelector('.cursor').classList.remove('active');
    document.querySelector('.cursor-ring').classList.remove('active');
});

// Interactive elements cursor change
const interactiveElements = document.querySelectorAll('button, a, .project-card, .skill-badge, input, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.querySelector('.cursor').classList.add('active');
        document.querySelector('.cursor-ring').classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        document.querySelector('.cursor').classList.remove('active');
        document.querySelector('.cursor-ring').classList.remove('active');
    });
});

// ============ NAVIGATION ============
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
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

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
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

// ============ FORM VALIDATION ============
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

    // Here you would send the form data to your backend
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
        padding: 15px 25px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'};
        border: 2px solid ${type === 'success' ? '#00ff00' : '#FF0000'};
        color: ${type === 'success' ? '#00ff00' : '#FF0000'};
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-weight: bold;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 0 20px ${type === 'success' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)'};
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

// ============ PARALLAX EFFECT (ADVANCED) ============
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        const moveX = mouseX * (index + 1) * 20;
        const moveY = mouseY * (index + 1) * 20;
        orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .spec-box').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============ KEYBOARD ACCESSIBILITY ============
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    }

    // TAB through interactive elements
    if (e.key === 'Tab') {
        const cursor = document.querySelector('.cursor');
        const cursorRing = document.querySelector('.cursor-ring');
        cursor.classList.add('active');
        cursorRing.classList.add('active');
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key !== 'Tab') {
        const cursor = document.querySelector('.cursor');
        const cursorRing = document.querySelector('.cursor-ring');
        cursor.classList.remove('active');
        cursorRing.classList.remove('active');
    }
});

// ============ PERFORMANCE OPTIMIZATION ============
let ticking = false;

function updateCursorPosition(e) {
    const cursor = document.querySelector('.cursor');
    const cursorRing = document.querySelector('.cursor-ring');

    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    cursorRing.style.left = (e.clientX - 16) + 'px';
    cursorRing.style.top = (e.clientY - 16) + 'px';

    ticking = false;
}

window.addEventListener('mousemove', (e) => {
    if (!ticking) {
        requestAnimationFrame(() => updateCursorPosition(e));
        ticking = true;
    }
});

console.log('%c🔴 RED TEAM OPERATOR ACTIVATED 🔴', 'color: #FF0000; font-size: 20px; text-shadow: 0 0 10px #FF0000; font-weight: bold;');
console.log('%cExploit • Execute • Dominate', 'color: #00d4ff; font-size: 14px; font-weight: bold;');
