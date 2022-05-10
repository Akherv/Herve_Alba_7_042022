import {displayIngredients} from "./displayIngredients.js";
import {displayAppliances} from './displayAppliances.js';
import displayUstensils from './displayUstensils.js';
import displayRecipes from './displayRecipes.js';

const displayAll = (currentRecipes, arrSearchValues, arrAllRecipes) => {
    displayIngredients(currentRecipes,arrSearchValues, arrAllRecipes);
    displayAppliances(currentRecipes, arrSearchValues, arrAllRecipes);
    displayUstensils(currentRecipes, arrSearchValues, arrAllRecipes);
    displayRecipes(currentRecipes, arrSearchValues, arrAllRecipes);
}

export default displayAll