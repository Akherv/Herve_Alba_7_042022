import recipes from '../../data/recipes.js';
import displayAll from '../display/displayAll.js';
import searchBarListener from '../listeners/searchBar/searchBarListener.js';
import comboboxListenerIngredients from '../listeners/combobox/comboboxListenerIngredients.js';
import comboboxListenerAppliances from '../listeners/combobox/comboboxListenerAppliances.js';
import comboboxListenerUstensils from '../listeners/combobox/comboboxListenerUstensils.js';

// global arrays of recipes & the global state "arrSearchValues" (which will contains obj of the different type of search values)
const arrAllRecipes = recipes;
const arrSearchValues = [];

// Initialisation
(function init() {
    displayAll(recipes, arrSearchValues, arrAllRecipes);
    searchBarListener(arrAllRecipes, arrSearchValues);
    comboboxListenerIngredients(recipes, arrSearchValues, arrAllRecipes);
    comboboxListenerAppliances(recipes, arrSearchValues, arrAllRecipes);
    comboboxListenerUstensils(recipes, arrSearchValues, arrAllRecipes);
}());