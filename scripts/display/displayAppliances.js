import { cleanValueArrAppliances } from '../utils/cleanValues.js';
import recipeFactory from '../factories/recipe-factory.js';
import { createTag } from '../factories/tag-factory.js';
import { refreshArrSearchValues } from '../searchAlgos/refreshAll.js';
import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import displayAll from './displayAll.js';
import comboboxToggle from './../listeners/combobox/comboboxToggle.js';

// If there are recipes in the array of current recipes ? (clean the appliances values, display them into the appliance list & attach a tag listener to them) : (display "Aucun appareil")
const displayAppliances = (currentRecipes, arrSearchValues, arrAllRecipes) => {
    const appliancesList = document.querySelector('#appliances-list');

    if (currentRecipes.length > 0) {
        const arrAppliances = cleanValueArrAppliances(currentRecipes);
        const htmlString = recipeFactory(arrAppliances).getAppliance();
        appliancesList.innerHTML = htmlString;
    } else {
        appliancesList.innerHTML = `<li class="no-match">Aucun appareil</li>`;
    }

    attachCreateAppliancesTagListener(arrSearchValues, arrAllRecipes);
}

// If there are filtered appliances ? (display them into the appliances list & attach a tag listener to them) : (display "Aucun appareil")
const displaySearchBarCheckAppliances = (filteredAppliances, arrSearchValues, arrAllRecipes) => {
    const appliancesList = document.querySelector('#appliances-list');

    if (filteredAppliances.length > 0) {
        const htmlString = recipeFactory(filteredAppliances).getAppliance();
        appliancesList.innerHTML = htmlString;
    } else {
        appliancesList.innerHTML = `<li class="no-match">Aucun appareil</li>`;
    }

    attachCreateAppliancesTagListener(arrSearchValues, arrAllRecipes);
}

// create a tag listener which fire on click the creation of a appliance tag - refresh the global state keeper "arrSearchValues" - refresh the array of current Recipes & display all Elements
const attachCreateAppliancesTagListener = (arrSearchValues, arrAllRecipes) => {
    document.querySelectorAll('.appliance-tag').forEach((el) => {
        el.addEventListener('click', (e) => {
            const searchValue = e.target.textContent;

            createTag(searchValue, 'appliance', arrSearchValues, arrAllRecipes);
            refreshArrSearchValues(searchValue, 'appliance', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes);

            comboboxToggle().closeCombobox('appliances');
        })
    });
}

export {
    displayAppliances,
    displaySearchBarCheckAppliances
};