
function generatePlan(){

const checks = document.querySelectorAll(".habit:checked")
const result = document.getElementById("planResult")
const weekly = document.getElementById("weeklyPlan")

weekly.innerHTML = ""

if(checks.length === 0){

result.innerHTML =
currentLanguage === "es"
? "<strong style='color:#F2A999'>Debes seleccionar hábitos para generar un plan.</strong>"
: "<strong style='color:#F2A999'>You must select habits to generate a plan.</strong>"

return
}

result.innerHTML = ""

let habits = []

checks.forEach(c=>{
const text = c.parentElement.querySelector(".habit-text").innerText
habits.push(text)
})

const daysES = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]
const daysEN = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

const days = currentLanguage === "es" ? daysES : daysEN

let plan = {
0:[],1:[],2:[],3:[],4:[],5:[],6:[]
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

}