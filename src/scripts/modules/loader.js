let hasLoaded = false;

export function initLoader() {
  return new Promise((resolve) => {
    const loader = document.querySelector(".loader");
    if (!loader) {
      resolve();
      return;
    }
    // Ne charger qu'une seule fois par session
    if (hasLoaded || sessionStorage.getItem("site-loaded")) {
      loader.remove();
      resolve();
      return;
    }

    // Animation du loader
    setTimeout(() => {
      loader.classList.add("fade-out");

      setTimeout(() => {
        loader.remove();
        hasLoaded = true;
        sessionStorage.setItem("site-loaded", "true");
        resolve();
      }, 500);
    }, 1000);
  });
}
