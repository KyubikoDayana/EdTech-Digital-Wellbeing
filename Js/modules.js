
// ===== GLOBAL LANGUAGE SYSTEM =====

let currentLanguage = localStorage.getItem("language") || "es"

// aplicar idioma a toda la página
function applyLanguage(){
    document.documentElement.lang = currentLanguage
    const elements = document.querySelectorAll("[data-en]")

    elements.forEach(el => {
        if(currentLanguage === "es"){
            el.innerText = el.getAttribute("data-es")
        } else {
            el.innerText = el.getAttribute("data-en")
        }
    })

    // actualizar componentes interactivos
    if(typeof updateSliderText === "function"){
        updateSliderText()
    }
}

// cambiar idioma
function setLanguage(lang){
    currentLanguage = lang
    localStorage.setItem("language", lang)
    applyLanguage()
}

// aplicar idioma al cargar
window.addEventListener("DOMContentLoaded", () => {
    currentLanguage = localStorage.getItem("language") || "es"
    applyLanguage()
    initSlider()
})



// ===== MODULE 1 SLIDER SYSTEM =====

let slider
let feedback
let messageBox

function initSlider(){
    slider = document.getElementById("screenSlider")
    feedback = document.getElementById("screenFeedback")
    messageBox = document.getElementById("screenMessage")

    // evita errores en páginas donde no existe el slider
    if(!slider || !feedback || !messageBox) return

    updateSliderText()
    slider.addEventListener("input", updateSliderText)
}

function updateSliderText(){
    if(!slider || !feedback || !messageBox) return

    let hours = parseInt(slider.value)

    // Actualizar el número de horas mostrado
    if(currentLanguage === "es"){
        feedback.innerText = hours + (hours === 1 ? " hora por día" : " horas por día")
    } else {
        feedback.innerText = hours + (hours === 1 ? " hour per day" : " hours per day")
    }

    // Lógica de mensajes según los nuevos rangos proporcionados
    let textES = ""
    let textEN = ""

    if(hours === 0){
        textES = "No usar pantallas durante el día no genera daños académicos. De hecho, puede favorecer la concentración, la lectura y la actividad física. Sin embargo, las tecnologías también pueden aportar beneficios educativos si se utilizan con moderación."
        textEN = "Not using screens during the day does not cause academic harm. In fact, it can favor concentration, reading, and physical activity. However, technologies can also provide educational benefits if used in moderation."
    }
    else if(hours === 1){
        textES = "Este nivel es muy saludable. Estudios muestran que alrededor de 1 hora de uso diario de pantallas tiene un impacto mínimo en el rendimiento académico y permite mantener un buen equilibrio con otras actividades como estudiar, leer o hacer ejercicio."
        textEN = "This level is very healthy. Studies show that around 1 hour of daily screen use has a minimal impact on academic performance and allows for a good balance with other activities like studying, reading, or exercising."
    }
    else if(hours === 2){
        textES = "Este nivel sigue dentro de las recomendaciones internacionales. Organizaciones como la AAP sugieren mantener el uso recreativo por debajo de 2 horas diarias. En este rango, el impacto académico suele ser neutro o incluso positivo si parte del uso es educativo."
        textEN = "This level is still within international recommendations. Organizations like the AAP suggest keeping recreational use below 2 hours a day. In this range, the academic impact is usually neutral or even positive if part of the use is educational."
    }
    else if(hours === 3){
        textES = "Este nivel está cerca del límite recomendado. Algunos estudios indican que a partir de este punto pueden comenzar pequeñas reducciones en la concentración o el tiempo dedicado al estudio, especialmente si el uso es principalmente recreativo."
        textEN = "This level is near the recommended limit. Some studies indicate that from this point on, small reductions in concentration or study time may begin, especially if the use is primarily recreational."
    }
    else if(hours >= 4 && hours <= 5){
        textES = "En este rango comienzan a observarse efectos negativos leves a moderados en el rendimiento académico. Cada hora adicional de uso puede reducir la probabilidad de alcanzar altos niveles de rendimiento en lectura y matemáticas."
        textEN = "In this range, mild to moderate negative effects on academic performance begin to be observed. Each additional hour of use can reduce the likelihood of achieving high performance levels in reading and mathematics."
    }
    else if(hours >= 6 && hours <= 8){
        textES = "Este nivel se asocia con efectos moderados en el rendimiento académico. Investigaciones muestran relación con menor concentración, peores resultados en pruebas escolares y mayor riesgo de fatiga mental o distracción durante el estudio."
        textEN = "This level is associated with moderate effects on academic performance. Research shows a link to lower concentration, worse school test results, and a higher risk of mental fatigue or distraction during study."
    }
    else if(hours >= 9 && hours <= 10){
        textES = "El uso prolongado en este rango puede generar dificultades cognitivas como problemas de memoria, atención y toma de decisiones. También puede afectar el sueño, lo que reduce la capacidad de aprendizaje."
        textEN = "Prolonged use in this range can lead to cognitive difficulties such as memory, attention, and decision-making problems. It can also affect sleep, which reduces learning capacity."
    }
    else if(hours >= 11 && hours <= 13){
        textES = "Este nivel implica un riesgo elevado para el rendimiento académico. El exceso de tiempo frente a pantallas suele desplazar el tiempo de estudio y descanso, lo que afecta la memoria, la comprensión y la participación en clase."
        textEN = "This level implies a high risk for academic performance. Excessive screen time often displaces study and rest time, affecting memory, comprehension, and class participation."
    }
    else if(hours >= 14 && hours <= 16){
        textES = "Un uso tan alto de pantallas puede provocar fatiga extrema, problemas de sueño e importantes dificultades cognitivas. En estas condiciones resulta muy difícil mantener un buen rendimiento académico."
        textEN = "Such high screen use can cause extreme fatigue, sleep problems, and significant cognitive difficulties. Under these conditions, it is very difficult to maintain good academic performance."
    }
    else if(hours >= 17 && hours <= 19){
        textES = "Este nivel representa un uso extremadamente alto. La falta de descanso y la sobrecarga digital pueden afectar seriamente la concentración, la memoria y la capacidad de aprendizaje."
        textEN = "This level represents extremely high use. Lack of rest and digital overload can seriously affect concentration, memory, and learning ability."
    }
    else {
        textES = "Un uso tan extremo de pantallas prácticamente elimina el tiempo para dormir, estudiar o descansar. Esto puede provocar un colapso del rendimiento académico y graves problemas de salud mental y física."
        textEN = "Such extreme screen use practically eliminates time for sleeping, studying, or resting. This can cause a collapse in academic performance and serious mental and physical health problems."
    }

    // Mostrar el mensaje en el idioma seleccionado
    messageBox.innerText = (currentLanguage === "es") ? textES : textEN;

    // MEJORA DE UX: Aplicar el color #76A6A7 al texto y al slider
    messageBox.style.color = "#76A6A7";
    messageBox.style.fontWeight = "500";
    slider.style.accentColor = "#76A6A7"; 
    
    // COLOR DEL SLIDER
if(hours <= 4){
slider.style.accentColor = "#AACB8C"
}
else if(hours <= 8){
slider.style.accentColor = "#F2A999"
}
else{
slider.style.accentColor = "#e57373"
}

sessionStorage.setItem("module1","true")

}


