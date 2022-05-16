import createSearchValuesObj from '../factories/searchValuesObj-factory.js';
import { checkIndividualConditions } from './conditions.js';

// manage the I/O of the global state "arrSearchValues" & fire the searchValueObj-factory to structure the array on creation of a new obj
const refreshArrSearchValues = (searchValue, type, arrSearchValues) => {

    // case : type === 'searchBar' 
    // searchValue >= 3 & (tags = 0) => create a new searchValObj of type 'searchBar'
    //                  & (tags > 0) => tag type 'searchBar' ? (replace searchValObj of type 'searchBar' with the current val) : (create a new searchValObj of type 'searchBar')
    // searchValue < 3 & (tags >= 0) => tag type 'searchBar' ? remove tag of type 'searchBar'
    if (type === 'searchBar') {
        if (searchValue.length >= 3) {
            if (arrSearchValues.length === 0) {
                arrSearchValues.push(createSearchValuesObj(searchValue, type));
            } else {
                const res = arrSearchValues.some((el) => el.type.includes(type));
                if (res === true) {
                    arrSearchValues.forEach((el, idx) => {
                        if (el.type === 'searchBar') {
                            arrSearchValues.splice(idx, 1, createSearchValuesObj(searchValue, type));
                        }
                    })
                } else {
                    arrSearchValues.push(createSearchValuesObj(searchValue, type));
                }
            }
        } else {
            if (arrSearchValues.length >= 0) {
                arrSearchValues.forEach((el, idx) => {
                    if (el.type === 'searchBar') {
                        arrSearchValues.splice(idx, 1);
                    }
                });
            }
        }
    }

    // case : other type
    // searchValue >= 3 & (tags > 0) => if there is a tag with the same name ? (replace this searchValObj with the current val) : (create a new searchValObj of this type)
    //                  & (tags = 0) => create a new searchValObj of this type
    if (type !== 'searchBar' && searchValue.length >= 3) {
        const res = arrSearchValues.some((el) => el.name.includes(searchValue));
        if (arrSearchValues.length > 0) {
            if (res === true) {
                arrSearchValues.forEach((el, idx) => {
                    if (el.name === searchValue) {
                        arrSearchValues.splice(idx, 1, createSearchValuesObj(searchValue, type));
                    }
                })
            } else {
                arrSearchValues.push(createSearchValuesObj(searchValue, type));
            }
        } 
        else {
            arrSearchValues.push(createSearchValuesObj(searchValue, type));
        }
    }
}

// filter each recipe which match the global check of all the individuals conditions given by type of object which are in the global state "arrSearchValues" at this moment
const refreshArrFilteredRecipes = (arrAllRecipes, arrSearchValues) => {
    const refreshRecipes = arrAllRecipes.filter(recipe => {
        const res = checkIndividualConditions(recipe, arrSearchValues);
        if (res.every(el => el === true)) {
            return recipe;
        }
    })
    return refreshRecipes;
}

export {
    refreshArrSearchValues,
    refreshArrFilteredRecipes
};