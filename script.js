// ========== ADVANCED SCROLL ANIMATIONS WITH FOCUS EFFECT ==========
class ScrollAnimationController {
    constructor() {
        this.items = document.querySelectorAll('.scroll-item');
        this.observerOptions = {
            threshold: [0, 0.5, 1],
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const rect = entry.target.getBoundingClientRect();
                const windowCenter = window.innerHeight / 2;
                const elementCenter = rect.top + rect.height / 2;
                const distance = Math.abs(elementCenter - windowCenter);
                const maxDistance = window.innerHeight;
                
                // Calculate focus based on how close element is to center
                const focusFactor = Math.max(0, 1 - (distance / maxDistance));
                
                if (focusFactor > 0.5) {
                    // Element is in focus zone (close to center)
                    entry.target.classList.remove('fade-out');
                    entry.target.classList.add('active');
                } else if (entry.isIntersecting) {
                    // Element is visible but not in focus
                    entry.target.classList.remove('active');
                    if (rect.top > window.innerHeight) {
                        entry.target.classList.add('fade-out');
                    }
                } else {
                    // Element is out of view
                    entry.target.classList.remove('active');
                    if (rect.top < 0) {
                        entry.target.classList.add('fade-out');
                    }
                }
            });
        }, this.observerOptions);

        this.items.forEach(el => {
            this.observer.observe(el);
        });

        // Listen to scroll for continuous updates
        window.addEventListener('scroll', () => this.updateFocus(), { passive: true });
    }

    updateFocus() {
        this.items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const windowCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - windowCenter);
            const maxDistance = window.innerHeight;
            
            const focusFactor = Math.max(0, 1 - (distance / maxDistance));
            
            if (focusFactor > 0.5) {
                item.classList.remove('fade-out');
                item.classList.add('active');
            } else if (rect.top > -200 && rect.bottom < window.innerHeight + 200) {
                item.classList.remove('active');
                item.classList.add('fade-out');
            }
        });
    }
}

// ========== SMOOTH SCROLL NAVIGATION ==========
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.updateActiveLink(targetId);
                }
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLinkOnScroll(), { passive: true });
    }

    updateActiveLink(targetId) {
        this.links.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection) {
            this.updateActiveLink(`#${currentSection}`);
        }
    }
}

// ========== NAVBAR SCROLL EFFECT ==========
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('nav');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }
}

// ========== PARALLAX EFFECT ==========
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.decorations = document.querySelectorAll('.hero-decoration');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            this.decorations.forEach((deco, index) => {
                const speed = (index + 1) * 0.3;
                deco.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }
}

// ========== STAGGER ANIMATIONS FOR GRIDS ==========
class StaggerAnimation {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .experience-item, .edu-card');
        
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// ========== INTERSECTION OBSERVER FOR GRID ITEMS ==========
class GridAnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll(
            '.project-card, .skill-category, .experience-item, .edu-card'
        );

        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);

        cards.forEach(card => {
            observer.observe(card);
        });
    }
}

// ========== INITIALIZE ALL ON DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all controllers
    new ScrollAnimationController();
    new SmoothScroll();
    new NavbarScroll();
    new ParallaxEffect();
    new GridAnimationObserver();

    // Add smooth animation on page load
    document.body.style.opacity = '1';
});

// ========== PERFORMANCE OPTIMIZATION - THROTTLE SCROLL ==========
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to performance-critical scroll events
window.addEventListener('scroll', throttle(() => {
    // Any scroll-dependent updates here
}, 16), { passive: true });

// ========== PRELOAD ANIMATIONS TRIGGER ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
}, { once: true });
