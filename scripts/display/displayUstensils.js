import { cleanValue, cleanValueArrUstensils } from "../utils/cleanValues.js";
import recipeFactory from "../factories/recipe-factory.js";
import { createTag } from "../factories/tag-factory.js";
import { refreshArrSearchValues } from '../searchAlgos/refreshAll.js';
import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import displayAll from './displayAll.js';

// If there are recipes in the array of current recipes ? clean the ustensils values, display them into the ustensils list & attach a tag listener to them : display "no match"
const displayUstensils = (currentRecipes, arrSearchValues, arrAllRecipes) => {
    const ustensilsList = document.querySelector('#ustensils-list');

    if (currentRecipes.length > 0) {
        const arrUstensils = cleanValueArrUstensils(currentRecipes)
        const htmlString = recipeFactory(arrUstensils).getUstensil();
        ustensilsList.innerHTML = htmlString;
    } else {
        ustensilsList.innerHTML = `<li class="no-match">No match</li>`;
    }
    attachCreateUstensilsTagListener(arrSearchValues, arrAllRecipes)
}

// create a tag listener which fire on click the creation of a ustensils tag - refresh the global state keeper "arrSearchValues" - refresh the array of current Recipes & display all Elements
const attachCreateUstensilsTagListener = (arrSearchValues, arrAllRecipes) => {
    document.querySelectorAll('.ustensil-tag').forEach((el) => {
        el.addEventListener('click', (e) => {
            const searchValue = cleanValue(e.target.textContent);
            createTag(searchValue, 'ustensil', arrSearchValues, arrAllRecipes)
            refreshArrSearchValues(el.textContent, 'ustensil', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)
        })
    });
}

export default displayUstensils