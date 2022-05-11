import { cleanValue, cleanValueArrIngredients } from "../utils/cleanValues.js";
import recipeFactory from "../factories/recipe-factory.js";
import { createTag } from "../factories/tag-factory.js";
import { refreshArrSearchValues } from "../searchAlgos/refreshAll.js";
import { refreshArrFilteredRecipes } from "../searchAlgos/refreshAll.js";
import displayAll from "./displayAll.js";
import comboboxToggle from "./../listeners/combobox/comboboxToggle.js";

// If there are recipes in the array of current recipes ? clean the ingredients values, display them into the ingredients list & attach a tag listener to them : display "no match"
const displayIngredients = (currentRecipes, arrSearchValues, arrAllRecipes) => {
    const ingredientsList = document.querySelector('#ingredients-list');

        if (currentRecipes.length > 0) {
            const arrAllIngredients = cleanValueArrIngredients(currentRecipes)
            const htmlString = recipeFactory(arrAllIngredients).getIngredient();
            ingredientsList.innerHTML = htmlString;
        } else {
            ingredientsList.innerHTML = `<li class="no-match">No match</li>`;
        }
    attachCreateIngredientsTagListener(arrSearchValues, arrAllRecipes)
}

// If there are filtered ingredients ? display them into the ingredients list & attach a tag listener to them : display "no match"
const displaySearchBarCheckIngredients = (filteredIngredients, arrSearchValues, arrAllRecipes) => {
    const ingredientsList = document.querySelector('#ingredients-list');

    if (filteredIngredients.length > 0) {
    const htmlString = recipeFactory(filteredIngredients).getIngredient();
    ingredientsList.innerHTML = htmlString;
    } else {
    ingredientsList.innerHTML = `<li class="no-match">No match</li>`;
    }

    attachCreateIngredientsTagListener(arrSearchValues, arrAllRecipes)
}

// create a tag listener which fire on click the creation of a ingredient tag - refresh the global state keeper "arrSearchValues" - refresh the array of current Recipes, display all Elements & close the combobox
const attachCreateIngredientsTagListener = (arrSearchValues, arrAllRecipes) => {
    document.querySelectorAll('.ingredient-tag').forEach((el) => {
        el.addEventListener('click', (e) => {
            const searchValue = cleanValue(e.target.textContent);
            createTag(searchValue, 'ingredient', arrSearchValues, arrAllRecipes)
            refreshArrSearchValues(el.textContent, 'ingredient', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)

            comboboxToggle().closeCombobox('ingredients')
        })
    });
}

export  {displayIngredients,  displaySearchBarCheckIngredients}