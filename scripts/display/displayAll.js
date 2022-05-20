import { displayIngredients } from "./displayIngredients.js";
import { displayAppliances } from './displayAppliances.js';
import { displayUstensils } from './displayUstensils.js';
import displayRecipes from './displayRecipes.js';

const displayAll = (currentRecipes, arrSearchValues) => {
    displayIngredients(currentRecipes, arrSearchValues);
    displayAppliances(currentRecipes, arrSearchValues);
    displayUstensils(currentRecipes, arrSearchValues);
    displayRecipes(currentRecipes, arrSearchValues);
}

export default displayAll;