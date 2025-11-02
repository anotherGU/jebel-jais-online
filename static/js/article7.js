document.addEventListener("DOMContentLoaded", () => {
  /* === Reveal on scroll === */
  const revealItems = document.querySelectorAll(".a7-section");
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

  /* === Safety meter animation === */
  const meter = document.querySelector(".m-fill");
  const meterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && meter) {
          const width = meter.getAttribute("data-width");
          meter.style.width = width + "%";
        }
      });
    },
    { threshold: 0.4 }
  );
  if (meter) meterObserver.observe(meter);

  /* === FAQ accordion === */
  const accBtns = document.querySelectorAll(".acc-btn");
  accBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const open = panel.style.display === "block";

      // Close all open panels
      document
        .querySelectorAll(".acc-panel")
        .forEach((p) => (p.style.display = "none"));

      // Open selected if not already open
      if (!open) panel.style.display = "block";
    });
  });
});
