//Check if val is (String || Array) and return val (-accent/+lowercase/+trim)
const cleanValue = (val) => {
    if (typeof (val) === 'string') {
        return val.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s\.])/g, '').replace(/\s\s+/g, ' ').toLowerCase().trim();
    }
    if (Array.isArray(val)) {
        return val.map(el => el.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s\.])/g, '').replace(/\s\s+/g, ' ').toLowerCase().trim());
    }
}

// Map an Array of word - check if word end with "s" ? (return the word without "s" to remove it as duplicate lately) : (return word)
const changeWordToSingular = (arr) => {
    return arr.map((word) => {
        if (/[a-z]*s$/.test(word)) {
            const singularWord = word.replace(/s$/, '');
            if (arr.includes(singularWord)) {
                return singularWord;
            } else {
                return word;
            }
        } else {
            return word;
        }
    });
};

// Map an Array of word - check if word match a certain 'dictionary value' to harmonized it in order to remove it as duplicate lately) : (return word)
const harmonizeSomeMisspellingWord = (arr) => {
    return arr.map((word) => {
        if (word.match(/crème fraiche|crême fraîche|creme fraîche/ig)) {
            return 'crème fraîche';
        }
        if (word.match(/casserolle/ig)) {
            return 'casserole';
        }
        return word
        //...(if necessary complete for other misspelling word)
    });
}

// Map the array of ingredients - lowercase the values, return them into an array of singular elements, then harmonize misspelling word in order to remove duplicate & finally sort the values.
const cleanValueArrIngredients = (arrRecipeItem) => {
    let arrClean = arrRecipeItem.flatMap((recipe) => recipe.ingredients.map(el => el.ingredient.toLowerCase()));
    const finalArrClean = changeWordToSingular(arrClean)
    return [...new Set(harmonizeSomeMisspellingWord(finalArrClean))].sort();
}

// Map the array of appliances - lowercase the values, remove dot & duplicate and finally sort the values.
const cleanValueArrAppliances = (arrRecipeItem) => {
    let arrClean = arrRecipeItem.map((recipe) => recipe.appliance.toLowerCase().replace(/([\.])/g, ''));
    return [...new Set(harmonizeSomeMisspellingWord(arrClean))].sort();
}

// Map the array of ustensils - lowercase the values, return them into an array to remove duplicate & finally sort the values.
const cleanValueArrUstensils = (arrRecipeItem) => {
    let arrClean = arrRecipeItem.flatMap((recipe) => recipe.ustensils.map(el => el.toLowerCase()));
    return [...new Set(harmonizeSomeMisspellingWord(arrClean))].sort();
}


export {
    cleanValue,
    changeWordToSingular,
    harmonizeSomeMisspellingWord,
    cleanValueArrIngredients,
    cleanValueArrAppliances,
    cleanValueArrUstensils
};