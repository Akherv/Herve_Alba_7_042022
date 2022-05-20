//Check if val is (String || Array) and return val (-accent/+lowercase/+trim)
const cleanValue = (val) => {
    if (typeof (val) === 'string') {
        return val.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s\.])/g, '').replace(/\s\s+/g, ' ').toLowerCase().trim();
    }
    if (Array.isArray(val)) {
        const arrVal = [];
        for (let i = 0; i < val.length; i++) {
            const result = val[i].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s\.])/g, '').replace(/\s\s+/g, ' ').toLowerCase().trim();
            arrVal.push(result);
        }
        return arrVal;
    }
}

// Map an Array of word - check if word end with "s" ? (return the word without "s" to remove it as duplicate lately) : (return word)
const changeWordToSingular = (arr) => {
    const arrClean = [];
    for (let i = 0; i < arr.length; i++) {
        if (/[a-z]*s$/.test(arr[i])) {
            const singularWord = arr[i].replace(/s$/, '')
            if (arr.includes(singularWord)) {
                arrClean.push(singularWord);
            } else {
                arrClean.push(arr[i]);
            }
        } else {
            arrClean.push(arr[i]);
        }
    }
    return arrClean;
};

// Map an Array of word - check if word match a certain 'dictionary value' to harmonized it in order to remove it as duplicate lately) : (return word)
const harmonizeSomeMisspellingWord = (arr) => {
    const arrClean = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].match(/crème fraiche|crême fraîche|creme fraîche/ig)) {
            arrClean.push('crème fraîche');
        } else if (arr[i].match(/casserolle/ig)) {
            arrClean.push('casserole');
        } else {
            arrClean.push(arr[i]);
        }
    }
    //...(if necessary complete for other misspelling word)
    return arrClean;
}

// Map the array of ingredients - lowercase the values, return them into an array of singular elements to remove duplicate & finally sort the values.
const cleanValueArrIngredients = (arrRecipeItem) => {
    const arrClean = [];
    for (let i = 0; i < arrRecipeItem.length; i++) {
        for (let j = 0; j < arrRecipeItem[i].ingredients.length; j++) {
            const result = arrRecipeItem[i].ingredients[j].ingredient.toLowerCase();
            arrClean.push(result);
        }
    }

    const singularArr = changeWordToSingular(arrClean);
    const harmonizeArr = harmonizeSomeMisspellingWord(singularArr);

    const uniqueArr = [];
    for (let i = 0; i < harmonizeArr.length; i++) {
        if (uniqueArr.indexOf(harmonizeArr[i]) === -1 && harmonizeArr[i] !== '') {
            uniqueArr.push(harmonizeArr[i]);
        }       
    }

    const sortArr = uniqueArr;
    for (let i = 0; i < sortArr.length - 1; i++) {
        if (sortArr[i] > sortArr[i + 1]) {
            let temp = sortArr[i];
            sortArr[i] = sortArr[i + 1];
            sortArr[i + 1] = temp;
            i = -1;
        }
    }

    return sortArr;
}

// Map the array of appliances - lowercase the values, remove dot & duplicate and finally sort the values.
const cleanValueArrAppliances = (arrRecipeItem) => {
    const arrClean = [];
    for (let i = 0; i < arrRecipeItem.length; i++) {
        const result = arrRecipeItem[i].appliance.toLowerCase().replace(/([\.])/g, '');
        arrClean.push(result);
    }

    const harmonizeArr = harmonizeSomeMisspellingWord(arrClean);

    const uniqueArr = [];
    for (let i = 0; i < harmonizeArr.length; i++) {
        if (uniqueArr.indexOf(harmonizeArr[i]) === -1 && harmonizeArr[i] !== '') {
            uniqueArr.push(harmonizeArr[i]);
        }
    }

    const sortArr = uniqueArr;
    for (let i = 0; i < sortArr.length - 1; i++) {
        if (sortArr[i] > sortArr[i + 1]) {
            let temp = sortArr[i];
            sortArr[i] = sortArr[i + 1];
            sortArr[i + 1] = temp;
            i = -1;
        }
    }

    return sortArr;
}

// Map the array of ustensils - lowercase the values, return them into an array to remove duplicate & finally sort the values.
const cleanValueArrUstensils = (arrRecipeItem) => {
    const arrClean = [];
    for (let i = 0; i < arrRecipeItem.length; i++) {
        for (let j = 0; j < arrRecipeItem[i].ustensils.length; j++) {
            const result = arrRecipeItem[i].ustensils[j].toLowerCase();
            arrClean.push(result);
        }
    }

    const harmonizeArr = harmonizeSomeMisspellingWord(arrClean);

    const uniqueArr = [];
    for (let i = 0; i < harmonizeArr.length; i++) {
        if (uniqueArr.indexOf(harmonizeArr[i]) === -1 && harmonizeArr[i] !== '') {
            uniqueArr.push(harmonizeArr[i]);
        }
    }

    const sortArr = uniqueArr
    for (let i = 0; i < sortArr.length - 1; i++) {
        if (sortArr[i] > sortArr[i + 1]) {
            let temp = sortArr[i];
            sortArr[i] = sortArr[i + 1];
            sortArr[i + 1] = temp;
            i = -1;
        }
    }

    return sortArr;
}


export {
    cleanValue,
    changeWordToSingular,
    harmonizeSomeMisspellingWord,
    cleanValueArrIngredients,
    cleanValueArrAppliances,
    cleanValueArrUstensils
};