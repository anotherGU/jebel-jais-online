document.addEventListener("DOMContentLoaded", () => {
  // Reveal on scroll
  const blocks = document.querySelectorAll(".a2-block");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  blocks.forEach(b => io.observe(b));
});
