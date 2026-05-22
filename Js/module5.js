
// ===== SISTEMA DE INICIALIZACIÓN GLOBAL =====
window.addEventListener("DOMContentLoaded", () => {
    currentLanguage = localStorage.getItem("language") || "es"
    updateGlobalProgress() // Sincroniza el progreso al cargar la página

    // Escuchador automático por si tu botón en el HTML usa este ID
    const generateBtn = document.getElementById("generatePlanBtn")
    if (generateBtn) {
        generateBtn.addEventListener("click", generatePlan)
    }
})

// ===== FUNCIONES DEL MÓDULO 5 =====
function generatePlan(){
    const checks = document.querySelectorAll(".habit:checked")
    const result = document.getElementById("planResult")
    const weekly = document.getElementById("weeklyPlan")

    if (!weekly) return

    weekly.innerHTML = ""

    if(checks.length === 0){
        if (result) {
            result.innerHTML =
            currentLanguage === "es"
            ? "<strong style='color:#F2A999'>Debes seleccionar hábitos para generar un plan.</strong>"
            : "<strong style='color:#F2A999'>You must select habits to generate a plan.</strong>"
        }
        return
    }

    if (result) result.innerHTML = ""
    let habits = []

    checks.forEach(c=>{
        const textSpan = c.parentElement.querySelector(".habit-text")
        if (textSpan) {
            habits.push(textSpan.innerText)
        }
    })

    const daysES = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]
    const daysEN = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    const days = currentLanguage === "es" ? daysES : daysEN

    let plan = {
        0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[]
    }

    if(habits.length <= 2){
        const pattern = [0,2,4]
        pattern.forEach(d=>{
            habits.forEach(h=>plan[d].push(h))
        })
    }else{
        habits.forEach((h,i)=>{
            let day = i % 6
            plan[day].push(h)
        })
    }

    let table = "<h3 style='margin-top:30px'>" + 
    (currentLanguage === "es" ? "Plan semanal" : "Weekly Plan") +
    "</h3>"

    table += "<table class='plan-table'>"

    days.forEach((day,index)=>{
        table += "<tr>"
        table += "<td class='plan-day'>"+day+"</td>"

        if(index === 6){
            table += "<td class='plan-rest'>" + (currentLanguage === "es" ? "Descanso" : "Rest") + "</td>"
        }else{
            if(plan[index].length === 0){
                table += "<td>—</td>"
            }else{
                table += "<td>"+plan[index].join("<br>")+"</td>"
            }
        }
        table += "</tr>"
    })

    table += "</table>"
    weekly.innerHTML = table

    // CAMBIO: Si el plan se generó correctamente, guardamos el progreso del Módulo 5
    localStorage.setItem("module5", "true")
    updateGlobalProgress()
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