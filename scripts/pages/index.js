import recipes from '../../data/recipes.js';
import displayAll from '../display/displayAll.js';
import searchBarListener from '../listeners/searchBar/searchBarListener.js';
import comboboxListenerIngredients from '../listeners/combobox/comboboxListenerIngredients.js';
import comboboxListenerAppliances from '../listeners/combobox/comboboxListenerAppliances.js';
import comboboxListenerUstensils from '../listeners/combobox/comboboxListenerUstensils.js';

// global state "arrSearchValues" (which will contains obj of the different type of search values)
const arrSearchValues = [];

// Initialisation
(function init() {
    displayAll(recipes, arrSearchValues);
    searchBarListener(arrSearchValues);
    comboboxListenerIngredients(recipes, arrSearchValues);
    comboboxListenerAppliances(recipes, arrSearchValues);
    comboboxListenerUstensils(recipes, arrSearchValues);
}());