//DOM selection
const recipesSection = document.querySelector('#recipes-list');
// console.log(recipes)
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
        default:
            tag.classList.add('ingredient')
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
    ingredients.forEach((el) => el.addEventListener('click', () => {
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
    appliances.forEach((el) => el.addEventListener('click', () => {
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
    ustensils.forEach((el) => el.addEventListener('click', () => {
        createTag(el.textContent, 'ustensil')
    }));
}


const arrAllRecipes = [];
const filteredArr = [];
const snapshots = [];

// display recipes
async function displayRecipes(recipeID, arr) {
    if (arrAllRecipes.length === 0) {
        recipes.forEach(recipe => {
            const recipesCard = recipeFactory(recipe).getArticle();
            arrAllRecipes.push(recipesCard);
        });
    // turn into string the array list
    const recipesItem = arrAllRecipes.map((el) => {
        return el.article
    }).join(' ');
    recipesSection.insertAdjacentHTML('afterBegin', recipesItem);
    } else {
    const items = arrAllRecipes.filter((el)=> el.id === recipeID);
    filteredArr.push(items[0].article)
    const recipesItem = filteredArr.map((el) => {
        console.log(el)
        return el
    }).join(' ');

    recipesSection.insertAdjacentHTML('afterBegin', recipesItem);
   
}

console.log(recipeID)
    // else {
    //     [...recipesSection.children].forEach((el)=>el.remove())
    //     // filter
    //     console.log(arrAllRecipes)
    //     const filteredArrRecipes = arrAllRecipes.filter((el) => el.id === +recipeID);
    //     // recipesList[idx].remove();
    //     // turn into string the array list
    //     console.log(filterRecipes)
    //     const recipesItem = filteredArrRecipes.map((el) => {
    //         return el.article
    //     }).join(' ');
    //     recipesSection.insertAdjacentHTML('afterBegin', recipesItem); 
    // }
}

// initialisation
async function init() {
    displayIngredients(recipes);
    displayAppliances(recipes);
    displayUstensils(recipes);
    await displayRecipes(recipes);
}
init();


function filterRecipes(currentValue, arr) {
    // const recipesList = document.querySelectorAll('.article-container');
    // console.log(arrAllRecipes)
    console.log(currentValue)
    console.log(arr)

    while (recipesSection.firstChild) {
        recipesSection.removeChild(recipesSection.firstChild);
    }
    
    recipes.filter((el) => {
        const {
            id,
            name,
            servings,
            ingredients,
            time,
            description,
            appliance,
            ustensils
        } = el;
        // console.log(el)
        const recipeID = id
        // let idx = recipeID - 1;


        //CONDITIONS
        // filter by title
        const titleWord = name.toLowerCase();
        // filter by ingredients
        // const ingredientsList = ingredients;
        // const arrIngredients = [];
        // ingredientsList.forEach((elt) => arrIngredients.push(elt.textContent.toLowerCase().split(':')[0].trim()))

        // const matchValue = (elt) => elt.includes(currentValue);
        // filter by descriptions
        // const descriptionWord = description;

        // console.log(titleWord)

        // // RESULTS
        // if ((titleWord.includes(currentValue) || arrIngredients.some(matchValue) || descriptionWord.includes(currentValue))) {
            if (titleWord.includes(currentValue)) {
                displayRecipes(recipeID)
            }
        //     else {
        //     console.log('not found')
        // }
    });
}



//searchBar listener
const searchBarInput = document.querySelector('.searchBar');

searchBarInput.addEventListener('input', function (e) {
    e.preventDefault();
    const currentValue = e.target.value.toLowerCase();
    const currentValueSize = e.target.value.length;

    if (currentValueSize >= 3) {
        const currentArticlesDOM = document.querySelectorAll('article');
        const currentArticleID = [...currentArticlesDOM].map((el)=> +el.dataset.id);
        snapshots.push([currentArticleID]);
         console.log(snapshots)
         console.log(currentValueSize)
         console.log(snapshots[currentValueSize-3])
         filterRecipes(currentValue, snapshots[currentValueSize-3]);
    }
});

searchBarInput.addEventListener('keyup', function (e) {
    e.preventDefault();
    const form = document.querySelector('form');
    const currentValue = e.target.value.toLowerCase();

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