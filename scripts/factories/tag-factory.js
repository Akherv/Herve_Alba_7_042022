import { refreshArrFilteredRecipes } from '../searchAlgos/refreshAll.js';
import recipes from '../../data/recipes.js';
import displayAll from '../display/displayAll.js';

// filter the global state keeper "arrSearchValues" and return an array of all values of the same seeking type
const arrTagsByType = (arrSearchValues, type) => {
    const arrTag = arrSearchValues.filter(el => el.type === type);
    return arrTag.map(el => el.name);
}

// according to the searchValue & type, check if empty || duplicate then if not, create a custom tag & then attach a remove tag listener to it
const createTag = (searchValue, type, arrSearchValues) => {
    const tagSection = document.querySelector('#tags');
    const duplicateName = arrSearchValues.some((el) => el.name.includes(searchValue) && el.type.includes(type));

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
    if (searchValue !== '' && !duplicateName) {
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

        if (tagSectionChildrenSize >= 0) {
            arrSearchValues.forEach((el, idx) => {
                if (el.name === searchValue) {
                    arrSearchValues.splice(idx, 1);
                }
            });
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);
        } else {
            arrSearchValues = [];
            displayAll(recipes, arrSearchValues);
        }
    });
}

export {
    createTag,
    arrTagsByType
};