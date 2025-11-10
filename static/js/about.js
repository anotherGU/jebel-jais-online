document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) navbar.classList.add("loaded");

  // 🔹 При скролле добавляем класс .scrolled
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });

  // 🔹 Mobile menu logic
  const burgerMenu = document.getElementById("burger-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");

  function toggleMobileMenu() {
    burgerMenu.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  function closeMobileMenu() {
    burgerMenu.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (burgerMenu && mobileMenu && mobileMenuClose) {
    burgerMenu.addEventListener("click", toggleMobileMenu);
    mobileMenuClose.addEventListener("click", closeMobileMenu);

    document
      .querySelectorAll(".mobile-nav-link")
      .forEach((link) => link.addEventListener("click", closeMobileMenu));

    const mobileBookBtn = document.querySelector(".mobile-book-now-btn");
    if (mobileBookBtn) {
      mobileBookBtn.addEventListener("click", () => {
        closeMobileMenu();
        window.location.href = "/";
      });
    }

    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMobileMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) closeMobileMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("active"))
        closeMobileMenu();
    });
  }
});
