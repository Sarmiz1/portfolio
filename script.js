// close when clicking outside menu content

const menu = document.getElementById("mobileMenu");
const btn = document.getElementById("menu-toggle");

btn.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("show");
});

// close when clicking link
document.querySelectorAll(".mobile-menu a").forEach(a => {
  a.addEventListener("click", () => {
    menu.classList.remove("show");
  });
});

// close when clicking outside menu content
menu.addEventListener("click", (e) => {
  if (e.target === menu) {
    menu.classList.remove("show");
  }
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

// FADE ON SCROLL
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

// TYPING EFFECT
const words = ["Frontend Developer", "UI Engineer", "React Builder", "TalwindCss Expert"];
let i = 0;
let j = 0;

const el = document.querySelector(".typing");

function type() {
  if (!el) return;

  if (j < words[i].length) {
    el.textContent += words[i][j++];
    setTimeout(type, 60);
  } else {
    setTimeout(erase, 1200);
  }
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