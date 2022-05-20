import { cleanValueArrAppliances } from '../utils/cleanValues.js';
import { createTag } from '../factories/tag-factory.js';
import { refreshArrSearchValues } from '../searchAlgos/refreshAll.js';
import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import recipeFactory from '../factories/recipe-factory.js';
import displayAll from './displayAll.js';
import comboboxToggle from './../listeners/combobox/comboboxToggle.js';

// If there are recipes in the array of current recipes ? (clean the appliances values, display them into the appliance list & attach a tag listener to them) : (display "Aucun appareil")
const displayAppliances = (currentRecipes, arrSearchValues) => {
    const appliancesList = document.querySelector('#appliances-list');
    const currentRecipesSize = currentRecipes.length;

    if (currentRecipesSize > 0) {
        const arrAppliances = cleanValueArrAppliances(currentRecipes);
        const htmlString = recipeFactory(arrAppliances).getAppliance();
        appliancesList.innerHTML = htmlString;
    } else {
        appliancesList.innerHTML = `<li class="no-match">Aucun appareil</li>`;
    }

    attachCreateAppliancesTagListener(arrSearchValues);
}

// If there are filtered appliances ? (display them into the appliances list & attach a tag listener to them) : (display "Aucun appareil")
const displaySearchBarCheckAppliances = (filteredAppliances, arrSearchValues) => {
    const appliancesList = document.querySelector('#appliances-list');
    const filteredAppliancesSize = filteredAppliances.length;

    if (filteredAppliancesSize > 0) {
        const htmlString = recipeFactory(filteredAppliances).getAppliance();
        appliancesList.innerHTML = htmlString;
    } else {
        appliancesList.innerHTML = `<li class="no-match">Aucun appareil</li>`;
    }

    attachCreateAppliancesTagListener(arrSearchValues);
}

// create a tag listener which fire on click the creation of a appliance tag - refresh the global state keeper "arrSearchValues" - refresh the array of current Recipes & display all Elements
const attachCreateAppliancesTagListener = (arrSearchValues) => {
    const appliancesTags = document.querySelectorAll('.appliance-tag');
    const appliancesTagsSize =appliancesTags.length;

    for (let i = 0; i < appliancesTagsSize; i++) {
        appliancesTags[i].addEventListener('click', (e) => {
            const searchValue = e.target.textContent;

            createTag(searchValue, 'appliance', arrSearchValues);
            refreshArrSearchValues(searchValue, 'appliance', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);

            comboboxToggle().closeCombobox('appliances');
        });
    }
}

export {
    displayAppliances,
    displaySearchBarCheckAppliances
};