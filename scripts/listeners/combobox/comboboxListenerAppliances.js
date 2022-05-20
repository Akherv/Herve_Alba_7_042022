import { cleanValue, cleanValueArrAppliances } from '../../utils/cleanValues.js';
import { createTag } from '../../factories/tag-factory.js';
import { refreshArrFilteredRecipes, refreshArrSearchValues } from '../../searchAlgos/refreshAll.js';
import { displayAppliances, displaySearchBarCheckAppliances } from '../../display/displayAppliances.js';
import displayAll from '../../display/displayAll.js';
import comboboxToggle from './comboboxToggle.js';

const comboboxListenerAppliances = (recipes, arrSearchValues) => {
    const inputAppliances = document.querySelector('#input-appliances');
    const btnAppliances = document.querySelector('#btn-appliances');
    const formAppliances = document.querySelector(`#form-appliances`);

    // listener on click which call the function toggleOpeningCombobox which create || remove the style of custom combobox Appliance
    btnAppliances.addEventListener('click', comboboxToggle('appliances').toggleOpeningCombobox);

    // input keyup listener which begins at 3 letters & check if there is a match between searchValue & Appliance list item ? display match values : all Appliances
    inputAppliances.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;
        const tagSize = arrSearchValues.length;

        if ((currentValueSize >= 3) || (currentValueSize < 3 && tagSize > 0)) {
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            const arrAllAppliances = cleanValueArrAppliances(filteredRecipes);
            const filteredAppliances = [];
            for (let i = 0; i < arrAllAppliances.length; i++) {
                const result = cleanValue(arrAllAppliances[i]).includes(cleanValue(searchValue));
                if (result) {
                    filteredAppliances.push(arrAllAppliances[i]);
                }
            }
            displaySearchBarCheckAppliances(filteredAppliances, arrSearchValues);
        } else {
            displayAppliances(recipes, arrSearchValues);
        }
    });

    // click global listener aim to refresh filtered Dropdown list if the user begin to write a search but click outside the current dropdown. Then reset the list with the current appliances before click event.
    document.addEventListener('click', function (event) {
        const isClickInside = formAppliances.contains(event.target);

        if (!isClickInside) {
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            const arrAllAppliances = cleanValueArrAppliances(filteredRecipes);
            const filteredAppliances = arrAllAppliances;
            displaySearchBarCheckAppliances(filteredAppliances, arrSearchValues);
        }
    });

    // input Keydown Enter listener which begins at 3 letters - if no duplicate, create a tag - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes - display all filtered Elements & close the combobox : reset input value 
    inputAppliances.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if ((e.key || e.code) === ('Enter' || 13)) {
            e.preventDefault();
            if (currentValueSize >= 3) {
                let duplicateName;
                for (let i = 0; i < arrSearchValuesSize; i++) {
                    if (arrSearchValues[i].name === searchValue) {
                        duplicateName = true;
                        break;
                    }
                }
                if (!duplicateName) {
                    createTag(searchValue, 'appliance', arrSearchValues);
                    refreshArrSearchValues(searchValue, 'appliance', arrSearchValues);
                    const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
                    displayAll(filteredRecipes, arrSearchValues);
                    comboboxToggle().closeCombobox('appliances');
                } else {
                    inputAppliances.value = '';
                }
            } else if (currentValueSize < 3) {
                inputAppliances.value = '';
            }
        }
    });
}

export default comboboxListenerAppliances;