import recipeFactory from '../factories/recipe-factory.js';

// If there are recipes ? (get recipes & display them into the recipe list) : (display "« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. »")
const displayRecipes = (currentRecipes) => {
    const recipesList = document.querySelector('#recipes-list');

    if (currentRecipes.length > 0) {
        const htmlString = currentRecipes
            .map((recipe) => {
                return recipeFactory(recipe).getArticle();
            })
            .join('');
        recipesList.innerHTML = htmlString;
    } else {
        recipesList.innerHTML = `<li class="no-match">« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. »</li>`;
    }
}

export default displayRecipes;