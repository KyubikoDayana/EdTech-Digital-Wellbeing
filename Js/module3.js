// ===== VARIABLES GLOBAL DEL TEMPORIZADOR =====
let pomodoroTime = 25
let timerInterval = null

const timerDisplay = document.getElementById("pomodoroTimer")

// ===== SISTEMA DE INICIALIZACIÓN GLOBAL =====
window.addEventListener("DOMContentLoaded", () => {
    currentLanguage = localStorage.getItem("language") || "es"
    updateGlobalProgress() // Sincroniza el progreso al cargar la página
})

// ===== FUNCIONES DEL MÓDULO 3 =====
function startPomodoro(){
    if(timerInterval) return

    timerInterval = setInterval(()=>{
        pomodoroTime--

        if(timerDisplay){
            timerDisplay.textContent = pomodoroTime
        }

        if(pomodoroTime <= 0){
            clearInterval(timerInterval)
            timerInterval = null

            if(currentLanguage === "es"){
                timerDisplay.textContent = "¡Sesión completada!"
            }else{
                timerDisplay.textContent = "Session completed!"
            }

            // CAMBIO: El usuario completó la sesión de Pomodoro, se marca el Módulo 3
            localStorage.setItem("module3", "true")
            updateGlobalProgress()
        }
    }, 1000)
}

// ===== SISTEMA DE CONTROL DE PROGRESO GLOBAL =====
function updateGlobalProgress() {
    const progressFill = document.querySelector("#main-progress-fill") || document.querySelector(".progress-fill")
    if (!progressFill) return

    const modules = ["module1", "module2", "module3", "module4", "module5"]
    let completedCount = 0

    modules.forEach(mod => {
        if (localStorage.getItem(mod) === "true") {
            completedCount++
        }
    })

    let percentage = (completedCount / modules.length) * 100
    progressFill.style.width = percentage + "%"

    const progressText = document.getElementById("progress-text")
    if (progressText) {
        progressText.textContent = Math.round(percentage) + "%"
    }
}