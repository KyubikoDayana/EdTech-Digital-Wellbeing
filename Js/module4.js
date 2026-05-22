
// ===== ELEMENTOS DEL DOM =====
const passwordInput = document.getElementById("passwordInput")
const passwordFeedback = document.getElementById("passwordFeedback")
const passwordAdvice = document.getElementById("passwordAdvice")

// ===== SISTEMA DE INICIALIZACIÓN GLOBAL =====
window.addEventListener("DOMContentLoaded", () => {
    currentLanguage = localStorage.getItem("language") || "es"
    updateGlobalProgress() // Sincroniza el progreso al cargar la página
})

// ===== FUNCIONES DEL MÓDULO 4 =====
function evaluatePassword(){
    const password = passwordInput.value

    if(password.length === 0){
        passwordFeedback.textContent = ""
        passwordAdvice.textContent = ""
        return
    }

    // Detección de características
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[^A-Za-z0-9]/.test(password)

    let diversity = 0
    if(hasUpper) diversity++
    if(hasLower) diversity++
    if(hasNumber) diversity++
    if(hasSymbol) diversity++

    let message = ""
    let advice = []

    // ===== ESPAÑOL =====
    if(currentLanguage === "es"){
        if(password.length < 12){
            message = "⚠️ Contraseña insuficiente"
            advice.push("Debe tener al menos 12 caracteres.")
        }
        else if(password.length >= 12 && diversity <= 2){
            message = "⚠️ Contraseña débil"
            advice.push("Aunque la longitud es aceptable, la contraseña usa pocos tipos de caracteres.")
        }
        else if(password.length >= 12 && password.length < 14){
            message = "⚠️ Contraseña aceptable pero mejorable"
            advice.push("Se recomienda usar 14 o más caracteres.")
        }
        else if(password.length >= 14 && diversity < 3){
            message = "⚠️ Contraseña larga pero poco variada"
            advice.push("La contraseña es larga, pero debería incluir más tipos de caracteres.")
        }
        else{
            message = "✅ Contraseña fuerte"
        }

        // Recomendaciones específicas
        if(!hasUpper) advice.push("Agrega letras mayúsculas.")
        if(!hasLower) advice.push("Agrega letras minúsculas.")
        if(!hasNumber) advice.push("Agrega números.")
        if(!hasSymbol) advice.push("Agrega símbolos (ej: ! @ # $).")
    }
    // ===== ENGLISH =====
    else{
        if(password.length < 12){
            message = "⚠️ Insufficient password"
            advice.push("Password should contain at least 12 characters.")
        }
        else if(password.length >= 12 && diversity <= 2){
            message = "⚠️ Weak password"
            advice.push("Although the length is acceptable, the password uses few character types.")
        }
        else if(password.length >= 12 && password.length < 14){
            message = "⚠️ Acceptable but could be stronger"
            advice.push("Using 14 or more characters is recommended.")
        }
        else if(password.length >= 14 && diversity < 3){
            message = "⚠️ Long but low variety password"
            advice.push("The password is long but should include more character types.")
        }
        else{
            message = "✅ Strong password"
        }

        if(!hasUpper) advice.push("Add uppercase letters.")
        if(!hasLower) advice.push("Add lowercase letters.")
        if(!hasNumber) advice.push("Add numbers.")
        if(!hasSymbol) advice.push("Add symbols (ex: ! @ # $).")
    }

    // Aplicar resultados visuales
    if(passwordFeedback) passwordFeedback.textContent = message

    if(advice.length > 0){
        if(passwordAdvice) passwordAdvice.textContent = advice.join(" ")
    }else{
        if(passwordAdvice) passwordAdvice.textContent = ""
    }

    // CAMBIO: Si la contraseña alcanza el estatus "Fuerte" (contiene el check), el módulo se completa
    if(message.includes("✅")){
        localStorage.setItem("module4", "true")
        updateGlobalProgress()
    }
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

// ===== ESCUCHADORES DE EVENTOS =====
if(passwordInput){
    passwordInput.addEventListener("input", evaluatePassword)
}