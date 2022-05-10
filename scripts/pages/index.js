
import recipes from '../../data/recipes.js'
import displayAll from '../display/displayAll.js'
import searchBarListener from '../listeners/searchBar/searchBarListener.js'
import comboboxListenerIngredients from '../listeners/combobox/comboboxListenerIngredients.js'
import comboboxListenerAppliances from '../listeners/combobox/comboboxListenerAppliances.js'
// import refreshGlobalStateListener from '../listeners/globalStateListener.js'


// arrays
let arrAllRecipes = recipes;
let arrSearchValues = [];


// Initialisation
function init() {
    displayAll(recipes, arrSearchValues, arrAllRecipes)
    searchBarListener(arrAllRecipes, arrSearchValues)
    comboboxListenerIngredients(recipes, arrSearchValues, arrAllRecipes)
    comboboxListenerAppliances(recipes, arrSearchValues, arrAllRecipes)
    // refreshGlobalStateListener(arrSearchValues)
};
init();


