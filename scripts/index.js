

// create tag
function createTag(currentValue, type) {
    console.log(type)
    const tagSection = document.querySelector('#tags');
    const tag = document.createElement('li');
    tag.classList.add('tag')
    switch (type) {
        case 'ingredient':
            tag.classList.add('ingredient')
            break;
        case 'appliance':
            tag.classList.add('appliance')
            break;
        case 'ustensil':
            tag.classList.add('ustensil')
            break;
        default: tag.classList.add('ingredient')
            break;
    }
    tag.textContent = currentValue
    tag.addEventListener('click', () => {
        tag.remove();
    })
    tagSection.appendChild(tag);
}
 
// display ingredients
async function displayIngredients(recipes) {
    // select DOM
    const ingredientsSection = document.querySelector('#ingredients-list');
    // get all ingredients;
    const arrAllIngredients = [];
    recipes.forEach(recipe => {
        const ingredient = recipeFactory(recipe).getIngredient();
        ingredient.forEach((el) => arrAllIngredients.push(el))
    });
    // return once, only unique data
    const uniqueIngredient = arrAllIngredients.filter((el, idx) => {
        return arrAllIngredients.indexOf(el) === idx
    });

    // insert DOM
    const ingredientItem = uniqueIngredient.map(el => {
        return `<li class="ingredient-tag">${el}</li>`
    }).join('');
    ingredientsSection.insertAdjacentHTML('afterBegin', ingredientItem);
    const ingredients = document.querySelectorAll('.ingredient-tag');
    ingredients.forEach((el)=> el.addEventListener('click', () =>{
        createTag(el.textContent, 'ingredient')
    }));
}

// display appliances
async function displayAppliances(recipes) {
    // select DOM
    const appliancesSection = document.querySelector('#appliances-list');
    // get all appliances;
    const arrAllAppliances = [];
    recipes.forEach(recipe => {
        const appliance = recipeFactory(recipe).getAppliance();
        arrAllAppliances.push(appliance);
    });

    // return once, only unique data
    const uniqueAppliance = arrAllAppliances.filter((el, idx) => {
        return arrAllAppliances.indexOf(el) === idx
    });

    // insert DOM
    const applianceItem = uniqueAppliance.map(el => {
        return `<li class="appliance-tag">${el}</li>`
    }).join('');
    appliancesSection.insertAdjacentHTML('afterBegin', applianceItem);
    const appliances = document.querySelectorAll('.appliance-tag');
    appliances.forEach((el)=> el.addEventListener('click', () =>{
        createTag(el.textContent, 'appliance')
    }));
}

// display ustensils
async function displayUstensils(recipes) {
    // select DOM
    const ustensilsSection = document.querySelector('#ustensils-list');
    // get all ustensils
    const arrAllUstensils = [];
    recipes.forEach(recipe => {
        const ustensil = recipeFactory(recipe).getUstensil();
        arrAllUstensils.push(ustensil);
    });

    // flatten the array
    const flatArrUstensils = arrAllUstensils.flat();
    // console.log(flatArrUstensils)

    // return once, only unique data
    const uniqueUstensils = flatArrUstensils.filter((el, idx) => {
        return flatArrUstensils.indexOf(el) === idx
    });

    // insert DOM
    const ustensilItem = uniqueUstensils.map(el => {
        return `<li class="ustensil-tag">${el}</li>`
    }).join('');

    ustensilsSection.insertAdjacentHTML('afterBegin', ustensilItem);
    const ustensils = document.querySelectorAll('.ustensil-tag');
    ustensils.forEach((el)=> el.addEventListener('click', () =>{
        createTag(el.textContent, 'ustensil')
    }));
}

// display recipes
async function displayRecipes(recipes) {
    const recipesSection = document.querySelector('#recipes-list');
    const arrAllRecipes = [];
    recipes.forEach(recipe => {
        const recipesCard = recipeFactory(recipe).getArticle();
        arrAllRecipes.push(recipesCard);
    });

    const recipesItem = arrAllRecipes.map(el => {
        return `<li>${el}</li>`
    }).join('')
    recipesSection.insertAdjacentHTML('afterBegin', recipesItem);
}

// initialisation
function init() {
    displayIngredients(recipes);
    displayAppliances(recipes);
    displayUstensils(recipes);
    displayRecipes(recipes);
}
init();



//searchBar listener
const searchBarInput = document.querySelector('.searchBar');

searchBarInput.addEventListener('input', function (e) {
    e.preventDefault();
    const currentValue = (e.target.value).toLowerCase();

    if (currentValue.length >= 3) {
        const recipesList = document.querySelectorAll('article');
        const currentValue = (e.target.value).toLowerCase();
        // console.log(currentValue);

        [...recipesList].filter((el, idx) => {
            // console.log(el, idx)
        
            // filter by title
            const titleWord = el.querySelector('h2').textContent.toLowerCase();

            // filter by ingredients
            const ingredientsList = el.querySelectorAll('.ingredient-item');
            const arrIngredients = [];
            ingredientsList.forEach((el) => arrIngredients.push(el.textContent.toLowerCase().split(':')[0].trim()))
            const matchValue = (elt) => elt.includes(currentValue);

            // filter by descriptions
            const descriptionWord = el.querySelector('.description').textContent.toLowerCase();

            // style result
            (titleWord.includes(currentValue) || arrIngredients.some(matchValue) || descriptionWord.includes(currentValue)) ?
            recipesList[idx].parentElement.style.display = 'block' :
            recipesList[idx].parentElement.style.display = 'none'
        });
    }
});

searchBarInput.addEventListener('keyup', function (e) {
    e.preventDefault();
    const form = document.querySelector('form');
    const currentValue = (e.target.value).toLowerCase();

    // tag creation & remove
    if (((e.key || e.code) === ('Enter' || 13)) && (currentValue.length >= 3)) {
        createTag(currentValue);
        form.reset();
    }
});


// input style change onclick
const btnComboboxContainer = document.querySelector('#dropdown-input');
const btnIngredients = document.querySelector('#btn-ingredients');
const inputIngredients = document.querySelector('#input-ingredients');
const ingredientsList = document.querySelector('.dropdown-menu');

btnIngredients.addEventListener('click', () => {

    if (btnIngredients.classList.contains('btn-input-show')) {
        btnComboboxContainer.classList.remove('container-input-show');
        btnIngredients.classList.remove('btn-input-show');
        btnIngredients.classList.remove('show');
        btnIngredients.firstChild.textContent = 'Ingrédients';
        inputIngredients.classList.remove('input-show');
        ingredientsList.classList.remove('show');
    } else {
        btnComboboxContainer.classList.add('container-input-show');
        btnIngredients.classList.add('btn-input-show');
        btnIngredients.classList.add('show');
        btnIngredients.firstChild.textContent = '';
        inputIngredients.classList.add('input-show');
        ingredientsList.classList.add('show');
        ingredientsList.style.top = '100%';
    }

});

// inputIngredients.addEventListener('focus', () => {
//     ingredientsList.classList.add('.dropdown-menu.show');
// })