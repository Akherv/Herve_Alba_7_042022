import { cleanValue, cleanValueArrIngredients } from '../../utils/cleanValues.js';
import { displaySearchBarCheckIngredients } from '../../display/displayIngredients.js';
import { displayIngredients } from '../../display/displayIngredients.js';
import { createTag } from '../../factories/tag-factory.js';
import { refreshArrFilteredRecipes, refreshArrSearchValues } from '../../searchAlgos/refreshAll.js';
import displayAll from '../../display/displayAll.js';
import comboboxToggle from './comboboxToggle.js';

const comboboxListenerIngredients = (recipes, arrSearchValues, arrAllRecipes) => {
    const inputIngredients = document.querySelector('#input-ingredients');
    const btnIngredients = document.querySelector('#btn-ingredients');
    const formIngredients = document.querySelector(`#form-ingredients`);

    // listener on click which call the function toggleOpeningCombobox which create || remove the style of custom combobox Ingredient
    btnIngredients.addEventListener('click', comboboxToggle('ingredients').toggleOpeningCombobox);

    // input keyup listener which begins at 3 letters & check if there is a match between searchValue & ingredient list item ? display match values : all ingredients
    inputIngredients.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if ((currentValueSize >= 3) || (currentValueSize < 3 && arrSearchValues.length > 0)) {
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            const arrAllIngredients = cleanValueArrIngredients(filteredRecipes);
            const filteredIngredients = [];
            for (let i = 0; i < arrAllIngredients.length; i++) {
                const result = cleanValue(arrAllIngredients[i]).includes(cleanValue(searchValue));    
                if (result) {
                   filteredIngredients.push(arrAllIngredients[i]);
                }
            }
            displaySearchBarCheckIngredients(filteredIngredients, arrSearchValues, arrAllRecipes);
        } else {
            displayIngredients(recipes, arrSearchValues, arrAllRecipes);
        }
    });

    // click global listener to refresh filtered Dropdown list if the user begin to write a search but click outside the current dropdown. Then  this reset the list with the current ingredients before click event.
    document.addEventListener('click', function (event) {
        const isClickInside = formIngredients.contains(event.target);
        
        if (!isClickInside) {
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            const arrAllIngredients = cleanValueArrIngredients(filteredRecipes);
            const filteredIngredients = arrAllIngredients;
            displaySearchBarCheckIngredients(filteredIngredients, arrSearchValues, arrAllRecipes);
        }
    });

    // input Keydown Enter listener which begins at 3 letters - create a tag create - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes - display all filtered Elements & close the combobox
    inputIngredients.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
            e.preventDefault();
            createTag(searchValue, 'ingredient', arrSearchValues, arrAllRecipes);
            refreshArrSearchValues(searchValue, 'ingredient', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes);
            document.querySelector('#form-ingredients').reset();

            comboboxToggle().closeCombobox('ingredients');
        }
    });
}

export default comboboxListenerIngredients;