import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import displayAll from '../display/displayAll.js';

// filter the global state keeper "arrSearchValues" and return an array of all values of the same seeking type
const arrTagsByType = (arrSearchValues, type) => {
    const arrTag = arrSearchValues.filter(el => el.type === type)
    const arrTagElName = arrTag.map(el => el.name)
    return arrTagElName
}

// according to the searchValue & type, create a custom tag & then attach a remove tag listener to it
const createTag = (searchValue, type, arrSearchValues, arrAllRecipes) => {
    const tagSection = document.querySelector('#tags');

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
    if (searchValue !== '') {
        tag.textContent = searchValue;
        tagSection.appendChild(tag);
        attachTagRemoveListener(tag, arrSearchValues, arrAllRecipes);
    }
}

// create a tag listener which remove on click the selected tag - (remove the value from the global state keeper "arrSearchValues"  - refresh the array of current Recipes & display all Elements) : reset "arrSearchValues" & display all the recipes
const attachTagRemoveListener = (tag, arrSearchValues, arrAllRecipes) => {
    const tagSection = document.querySelector('#tags');
    tag.addEventListener('click', (e) => {
        tag.remove();

        if (tagSection.children.length >= 0) {
                arrSearchValues.forEach((el, idx) => {
                        if (el.name === e.target.textContent) {
                            arrSearchValues.splice(idx, 1);
                        }
                    })
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes);
        } else {
            arrSearchValues = [];
            displayAll(arrAllRecipes, arrSearchValues,arrAllRecipes);
        }
    })
}

export {
    createTag,
    arrTagsByType
};