import { cleanValue, cleanValueArrUstensils } from '../../utils/cleanValues.js';
import { createTag } from '../../factories/tag-factory.js';
import { refreshArrFilteredRecipes, refreshArrSearchValues } from '../../searchAlgos/refreshAll.js';
import { displayUstensils, displaySearchBarCheckUstensils  } from '../../display/displayUstensils.js';
import displayAll from '../../display/displayAll.js';
import comboboxToggle from './comboboxToggle.js';

const comboboxListenerUstensils = (recipes, arrSearchValues) => {
    const inputUstensils = document.querySelector('#input-ustensils');
    const btnUstensils = document.querySelector('#btn-ustensils');
    const formUstensils = document.querySelector(`#form-ustensils`);

    // listener on click which call the function toggleOpeningCombobox which create || remove the style of custom combobox Ustensil
    btnUstensils.addEventListener('click', comboboxToggle('ustensils').toggleOpeningCombobox);

    // input keyup listener which begins at 3 letters & check if there is a match between searchValue & Ustensil list item ? display match values : all Ustensils
    inputUstensils.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;
        const tagSize = arrSearchValues.length;

        if ((currentValueSize >= 3) || (currentValueSize < 3 && tagSize > 0)) {
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            const arrAllUstensils = cleanValueArrUstensils(filteredRecipes);
            const filteredUstensils = [];
            for (let i = 0; i < arrAllUstensils.length; i++) {
                const result = cleanValue(arrAllUstensils[i]).includes(cleanValue(searchValue));
                if (result) {
                    filteredUstensils.push(arrAllUstensils[i]);
                }
            }
            displaySearchBarCheckUstensils(filteredUstensils, arrSearchValues);
        } else {
            displayUstensils(recipes, arrSearchValues);
        }
    });

    // click global listener aim to refresh filtered Dropdown list if the user begin to write a search but click outside the current dropdown. Then  reset the list with the current ustensils before click event.
    document.addEventListener('click', function (event) {
        const isClickInside = formUstensils.contains(event.target);

        if (!isClickInside) {
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            const arrAllUstensils = cleanValueArrUstensils(filteredRecipes);
            const filteredUstensils = arrAllUstensils;
            displaySearchBarCheckUstensils(filteredUstensils, arrSearchValues);
        }
    })

    // input Keydown Enter listener which begins at 3 letters - if no duplicate, create a tag - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes - display all filtered Elements & close the combobox : reset input value 
    inputUstensils.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;
        const arrSearchValuesSize = arrSearchValues.length;

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
                    createTag(searchValue, 'ustensil', arrSearchValues);
                    refreshArrSearchValues(searchValue, 'ustensil', arrSearchValues);
                    const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
                    displayAll(filteredRecipes, arrSearchValues);
                    comboboxToggle().closeCombobox('ustensils');
                } else {
                    inputUstensils.value = '';
                }
            } else if (currentValueSize < 3) {
                inputUstensils.value = '';
            }
        }
    });
}

export default comboboxListenerUstensils;