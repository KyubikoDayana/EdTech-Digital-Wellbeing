document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTOS
  const container = document.getElementById("accessibility-container");
  const tab = document.getElementById("accessibility-tab");

  // EVITAR ERRORES SI NO EXISTE EN ALGUNA PÁGINA
  if (!container || !tab) return;

  // TOGGLE PANEL
  tab.addEventListener("click", () => {
    container.classList.toggle("active");
  });

  // BOTONES TEXTO
  const buttons = document.querySelectorAll(".acc-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      // Ahora solo necesitamos remover "acc-large"
      document.body.classList.remove("acc-large");

      if (btn.dataset.size === "large") {
        document.body.classList.add("acc-large");
      }

    });
  });

});