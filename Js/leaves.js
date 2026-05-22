document.addEventListener("DOMContentLoaded", () => {
  /* =========================
      FALLING LEAVES SYSTEM (Efecto Brisa)
     ========================= */
  const leavesContainer = document.getElementById("leaves-container");

  if (leavesContainer) {
    // Detecta automáticamente si la página actual está dentro de una subcarpeta
    const currentPath = window.location.pathname;
    const isSubfolder = currentPath.includes("modules/") || currentPath.includes("Infopag/");
    const prefix = isSubfolder ? "../" : "";

    const leafImages = [
      `${prefix}Archives/images/Hoja1imagen.png`,
      `${prefix}Archives/images/Hoja2imagen.png`
    ];

    const createLeaf = (isInitial = false) => {
      const leaf = document.createElement("img");
      
      const randomSrc = leafImages[Math.floor(Math.random() * leafImages.length)];
      leaf.src = randomSrc;
      leaf.classList.add("leaf");

      const randomLeft = Math.random() * 100; 
      const randomSize = Math.floor(Math.random() * 11) + 15; 
      const randomDuration = Math.random() * 6 + 10; 
      const randomDelay = Math.random() * -12; 

      leaf.style.left = `${randomLeft}%`;
      leaf.style.width = `${randomSize}px`;
      leaf.style.height = "auto";
      
      leaf.style.animation = `fallAndSway ${randomDuration}s linear infinite`;
      
      if (isInitial) {
        leaf.style.animationDelay = `${randomDelay}s`;
      }

      leavesContainer.appendChild(leaf);

      setTimeout(() => {
        leaf.remove();
      }, randomDuration * 1000);
    };

    // Genera 15 hojas distribuidas de inmediato
    for (let i = 0; i < 15; i++) {
      createLeaf(true);
    }

    // Sigue creando hojas nuevas de forma infinita
    setInterval(() => {
      if (document.querySelectorAll(".leaf").length < 25) {
        createLeaf(false);
      }
    }, 1500);
  }
});