// /src/components/NavClient.jsx
export default function NavClient() {
  if (typeof window === "undefined") return null;

  const hamburger = document.querySelector(".hamburger");
  const icon = hamburger?.querySelector(".icon");
  const nav = document.querySelector("header nav");
  const header = document.getElementById("header");

  if (!hamburger || !icon || !nav || !header) return null;

  let isOpen = false;
  let lastScrollPosition = 0;

  function open() {
    isOpen = true;
    nav.classList.add("show-nav");
    document.documentElement.style.overflow = "hidden";
    icon.textContent = "✕";
    hamburger.setAttribute("aria-expanded", "true");
  }

  function close() {
    isOpen = false;
    nav.classList.remove("show-nav");
    document.documentElement.style.overflow = "";
    icon.textContent = "☰";
    hamburger.setAttribute("aria-expanded", "false");
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function handleScroll() {
    const currentY = window.pageYOffset;

    if (currentY >= 100) {
      header.classList.add("is-small");
    } else {
      header.classList.remove("is-small");
    }

    if (currentY >= window.innerHeight && lastScrollPosition < currentY) {
      header.classList.add("is-hidden");
    } else {
      header.classList.remove("is-hidden");
    }

    lastScrollPosition = currentY;
  }

  hamburger.addEventListener("click", toggle);
  window.addEventListener("scroll", handleScroll);

  return null;
}
