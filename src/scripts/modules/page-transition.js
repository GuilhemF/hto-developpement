export function initPageTransitions() {
  // Réutilise ton code de transitions ici
  document.body.classList.add("page-loading");

  function handlePageEnter() {
    document.body.classList.remove("page-loading", "page-exit");
    document.body.classList.add("page-enter");

    setTimeout(() => {
      document.body.classList.remove("page-enter");
    }, 500);
  }

  function handlePageExit() {
    document.body.classList.add("page-exit");
  }

  document.addEventListener("DOMContentLoaded", handlePageEnter);
  document.addEventListener("astro:page-load", handlePageEnter);
  document.addEventListener("astro:before-preparation", handlePageExit);

  // Gestion des liens
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link.href && !link.href.startsWith("#") && !link.target) {
      const url = new URL(link.href);
      if (url.origin === window.location.origin) {
        handlePageExit();
      }
    }
  });
}

// // Alternative avec View Transitions API (pour les navigateurs compatibles)
// if ("startViewTransition" in document) {
//   // Utiliser l'API native si disponible
//   document.addEventListener("click", (e) => {
//     const link = e.target.closest("a");
//     if (link && link.href && !link.href.startsWith("#")) {
//       e.preventDefault();

//       document.startViewTransition(() => {
//         window.location = link.href;
//       });
//     }
//   });
// }
