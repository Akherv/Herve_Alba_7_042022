import recipeFactory from '../factories/recipe-factory.js';

// If there are recipes ? (get recipes & display them into the recipe list) : (display "« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. »")
const displayRecipes = (currentRecipes) => {
    const recipesList = document.querySelector('#recipes-list');
    const currentRecipesSize = currentRecipes.length;

    if (currentRecipesSize > 0) {
        const arrHtmlString = [];
        for (let i = 0; i < currentRecipes.length; i++) {
            const result = recipeFactory(currentRecipes[i]).getArticle();
            arrHtmlString.push(result);
        }
        recipesList.innerHTML = arrHtmlString.join('');

    } else {
        recipesList.innerHTML = `<li class="no-match">« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc. »</li>`;
    }
}

export default displayRecipes;