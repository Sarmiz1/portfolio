document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobileMenu");
  const btn = document.getElementById("menu-toggle");
  const themeBtn = document.getElementById("theme-toggle");
  const typingEl = document.querySelector(".typing");

  /* MOBILE MENU */
  if (menu && btn) {
    btn.onclick = () => menu.classList.toggle("show");

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.onclick = () => menu.classList.remove("show");
    });
  }

  /* THEME SWITCH + PARTICLES */
  function createParticles(x, y) {
    const container = document.getElementById("particles");
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      container.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 60 + 20;

      p.style.left = x + "px";
      p.style.top = y + "px";

      p.animate([
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`, opacity: 0 }
      ], { duration: 600 });

      setTimeout(() => p.remove(), 600);
    }
  }

  if (themeBtn) {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }

    themeBtn.onclick = () => {
      const rect = themeBtn.getBoundingClientRect();

      createParticles(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    };
  }

  /* TYPING */
  if (typingEl) {
    const words = ["Frontend Developer", "UI Engineer", "React Builder"];
    let i = 0, j = 0, del = false;

    function type() {
      const w = words[i];
      typingEl.textContent = w.substring(0, j);

      if (!del) {
        j++;
        if (j > w.length) {
          del = true;
          return setTimeout(type, 1200);
        }
      } else {
        j--;
        if (j === 0) {
          del = false;
          i = (i + 1) % words.length;
        }
      }

      setTimeout(type, del ? 50 : 90);
    }

    type();
  }

  /* CAROUSEL (WORKING) */
  const track = document.querySelector(".journey-track");
  const next = document.querySelector(".journey-next");
  const prev = document.querySelector(".journey-prev");

  if (track) {
    let pos = 0;
    const step = 320;

    function update() {
      track.style.transform = `translateX(${pos}px)`;
    }

    next?.onclick = () => {
      pos -= step;
      const max = track.scrollWidth - track.parentElement.clientWidth;
      if (Math.abs(pos) > max) pos = -max;
      update();
    };

    prev?.onclick = () => {
      pos += step;
      if (pos > 0) pos = 0;
      update();
    };
  }
});
