import { cleanValue, cleanValueArrAppliances } from "../utils/cleanValues.js";
import recipeFactory from "../factories/recipe-factory.js";
import { createTag } from "../factories/tag-factory.js";
import { refreshArrSearchValues } from "../searchAlgos/refreshAll.js";
import { refreshArrFilteredRecipes } from "../searchAlgos/refreshAll.js";
import displayAll from "./displayAll.js";
import comboboxToggle from "./../listeners/combobox/comboboxToggle.js";
import comboboxListenerAppliances from "../listeners/combobox/comboboxListenerAppliances.js";

// If there are recipes in the array of current recipes ? clean the appliances values, display them into the appliance list & attach a tag listener to them : display "no match"
const displayAppliances = (currentRecipes, arrSearchValues, arrAllRecipes) => {
    const appliancesList = document.querySelector('#appliances-list');

    if (currentRecipes.length > 0) {
        const arrAppliances = cleanValueArrAppliances(currentRecipes)
        const htmlString = recipeFactory(arrAppliances).getAppliance();
        appliancesList.innerHTML = htmlString; 
    } else {
        appliancesList.innerHTML = `<li class="no-match">No match</li>`;
    }

  attachCreateAppliancesTagListener(arrSearchValues, arrAllRecipes)
}

// If there are filtered appliances ? display them into the appliances list & attach a tag listener to them : display "no match"
const displaySearchBarCheckAppliances = (filteredAppliances, arrSearchValues, arrAllRecipes) => {
    const appliancesList = document.querySelector('#appliances-list');

    if (filteredAppliances.length > 0) {
    const htmlString = recipeFactory(filteredAppliances).getAppliance();
    appliancesList.innerHTML = htmlString;
    } else {
    appliancesList.innerHTML = `<li class="no-match">No match</li>`;

    // document.querySelector('#input-appliances').removeEventListener('keyup', comboboxListenerAppliances().filterAppliances(e))
    }

    attachCreateAppliancesTagListener(arrSearchValues, arrAllRecipes)
}

// create a tag listener which fire on click the creation of a appliance tag - refresh the global state keeper "arrSearchValues" - refresh the array of current Recipes & display all Elements
const attachCreateAppliancesTagListener = (arrSearchValues, arrAllRecipes) => {
    // console.log('---->',arrSearchValues)
    document.querySelectorAll('.appliance-tag').forEach((el) => {
        el.addEventListener('click', (e) => {
            // const searchValue = cleanValue(e.target.textContent);
            const searchValue = e.target.textContent;
            createTag(searchValue, 'appliance', arrSearchValues, arrAllRecipes)
            refreshArrSearchValues(el.textContent, 'appliance', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)

            comboboxToggle().closeCombobox('appliances')

        })
    });
}


export {displayAppliances, displaySearchBarCheckAppliances}