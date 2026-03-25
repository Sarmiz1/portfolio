document.addEventListener("DOMContentLoaded", () => {
  /* ================= SAFE ELEMENT GET ================= */
  const menu = document.getElementById("mobileMenu");
  const btn = document.getElementById("menu-toggle");
  const themeBtn = document.getElementById("theme-toggle");
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const typingEl = document.querySelector(".typing");

  /* ================= MOBILE MENU ================= */
  if (menu && btn) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
      });
    });

    menu.addEventListener("click", e => {
      if (e.target === menu) {
        menu.classList.remove("show");
      }
    });
  }

  /* ================= THEME TOGGLE ================= */
  if (themeBtn) {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.body.classList.add("dark");

    themeBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      const knob = themeBtn.querySelector(".knob");

      if (knob && window.gsap) {
        gsap.to(knob, {
          x: isDark ? 30 : 0,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });
  }

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ================= ACTIVE NAV ================= */
  const updateActive = () => {
    let current = "";

    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 150) {
        current = sec.id;
      }
    });

    [...navLinks, ...mobileLinks].forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  };

  window.addEventListener("scroll", updateActive);
  updateActive();

  /* ================= TYPING EFFECT ================= */
  if (typingEl) {
    const words = ["Frontend Developer", "UI Engineer", "React Builder"];

    let i = 0;
    let j = 0;
    let deleting = false;

    function type() {
      const word = words[i];
      typingEl.textContent = word.substring(0, j);

      if (!deleting) {
        j++;
        if (j > word.length) {
          deleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        j--;
        if (j === 0) {
          deleting = false;
          i = (i + 1) % words.length;
        }
      }

      setTimeout(type, deleting ? 50 : 90);
    }

    type();
  }

  /* ================= GSAP SCROLL (CLEAN) ================= */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".section").forEach(section => {
      gsap.from(section, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

    /* STORY ANIMATION */
    gsap.utils.toArray(".story-block").forEach(block => {
      const img = block.querySelector("img");
      const text = block.querySelector("p");

      if (!img || !text) return;

      const dir = block.classList.contains("reverse") ? 1 : -1;

      gsap.set(img, { opacity: 0, x: 40 * dir });
      gsap.set(text, { opacity: 0, x: -40 * dir });

      gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })
        .to(img, {
          opacity: 1,
          x: 0,
          duration: 1
        })
        .to(text, {
          opacity: 1,
          x: 0,
          duration: 1
        }, "-=0.6");
    });
  }

  /* ================= CAROUSEL (NO OVERFLOW) ================= */
  function initCarousel() {
    const track = document.querySelector(".journey-track");
    const next = document.querySelector(".journey-next");
    const prev = document.querySelector(".journey-prev");

    if (!track) return;

    let pos = 0;
    const slideWidth = 300;

    function move(amount) {
      pos += amount;

      // LIMIT SCROLL (prevents overflow drifting)
      const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

      if (pos < -maxScroll) pos = -maxScroll;
      if (pos > 0) pos = 0;

      track.style.transform = `translateX(${pos}px)`;
    }

    next?.addEventListener("click", () => move(-slideWidth));
    prev?.addEventListener("click", () => move(slideWidth));
  }

  initCarousel();
});