document.addEventListener("DOMContentLoaded", () => {
  // Reveal on scroll
  const sections = document.querySelectorAll(".a4-section");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((s) => io.observe(s));

  // Animate price bars when visible
  const bars = document.querySelectorAll(".b-fill");
  const bo = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = e.target;
          const w = target.getAttribute("data-width") || 0;
          requestAnimationFrame(() => {
            target.style.width = w + "%";
          });
          bo.unobserve(target);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => bo.observe(b));

  // Simple accordion
  const btns = document.querySelectorAll(".acc-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const open = panel.style.display === "block";
      document
        .querySelectorAll(".acc-panel")
        .forEach((p) => (p.style.display = "none"));
      if (!open) panel.style.display = "block";
    });
  });
});
