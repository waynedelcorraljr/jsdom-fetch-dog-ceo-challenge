function fetchDogs() {
    return fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(json => renderDogs(json))
}

function fetchBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(json => renderBreeds(json))
}

function renderDogs(dogs) {
    const dogContainer = document.querySelector('#dog-image-container');
    dogs.message.forEach(dog => {
        const dogImage = document.createElement('img');
        dogImage.src = dog;
        dogContainer.appendChild(dogImage);
    })
}

function renderBreeds(breeds) {
    const breedUl = document.querySelector('#dog-breeds')
    for (const breed in breeds.message) {
        const dd = document.getElementById('breed-dropdown');
        const dogBreed = document.createElement('li');
        dogBreed.innerHTML = breed;
        dogBreed.id = 'breed';
        dogBreed.addEventListener('click', function() {
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            dogBreed.style.color = "#" + randomColor;
        })
        if (dogBreed.innerHTML.startsWith(dd.options[dd.selectedIndex].text)) {
            breedUl.appendChild(dogBreed);
        }
    }
}

function filter() {
    const breedUl = document.querySelector('#dog-breeds');
    while(breedUl.firstChild) breedUl.removeChild(breedUl.firstChild);
    fetchBreeds();
}

document.querySelector('#breed-dropdown').addEventListener('change', function() {
    filter()
});

document.addEventListener('DOMContentLoaded', function() {
    fetchDogs(); fetchBreeds();
  })