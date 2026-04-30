// ELEMENT
const recipeList = document.getElementById('recipe-list')
const cuisineFilter = document.getElementById('cuisine-filter')
const sortTimeSelect = document.getElementById('sort-time')
const randomButton = document.getElementById('random-recipe')

console.log('recipeList:', recipeList)

// DATA
const recipes = [
  {
    name: 'Vegetarian lasagna',
    cuisineType: ['Italian'],
    source: 'Jamie Oliver',
    totalTime: 130,
    image: './recipe-images/individual-vegetarian-lasagnes.jpg'
  },
  {
    name: 'Cheats cheesy focaccia',
    cuisineType: ['Italian'],
    source: 'BBC Good Food',
    totalTime: 40,
    image: './recipe-images/cheats-cheesy-focaccia.jpg'
  },
  {
    name: 'Baked Chicken',
    cuisineType: ['American'],
    source: 'Martha Stewart',
    totalTime: 90,
    image: './recipe-images/baked-chicken.jpg'
  }
  ,
  {
    name: 'Grilled Meat',
    cuisineType: ['American'],
    source: 'TikTok',
    totalTime: 25,
    image: './recipe-images/grilled.jpg'
  }
]

// FUNCTIONS
function displayRecipes(recipesArray) {
  recipeList.innerHTML = ''

  recipesArray.forEach(recipe => {
    const recipeCard = document.createElement('div')
    recipeCard.classList.add('recipe-card')

    recipeCard.innerHTML = `
      <h2>${recipe.name}</h2>
      <img src="${recipe.image}" alt="${recipe.name}">
      <p><strong>Cooking time:</strong> ${recipe.totalTime ?? 'N/A'}</p>
      <p><strong>Source:</strong> ${recipe.source}</p>
    `

    recipeList.appendChild(recipeCard)
  })
}

function getUniqueCuisines(recipes) {
  const cuisines = []

  recipes.forEach(recipe => {
    if (Array.isArray(recipe.cuisineType)) {
      recipe.cuisineType.forEach(type => cuisines.push(type))
    } else {
      cuisines.push(recipe.cuisineType)
    }
  })

  return [...new Set(cuisines)]
}

function populateCuisineFilter() {
  const uniqueCuisines = getUniqueCuisines(recipes)

  uniqueCuisines.forEach(cuisine => {
    const option = document.createElement('option')
    option.value = cuisine
    option.textContent = cuisine
    cuisineFilter.appendChild(option)
  })
}

// EVENTS
cuisineFilter.addEventListener('change', () => {
  const selectedCuisine = cuisineFilter.value

  if (selectedCuisine === 'all') {
    displayRecipes(recipes)
    return
  }

  const filteredRecipes = recipes.filter(recipe => {
    if (Array.isArray(recipe.cuisineType)) {
      return recipe.cuisineType.includes(selectedCuisine)
    }
    return recipe.cuisineType === selectedCuisine
  })

  displayRecipes(filteredRecipes)
})

sortTimeSelect.addEventListener('change', () => {
  const sortValue = sortTimeSelect.value

  let sortedRecipes = [...recipes]

  if (sortValue === 'asc') {
    sortedRecipes.sort((a, b) => a.totalTime - b.totalTime)
  }

  if (sortValue === 'desc') {
    sortedRecipes.sort((a, b) => b.totalTime - a.totalTime)
  }

  displayRecipes(sortedRecipes)
})

randomButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * recipes.length)
  const randomRecipe = recipes[randomIndex]
  displayRecipes([randomRecipe])
})


// INIT
populateCuisineFilter()
displayRecipes(recipes)