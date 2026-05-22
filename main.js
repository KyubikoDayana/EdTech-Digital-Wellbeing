document.addEventListener("DOMContentLoaded", () => {

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
/* =========================
      Barra de proceso modules
     ========================= */
document.addEventListener("DOMContentLoaded", () => {
    const progressFill = document.getElementById("main-progress-fill");
    const progressText = document.getElementById("progress-text");
    
    if (progressFill && progressText) {
        const modules = ["module1", "module2", "module3", "module4", "module5"];
        let completedCount = 0;

        modules.forEach(mod => {
            if (localStorage.getItem(mod) === "true") {
                completedCount++;
            }
        });

        let percentage = Math.round((completedCount / modules.length) * 100);
        
        // Actualiza la barra y el texto con el porcentaje real
        progressFill.style.width = percentage + "%";
        progressText.innerText = percentage + "%";
    }
});