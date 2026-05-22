document.addEventListener("DOMContentLoaded", () => {

  /* =========================
      FALLING LEAVES SYSTEM (Efecto Brisa)
     ========================= */
  const leavesContainer = document.getElementById("leaves-container");

  if (leavesContainer) {
    const leafImages = [
      "Archives/images/Hoja1imagen.png",
      "Archives/images/Hoja2imagen.png"
    ];

    const createLeaf = (isInitial = false) => {
      const leaf = document.createElement("img");
      
      // Selecciona aleatoriamente una de las dos hojas
      const randomSrc = leafImages[Math.floor(Math.random() * leafImages.length)];
      leaf.src = randomSrc;
      leaf.classList.add("leaf");

      // Configuraciones aleatorias para naturalidad
      const randomLeft = Math.random() * 100; // Posición horizontal (0% a 100%)
      const randomSize = Math.floor(Math.random() * 11) + 15; // Tamaño pequeño entre 15px y 25px
      const randomDuration = Math.random() * 6 + 10; // Caída lenta y pacífica entre 10s y 16s
      const randomDelay = Math.random() * -12; // Retraso negativo para que no salgan todas al mismo tiempo

      leaf.style.left = `${randomLeft}%`;
      leaf.style.width = `${randomSize}px`;
      leaf.style.height = "auto";
      
      // Aplicamos la animación CSS con sus tiempos variables
      leaf.style.animation = `fallAndSway ${randomDuration}s linear infinite`;
      
      // Si es la carga inicial, esparce las hojas verticalmente para que ya estén cayendo al entrar
      if (isInitial) {
        leaf.style.animationDelay = `${randomDelay}s`;
      }

      leavesContainer.appendChild(leaf);

      // Elimina la hoja una vez termina su ciclo de caída para limpiar el DOM
      setTimeout(() => {
        leaf.remove();
      }, randomDuration * 1000);
    };

    // Genera 15 hojas distribuidas de inmediato al cargar la página principal
    for (let i = 0; i < 15; i++) {
      createLeaf(true);
    }

    // Sigue creando hojas nuevas de forma infinita y pausada cada 1.5 segundos
    setInterval(() => {
      // Limitamos el máximo de hojas en pantalla para cuidar el rendimiento
      if (document.querySelectorAll(".leaf").length < 25) {
        createLeaf(false);
      }
    }, 1500);
  }

  /* =========================
      QUIZ SYSTEM
     ========================= */
  const sliders = document.querySelectorAll(".quiz-slider");
  const resultText = document.getElementById("quiz-result");
  const colors = ["#4A6A65", "#7FB8A6", "#F4B6A6"];

  const updateQuiz = () => {
    let totalScore = 0;

    sliders.forEach(slider => {
      const val = parseInt(slider.value);
      totalScore += val;
      slider.style.setProperty('--thumb-color', colors[val]);
    });

    if (totalScore <= 2) {
      resultText.setAttribute("data-en","Very good! You have a balanced digital life.");
      resultText.setAttribute("data-es","¡Muy bien! Tienes una vida digital equilibrada.");
      resultText.style.color = "#4A6A65";
    } else if (totalScore <= 4) {
      resultText.setAttribute("data-en","Good, but you can improve your digital health.");
      resultText.setAttribute("data-es","Bien, pero puedes mejorar tu salud digital.");
      resultText.style.color = "#7FB8A6";
    } else {
      resultText.setAttribute("data-en","High digital use level, help yourself change it!");
      resultText.setAttribute("data-es","Nivel de uso digital alto, ¡ayúdate a cambiarlo!");
      resultText.style.color = "#F4B6A6";
    }

    const currentLang = document.documentElement.lang || "es";
    resultText.textContent = resultText.getAttribute(`data-${currentLang}`);
  };

  sliders.forEach(slider => {
    slider.addEventListener("input", updateQuiz);
  });

  updateQuiz();

  /* =========================
      LANGUAGE SYSTEM
     ========================= */
  const langButtons = document.querySelectorAll(".lang");

  const updateAllTranslations = (lang) => {
    document.querySelectorAll("[data-en]").forEach(element => {
      const translation = element.getAttribute(`data-${lang}`);
      if (translation) {
        element.textContent = translation;
      }
    });
  };

  langButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedLang = button.textContent.toLowerCase();
      document.documentElement.lang = selectedLang;
      updateAllTranslations(selectedLang);
      updateQuiz();
    });
  });

  /* =========================
      HERO ANIMATION
     ========================= */
  const hero = document.querySelector(".hero");
  const title = document.querySelector(".hero-text h1");
  const text = document.querySelector(".hero-text p");
  const button = document.querySelector(".hero-text .btn-primary");

  if (hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          hero.classList.add("visible");
          setTimeout(()=> title.classList.add("visible"),300);
          setTimeout(()=> text.classList.add("visible"),700);
          setTimeout(()=> button.classList.add("visible"),1100);
        } else {
          hero.classList.remove("visible");
          title.classList.remove("visible");
          text.classList.remove("visible");
          button.classList.remove("visible");
        }
      });
    },{threshold:0.4});

    observer.observe(hero);
  }

  /* =========================
      NEXT QUIZ BUTTON
     ========================= */
  const btnNextQuiz = document.getElementById("btn-next-quiz");
  
  if (btnNextQuiz) {
    btnNextQuiz.addEventListener("click", () => {
      window.location.href = "modules/module1.html";
    });
  }

});