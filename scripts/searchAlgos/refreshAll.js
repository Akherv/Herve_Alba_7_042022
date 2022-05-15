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
                let res;
                for (let i = 0; i < arrSearchValues.length; i++) {
                    if (arrSearchValues[i].type === type) {
                        res = true;
                        break;
                    } 
                }
                if (res === true) {
                    for (let i = 0; i < arrSearchValues.length; i++) {
                        if (arrSearchValues[i].type === 'searchBar') {
                            arrSearchValues.splice(i, 1, createSearchValuesObj(searchValue, type));
                        } 
                    }
                } else {
                    arrSearchValues.push(createSearchValuesObj(searchValue, type));
                }
            }
        } else {
            if (arrSearchValues.length >= 0) {
                for (let i = 0; i < arrSearchValues.length; i++) {
                    if (arrSearchValues[i].type === 'searchBar') {
                        arrSearchValues.splice(i, 1);
                    } 
                }
            }
        }
    }

    // case : other type
    // searchValue >= 3 & (tags > 0) => if there is a tag with the same name ? (replace this searchValObj with the current val) : (create a new searchValObj of this type)
    //                  & (tags = 0) => create a new searchValObj of this type
    if (type !== 'searchBar' && searchValue.length >= 3) {

        let res;
        for (let i = 0; i < arrSearchValues.length; i++) {
            if (arrSearchValues[i].name === searchValue) {
                res = true;
                break;
            } 
        }

        if (arrSearchValues.length > 0) {
            if (res === true) {
                for (let i = 0; i < arrSearchValues.length; i++) {
                    if (arrSearchValues[i].name === searchValue) {
                        arrSearchValues.splice(i, 1, createSearchValuesObj(searchValue, type));
                    } 
                }
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
    const refreshRecipes = [];
        for (let i = 0; i < arrAllRecipes.length; i++) {
        const res = checkIndividualConditions(arrAllRecipes[i], arrSearchValues);
            if (res.indexOf(false) === -1) {
                refreshRecipes.push(arrAllRecipes[i])
            } 
        }
    return refreshRecipes;
}

export {
    refreshArrSearchValues,
    refreshArrFilteredRecipes
};