document.addEventListener("DOMContentLoaded", () => {
  /* === Reveal on scroll for sections === */
  const revealItems = document.querySelectorAll(".a6-section");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((s) => io.observe(s));

  /* === Fill price bars when visible === */
  const bars = document.querySelectorAll(".b-fill");
  const barsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute("data-width");
          bar.style.width = width + "%";
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((b) => barsObserver.observe(b));

  /* === FAQ accordion === */
  const accBtns = document.querySelectorAll(".acc-btn");
  accBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const open = panel.style.display === "block";

      // Close all
      document
        .querySelectorAll(".acc-panel")
        .forEach((p) => (p.style.display = "none"));

      if (!open) panel.style.display = "block";
    });
  });
});
