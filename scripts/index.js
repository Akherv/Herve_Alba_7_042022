const searchBar = document.querySelector('.searchBar');
const btnComboboxContainer = document.querySelector('#dropdown-input');
const inputIngredients = document.querySelector('#input-ingredients');
const btnIngredients = document.querySelector('#btn-ingredients');
const ingredientsList = document.querySelector('#ingredients-list');
const tagIngredients = document.querySelectorAll('.ingredient-tag');
const tagSection = document.querySelector('#tags');
const recipesList = document.querySelector('#recipes-list');

const arrSearchString = [];
let arrIngredients = [];

const cleanValue = (value) => {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function createTag(searchString, type) {
    const tag = document.createElement('li');
    tag.classList.add('tag')
    switch (type) {
        case 'ingredient':
            tag.classList.add('ingredient')
            break;
        case 'appliance':
            tag.classList.add('appliance')
            break;
        case 'ustensil':
            tag.classList.add('ustensil')
            break;
        default:
            tag.classList.add('ingredient')
            break;
    }
    tag.textContent = searchString
    tag.addEventListener('click', () => {
        tag.remove();
        // if (tagSection.length >= 1) {
        //     displayRecipes(searchString)
        // } else {
        displayRecipes(recipes)
        // }

    })

    arrSearchString.push(searchString);
    tagSection.appendChild(tag);
    // console.log(arrSearchString.length);
    arrSearchString.map(el =>
        displayRecipes(matchValue(el, recipes, 'tagList'))
    )
}

const displayIngredients = (array, type) => {
    if (type === 'recipes') {
        let arr = [];
        array.forEach((recipe) => {
            recipe.ingredients.map(el => {
                const ingredientsRaw = el.ingredient;
                const ingredients = cleanValue(ingredientsRaw);
                arr.push(ingredients)
            });
        });
        arrIngredients = [...new Set(arr)].sort();
        const htmlString = arrIngredients
            .map((el) => {
                return `<li class="ingredient-tag">${el}</li>`
            }).join('');

        ingredientsList.innerHTML = htmlString;
    }

    if (type === 'filteredIngredients') {
        arrIngredientsFiltered = [...arrIngredients].filter(el => el.includes(array[0]))

        const htmlString = arrIngredientsFiltered
            .map((el) => {
                return `<li class="ingredient-tag">${el}</li>`
            }).join('');

        ingredientsList.innerHTML = htmlString;
    }

    const ingredients = document.querySelectorAll('.ingredient-tag');
    ingredients.forEach((el) => el.addEventListener('click', () => {
        createTag(el.textContent, 'ingredient')

    }));
}


const displayRecipes = (filteredrecipes) => {
    // console.log(filteredrecipes)
    const htmlString = filteredrecipes
        .map((recipe) => {
            const cards = recipeFactory(recipe).getArticle();
            const recipeCard = cards.article;
            return recipeCard
        })
        .join('');
    recipesList.innerHTML = htmlString;
};



const matchValue = (searchString, arr, typeArr) => {

    const tags = document.querySelectorAll('.tag');
    // console.log(tags)
    const arrTag = [];
    tags.forEach(el => arrTag.push(el.textContent))
    console.log(arrTag)


    function multipleExist(arr, values) {
        // console.log(values)
        return values.every(value => {
            // console.log(arr)
            // console.log(value.textContent)
            return arr.includes(value.textContent);
        });
    }

    if (typeArr === 'recipes') {
        let res = arr.filter((recipe) => {
            const recipeNameRaw = recipe.name;
            const recipeName = cleanValue(recipeNameRaw);
            const recipeDescriptionRaw = recipe.description;
            const recipeDescription = cleanValue(recipeDescriptionRaw);

            if (tags.length === 0) {
                return (
                    recipeName.includes(searchString) ||
                    recipe.ingredients.some(el => {
                        const recipeIngredientRaw = el.ingredient;
                        const recipeIngredient = cleanValue(recipeIngredientRaw);
                        return recipeIngredient.includes(searchString);
                    }) ||
                    recipeDescription.includes(searchString)
                )
            } else {
                //    if( multipleExist(recipeName, [...tags])) {
                //        console.log(recipe)
                //    }
                let checker = (arr, target) => target.every(v => arr.includes(v));
                const x = checker(recipeName, arrTag)
                const y = checker(recipeDescription, arrTag)
                console.log(x)
                // recipeName.every(el => {
                // return recipeIngredient.includes(searchString);
                // })
                return (
                    (recipeName.includes(searchString) && x) ||
                    (recipeDescription.includes(searchString) && y)
                )

                // return (
                //    [...tags].every(el => {return  recipeName.includes(el.textContent && searchString)})
                //     )



                // return (
                // console.log(recipeName.includes(searchString))
                // x
                // ||
                // recipe.ingredients.some(el => {
                //     const recipeIngredientRaw = el.ingredient;
                //     const recipeIngredient = cleanValue(recipeIngredientRaw);
                //     return recipeIngredient.includes(searchString);
                // }||
                // recipeDescription.includes(searchString)) 
                // )

            }
        })
        console.log(res)
        return res
    }

    if (typeArr === 'ingredients') {
        return arr.filter((ingredient) => {
            return (
                ingredient.includes(searchString)
            )
        })
    }

    if (typeArr === 'tagList') {
        return arr.filter((recipe) => {
                const recipeNameRaw = recipe.name;
                const recipeName = cleanValue(recipeNameRaw);
                const recipeDescriptionRaw = recipe.description;
                const recipeDescription = cleanValue(recipeDescriptionRaw);


                if (tags.length <= 1) {
                    return (
                        recipeName.includes(searchString) ||
                        recipe.ingredients.some(el => {
                            const recipeIngredientRaw = el.ingredient;
                            const recipeIngredient = cleanValue(recipeIngredientRaw);
                            return recipeIngredient.includes(searchString);
                        }) ||
                        recipeDescription.includes(searchString)
                    )
                } else {

                    let checker = (arr, target) => target.every(v => arr.includes(v));
                    const x = checker(recipeName, arrTag)
                    const y = checker(recipeDescription, arrTag)
                    return (
                        (recipeName.includes(searchString) && x) ||
                        (recipeDescription.includes(searchString) && y)
                    )
                }
            // else {
            //     return tags.forEach(el => {
            //         console.log(el.textContent)
            //         console.log(searchString)
            //         return (
            //         recipeName.includes(el.textContent) 
            //         // && 
            //         // recipeName.includes(searchString)
            //         )
            //     }) 
            // }
        })
}

}


// Listeners
searchBar.addEventListener('keyup', (e) => {
    const searchStringRaw = e.target.value;
    const searchString = cleanValue(searchStringRaw);
    const currentValueSize = e.target.value.length;
    const tags = document.querySelectorAll('.tag');

    if (currentValueSize >= 3) {
        const filteredRecipes = matchValue(searchString, recipes, 'recipes')
        displayRecipes(filteredRecipes);
    } else if (tags.length === 0) {
        displayRecipes(recipes);
    }

});

searchBar.addEventListener('keydown', (e) => {
    const searchStringRaw = e.target.value;
    const searchString = cleanValue(searchStringRaw);
    const currentValueSize = e.target.value.length;

    const form = document.querySelector('form');
    if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
        e.preventDefault();
        createTag(searchString);
        form.reset();
    }
});


btnIngredients.addEventListener('click', () => {

    if (btnIngredients.classList.contains('btn-input-show')) {
        btnComboboxContainer.classList.remove('container-input-show');
        btnIngredients.classList.remove('btn-input-show');
        btnIngredients.classList.remove('show');
        btnIngredients.firstChild.textContent = 'Ingrédients';
        inputIngredients.classList.remove('input-show');
        ingredientsList.classList.remove('show');
    } else {
        btnComboboxContainer.classList.add('container-input-show');
        btnIngredients.classList.add('btn-input-show');
        btnIngredients.classList.add('show');
        btnIngredients.firstChild.textContent = '';
        inputIngredients.classList.add('input-show');
        ingredientsList.classList.add('show');
        ingredientsList.style.top = '100%';
    }

});

inputIngredients.addEventListener('keyup', (e) => {
    const searchStringRaw = e.target.value;
    const searchString = cleanValue(searchStringRaw);
    const currentValueSize = e.target.value.length;

    if (currentValueSize >= 3) {
        const ingredientsArr = arrIngredients.map((el) => el)
        const filteredIngredients = matchValue(searchString, ingredientsArr, 'ingredients')
        displayIngredients(filteredIngredients, 'filteredIngredients');
    } else {
        displayIngredients(recipes, 'recipes');
    }
});


// Initialisation
function init() {
    displayIngredients(recipes, 'recipes')
    displayRecipes(recipes);
};
init();