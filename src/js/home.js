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

const Fragment = document.createDocumentFragment(); //creates a fragment in document to manipulate DOM
const template= document.querySelector("template"); //takes the element template in documment for cloning its content

//asyncronic function
async function loadPlace(){
    console.log("downloading data....") //testing data

    const url = 'https://tourist-attraction.p.rapidapi.com/search';  //endpoint URL to search touristic attractions
    
    // HTTP request configuration
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '612cde2624msh0a19a40f231a0b3p1c40e1jsn7bf300f4ec13',
            'x-rapidapi-host': 'tourist-attraction.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //request params
        body: new URLSearchParams({
            location_id: '45963',
            language: 'en_US',
            currency: 'USD',
            offset: '0'
        })
    };
    
    try { 
        const response = await fetch(url, options); //making request
        const result = await response.json(); //converting response to Json

        // iterating over data from API
        result.results.data.forEach(
            (item)=>{
                item.subcategory.forEach((e)=>{
                    console.log(e.name)
                })

                console.log(item.ranking); //testing in console ranking of attraction
//cloning template
                const clone= template.content.cloneNode(true); 
//modifying elements in template
                clone.querySelector(".title").innerText = item.name; //inserting name of attraction in element with id "title"
                clone.getElementById("thumbnails").src= item.photo.images.small.url; //inserting img of attraction in element with id "thumbnails"
//adding clone to documment fragment
                Fragment.append(clone);

            }
        );

document.querySelector(".items").append(Fragment) //inserts all cloned elements in container with class "items" 

    } catch (error) {
        console.error(error);
    }
console.log("....downloaded data") // testing
}
