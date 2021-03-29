(function () {
  try {
    var theme = localStorage.getItem("theme");
    var supportDarkTheme =
      window.matchMedia("(prefers-color-scheme: dark)").matches === true;
    if (!theme && supportDarkTheme) document.body.dataset.theme = "dark";
    document.body.dataset.theme = theme || "dark";
  } catch (e) {}
})();
