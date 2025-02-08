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


//LOCAL STORAGE

let nVisits = localStorage.getItem("counter")

if (nVisits === null){
    nVisits = 0;
}
else{
    nVisits = parseInt(nVisits)
}

nVisits++

localStorage.setItem("counter", nVisits);
obj("nVisits").textContent = nVisits

// API

async function loadPlace(){
    const url = 'https://tourist-attraction.p.rapidapi.com/search';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '612cde2624msh0a19a40f231a0b3p1c40e1jsn7bf300f4ec13',
            'x-rapidapi-host': 'tourist-attraction.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            location_id: '45963',
            language: 'en_US',
            currency: 'USD',
            offset: '0'
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.results);
    } catch (error) {
        console.error(error);
    }

}
