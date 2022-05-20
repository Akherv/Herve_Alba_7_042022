import { cleanValueArrUstensils } from '../utils/cleanValues.js';
import { createTag } from '../factories/tag-factory.js';
import { refreshArrSearchValues } from '../searchAlgos/refreshAll.js';
import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import recipeFactory from '../factories/recipe-factory.js';
import displayAll from './displayAll.js';
import comboboxToggle from './../listeners/combobox/comboboxToggle.js';

// If there are recipes in the array of current recipes ? (clean the ustensils values, display them into the ustensils list & attach a tag listener to them) : (display "Aucun ustensil")
const displayUstensils = (currentRecipes, arrSearchValues) => {
    const ustensilsList = document.querySelector('#ustensils-list');
    const currentRecipesSize = currentRecipes.length;

    if (currentRecipesSize > 0) {
        const arrUstensils = cleanValueArrUstensils(currentRecipes);
        const htmlString = recipeFactory(arrUstensils).getUstensil();
        ustensilsList.innerHTML = htmlString;
    } else {
        ustensilsList.innerHTML = `<li class="no-match">Aucun ustensil</li>`;
    }

    attachCreateUstensilsTagListener(arrSearchValues);
}

// If there are filtered ustensils ? (display them into the ustensils list & attach a tag listener to them) : (display "Aucun ustensil")
const displaySearchBarCheckUstensils = (filteredUstensils, arrSearchValues) => {
    const ustensilsList = document.querySelector('#ustensils-list');
    const filteredUstensilsSize = filteredUstensils.length;

    if (filteredUstensilsSize > 0) {
        const htmlString = recipeFactory(filteredUstensils).getUstensil();
        ustensilsList.innerHTML = htmlString;
    } else {
        ustensilsList.innerHTML = `<li class="no-match">Aucun ustensil</li>`;
    }

    attachCreateUstensilsTagListener(arrSearchValues);
}

// create a tag listener which fire on click the creation of a ustensils tag - refresh the global state keeper "arrSearchValues" - refresh the array of current Recipes & display all Elements
const attachCreateUstensilsTagListener = (arrSearchValues) => {
    document.querySelectorAll('.ustensil-tag').forEach((el) => {
        el.addEventListener('click', (e) => {
            const searchValue = e.target.textContent;

            createTag(searchValue, 'ustensil', arrSearchValues);
            refreshArrSearchValues(searchValue, 'ustensil', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);

            comboboxToggle().closeCombobox('ustensils');
        });
    });
}

export {
    displayUstensils,
    displaySearchBarCheckUstensils
};