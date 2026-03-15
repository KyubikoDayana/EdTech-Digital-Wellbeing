
let pomodoroTime = 25
let timerInterval = null

const timerDisplay = document.getElementById("pomodoroTimer")

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

}

},1000)

}