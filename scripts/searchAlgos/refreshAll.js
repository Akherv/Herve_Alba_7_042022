import createSearchValuesObj from '../factories/searchValuesObj-factory.js';
import { checkIndividualConditions } from './conditions.js';
import recipes from '../../data/recipes.js';
// manage the I/O of the global state "arrSearchValues" & fire the searchValueObj-factory to structure the array on creation of a new obj
const refreshArrSearchValues = (searchValue, type, arrSearchValues) => {

    // case : type === 'searchBar' 
    // searchValuesize >= 3 & (tags === 0) => create a new searchValObj of type 'searchBar'
    //                  & (tags > 0) => check if duplicate tag type 'searchBar' ? (replace searchValObj of type 'searchBar' with the current val) : (create a new searchValObj of type 'searchBar')
    // searchValueSize < 3 & (tags >= 0) => check if duplicate tag type 'searchBar' ? remove tag of type 'searchBar'
    if (type === 'searchBar') {
        const searchValueSize = searchValue.length;
        const arrSearchValuesSize = arrSearchValues.length;
        if (searchValueSize >= 3) {
            if (arrSearchValuesSize === 0) {
                arrSearchValues.push(createSearchValuesObj(searchValue, type));
            } else {
                let duplicate;
                for (let i = 0; i < arrSearchValuesSize; i++) {
                    if (arrSearchValues[i].type === type) {
                        duplicate = true;
                        break;
                    }
                }
                if (duplicate === true) {
                    for (let i = 0; i < arrSearchValuesSize; i++) {
                        if (arrSearchValues[i].type === 'searchBar') {
                            arrSearchValues.splice(i, 1, createSearchValuesObj(searchValue, type));
                        }
                    }
                } else {
                    arrSearchValues.push(createSearchValuesObj(searchValue, type));
                }
            }
        } else {
            for (let i = 0; i < arrSearchValuesSize; i++) {
                if (arrSearchValues[i].type === 'searchBar') {
                    arrSearchValues.splice(i, 1);
                }
            }
        }
    }

    // case : other type
    // (tags === 0) => create a new searchValObj of this type
    // (tags > 0) => if there is a tag with the same name ? (replace this searchValObj with the current val) : (create a new searchValObj of this type)
    if (type !== 'searchBar') {
        const arrSearchValuesSize = arrSearchValues.length;
        if (arrSearchValuesSize === 0) {
            arrSearchValues.push(createSearchValuesObj(searchValue, type));
        } else {
            let duplicate;
            for (let i = 0; i < arrSearchValuesSize; i++) {
                if ((arrSearchValues[i].name === searchValue) && (arrSearchValues[i].type === type)) {
                    duplicate = true;
                    break;
                }
            }
            if (duplicate === true) {
                for (let i = 0; i < arrSearchValuesSize; i++) {
                    if ((arrSearchValues[i].name === searchValue) && (arrSearchValues[i].type === type)) {
                        arrSearchValues.splice(i, 1, createSearchValuesObj(searchValue, type));
                    }
                }
            } else {
                arrSearchValues.push(createSearchValuesObj(searchValue, type));
            }
        }
    }
}

// filter each recipe which match the global check of all the individuals conditions given by type of object which are in the global state "arrSearchValues" at this moment
const refreshArrFilteredRecipes = (arrSearchValues) => {
    const refreshRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const conditions = checkIndividualConditions(recipes[i], arrSearchValues);
        if (conditions.indexOf(false) === -1) {
            refreshRecipes.push(recipes[i]);
        }
    }
    return refreshRecipes;
}

export {
    refreshArrSearchValues,
    refreshArrFilteredRecipes
};