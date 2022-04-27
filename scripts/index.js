const searchBar = document.querySelector('.searchBar');
const btnComboboxContainer = document.querySelector('#dropdown-input');
const inputIngredients = document.querySelector('#input-ingredients');
const btnIngredients = document.querySelector('#btn-ingredients');
const ingredientsList = document.querySelector('#ingredients-list');
const recipesList = document.querySelector('#recipes-list');

function createTag(currentValue, type) {
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

function 


const displayIngredients = (recipes) => {
    const arr = [];
    recipes.forEach((recipe) => {
            recipe.ingredients.map(el => {
                const cleanAccentValue = el.ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                arr.push(cleanAccentValue)
            });
        });
    const uniqueValue = [...new Set(arr)].sort();

    const htmlString = uniqueValue
        .map((el) => {
                return `<li class="ingredient-tag">${el}</li>`
        }).join('');

    ingredientsList.innerHTML = htmlString;

    const ingredients = document.querySelectorAll('.ingredient-tag');
    ingredients.forEach((el) => el.addEventListener('click', () => {
        createTag(el.textContent, 'ingredient')
    }));
}

// input style change onclick
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


const displayRecipes = (recipes) => {
    const htmlString = recipes
        .map((recipe) => {
            const cards = recipeFactory(recipe).getArticle();
            const recipeCard = cards.article;
            return recipeCard
        })
        .join('');
    recipesList.innerHTML = htmlString;
};

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const currentValueSize = e.target.value.length;

    if(currentValueSize >= 3) {
        const filteredRecipes = recipes.filter((recipe) => {
            return (
                recipe.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchString) ||
                recipe.ingredients.some(el => {
                    return el.ingredient.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchString);
                }) ||
                recipe.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchString)
            );
        });
        displayRecipes(filteredRecipes);
    } else {
        displayRecipes(recipes);
    }
    
});


function init() {
    displayIngredients(recipes)
    displayRecipes(recipes);
};
init();