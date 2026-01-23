/* ==========================================
RED TEAM CYBERSECURITY PORTFOLIO
Enhanced JavaScript Functionality with Animations
========================================== */

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
// ARSENAL TABS FUNCTIONALITY
// ==========================================

const arsenalTabButtons = document.querySelectorAll('.arsenal-tab-btn');
const arsenalTabContents = document.querySelectorAll('.arsenal-tab-content');

arsenalTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons
        arsenalTabButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all tab contents
        arsenalTabContents.forEach(content => {
            content.classList.remove('active');
            content.style.animation = 'fadeOut 0.3s ease-out';
        });
        
        // Show selected tab content
        const selectedTab = document.getElementById(`${tabName}-tab`);
        if (selectedTab) {
            selectedTab.classList.add('active');
            selectedTab.style.animation = 'fadeIn 0.4s ease-out';
        }
    });
});

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

// ==========================================
// RESUME MODAL FUNCTIONALITY
// ==========================================

const viewResumeBtn = document.getElementById('viewResumeBtn');
const resumeModal = document.getElementById('resumeModal');
const resumeModalClose = document.querySelector('.resume-modal-close');

// Open resume modal
viewResumeBtn?.addEventListener('click', () => {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close resume modal
resumeModalClose?.addEventListener('click', () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
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

// Add animation styles for notifications
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

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
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
        'contactForm',
        'viewResumeBtn',
        'resumeModal'
    ];

    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`✓ ${id} found and initialized`);
        }
    });

    console.log('✓ Portfolio initialization complete');
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
    detectTheme: detectTheme
};

console.log('Portfolio JavaScript loaded. Access debug functions via window.PortfolioDebug');
console.log('Available features: Navigation, Arsenal Tabs, Resume Modal, Form Validation, Animations, Theme Detection');
