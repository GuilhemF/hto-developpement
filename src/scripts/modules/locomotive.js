let locomotiveInstance = null;

export function initLocomotiveScroll() {
  // Détruire l'instance précédente si elle existe
  if (locomotiveInstance) {
    locomotiveInstance.destroy();
  }

  // Dynamically import Locomotive Scroll
  import("locomotive-scroll")
    .then(({ default: LocomotiveScroll }) => {
      locomotiveInstance = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        smartphone: {
          smooth: true,
        },
        tablet: {
          smooth: true,
        },
      });

      // Mise à jour sur resize
      window.addEventListener("resize", () => {
        if (locomotiveInstance) {
          locomotiveInstance.update();
        }
      });
    })
    .catch((error) => {
      console.warn("Locomotive Scroll non disponible:", error);
    });
}

export function destroyLocomotiveScroll() {
  if (locomotiveInstance) {
    locomotiveInstance.destroy();
    locomotiveInstance = null;
  }
}
