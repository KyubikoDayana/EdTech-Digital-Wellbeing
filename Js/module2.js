
const habits = document.querySelectorAll(".habit")
const habitFeedback = document.getElementById("habitFeedback")
const analyzeBtn = document.getElementById("analyzeHabitsBtn")
const resultBox = document.getElementById("habitResult")
const adviceBox = document.getElementById("habitAdvice")

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

resultBox.style.display = "block"
adviceBox.style.display = "block"

if(currentLanguage === "es"){
resultBox.textContent = messageES
}else{
resultBox.textContent = messageEN
}

}

habits.forEach(h=>{
h.addEventListener("change", updateHabits)
})

if(analyzeBtn){
analyzeBtn.addEventListener("click", analyzeHabits)
}
