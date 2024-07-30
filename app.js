const menuLinks = Array.from(document.querySelectorAll(".navbar a[href^='#']"));

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
});