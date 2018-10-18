let container
let pokemens

document.addEventListener('DOMContentLoaded', () => {
  container = document.getElementById('pokemon-container')

  addInputListener()

  getPokemonDataFromServer()
})

const getPokemonDataFromServer = () => {
  fetch('http://localhost:3000/pokemon')
  .then( (response) => {
    return response.json()
  })
  .then( (responseJSON) => {
    pokemens = responseJSON
    container.innerHTML = ''
    makePokemonCardsFromJSON(responseJSON)
  })
}

/*
  This function is here because if we write its contents
  in the fetch response handler, we lose access to that code
  after our page is done loading.
*/
const makePokemonCardsFromJSON = (pokemonJSONArray) => { // receives an array of objects
  pokemonJSONArray.forEach( (pokemonObj) => {
    const cardElement = makeCardHTML(pokemonObj)
    container.appendChild(cardElement)
  })
}

const makeCardHTML = (pokemonObj) => {
  // pokemonContainer.setAttribute('class', 'pokemon-container')
  // pokemonContainer.id = 'someID'

  // Create elements here...
  const pokemonContainer = document.createElement('div')
  pokemonContainer.className = 'pokemon-container'

  const pokemonFrame = document.createElement('div')
  pokemonFrame.className = 'pokemon-frame'

  const header = document.createElement('h1')
  header.className = 'center-text'
  header.innerText = pokemonObj.name

  const outerImgDiv = document.createElement('div')
  outerImgDiv.className = 'outerImgDiv'
  const innerImgDiv = document.createElement('div')
  innerImgDiv.className = 'innerImgDiv'

  const pokemonImg = document.createElement('img')
  pokemonImg.src = pokemonObj.sprites.front
  pokemonImg.setAttribute('alt-src', pokemonObj.sprites.back)

  // Append elements here...
  innerImgDiv.appendChild(pokemonImg)

  outerImgDiv.appendChild(innerImgDiv)

  pokemonFrame.appendChild(header)
  pokemonFrame.appendChild(outerImgDiv)

  pokemonContainer.appendChild(pokemonFrame)

  return pokemonContainer
}

const addInputListener = () => {
  // need to add event listener to input box
  const inputBox = document.getElementById('pokemon-search-input')
  inputBox.addEventListener('input', (event) => {
    const search = event.target.value.toLowerCase()

    const results = pokemens.filter( (pokemon) => {
      return pokemon.name.includes(search)
    })

    // we have the search term
    // we want the pokemon json (which is already stored in the pokemens variable)
    // but we only want jsons for the pokemens
    //  whose names contain the search term
    // ✅

    // clear the screen of existing cards
    container.innerHTML = ''
    // attach cards of pokemon from our search results
    makePokemonCardsFromJSON(results)
  })
}

// Called manually in the Chrome console.
const patchIvysaur = () => {
  fetch('http://localhost:3000/pokemon/2', {
    'method': 'PATCH',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify({'name': '💾'})
  })
  .then( (response) => {
    return response.json()
  })
  .then( (json) => {
    console.log(json)
    getPokemonDataFromServer()
  })
}

// Called manually in the Chrome console.
/*
  1. Send a DELETE request to the server for Ivysaur.
  2. Re-fetch all the data from our server.
  3. Redraw all the cards from the new set of data.
*/
const killBill = () => {
  fetch('http://localhost:3000/pokemon/2', {
    'method': 'DELETE'
  })
  .then( (response) => {
    return response.json()
  })
  .then( (json) => {
    console.log(json)
    getPokemonDataFromServer()
  })
}

/*
  1. Send a DELETE request to the server for Charizard.
  2. Instead of redrawing all the cards:
    a. Remove him from the locally cached storage (pokemens)
    b. Remove his card from the page
*/
const killBillLocally = () => {
  const id = 5
  fetch('http://localhost:3000/pokemon/' + id, {
    'method': 'DELETE'
  })
  .then( (response) => {
    return response.json()
  })
  .then( (json) => {
    console.log(json)
    pokemens = pokemens.filter( (pokemon) => {
      return pokemon.id !== id // ! = =
    })
    container.innerHTML = ''
    makePokemonCardsFromJSON(pokemens)
  })
}

/*
- Get Pokemon JSON from some server
  - use a fetch to get information from localhost:3000/pokemon
- iterate over the data
  - each iteration: make some HTML from the data
    - then attach that HTML to the DOM
*/

// <hotdog>
// </hotdog>

/*
  <hotdog toppings="ketchup">
*/
