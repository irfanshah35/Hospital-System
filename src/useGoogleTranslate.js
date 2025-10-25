import { useEffect } from "react";

export const useGoogleTranslate = () => {
  useEffect(() => {
    // Load the configuration script
    const loadConfig = () => {
      return new Promise((resolve) => {
        if (window.__GOOGLE_TRANSLATION_CONFIG__) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "/lang-config.js";
        script.onload = resolve;
        script.onerror = resolve;
        document.head.appendChild(script);
      });
    };

    // Load Google Translate
    const loadGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        initializeTranslate();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    };

    // Initialize translation
    const initializeTranslate = () => {
      if (!window.google || !window.google.translate) return;

      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,de,ur",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      } catch (error) {
        console.log("Translation init error:", error);
      }
    };

    // Global callback for Google
    window.googleTranslateElementInit = initializeTranslate;

    const initialize = async () => {
      await loadConfig();
      setTimeout(loadGoogleTranslate, 100);
    };

    initialize();

    // Cleanup
    return () => {
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };
  }, []);
};

// Helper function to change language
export const changeLanguage = (langCode) => {
  if (window.google && window.google.translate) {
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = langCode;
      selectField.dispatchEvent(new Event("change"));
    }
  }
};
