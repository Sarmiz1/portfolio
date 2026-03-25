document.addEventListener("DOMContentLoaded", () => {
  /* ================= ELEMENTS ================= */
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

  /* ================= DARK MODE ================= */
  if (themeBtn) {
    // load saved theme
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      themeBtn.innerText = "☀️";
    }

    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");

      themeBtn.innerText = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }


  /* ================= SMOOTH SCROLL (ANCHOR) ================= */
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
  const updateActiveLinks = () => {
    let current = "";

    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
    });

    [...navLinks, ...mobileLinks].forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  };

  window.addEventListener("scroll", updateActiveLinks);
  updateActiveLinks();

  /* ================= SECTION FADE ================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.15 });

  sections.forEach(sec => observer.observe(sec));

  /* ================= TYPING ================= */
  if (typingEl) {
    const words = ["Frontend Developer", "UI Engineer", "React Builder"];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const currentWord = words[wordIndex];

      // ✅ SET TEXT FIRST (no premature increment)
      typingEl.textContent = currentWord.substring(0, charIndex);

      if (!deleting) {
        charIndex++;

        // ✅ FULL WORD REACHED
        if (charIndex > currentWord.length) {
          deleting = true;
          setTimeout(type, 1200); // pause before deleting
          return;
        }
      } else {
        charIndex--;

        // ✅ WORD FULLY DELETED
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(type, deleting ? 50 : 90);
    }

    type();
  }


  /* ================= GSAP GLOBAL SCROLL (FRAMER FEEL) ================= */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth subtle page motion
    gsap.utils.toArray(".section").forEach(section => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 60%",
            scrub: 1, //  THIS gives framer smoothness
          }
        }
      );
    });
  }

  /* ================= STORY GSAP (SMOOTH + PREMIUM) ================= */

  /* ================= STORY GSAP (DIRECTION CONSISTENT) ================= */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".story-block").forEach((block) => {
      const img = block.querySelector("img");
      const text = block.querySelector("p");

      const dir = block.classList.contains("reverse") ? 1 : -1;

      // 🔥 INITIAL STATE (this defines BOTH entry & exit direction)
      gsap.set(img, {
        opacity: 0,
        x: 40 * dir
      });

      gsap.set(text, {
        opacity: 0,
        x: -25 * dir
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: "top 75%",
          end: "bottom 30%",

          //  KEY: proper reverse behavior
          toggleActions: "play none none reverse"
        }
      });

      // ENTRY
      tl.to(img, {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      tl.to(
        text,
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out"
        },
        "-=0.8"
      );
    });
  }


  /* ================= JOURNEY CAROUSEL (FIXED REAL LOOP + DRAG) ================= */

  function initJourneyCarousel() {
    const track = document.querySelector(".journey-track");
    const carousel = document.querySelector(".journey-carousel");
    const nextBtn = document.querySelector(".journey-next");
    const prevBtn = document.querySelector(".journey-prev");

    if (!track || !carousel) return;

    // duplicate slides for seamless loop
    track.innerHTML += track.innerHTML;

    let pos = 0;
    let speed = 0.25;
    let paused = false;
    let isAnimating = false;

    const slideWidth = 340; // card width + gap

    function autoScroll() {
      if (!paused && !isAnimating) {
        pos -= speed;

        if (Math.abs(pos) >= track.scrollWidth / 2) {
          pos = 0;
        }

        track.style.transform = `translate3d(${pos}px,0,0)`;
      }

      requestAnimationFrame(autoScroll);
    }

    autoScroll();

    function slideTo(newPos) {
      isAnimating = true;
      paused = true;

      track.style.transition = "transform 0.5s ease";
      track.style.transform = `translate3d(${newPos}px,0,0)`;

      pos = newPos;

      setTimeout(() => {
        track.style.transition = "none";
        isAnimating = false;
        paused = false;
      }, 500);
    }

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", () => {
        slideTo(pos - slideWidth);
      });

      prevBtn.addEventListener("click", () => {
        slideTo(pos + slideWidth);
      });
    }

    carousel.addEventListener("mouseenter", () => (paused = true));
    carousel.addEventListener("mouseleave", () => (paused = false));
  }

  initJourneyCarousel();

});