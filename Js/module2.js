
// ===== ELEMENTOS DEL DOM =====
const habits = document.querySelectorAll(".habit")
const habitFeedback = document.getElementById("habitFeedback")
const analyzeBtn = document.getElementById("analyzeHabitsBtn")
const resultBox = document.getElementById("habitResult")
const adviceBox = document.getElementById("habitAdvice")

// ===== SISTEMA DE INICIALIZACIÓN GLOBAL =====
window.addEventListener("DOMContentLoaded", () => {
    // Sincroniza el idioma guardado al cargar la página
    currentLanguage = localStorage.getItem("language") || "es"
    
    // Calcula y dibuja el progreso acumulado que lleve el usuario
    updateGlobalProgress()
})

// ===== FUNCIONES DEL MÓDULO 2 =====
function countHabits(){
    let count = 0
    habits.forEach(h=>{
        if(h.checked){
            count++
        }
    })
    return count
}

function updateHabits(){
    let count = countHabits()
    if(!habitFeedback) return

    if(currentLanguage === "es"){
        habitFeedback.textContent = count + " hábitos seleccionados"
    }else{
        habitFeedback.textContent = count + " habits selected"
    }
}

function analyzeHabits(){
    let count = countHabits()
    let messageEN = ""
    let messageES = ""

    if(count <= 2){
        messageEN = "Very specific and controlled use. Technology likely plays a functional role in your life."
        messageES = "Uso muy específico y controlado. Probablemente la tecnología cumple un rol funcional."
    }
    else if(count <= 5){
        messageEN = "Varied and balanced use. Technology appears integrated into your daily life without being excessive."
        messageES = "Uso variado y equilibrado. La tecnología está integrada en tu vida diaria sin ser excesiva."
    }
    else if(count <= 8){
        messageEN = "Intensive use. Technology occupies a large part of your time and may be positive (productivity, study) or negative (distraction)."
        messageES = "Uso intensivo. La tecnología ocupa gran parte de tu tiempo y puede ser positivo (productividad, estudio) o negativo (distracción)."
    }
    else{
        messageEN = "High dependency. It may be useful to reflect on whether there is a healthy balance between digital and offline life."
        messageES = "Dependencia alta. Conviene reflexionar si existe un balance saludable entre lo digital y lo presencial."
    }

    if(resultBox) resultBox.style.display = "block"
    if(adviceBox) adviceBox.style.display = "block"

    if(currentLanguage === "es"){
        if(resultBox) resultBox.textContent = messageES
    }else{
        if(resultBox) resultBox.textContent = messageEN
    }

    // CAMBIO INTERNO: El usuario completó el análisis, por ende terminó el Módulo 2
    localStorage.setItem("module2", "true")
    updateGlobalProgress()
}

// ===== SISTEMA DE CONTROL DE PROGRESO GLOBAL =====
function updateGlobalProgress() {
    // Busca la barra tanto por ID nuevo como por clase antigua por seguridad
    const progressFill = document.querySelector("#main-progress-fill") || document.querySelector(".progress-fill")
    if (!progressFill) return

    // Lista ordenada de los 5 módulos del proyecto
    const modules = ["module1", "module2", "module3", "module4", "module5"]
    let completedCount = 0

    // Revisa cuáles módulos ya están completados en el localStorage
    modules.forEach(mod => {
        if (localStorage.getItem(mod) === "true") {
            completedCount++
        }
    })

    // Calcula el porcentaje (cada módulo aporta un 20%)
    let percentage = (completedCount / modules.length) * 100
    
    // Aplica el ancho visual a la barra de progreso
    progressFill.style.width = percentage + "%"

    // Si la página actual tiene el indicador de texto numérico (ej: 40%), también lo actualiza
    const progressText = document.getElementById("progress-text")
    if (progressText) {
        progressText.textContent = Math.round(percentage) + "%"
    }
}

// ===== ESCUCHADORES DE EVENTOS (EVENT LISTENERS) =====
habits.forEach(h=>{
    h.addEventListener("change", updateHabits)
})

if(analyzeBtn){
    analyzeBtn.addEventListener("click", analyzeHabits)
}