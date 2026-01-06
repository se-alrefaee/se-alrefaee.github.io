// Scroll reveal
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => observer.observe(el));

// Cursor progress
const cursor = document.getElementById("cursor-progress");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  cursor.style.transform = `translate(-50%, -50%) scale(${
    0.6 + progress * 0.6
  })`;
});
