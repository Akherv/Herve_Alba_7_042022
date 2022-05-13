import recipeFactory from "../factories/recipe-factory.js";

// If there are recipes ? get recipes & display them into the recipe list : display "no match"
const displayRecipes = (currentRecipes) => {
    const recipesList = document.querySelector('#recipes-list');
    // console.log(currentRecipes)
    if (currentRecipes.length > 0) {
        const htmlString = currentRecipes
            .map((recipe) => {
                return recipeFactory(recipe).getArticle();
            })
            .join('');
        recipesList.innerHTML = htmlString;
    } else {
        recipesList.innerHTML = `<li class="no-match">No match</li>`;
    }
}

export default displayRecipes