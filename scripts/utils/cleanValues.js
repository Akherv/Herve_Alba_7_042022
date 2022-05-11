//Check if val is (String || Array) and return val (-accent/+lowercase/+trim)
const cleanValue = (val) => {
    if (typeof (val) === 'string') {
        return val.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s\.])/g, '').replace(/\s\s+/g, ' ').toLowerCase().trim()
    }
    if (Array.isArray(val)) {
        return val.map(el => el.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s\.])/g, '').replace(/\s\s+/g, ' ').toLowerCase().trim())
    }
}

// Map an Array of word - check if word end with "s" ? return the word without "s" to remove it as duplicate lately : return word
const changeWordToSingular = (arr) => {
    return arr.map((word) => {
        if (/[a-z]*s$/.test(word)) {
            const singularWord = word.replace(/s$/, '')
            if (arr.includes(singularWord)) {
                return singularWord
            } else {
                return word
            }
        } else {
            return word
        }
    })
};

// Map the array of ingredients - lowercase the values, return them into an array to remove duplicate & finally sort the values.
const cleanValueArrIngredients = (arrRecipeItem) => {
    let arrClean = arrRecipeItem.flatMap((recipe) => {
        const res = recipe.ingredients.flatMap(el => {
            return el.ingredient.toLowerCase();
        });
        return [...[], ...res]
    });
    return [...new Set(changeWordToSingular(arrClean))].sort();
}

// Map the array of appliance - lowercase the values, remove duplicate & finally sort the values.
const cleanValueArrAppliances = (arrRecipeItem) => {
    let arrClean = arrRecipeItem.map((recipe) => {
        return recipe.appliance.toLowerCase().replace(/([\.])/g, '');
    });
    return [...new Set(arrClean)].sort();
}

// Map the array of ustensils - lowercase the values, return them into an array to remove duplicate & finally sort the values.
const cleanValueArrUstensils = (arrRecipeItem) => {
    let arrClean = arrRecipeItem.flatMap((recipe) => {
        const res = recipe.ustensils.flatMap(el => {
            return el.toLowerCase();
        });
        return [...[], ...res]
    });
    return [...new Set(arrClean)].sort();
}


export {
    cleanValue,
    changeWordToSingular,
    cleanValueArrIngredients,
    cleanValueArrAppliances,
    cleanValueArrUstensils
}