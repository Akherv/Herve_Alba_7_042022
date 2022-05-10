import createSearchValuesObj from '../factories/searchValuesObj-factory.js'
// import { checkGlobalMatchConditions } from './conditions.js'
import {
    checkIndividualConditions
} from './conditions.js'

const refreshArrSearchValues = (searchValue, type, arrSearchValues) => {

    if (type === 'searchBar' && searchValue.length >= 3) {
        if (arrSearchValues.length === 0) {
            arrSearchValues.push(createSearchValuesObj(searchValue, type))
            // console.log(arrSearchValues)
        } else {
            const res = arrSearchValues.some((el) => el.type.includes(type))
            if (res === true) {
                arrSearchValues.map((el, idx) => {
                    if (el.type === 'searchBar') {
                        arrSearchValues.splice(idx, 1, createSearchValuesObj(searchValue, type))
                        // console.log(arrSearchValues)
                    }
                })
            } else {
                arrSearchValues.push(createSearchValuesObj(searchValue, type))
                // console.log(arrSearchValues)
            }
        }
    }

    if (type === 'searchBar' && searchValue.length < 3) {
        if (arrSearchValues.length > 0) {
            arrSearchValues.map((el, idx) => {
                if (el.type === 'searchBar') {
                    arrSearchValues.splice(idx, 1)
                    // console.log(arrSearchValues)
                }
            })
        }
    }

    if (type !== 'searchBar' && searchValue.length >= 3) {
        const res = arrSearchValues.some((el) => el.name.includes(searchValue))
        if (arrSearchValues.length > 0) {
            if (res === true) {
                arrSearchValues.map((el, idx) => {
                    if (el.name === searchValue) {
                        arrSearchValues.splice(idx, 1, createSearchValuesObj(searchValue, type))
                        // console.log(arrSearchValues)
                    }
                })
            } else {
                arrSearchValues.push(createSearchValuesObj(searchValue, type))
                // console.log(arrSearchValues)
            }
        } else {
            arrSearchValues.push(createSearchValuesObj(searchValue, type))
            // console.log(arrSearchValues)
        }
    }
}

const refreshArrFilteredRecipes = (arrAllRecipes, arrSearchValues) => {
    let refreshRecipes = arrAllRecipes.filter(recipe => {
        const res = checkIndividualConditions(recipe, arrSearchValues)
        if (res.every(el => el === true)) {
            return recipe
        }
    })
    return refreshRecipes
}


export {
    refreshArrSearchValues,
    refreshArrFilteredRecipes
}