import { cleanValue } from '../utils/cleanValues.js';
import { arrTagsByType } from '../factories/tag-factory.js';

// According to value type & check if of all values of the same type match their individual condition
const checkIndividualConditions = (recipe, arrSearchValues) => {

    return arrSearchValues.map(el =>
        (el.type === 'searchBar') ?
        searchbarCondition(el.name, recipe) :
        (el.type === 'ingredient') ?
        ingredientsCondition(arrTagsByType(arrSearchValues, 'ingredient'), recipe) :
        (el.type === 'appliance') ?
        appliancesCondition(arrTagsByType(arrSearchValues, 'appliance'), recipe) :
        (el.type === 'ustensil') ?
        ustensilsCondition(arrTagsByType(arrSearchValues, 'ustensil'), recipe) :
        defaultCondition(arrTagsByType(arrSearchValues, 'default'), recipe)
    );
}

// check if all val of an array are included into another array
const checkIfAllValMatch = (val, arrToCheck) => val.every(val => arrToCheck.some(el => el.includes(val)));

// searchBar condition
const searchbarCondition = (val, recipe) => {
    let currentValue = val;
    if (typeof (currentValue) === 'string') {
        currentValue = val.split();
    }
    const recipeTitle = recipe.name.split();
    const recipeDescription = recipe.description.split();
    const recipeIngredients = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
        const result = recipe.ingredients[i].ingredient;
        recipeIngredients.push(result);
    }

    return (
        checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeTitle)) ||
        checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeIngredients)) ||
        checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeDescription))
    )
}

// ingredients condition
const ingredientsCondition = (val, recipe) => {
    const currentValue = val;
    const recipeIngredients = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
        const result = recipe.ingredients[i].ingredient;
        recipeIngredients.push(result);
    }
    return checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeIngredients));
}

// appliances condition
const appliancesCondition = (val, recipe) => {
    const currentValue = val;
    const recipeAppliance = recipe.appliance.split();
    return checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeAppliance));
}

// ustensils condition
const ustensilsCondition = (val, recipe) => {
    const currentValue = val;
    const recipeUstensils = recipe.ustensils;
    return checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeUstensils));
}

// default condition
const defaultCondition = (val, recipe) => {
    let currentValue = val;
    if (typeof (currentValue) === 'string') {
        currentValue = val.split();
    }
    const recipeTitle = recipe.name.split();
    const recipeDescription = recipe.description.split();
    const recipeIngredients = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
        const result = recipe.ingredients[i].ingredient;
        recipeIngredients.push(result);
    }
    const globalArr = [...recipeTitle, ...recipeDescription, ...recipeIngredients];

    return (
        checkIfAllValMatch(cleanValue(currentValue), cleanValue(globalArr))
    )
}

export {
    checkIndividualConditions,
    checkIfAllValMatch,
    searchbarCondition,
    ingredientsCondition
};