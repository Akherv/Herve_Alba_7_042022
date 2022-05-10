import { cleanValue, cleanValueArrAppliances } from "../../utils/cleanValues.js";
import { displaySearchBarCheckAppliances } from "../../display/displayAppliances.js";
import { displayAppliances } from "../../display/displayAppliances.js";
import { createTag } from "../../factories/tag-factory.js";
import { refreshArrFilteredRecipes, refreshArrSearchValues } from "../../searchAlgos/refreshAll.js";
import displayAll from "../../display/displayAll.js";
import comboboxToggle from "./comboboxToggle.js";

const comboboxListenerAppliances = (recipes, arrSearchValues, arrAllRecipes) => {
    const btnComboboxAppliancesContainer = document.querySelector('#dropdown-input-appliances');
    const inputAppliances = document.querySelector('#input-appliances');
    const btnIngredients = document.querySelector('#btn-ingredients');
    const btnAppliances = document.querySelector('#btn-appliances');
    const appliancesList = document.querySelector('#appliances-list');

    // listener on click which call the function toggleOpeningCombobox which create || remove the style of custom combobox Appliance
    btnAppliances.addEventListener('click', comboboxToggle('appliances').toggleOpeningCombobox);

    // input keyup listener which begins at 3 letters & check if there is a match between searchValue & Appliance list item ? display match values : all Appliances
    inputAppliances.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (currentValueSize >= 3) {
            const arrAllAppliances = cleanValueArrAppliances(recipes)
            const filteredAppliances = arrAllAppliances.filter(el => cleanValue(el).includes(cleanValue(searchValue)))
            displaySearchBarCheckAppliances(filteredAppliances, arrSearchValues, arrAllRecipes)
        } else {
            displayAppliances(recipes)
        } 
    });

    // input Keydown Enter listener which begins at 3 letters - create a tag create - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes - display all filtered Elements & close the combobox
    inputAppliances.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
            e.preventDefault();
            createTag(searchValue, 'appliance', arrSearchValues, arrAllRecipes)
            refreshArrSearchValues(searchValue, 'appliance', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)
            document.querySelector('#form-appliances').reset();
            
           comboboxToggle().closeCombobox('appliances')
        }
    });

}


export default comboboxListenerAppliances