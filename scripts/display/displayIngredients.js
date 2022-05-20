import { cleanValueArrIngredients } from '../utils/cleanValues.js';
import { createTag } from '../factories/tag-factory.js';
import { refreshArrSearchValues } from '../searchAlgos/refreshAll.js';
import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import recipeFactory from '../factories/recipe-factory.js';
import displayAll from './displayAll.js';
import comboboxToggle from './../listeners/combobox/comboboxToggle.js';

// If there are recipes in the array of current recipes ? (clean the ingredients values, display them into the ingredients list & attach a tag listener to them) : (display "Aucun ingrédient")
const displayIngredients = (currentRecipes, arrSearchValues) => {
    const ingredientsList = document.querySelector('#ingredients-list');
    const currentRecipesSize = currentRecipes.length;

    if (currentRecipesSize > 0) {
        const arrAllIngredients = cleanValueArrIngredients(currentRecipes);
        const htmlString = recipeFactory(arrAllIngredients).getIngredient();
        ingredientsList.innerHTML = htmlString;
    } else {
        ingredientsList.innerHTML = `<li class="no-match">Aucun ingrédient</li>`;
    }

    attachCreateIngredientsTagListener(arrSearchValues);
}

// If there are filtered ingredients ? (display them into the ingredients list & attach a tag listener to them) : (display "Aucun ingrédient")
const displaySearchBarCheckIngredients = (filteredIngredients, arrSearchValues) => {
    const ingredientsList = document.querySelector('#ingredients-list');
    const filteredIngredientsSize = filteredIngredients.length;

    if (filteredIngredientsSize > 0) {
        const htmlString = recipeFactory(filteredIngredients).getIngredient();
        ingredientsList.innerHTML = htmlString;
    } else {
        ingredientsList.innerHTML = `<li class="no-match">Aucun ingrédient</li>`;
    }

    attachCreateIngredientsTagListener(arrSearchValues);
}

// create a tag listener which fire on click the creation of a ingredient tag - refresh the global state keeper "arrSearchValues" - refresh the array of current Recipes, display all Elements & close the combobox
const attachCreateIngredientsTagListener = (arrSearchValues) => {
    const ingredientsTags = document.querySelectorAll('.ingredient-tag');
    const ingredientsTagsSize = ingredientsTags.length;

    for (let i = 0; i < ingredientsTagsSize; i++) {
        ingredientsTags[i].addEventListener('click', (e) => {
            const searchValue = e.target.textContent;

            createTag(searchValue, 'ingredient', arrSearchValues);
            refreshArrSearchValues(searchValue, 'ingredient', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);

            comboboxToggle().closeCombobox('ingredients');
        });
    }
}

export {
    displayIngredients,
    displaySearchBarCheckIngredients
};