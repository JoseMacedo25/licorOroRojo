function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(err => {
      console.error("Error al copiar el texto: ", err);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = Array.from(document.querySelectorAll(".navbar a[href^='#']"));
  const menuCheckbox = document.getElementById("menu");
  const navbar = document.querySelector(".navbar");

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              const id = entry.target.id;
              const menuLink = document.querySelector(`.navbar a[href="#${id}"]`);
              menuLink.classList.add("selected");
          } else {
              const menuLink = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
              menuLink.classList.remove("selected");
          }
      });
  }, { rootMargin: "-30% 0px -70% 0px" });

  menuLinks.forEach((menuLink) => {
      const hash = menuLink.getAttribute("href");
      const target = document.querySelector(hash);
      if (target) {
          observer.observe(target);
      }

      // Add event listener to close the menu when a link is clicked
      menuLink.addEventListener('click', () => {
          // Add the slow transition class
          navbar.classList.add("slow-transition");
          menuCheckbox.checked = false;

          // Remove the slow transition class after 1s to reset for the next open
          setTimeout(() => {
              navbar.classList.remove("slow-transition");
          }, 1000);
      });
  });

  const headerBk = document.querySelector('.header-bk');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (headerBk && !prefersReducedMotion.matches) {
      let ticking = false;

      const updateParallax = () => {
          const offset = window.scrollY;
          headerBk.style.backgroundPosition = `center 0px, center ${offset * -0.3}px`;
          ticking = false;
      };

      const handleScroll = () => {
          if (!ticking) {
              window.requestAnimationFrame(updateParallax);
              ticking = true;
          }
      };

      updateParallax();
      window.addEventListener('scroll', handleScroll);

      prefersReducedMotion.addEventListener('change', (event) => {
          if (event.matches) {
              headerBk.style.removeProperty('background-position');
              window.removeEventListener('scroll', handleScroll);
          } else {
              updateParallax();
              window.addEventListener('scroll', handleScroll);
          }
      });
  }
  });
