import { cleanValue, cleanValueArrUstensils } from "../../utils/cleanValues.js";
import { displayUstensils, displaySearchBarCheckUstensils  } from "../../display/displayUstensils.js";
import { createTag } from "../../factories/tag-factory.js";
import { refreshArrFilteredRecipes, refreshArrSearchValues } from "../../searchAlgos/refreshAll.js";
import displayAll from "../../display/displayAll.js";
import comboboxToggle from "./comboboxToggle.js";

const comboboxListenerUstensils = (recipes, arrSearchValues, arrAllRecipes) => {
    const btnComboboxUstensilsContainer = document.querySelector('#dropdown-input-ustensils');
    const inputUstensils = document.querySelector('#input-ustensils');
    const btnIngredients = document.querySelector('#btn-ingredients');
    const btnUstensils = document.querySelector('#btn-ustensils');
    const ustensilsList = document.querySelector('#ustensils-list');

    // listener on click which call the function toggleOpeningCombobox which create || remove the style of custom combobox Ustensil
    btnUstensils.addEventListener('click', comboboxToggle('ustensils').toggleOpeningCombobox);

    // input keyup listener which begins at 3 letters & check if there is a match between searchValue & Ustensil list item ? display match values : all Ustensils
    inputUstensils.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (currentValueSize >= 3) {
            const arrAllUstensils = cleanValueArrUstensils(recipes)
            const filteredUstensils = arrAllUstensils.filter(el => cleanValue(el).includes(cleanValue(searchValue)))
            displaySearchBarCheckUstensils(filteredUstensils, arrSearchValues, arrAllRecipes)
        } else {
            displayUstensils(recipes)
        } 
    });

    // input Keydown Enter listener which begins at 3 letters - create a tag create - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes - display all filtered Elements & close the combobox
    inputUstensils.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
            e.preventDefault();
            createTag(searchValue, 'ustensil', arrSearchValues, arrAllRecipes)
            refreshArrSearchValues(searchValue, 'ustensil', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)
            document.querySelector('#form-ustensils').reset();
            
           comboboxToggle().closeCombobox('ustensils')
        }
    });

}


export default comboboxListenerUstensils