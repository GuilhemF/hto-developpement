//import { initLocomotiveScroll } from "./modules/locomotive.js";
import { initPageTransitions } from "./modules/page-transition.js";
import { initLoader } from "./modules/loader.js";
import { logger } from "./modules/logger.js";
import setupNav from "./modules/nav.js";

class App {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  async init() {
    // N'exécuter qu'une seule fois
    if (this.isInitialized) return;

    try {
      // Logger une seule fois
      logger.sayHello();

      setupNav();

      // Initialiser le loader pour la première visite
      await initLoader();

      // // Initialiser Locomotive Scroll
      // initLocomotiveScroll();

      // // Initialiser les transitions
      initPageTransitions();

      this.isInitialized = true;

      // Écouter les changements de page Astro
      this.setupAstroListeners();
    } catch (error) {
      console.error("Erreur lors de l'initialisation:", error);
    }
  }

  setupAstroListeners() {
    // Réinitialiser certains modules sur les nouvelles pages
    document.addEventListener("astro:page-load", () => {
      // Ne pas réinitialiser le loader ni le logger
      // Seulement ce qui doit être réinitialisé
      //initLocomotiveScroll();
    });
  }
}

// Point d'entrée unique
const app = new App();
