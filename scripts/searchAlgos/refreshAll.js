import createSearchValuesObj from '../factories/searchValuesObj-factory.js';
import { checkIndividualConditions } from './conditions.js';

const refreshArrSearchValues = (searchValue, type, arrSearchValues) => {

    if (type === 'searchBar') {
        if (searchValue.length >= 3) {
            if (arrSearchValues.length === 0) {
                arrSearchValues.push(createSearchValuesObj(searchValue, type));
            } else {
                const res = arrSearchValues.some((el) => el.type.includes(type));
                if (res === true) {
                    arrSearchValues.map((el, idx) => {
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
                arrSearchValues.map((el, idx) => {
                    if (el.type === 'searchBar') {
                        arrSearchValues.splice(idx, 1);
                    }
                });
            }
        }
    }


    if (type !== 'searchBar' && searchValue.length >= 3) {
        const res = arrSearchValues.some((el) => el.name.includes(searchValue));
        if (arrSearchValues.length > 0) {
            if (res === true) {
                arrSearchValues.map((el, idx) => {
                    if (el.name === searchValue) {
                        arrSearchValues.splice(idx, 1, createSearchValuesObj(searchValue, type));
                    }
                })
            } else {
                arrSearchValues.push(createSearchValuesObj(searchValue, type));
            }
        } else {
            arrSearchValues.push(createSearchValuesObj(searchValue, type));
        }
    }
}

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