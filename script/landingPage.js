// Initialize Lucide icons
lucide.createIcons();

// Smooth scroll for navigation links with offset for fixed navbar
document
  .querySelectorAll('a[href^="#"]')
  .forEach((anchor) => {
    anchor.addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        const target = document.querySelector(
          this.getAttribute("href")
        );
        const navbarHeight =
          document.querySelector(
            ".navbar"
          ).offsetHeight;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight -
          20;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    );
  });
