document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobileMenu");
  const btn = document.getElementById("menu-toggle");
  const themeBtn = document.getElementById("theme-toggle");
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const typingEl = document.querySelector(".typing");

  /* ================= MOBILE MENU ================= */
  if (menu && btn) {
    btn.addEventListener("click", () => menu.classList.toggle("show"));

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("show"));
    });

    menu.addEventListener("click", e => {
      if (e.target === menu) menu.classList.remove("show");
    });
  }

  /* ================= THEME + PARTICLES ================= */
  const particlesContainer = document.getElementById("particles");

  function createParticles(x, y) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      particlesContainer.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 60 + 20;

      gsap.set(p, { left: x, top: y });

      gsap.to(p, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        opacity: 0,
        duration: 0.8,
        onComplete: () => p.remove()
      });
    }
  }

  if (themeBtn) {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.body.classList.add("dark");

    themeBtn.addEventListener("click", (e) => {
      const rect = themeBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      const knob = themeBtn.querySelector(".knob");

      gsap.to(knob, {
        x: isDark ? 30 : 0,
        duration: 0.6,
        ease: "elastic.out(1,0.6)"
      });

      createParticles(x, y);
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

  /* ================= FADE SECTIONS ================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  sections.forEach(s => observer.observe(s));

  /* ================= TYPING ================= */
  if (typingEl) {
    const words = ["Frontend Developer", "UI Engineer", "React Builder"];

    let i = 0, j = 0, deleting = false;

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

  /* ================= GSAP SCROLL ================= */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".section").forEach(section => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            scrub: 0.5
          }
        }
      );
    });

    /* STORY */
    gsap.utils.toArray(".story-block").forEach(block => {
      const img = block.querySelector("img");
      const text = block.querySelector("p");

      const dir = block.classList.contains("reverse") ? 1 : -1;

      gsap.set([img, text], { opacity: 0, x: 40 * dir });

      gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
        .to(img, { opacity: 1, x: 0, duration: 1 })
        .to(text, { opacity: 1, x: 0, duration: 1 }, "-=0.6");
    });
  }

  /* ================= FIXED JOURNEY CAROUSEL (NO OVERFLOW) ================= */

  function initJourneyCarousel() {
    const track = document.querySelector(".journey-track");
    const carousel = document.querySelector(".journey-carousel");
    const nextBtn = document.querySelector(".journey-next");
    const prevBtn = document.querySelector(".journey-prev");

    if (!track || !carousel) return;

    let pos = 0;
    const speed = 0.3;
    let paused = false;

    const slideWidth = 320;

    function animate() {
      if (!paused) {
        pos -= speed;

        const maxScroll = track.scrollWidth;

        if (Math.abs(pos) > maxScroll - window.innerWidth) {
          pos = 0; // safe reset (NO duplication needed)
        }

        track.style.transform = `translateX(${pos}px)`;
      }

      requestAnimationFrame(animate);
    }

    animate();

    function move(amount) {
      pos += amount;
      track.style.transition = "transform 0.4s ease";
      track.style.transform = `translateX(${pos}px)`;

      setTimeout(() => {
        track.style.transition = "none";
      }, 400);
    }

    nextBtn?.addEventListener("click", () => move(-slideWidth));
    prevBtn?.addEventListener("click", () => move(slideWidth));

    carousel.addEventListener("mouseenter", () => paused = true);
    carousel.addEventListener("mouseleave", () => paused = false);
  }

  initJourneyCarousel();
});