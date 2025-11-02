document.addEventListener("DOMContentLoaded", () => {
  // Reveal on scroll for sections
  const sections = document.querySelectorAll(".a5-section, .a5-step");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach((s) => io.observe(s));

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
