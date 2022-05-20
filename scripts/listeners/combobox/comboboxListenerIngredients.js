import { cleanValue, cleanValueArrIngredients } from '../../utils/cleanValues.js';
import { createTag } from '../../factories/tag-factory.js';
import { refreshArrFilteredRecipes, refreshArrSearchValues } from '../../searchAlgos/refreshAll.js';
import { displayIngredients, displaySearchBarCheckIngredients } from '../../display/displayIngredients.js';
import displayAll from '../../display/displayAll.js';
import comboboxToggle from './comboboxToggle.js';

const comboboxListenerIngredients = (recipes, arrSearchValues) => {
    const inputIngredients = document.querySelector('#input-ingredients');
    const btnIngredients = document.querySelector('#btn-ingredients');
    const formIngredients = document.querySelector(`#form-ingredients`);

    // listener on click which call the function toggleOpeningCombobox which create || remove the style of custom combobox Ingredient
    btnIngredients.addEventListener('click', comboboxToggle('ingredients').toggleOpeningCombobox);

    // input keyup listener which begins at 3 letters & check if there is a match between searchValue & ingredient list item ? display match values : all ingredients
    inputIngredients.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;
        const tagSize = arrSearchValues.length;

        if ((currentValueSize >= 3) || (currentValueSize < 3 && tagSize > 0)) {
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            const arrAllIngredients = cleanValueArrIngredients(filteredRecipes);
            const filteredIngredients = [];
            for (let i = 0; i < arrAllIngredients.length; i++) {
                const result = cleanValue(arrAllIngredients[i]).includes(cleanValue(searchValue));
                if (result) {
                    filteredIngredients.push(arrAllIngredients[i]);
                }
            }
            displaySearchBarCheckIngredients(filteredIngredients, arrSearchValues);
        } else {
            displayIngredients(recipes, arrSearchValues);
        }
    });

    // click global listener aim to refresh filtered Dropdown list if the user begin to write a search but click outside the current dropdown. Then  reset the list with the current ingredients before click event.
    document.addEventListener('click', function (event) {
        const isClickInside = formIngredients.contains(event.target);

        if (!isClickInside) {
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            const arrAllIngredients = cleanValueArrIngredients(filteredRecipes);
            const filteredIngredients = arrAllIngredients;
            displaySearchBarCheckIngredients(filteredIngredients, arrSearchValues);
        }
    });

    // input Keydown Enter listener which begins at 3 letters - if no duplicate, create a tag - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes - display all filtered Elements & close the combobox : reset input value 
    inputIngredients.addEventListener('keydown', (e) => {
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
                    createTag(searchValue, 'ingredient', arrSearchValues);
                    refreshArrSearchValues(searchValue, 'ingredient', arrSearchValues);
                    const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
                    displayAll(filteredRecipes, arrSearchValues);
                    comboboxToggle().closeCombobox('ingredients');
                } else {
                    inputIngredients.value = '';
                }
            } else if (currentValueSize < 3) {
                inputIngredients.value = '';
            }
        }
    });
}

export default comboboxListenerIngredients;