import { cleanValue, cleanValueArrAppliances } from '../../utils/cleanValues.js';
import { displaySearchBarCheckAppliances } from '../../display/displayAppliances.js';
import { displayAppliances } from '../../display/displayAppliances.js';
import { createTag } from '../../factories/tag-factory.js';
import { refreshArrFilteredRecipes, refreshArrSearchValues } from '../../searchAlgos/refreshAll.js';
import displayAll from '../../display/displayAll.js';
import comboboxToggle from './comboboxToggle.js';

const comboboxListenerAppliances = (recipes, arrSearchValues, arrAllRecipes) => {
    const inputAppliances = document.querySelector('#input-appliances');
    const btnAppliances = document.querySelector('#btn-appliances');
    const formAppliances = document.querySelector(`#form-appliances`);

    // listener on click which call the function toggleOpeningCombobox which create || remove the style of custom combobox Appliance
    btnAppliances.addEventListener('click', comboboxToggle('appliances').toggleOpeningCombobox);

    // input keyup listener which begins at 3 letters & check if there is a match between searchValue & Appliance list item ? display match values : all Appliances
    inputAppliances.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if ((currentValueSize >= 3) || (currentValueSize < 3 && arrSearchValues.length > 0)) {
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            const arrAllAppliances = cleanValueArrAppliances(filteredRecipes);
            const filteredAppliances = [];
             for (let i = 0; i < arrAllAppliances.length; i++) {
                 const result = cleanValue(arrAllAppliances[i]).includes(cleanValue(searchValue));    
                 if (result) {
                    filteredAppliances.push(arrAllAppliances[i]);
                 }
             }
            displaySearchBarCheckAppliances(filteredAppliances, arrSearchValues, arrAllRecipes);
        } else {
            displayAppliances(recipes, arrSearchValues, arrAllRecipes);
        }
    });

    // click global listener to refresh filtered Dropdown list if the user begin to write a search but click outside the current dropdown. Then  this reset the list with the current appliances before click event.
    document.addEventListener('click', function (event) {
        const isClickInside = formAppliances.contains(event.target);

        // const formAppliancesChild = [...formAppliances.children];
        // for (let i = 0; i < formAppliancesChild.length; i++) {
        //   formAppliancesChild[i].parentElement.contains(event.target)
        // }

        if (!isClickInside) {
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            const arrAllAppliances = cleanValueArrAppliances(filteredRecipes);
            const filteredAppliances = arrAllAppliances;
            displaySearchBarCheckAppliances(filteredAppliances, arrSearchValues, arrAllRecipes);
        }
    });

    // input Keydown Enter listener which begins at 3 letters - create a tag create - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes - display all filtered Elements & close the combobox
    inputAppliances.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
            e.preventDefault();
            createTag(searchValue, 'appliance', arrSearchValues, arrAllRecipes);
            refreshArrSearchValues(searchValue, 'appliance', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes);
            document.querySelector('#form-appliances').reset();

            comboboxToggle('appliances').closeCombobox('appliances');
        }
    });
}

export default comboboxListenerAppliances;