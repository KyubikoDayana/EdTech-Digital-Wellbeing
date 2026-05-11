// ABRIR / CERRAR PANEL
const container = document.getElementById("accessibility-container");
const tab = document.getElementById("accessibility-tab");

tab.addEventListener("click", () => {
  container.classList.toggle("active");
});


// CAMBIO DE TAMAÑO DE TEXTO
const buttons = document.querySelectorAll(".acc-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.body.classList.remove("large-text", "xlarge-text");

    if (btn.dataset.size === "large") {
      document.body.classList.add("large-text");
    }

    if (btn.dataset.size === "xlarge") {
      document.body.classList.add("xlarge-text");
    }
  });
});


// CAMBIO DE IDIOMA
const langButtons = document.querySelectorAll(".acc-lang");

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;

    document.querySelectorAll("[data-en]").forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });
  });
});