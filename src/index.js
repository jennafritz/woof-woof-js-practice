let dogBar = document.querySelector("#dog-bar")
let dogInfo = document.querySelector("#dog-info")
let dogImage = document.querySelector("#dog-image")
let dogName = document.querySelector("#dog-name")
let goodBadButton = document.querySelector("#dog-button")
let filterButton = document.querySelector("#good-dog-filter")
let dogSpanArray = document.querySelectorAll(".dogSpan")

let dogsArray = []

let currentDog = {}

function goodOrBad(dogObj){
    if (dogObj.isGoodDog === true){
        return "Good Dog!"
    } else if (dogObj.isGoodDog === false){
        return "Bad Dog!"
    }
}

function toggleGoodBad(dogObj) {
    if (dogObj.isGoodDog === true){
        return false
    } else if (dogObj.isGoodDog === false){
        return true
    }
}

function appendDog(dogObj){
        let eachDog = document.createElement("span")
        eachDog.innerText = dogObj.name
        eachDog.classList.add("dogSpan")
        eachDog.setAttribute("data-goodBad", dogObj.isGoodDog)
        dogBar.append(eachDog)
    
        eachDog.addEventListener("click", function(){
            dogImage.src = dogObj.image
            dogImage.alt = dogObj.name
            dogName.innerText = dogObj.name
            goodBadButton.innerText = goodOrBad(dogObj)
            currentDog = dogObj                
        })
}



document.addEventListener("DOMContentLoaded", function(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(function(dogArray){
        dogsArray = dogArray
        dogsArray.forEach(appendDog)
    })
})

goodBadButton.addEventListener("click", function(){
    fetch(`http://localhost:3000/pups/${currentDog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: toggleGoodBad(currentDog)
        })
    })
        .then(res => res.json())
        .then(function(updatedDogObj){
            goodBadButton.innerText = goodOrBad(updatedDogObj)
   
            currentDog.isGoodDog = updatedDogObj.isGoodDog
        })
})


filterButton.addEventListener("click", function(){

    dogBar.innerText = ""

    // console.log(dogsArray)

    if (filterButton.innerText === "Filter good dogs: OFF"){
        filterButton.innerText = "Filter good dogs: ON"
        dogsArray.forEach(function(dogObj){
            if (dogObj.isGoodDog === true){
                appendDog(dogObj)
            }
        })
    } else if (filterButton.innerText === "Filter good dogs: ON"){
        filterButton.innerText = "Filter good dogs: OFF"
        dogsArray.forEach(function(dogObj){
            appendDog(dogObj)
        })
    }
})

