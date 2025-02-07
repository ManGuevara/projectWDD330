// function to select elements from DOM
function obj(name, matriz=false){
    // if matriz is true, it retrieves all elements that fit with name
    if(matriz) return document.querySelectorAll(name)
// if matriz is false , it searches for ID firts or then for queryselector
        return document.getElementById(name) || document.querySelector(name)

}

// obtaining elements from DOM

const menuIcon= obj("menuIcon");
const menu = obj("nav");

// assigning a "click event" listner to the menu icon

menuIcon.addEventListener("click", (e)=>{
    e.preventDefault()
    menu.classList.toggle("nav--show") //shows/hide the menu when click
})
