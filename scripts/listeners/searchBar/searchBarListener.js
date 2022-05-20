import { cleanValue } from '../../utils/cleanValues.js';
import { createTag } from '../../factories/tag-factory.js';
import { refreshArrSearchValues } from '../../searchAlgos/refreshAll.js';
import { refreshArrFilteredRecipes } from '../../searchAlgos/refreshAll.js';
import recipes from '../../../data/recipes.js';
import displayAll from '../../display/displayAll.js';

const searchBarListener = (arrSearchValues) => {
    const searchBar = document.querySelector('.searchBar');
    const searchBarBtn = document.querySelector('#btn-searchBar');

    // input keyup listener which begins at 3 letters . If no values then display all Elements & refresh the global state " arrSearchValues" to reset it ( in case if the user remove letters) : refresh the check if there is a match between searchValue & display them
    searchBar.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;
        const tags = document.querySelectorAll('.tag');
        const tagSize = tags.length;

        if (currentValueSize >= 3) {
            refreshArrSearchValues(searchValue, 'searchBar', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);
        } else if (currentValueSize < 3 & tagSize > 0) {
            refreshArrSearchValues(searchValue, 'searchBar', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);
        } else {
            refreshArrSearchValues(searchValue, 'searchBar', arrSearchValues);
            displayAll(recipes, arrSearchValues);
        }
    });

    // input Keydown Enter listener which begins at 3 letters - create a tag create - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes & display all filtered Elements
    searchBar.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;
        const tags = document.querySelectorAll('.tag');
        const tagSize = tags.length;

        if ((e.key || e.code) === ('Enter' || 13)) {
            e.preventDefault();
            if (currentValueSize >= 3) {

                arrSearchValues.forEach((el, idx) => {
                    if (el.type === 'searchBar') {
                        arrSearchValues.splice(idx, 1);
                    }
                });

                createTag(searchValue, 'default', arrSearchValues);
                refreshArrSearchValues(searchValue, 'default', arrSearchValues);
                const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
                displayAll(filteredRecipes, arrSearchValues);
                searchBar.value = '';
            } else if (currentValueSize < 3 & tagSize > 0) {
                refreshArrSearchValues(searchValue, 'searchBar', arrSearchValues);
                const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
                displayAll(filteredRecipes, arrSearchValues);
            } else {
                searchBar.value = '';
                arrSearchValues = [];
            }
        }
    });

    // listener on click which fire at least if current searchValue >= 3 letters (same functionnality as keydown listener. There is only a supplementary check if a tag type 'searchBar' already exist, to remove this before creating the 'default' tag;  not needed on keydown because there is the keyup event which fire again when we release the keydown touch & refresh the global arrSearchValues)
    searchBarBtn.addEventListener('click', (e) => {
        const searchValue = cleanValue(searchBar.value);
        const currentValueSize = searchBar.value.length;
        const tags = document.querySelectorAll('.tag');
        const tagSize = tags.length;

        if (currentValueSize >= 3) {

            arrSearchValues.forEach((el, idx) => {
                if (el.type === 'searchBar') {
                    arrSearchValues.splice(idx, 1);
                }
            });

            createTag(searchValue, 'default', arrSearchValues);
            refreshArrSearchValues(searchValue, 'default', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);
            searchBar.value = '';
        } else if (currentValueSize < 3 & tagSize > 0) {
            refreshArrSearchValues(searchValue, 'searchBar', arrSearchValues);
            const filteredRecipes = refreshArrFilteredRecipes(arrSearchValues);
            displayAll(filteredRecipes, arrSearchValues);
        } else {
            searchBar.value = '';
            arrSearchValues = [];
        }
    });
}

export default searchBarListener;