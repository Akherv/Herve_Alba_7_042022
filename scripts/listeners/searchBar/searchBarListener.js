import { cleanValue } from '../../utils/cleanValues.js';
import { createTag } from '../../factories/tag-factory.js';
import { refreshArrSearchValues } from '../../searchAlgos/refreshAll.js';
import { refreshArrFilteredRecipes } from '../../searchAlgos/refreshAll.js';
import displayAll from "../../display/displayAll.js";


const searchBarListener = (arrAllRecipes, arrSearchValues) => {
    const searchBar = document.querySelector('.searchBar');
    const searchBarBtn = document.querySelector('#btn-searchBar');
    console.log(typeof(arrSearchValues))
    // input keyup listener which begins at 3 letters . If no values then display all Elements & refresh the global state " arrSearchValues" to reset it ( in case if the user remove letters) : refresh the check if there is a match between searchValue & display them
    searchBar.addEventListener('keyup', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;
        const tags = document.querySelectorAll('.tag');
        const tagSize = tags.length;

        if (currentValueSize < 3 && tagSize === 0) {
            refreshArrSearchValues(searchValue, 'searchBar', arrSearchValues)
            displayAll(arrAllRecipes);
        } else {
            refreshArrSearchValues(searchValue, 'searchBar', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)
        }
    });


    // input Keydown Enter listener which begins at 3 letters - create a tag create - refresh the global state keeper "arrSearchValues" - refresh the array of current recipes & display all filtered Elements
    searchBar.addEventListener('keydown', (e) => {
        const searchValue = cleanValue(e.target.value);
        const currentValueSize = e.target.value.length;

        if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
            e.preventDefault();
            createTag(searchValue, 'default', arrSearchValues, arrAllRecipes);
            console.log(arrSearchValues)
            refreshArrSearchValues(searchValue, 'default', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)
            document.querySelector('#search form').reset();
        } 
    });


    // listener on click which fire at least if current searchValue >= 3 letters (same functionnality as keydown listener )
    searchBarBtn.addEventListener('click', (e) => {
        const searchValue = cleanValue(searchBar.value);
        const currentValueSize = searchBar.value.length;

        if (currentValueSize >= 3) {
            createTag(searchValue, 'default', arrSearchValues, arrAllRecipes);
            refreshArrSearchValues(searchValue, 'default', arrSearchValues)
            const filteredRecipes = refreshArrFilteredRecipes(arrAllRecipes, arrSearchValues)
            displayAll(filteredRecipes, arrSearchValues, arrAllRecipes)
            document.querySelector('#search form').reset();
        }
    });
}


export default searchBarListener