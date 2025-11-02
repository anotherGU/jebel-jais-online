document.addEventListener("DOMContentLoaded", () => {
  // Fade-in sections
  const sections = document.querySelectorAll(".animate-in");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  sections.forEach(s => io.observe(s));

  // TOC scroll spy
  const links = Array.from(document.querySelectorAll(".toc-link"));
  const targets = links.map(l => document.querySelector(l.getAttribute("href")));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const id = "#" + e.target.id;
      const a = document.querySelector(`.toc-link[href="${id}"]`);
      if (!a) return;
      if (e.isIntersecting) {
        links.forEach(x => x.classList.remove("active"));
        a.classList.add("active");
      }
    });
  }, { threshold: 0.6 });
  targets.forEach(t => t && spy.observe(t));

  // Smooth scroll for toc
  links.forEach(a => {
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      const el = document.querySelector(a.getAttribute("href"));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Reading progress
  const progress = document.getElementById("reading-progress");
  const article = document.querySelector(".article-content");
  const onScroll = () => {
    const doc = document.documentElement;
    const total = (article.offsetTop + article.scrollHeight) - window.innerHeight;
    const current = window.scrollY;
    const pct = Math.max(0, Math.min(100, (current / total) * 100));
    progress.style.width = pct + "%";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
});
