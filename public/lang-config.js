window.__GOOGLE_TRANSLATION_CONFIG__ = {
  languages: [
    { title: "English", name: "en" },
    { title: "Español", name: "es" },
    { title: "Deutsch", name: "de" },
    { title: "اردو", name: "ur" },
  ],
  defaultLanguage: "en",
};

// Cleanup function to remove Google Translate banners
(function () {
  const removeBanners = () => {
    // Remove Google Translate banners and overlays
    const elementsToRemove = [
      ".goog-te-banner-frame",
      ".goog-te-menu-frame",
      ".goog-te-ftab-frame",
      ".goog-te-spinner-pos",
      ".VIpgJd-ZVi9od-aZ2wEe",
      ".VIpgJd-ZVi9od-aZ2wEe-wOHMyf",
      ".VIpgJd-ZVi9od-aZ2wEe-OiiCO",
    ];

    elementsToRemove.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    });

    // Fix body top position
    if (document.body.style.top) {
      document.body.style.top = "0px";
    }
  };

  // Run initially
  removeBanners();

  // Set up observer to continuously remove banners
  const observer = new MutationObserver(removeBanners);
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Also run on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", removeBanners);
})();
