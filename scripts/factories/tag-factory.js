import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import recipes from '../../data/recipes.js';
import displayAll from '../display/displayAll.js';

// filter the global state keeper "arrSearchValues" and return an array of all values of the same seeking type
const arrTagsByType = (arrSearchValues, type) => {
    const arrTag = [];
    for (let i = 0; i < arrSearchValues.length; i++) {
        const result = arrSearchValues[i].type === type;
        if (result) {
            arrTag.push(arrSearchValues[i]);
        }
    }

    const arrTagElName = [];
    for (let i = 0; i < arrTag.length; i++) {
        const result = arrTag[i].name;
        arrTagElName.push(result);
    }

    return arrTagElName
}

// according to the searchValue & type, create a custom tag & then attach a remove tag listener to it
const createTag = (searchValue, type, arrSearchValues) => {
    const tagSection = document.querySelector('#tags');
    const arrSearchValuesSize = arrSearchValues.length;

    let duplicate;
    for (let i = 0; i < arrSearchValuesSize; i++) {
        if ((arrSearchValues[i].name === searchValue) && (arrSearchValues[i].type === type)) {
            duplicate = true;
            break;
        }
    }

    const tag = document.createElement('li');
    tag.classList.add('tag')
    switch (type) {
        case 'ingredient':
            tag.classList.add('ingredient');
            break;
        case 'appliance':
            tag.classList.add('appliance');
            break;
        case 'ustensil':
            tag.classList.add('ustensil');
            break;
        default:
            tag.classList.add('default');
            break;
    }
    if (searchValue !== '' && !duplicate) {
        tag.textContent = searchValue;
        tagSection.appendChild(tag);
        attachTagRemoveListener(tag, arrSearchValues);
    }
}

// create a tag listener which remove on click the selected tag - (remove the value from the global state keeper "arrSearchValues"  - refresh the array of current Recipes & display all Elements) : reset "arrSearchValues" & display all the recipes
const attachTagRemoveListener = (tag, arrSearchValues) => {
    const tagSection = document.querySelector('#tags');

    tag.addEventListener('click', (e) => {
        tag.remove();
        const tagSectionChildrenSize = tagSection.children.length;
        const searchValue = e.target.textContent;
        const arrSearchValuesSize = arrSearchValues.length;

        if (tagSectionChildrenSize >= 0) {
            for (let i = 0; i < arrSearchValuesSize; i++) {
                if (arrSearchValues[i].name === searchValue) {
                    arrSearchValues.splice(i, 1);
                }
            }
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);
        } else {
            arrSearchValues = [];
            displayAll(recipes, arrSearchValues);
        }
    })
}

export {
    createTag,
    arrTagsByType
};