
const langButtons = document.querySelectorAll(".lang");

langButtons.forEach(button => {

button.addEventListener("click", () => {

const lang = button.textContent.toLowerCase();

document.documentElement.lang = lang;

document.querySelectorAll("[data-en]").forEach(el => {

el.textContent = el.getAttribute(`data-${lang}`);

});

localStorage.setItem("language", lang);

});

});


window.addEventListener("DOMContentLoaded", ()=>{

const savedLang = localStorage.getItem("language") || "en";

document.documentElement.lang = savedLang;

document.querySelectorAll("[data-en]").forEach(el => {

el.textContent = el.getAttribute(`data-${savedLang}`);

});

});