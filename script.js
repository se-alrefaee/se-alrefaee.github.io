// Scroll reveal animation
const reveals = document.querySelectorAll(".reveal");

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);
    }
  });
}, observerOptions);

reveals.forEach((el) => observer.observe(el));

// Enhanced cursor progress with smooth following
const cursor = document.getElementById("cursor-progress");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const speed = 0.15;
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Scroll progress effect on cursor
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollTop / docHeight, 1);

  const scale = 0.8 + progress * 0.8;
  cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
});

// Interactive hover effects for project cards
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Parallax effect for gradient orbs
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const orbs = document.querySelectorAll(".gradient-orb");

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.5;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add interactive glow effect to cards on hover
const cards = document.querySelectorAll(
  ".project-card, .competition-item, .timeline-content, .skill-category"
);

cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 20px 60px rgba(0, 255, 136, 0.3)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.boxShadow = "";
  });
});

// Terminal typing effect
const terminalCommand = document.querySelector(
  ".terminal-line:nth-child(1) .command"
);
if (terminalCommand) {
  const text = terminalCommand.textContent;
  terminalCommand.textContent = "";
  let i = 0;

  setTimeout(() => {
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        terminalCommand.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        // Show output after typing completes
        setTimeout(() => {
          const output = document.querySelector(".terminal-line:nth-child(2)");
          if (output) {
            output.style.opacity = "0";
            output.style.display = "block";
            setTimeout(() => {
              output.style.transition = "opacity 0.5s ease";
              output.style.opacity = "1";
            }, 50);
          }
        }, 500);
      }
    }, 100);
  }, 1500);
}

// Add ripple effect on button clicks
const buttons = document.querySelectorAll(".nav-link, .footer-link");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple-effect");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 255, 136, 0.5);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Animate skill items on scroll
const skillItems = document.querySelectorAll(".skill-items span");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }, index * 50);
      }
    });
  },
  { threshold: 0.5 }
);

skillItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-20px)";
  item.style.transition = "all 0.5s ease";
  skillObserver.observe(item);
});

// Add floating animation to project icons
const projectIcons = document.querySelectorAll(".project-icon");

projectIcons.forEach((icon) => {
  icon.style.animation = "float 3s ease-in-out infinite";
});

// Add hover effect for competition flags
const flags = document.querySelectorAll(".flag");

flags.forEach((flag) => {
  flag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.2) rotate(10deg)";
    this.style.transition = "transform 0.3s ease";
  });

  flag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
  });
});

// Animate timeline dots on scroll
const timelineDots = document.querySelectorAll(".timeline-dot");

const dotObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "pulse 2s ease-in-out infinite";
      }
    });
  },
  { threshold: 0.8 }
);

timelineDots.forEach((dot) => {
  dotObserver.observe(dot);
});

// Add smooth reveal for sections
const sections = document.querySelectorAll(".section");

sections.forEach((section, index) => {
  section.style.animationDelay = `${index * 0.2}s`;
});

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("*").forEach((el) => {
    el.style.animation = "none";
    el.style.transition = "none";
  });
}

// Add intersection observer for performance
const performanceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.willChange = "transform, opacity";
    } else {
      entry.target.style.willChange = "auto";
    }
  });
});

document.querySelectorAll(".reveal").forEach((el) => {
  performanceObserver.observe(el);
});

console.log(
  "%c🔐 Welcome to Saif's Portfolio",
  "color: #00ff88; font-size: 20px; font-weight: bold;"
);
console.log(
  "%c🛡️ Cybersecurity · Offensive Security · Network Analysis",
  "color: #00d4ff; font-size: 14px;"
);
console.log(
  "%c💻 Built with passion for security",
  "color: #94a3b8; font-size: 12px;"
);
