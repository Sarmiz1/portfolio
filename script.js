// MOBILE MENU TOGGLE
const menu = document.getElementById("mobileMenu");
const btn = document.getElementById("menu-toggle");

btn.addEventListener("click", e => {
  e.stopPropagation();
  menu.classList.toggle("show");
});

menu.addEventListener("click", e => {
  if (e.target === menu) menu.classList.remove("show");
});

document.querySelectorAll(".mobile-menu a").forEach(a => {
  a.addEventListener("click", () => menu.classList.remove("show"));
});

// DARK MODE
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// SMOOTH SCROLL
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// SECTION REVEAL & ACTIVE NAV
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (pageYOffset >= section.offsetTop - 150) current = section.id;
  });
  navLinks.forEach(link => link.classList.remove("active"));
  document.querySelectorAll(`.nav-links a[href="#${current}"]`).forEach(link => link.classList.add("active"));
});

// TYPING EFFECT
const words = ["Frontend Developer", "UI Engineer", "React Builder", "TailwindCSS Expert"];
let i = 0, j = 0;
const el = document.querySelector(".typing");

function type() {
  if (!el) return;
  if (j < words[i].length) {
    el.textContent += words[i][j++];
    setTimeout(type, 60);
  } else setTimeout(erase, 1200);
}

function erase() {
  if (!el) return;
  if (j > 0) {
    el.textContent = words[i].substring(0, --j);
    setTimeout(erase, 25);
  } else {
    i = (i + 1) % words.length;
    setTimeout(type, 300);
  }
}

type();