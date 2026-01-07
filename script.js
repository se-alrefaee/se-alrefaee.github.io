// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update active state
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Resume link helper (moved from inline onclick)
const resumeLink = document.getElementById("resume-link");
if (resumeLink) {
  resumeLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "To add your resume:\n\n1. Create a PDF file named resume.pdf\n2. Upload it to your GitHub repository in the same folder as index.html\n3. The link will work automatically!"
    );
  });
}

// Update active nav item on scroll
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll('.nav-item[href^="#"]');

const observerOptions = {
  threshold: 0.3,
  rootMargin: "-20% 0px -70% 0px",
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${id}`) {
          item.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
