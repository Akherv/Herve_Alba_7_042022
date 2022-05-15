import { cleanValueArrUstensils } from '../utils/cleanValues.js';
import recipeFactory from '../factories/recipe-factory.js';
import { createTag } from '../factories/tag-factory.js';
import { refreshArrSearchValues } from '../searchAlgos/refreshAll.js';
import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import displayAll from './displayAll.js';
import comboboxToggle from './../listeners/combobox/comboboxToggle.js';

// If there are recipes in the array of current recipes ? (clean the ustensils values, display them into the ustensils list & attach a tag listener to them) : (display "Aucun ustensil")
const displayUstensils = (currentRecipes, arrSearchValues, arrAllRecipes) => {
    const ustensilsList = document.querySelector('#ustensils-list');

    if (currentRecipes.length > 0) {
        const arrUstensils = cleanValueArrUstensils(currentRecipes);
        const htmlString = recipeFactory(arrUstensils).getUstensil();
        ustensilsList.innerHTML = htmlString;
    } else {
        ustensilsList.innerHTML = `<li class="no-match">Aucun ustensil</li>`;
    }

    attachCreateUstensilsTagListener(arrSearchValues, arrAllRecipes);
}

// If there are filtered ustensils ? (display them into the ustensils list & attach a tag listener to them) : (display "Aucun ustensil")
const displaySearchBarCheckUstensils = (filteredUstensils, arrSearchValues, arrAllRecipes) => {
    const ustensilsList = document.querySelector('#ustensils-list');

    if (filteredUstensils.length > 0) {
        const htmlString = recipeFactory(filteredUstensils).getUstensil();
        ustensilsList.innerHTML = htmlString;
    } else {
        ustensilsList.innerHTML = `<li class="no-match">Aucun ustensil</li>`;
    }

    attachCreateUstensilsTagListener(arrSearchValues, arrAllRecipes);
}

// create a tag listener which fire on click the creation of a ustensils tag - refresh the global state keeper "arrSearchValues" - refresh the array of current Recipes & display all Elements
const attachCreateUstensilsTagListener = (arrSearchValues, arrAllRecipes) => {
    const ustensilsTags = document.querySelectorAll('.ustensil-tag');

    for (let i = 0; i < ustensilsTags.length; i++) {
        ustensilsTags[i].addEventListener('click', (e) => {
            const searchValue = e.target.textContent;

            createTag(searchValue, 'ustensil', arrSearchValues, arrAllRecipes);
            refreshArrSearchValues(searchValue, 'ustensil', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes);

            comboboxToggle().closeCombobox('ustensils');
        })
    }
}

export {
    displayUstensils,
    displaySearchBarCheckUstensils
};