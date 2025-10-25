function loadGoogleTranslate() {
  if (!window.google || !window.google.translate) {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=TranslateInit";
    script.async = true;
    document.head.appendChild(script);
  } else {
    TranslateInit();
  }
}

function changeLanguage(lang) {
  if (window.google && window.google.translate) {
    const selectField = document.querySelector(".goog-te-combo");
    if (selectField) {
      selectField.value = lang;
      selectField.dispatchEvent(new Event("change"));
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadGoogleTranslate();
});
