import { cleanValue, cleanValueArrIngredients } from "../../utils/cleanValues.js";
import { displaySearchBarCheckIngredients } from "../../display/displayIngredients.js";
import { displayIngredients } from "../../display/displayIngredients.js";
import { createTag } from "../../factories/tag-factory.js";
import { refreshArrFilteredRecipes, refreshArrSearchValues } from "../../searchAlgos/refreshAll.js";
import displayAll from "../../display/displayAll.js";
import comboboxToggle from "./comboboxToggle.js";


const comboboxListenerIngredients = (recipes, arrSearchValues, arrAllRecipes) => {
    const btnComboboxIngredientsContainer = document.querySelector('#dropdown-input-ingredients');
    const inputIngredients = document.querySelector('#input-ingredients');
    const btnIngredients = document.querySelector('#btn-ingredients');
    const ingredientsList = document.querySelector('#ingredients-list');

    // listener on click which call the function toggleOpeningCombobox which create || remove the style of custom combobox Ingredient
    btnIngredients.addEventListener('click', comboboxToggle('ingredients').toggleOpeningCombobox);

    // input keyup listener which begins at 3 letters & check if there is a match between searchValue & ingredient list item ? display match values : all ingredients
    inputIngredients.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (currentValueSize >= 3) {
            const arrAllIngredients = cleanValueArrIngredients(recipes)
            const filteredIngredients = arrAllIngredients.filter(el => cleanValue(el).includes(cleanValue(searchValue)))
            displaySearchBarCheckIngredients(filteredIngredients, arrSearchValues, arrAllRecipes)
        } else {
            displayIngredients(recipes)
        } 
    });

    // input Keydown Enter listener which begins at 3 letters - create a tag create - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes - display all filtered Elements & close the combobox
    inputIngredients.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
            e.preventDefault();
            createTag(searchValue, 'ingredient', arrSearchValues, arrAllRecipes)
            refreshArrSearchValues(searchValue, 'ingredient', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)
            document.querySelector('#form-ingredients').reset();
            
            comboboxToggle().closeCombobox('ingredients')

        }
    });

        // const onClickOutside = (e) => {
    //     if (!e.target.className.includes(dropdown-input) && !$(event.target).parents("#foo").is("#foo")) {
    //         btnComboboxContainer.classList.remove('container-input-show');
    //     btnIngredients.classList.remove('btn-input-show');
    //     btnIngredients.classList.remove('show');
    //     btnIngredients.firstChild.textContent = 'Ingrédients';
    //     inputIngredients.classList.remove('input-show');
    //     ingredientsList.classList.remove('show');
    //     }
    //   };
    //   window.addEventListener("click", onClickOutside);

    // inputIngredients.addEventListener('click', (e) => {
    //     if (!inputIngredients.contains(e.target) ) {
    //     btnComboboxContainer.classList.remove('container-input-show');
    //     btnIngredients.classList.remove('btn-input-show');
    //     btnIngredients.classList.remove('show');
    //     btnIngredients.firstChild.textContent = 'Ingrédients';
    //     inputIngredients.classList.remove('input-show');
    //     ingredientsList.classList.remove('show');
    //     }
    // });

    
}


export default comboboxListenerIngredients