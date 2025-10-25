function TranslateInit() {
  if (!window.__GOOGLE_TRANSLATION_CONFIG__) {
    return;
  }

  // Check if Google Translate is already initialized
  if (document.querySelector(".goog-te-combo")) {
    return;
  }

  try {
    new google.translate.TranslateElement(
      {
        pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__?.defaultLanguage,
        includedLanguages: "en,es,de,ur",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  } catch (error) {
    console.log("Google Translate initialization error:", error);
  }
}

// Make function globally available
window.TranslateInit = TranslateInit;
