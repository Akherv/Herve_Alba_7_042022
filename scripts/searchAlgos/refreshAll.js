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
                const duplicate = arrSearchValues.some((el) => el.type.includes(type));
                if (duplicate === true) {
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
            arrSearchValues.forEach((el, idx) => {
                if (el.type === 'searchBar') {
                    arrSearchValues.splice(idx, 1);
                }
            });
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
            const duplicate = arrSearchValues.some((el) => el.name.includes(searchValue) && el.type.includes(type));
            if (duplicate === true) {
                arrSearchValues.forEach((el, idx) => {
                    if ((el.name === searchValue && el.type.includes(type))) {
                        arrSearchValues.splice(idx, 1, createSearchValuesObj(searchValue, type));
                    }
                });

            } else {
                arrSearchValues.push(createSearchValuesObj(searchValue, type));
            }
        }
    }

}

// filter each recipe matching the global check. This global check consist in checking all the individuals conditions given by the different type of object included in the global state "arrSearchValues" at this moment
const refreshArrFilteredRecipes = (arrSearchValues) => {
    const refreshRecipes = recipes.filter(recipe => {
        const conditions = checkIndividualConditions(recipe, arrSearchValues);
        if (conditions.every(condition => condition === true)) {
            return recipe;
        }
    })
    // console.log(refreshRecipes) //===> to check appliances & ustensils which don't appear in the UI
    return refreshRecipes;
}

export {
    refreshArrSearchValues,
    refreshArrFilteredRecipes
};