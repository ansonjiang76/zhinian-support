(function () {
  var root = document.documentElement;
  var saved = window.localStorage.getItem("transpaste-language");
  var preferred = saved === "zh" || saved === "en"
    ? saved
    : (window.navigator.language || "en").toLowerCase().indexOf("zh") === 0
      ? "zh"
      : "en";

  function setLanguage(language) {
    var next = language === "zh" ? "zh" : "en";
    root.dataset.language = next;
    root.lang = next === "zh" ? "zh-Hans" : "en";
    window.localStorage.setItem("transpaste-language", next);

    document.querySelectorAll("[data-copy]").forEach(function (node) {
      node.hidden = node.getAttribute("data-copy") !== next;
    });
    document.querySelectorAll("[data-language-button]").forEach(function (button) {
      var active = button.getAttribute("data-language-button") === next;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-language-button]").forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.getAttribute("data-language-button"));
    });
  });

  setLanguage(preferred);
})();
