import { useEffect } from "react";
import Swiper from "swiper";
import { Pagination, Navigation } from "swiper/modules";

Swiper.use([Pagination, Navigation]);

export default function SwiperClient({ selector = ".swiper", selectorNavigation = ".swiper-navigation", debug = false }) {
  useEffect(() => {
    requestAnimationFrame(() => {
      const container = document.querySelector(selector);

      if (debug) {
        console.log("🌀 SwiperClient mounted");
        console.log("🎯 Selector:", selector);
        console.log("📦 Found container:", container);
      }

      if (!container) {
        console.warn(`❌ Swiper container "${selector}" not found`);
        return;
      }

      new Swiper(selector, {
        loop: true,
        slidesPerView: "auto",
       
        // pagination: {
        //   el: `${selector} .swiper-pagination`,
        //   clickable: true,
        // },
        navigation: {
            nextEl: `${selectorNavigation} .next`,
            prevEl:  `${selectorNavigation} .prev`,
          },
       
      });

      if (debug) {
        console.log("✅ Swiper initialized");
      }
    });
  }, [selector, debug]);

  return null;
}
