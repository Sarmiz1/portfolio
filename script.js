// ================= OFFSET SCROLL FIX =================
const navHeight = document.querySelector(".navbar").offsetHeight;

document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const offsetTop = target.offsetTop - navHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  });
});

// ================= SCROLL ANIMATION =================
const sections = document.querySelectorAll(".section");

function revealSections() {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections();

// ================= ACTIVE NAV =================
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const top = sec.offsetTop - navHeight;
    if (scrollY >= top) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ================= MOBILE MENU =================
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// ================= TYPING EFFECT =================
const text = ["Frontend Developer", "React Specialist", "UI Enthusiast"];
let i = 0, j = 0;
const typingEl = document.querySelector(".typing");

function type() {
  if (j < text[i].length) {
    typingEl.innerHTML += text[i].charAt(j);
    j++;
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (j > 0) {
    typingEl.innerHTML = text[i].substring(0, j - 1);
    j--;
    setTimeout(erase, 40);
  } else {
    i = (i + 1) % text.length;
    setTimeout(type, 300);
  }
}

type();