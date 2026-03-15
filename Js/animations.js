window.addEventListener("load", () => {

const loader = document.querySelector(".page-loader")

if(!loader){
startAnimations()
return
}

// aseguramos que el loader se vea primero
loader.style.transform = "translateX(0)"

setTimeout(()=>{

loader.style.transform = "translateX(100%)"

setTimeout(()=>{
loader.style.display="none"

try{
startAnimations()
}catch(e){
console.warn("Animation error:", e)
}

},1000)

},500)

})


function startAnimations(){

const leftElements = document.querySelectorAll(
"h1,h2,h3,p,li,.module-text,.module-interaction,.btn-primary"
)

const rightElements = document.querySelectorAll(
".module-icon img"
)

leftElements.forEach((el,i)=>{

el.classList.add("fade-left")

setTimeout(()=>{
el.classList.add("fade-visible")
},200 + (i*120))

})

rightElements.forEach((el,i)=>{

el.classList.add("fade-right")

setTimeout(()=>{
el.classList.add("fade-visible")
},400 + (i*140))

})

}