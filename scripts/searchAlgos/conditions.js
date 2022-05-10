import { cleanValue } from '../utils/cleanValues.js'
import { arrTagsByType } from '../factories/tag-factory.js'

// global condition
// const checkGlobalMatchConditions = (recipe, arrSearchValues) => {
//     const res = checkIndividualConditions(recipe, arrSearchValues)
//     return res
// }

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
        searchbarCondition(arrTagsByType(arrSearchValues, 'default'), recipe)
    )

}

// check if all val of an array are included into another array
const checkIfAllValMatch = (val, arrToCheck) => val.every(val => arrToCheck.some(el => el.includes(val)));

// check if all val of an array are included into another array
// const checkIfAllValMatchSomewhere = (val, arrToCheck) => val.map(el => {
//     // console.log(el,val,arrToCheck.some(el=>el.includes(val)))
//    return arrToCheck.some(el=>el.includes(val))
// });

// searchBar condition
const searchbarCondition = (val, recipe) => {
    let currentValue = val
    if (typeof (currentValue) === 'string') {
        currentValue = val.split()
    }
    let recipeTitle = recipe.name.split()
    let recipeDescription = recipe.description.split()
    let recipeIngredients = recipe.ingredients.flatMap(ingredient => ingredient.ingredient)

  
    return (
        checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeTitle)) ||
        checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeIngredients)) ||
        checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeDescription))
    )
}

// ingredients condition
const ingredientsCondition = (val, recipe) => {
    let currentValue = val
    let recipeIngredients = recipe.ingredients.flatMap(ingredient => ingredient.ingredient)
    return checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeIngredients))
}

// appliances condition
const appliancesCondition = (val, recipe) => {
    let currentValue = val
    let recipeAppliance = recipe.appliance.split()
    return checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeAppliance))
}

// ustensils condition
const ustensilsCondition = (val, recipe) => {
    let currentValue = val
    let recipeUstensils = recipe.ustensils
    return checkIfAllValMatch(cleanValue(currentValue), cleanValue(recipeUstensils))
  
}

export {
    checkIndividualConditions,
    checkIfAllValMatch,
    searchbarCondition,
    ingredientsCondition,
    // checkGlobalMatchConditions
}