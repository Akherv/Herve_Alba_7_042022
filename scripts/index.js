const searchBar = document.querySelector('.searchBar');
const btnComboboxContainer = document.querySelector('#dropdown-input');
const inputIngredients = document.querySelector('#input-ingredients');
const btnIngredients = document.querySelector('#btn-ingredients');
const ingredientsList = document.querySelector('#ingredients-list');
const tagIngredients = document.querySelectorAll('.ingredient-tag');
const recipesList = document.querySelector('#recipes-list');

let arrSearchString = [];
let arrIngredients = [];

const cleanValue = (value) => {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function createTag(searchString, type) {
    const tagSection = document.querySelector('#tags');
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
            tag.classList.add('default')
            break;
    }
    tag.textContent = searchString
    tag.addEventListener('click', (e) => {

        tag.remove();
        // console.log(tagSection)
        if (tagSection.children.length >= 1) {
            let val = arrSearchString.indexOf(e.target.textContent)
            arrSearchString.splice(val, 1)
            console.log(arrSearchString)
            arrSearchString.map((el) => {
                const nodeTags = document.querySelectorAll('.tag');
                const arrActiveTags = [...nodeTags].filter(elt => elt.textContent !== el);
                const activeTags = arrActiveTags.map(el => el.textContent);
                // console.log(activeTags)
                displayRecipes(matchValue(el, recipes, 'tagList'))
            })
        } else {
            arrSearchString = [];
            displayRecipes(recipes, 'recipes');
        }

    })

    arrSearchString.push(searchString);
    tagSection.appendChild(tag);
    // console.log(arrSearchString.length);
    arrSearchString.map(el => {
        // console.log(el);
        displayRecipes(matchValue(el, recipes, 'tagList'))
    })
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
        // arrIngredientsFiltered = [...arrIngredients].filter(el => el.includes(array[0]))

        const htmlString = array
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
    const arrTag = [];
    tags.forEach(el => arrTag.push(el.textContent))


    if (typeArr === 'recipes') {

        let res = arr.filter((recipe) => {
            const recipeNameRaw = recipe.name;
            const recipeName = cleanValue(recipeNameRaw);
            const recipeIngredients = recipe.ingredients;
            const recipeDescriptionRaw = recipe.description;
            const recipeDescription = cleanValue(recipeDescriptionRaw);

            if (tags.length === 0) {
                console.log('<-- searchbar - tags.length === 0 --->')
                return (
                    recipeName.includes(searchString) ||
                    recipeIngredients.some(el => {
                        const recipeIngredientRaw = el.ingredient;
                        const recipeIngredient = cleanValue(recipeIngredientRaw);
                        return recipeIngredient.includes(searchString);
                    }) ||
                    recipeDescription.includes(searchString)
                )
            } else {
                console.log('<-- searchbar - tags.length > 0  --->')
                // let tagChecker = (arr, target) => target.every(v => arr.includes(v));
                // const x = tagChecker(recipeName, arrTag)
                // console.log(x)
                // const y = tagChecker(recipeDescription, arrTag)
                // const z = recipeIngredients.some(el => {
                //     const recipeIngredientRaw = el.ingredient;
                //     const recipeIngredient = cleanValue(recipeIngredientRaw);
                //     return tagChecker(recipeIngredient, arrTag);
                // })

                let arrTagsIngredientsRaw = [...tags].map(el => el.classList.contains('ingredient') ? el.textContent : '')
                let arrTagsIngredients= arrTagsIngredientsRaw.filter(Boolean);
                console.log(arrTagsIngredients)

                const arrIngredients = recipeIngredients.map(el => {
                    const recipeIngredientRaw = el.ingredient;
                    const recipeIngredient = cleanValue(recipeIngredientRaw);
                    return recipeIngredient;
                })

                const z = recipeIngredients.some(() => {
                    return arrTagsIngredients.every(tag => {
                        return arrIngredients.includes(tag)
                    });
                })


                return (
                   ( 
                    recipeName.includes(searchString) ||
                    recipeIngredients.some(el => {
                        const recipeIngredientRaw = el.ingredient;
                        const recipeIngredient = cleanValue(recipeIngredientRaw);
                        return recipeIngredient.includes(searchString);
                    }) ||
                    recipeDescription.includes(searchString)
                   ) 
                   &&
                    (recipe.ingredients.some(el => {
                        const recipeIngredientRaw = el.ingredient;
                        const recipeIngredient = cleanValue(recipeIngredientRaw);
                        return recipeIngredient.includes(searchString);
                    }) && z) 

                )

            }
        })
        // console.log(res)
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
            const recipeIngredients = recipe.ingredients;
            const recipeDescriptionRaw = recipe.description;
            const recipeDescription = cleanValue(recipeDescriptionRaw);

            console.log(tags.length)
            if (tags.length <= 1) {
                console.log('<-- tagList - tags.length <= 1  --->')
                if (tags[0].classList.contains('default')) {
                    console.log('<-- tagList - tags.length <= 1 && tags[0].classList.contains(default)  --->')
                    return (
                        recipeName.includes(searchString) ||
                        recipeIngredients.some(el => {
                            const recipeIngredientRaw = el.ingredient;
                            const recipeIngredient = cleanValue(recipeIngredientRaw);
                            return recipeIngredient.includes(searchString);
                        }) ||
                        recipeDescription.includes(searchString)
                    )
                }
                if (tags[0].classList.contains('ingredient')) {
                    console.log('<-- tagList - tags.length <= 1 && tags[0].classList.contains(ingredient)  --->')
                    return (
                        recipeIngredients.some(el => {
                            const recipeIngredientRaw = el.ingredient;
                            const recipeIngredient = cleanValue(recipeIngredientRaw);
                            return recipeIngredient.includes(searchString);
                        })
                    )
                }
            } else {
                console.log('<-- tagList - tags.length > 1  --->')
                let arrTagsIngredientsRaw = [...tags].map(el => el.classList.contains('ingredient') ? el.textContent : '')
                let arrTagsIngredients= arrTagsIngredientsRaw.filter(Boolean);
                console.log(arrTagsIngredients)

                const arrIngredients = recipeIngredients.map(el => {
                    const recipeIngredientRaw = el.ingredient;
                    const recipeIngredient = cleanValue(recipeIngredientRaw);
                    return recipeIngredient;
                })

                if ([...tags].some(el => el.classList.contains('ingredient'))) {
                    console.log('<-- tagList - tags.length >1 && tags some el.classList.contains(ingredient)  --->')
                    return (
                        recipeIngredients.some(() => {
                            // console.log(arrTagsIngredients)
                            return arrTagsIngredients.every(tag => {
                                return arrIngredients.includes(tag)
                            });
                        })
                    )
                } else {
                    console.log('<-- tagList - tags.length >1 && tags other  --->')
                    let tagChecker = (arr, target) => target.every(v => arr.includes(v));
                    const x = tagChecker(recipeName, arrTag)
                    console.log(x)
                    const y = tagChecker(recipeDescription, arrTag)

                    let arrTagsIngredientsRaw = [...tags].map(el => el.classList.contains('ingredient') ? el.textContent : '')
                    let arrTagsIngredients= arrTagsIngredientsRaw.filter(Boolean);
                    console.log(arrTagsIngredients)

                    const arrIngredients = recipeIngredients.map(el => {
                        const recipeIngredientRaw = el.ingredient;
                        const recipeIngredient = cleanValue(recipeIngredientRaw);
                        return recipeIngredient;
                    })

                    const z = recipeIngredients.some(() => {
                        return arrTagsIngredients.every(tag => {
                            return arrIngredients.includes(tag)
                        });
                    })


                    return (
                        (recipeName.includes(searchString) && x) ||
                        (recipe.ingredients.some(el => {
                            const recipeIngredientRaw = el.ingredient;
                            const recipeIngredient = cleanValue(recipeIngredientRaw);
                            return recipeIngredient.includes(searchString);
                        }) && z) ||
                        (recipeDescription.includes(searchString) && y)

                    )

                }
            }
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
        const sortfilteredArr = filteredIngredients.sort((a, b) => a + b)
        // console.log(sortfilteredArr)
        displayIngredients(sortfilteredArr, 'filteredIngredients');
    } else {
        displayIngredients(recipes, 'recipes');
    }
});

inputIngredients.addEventListener('keydown', (e) => {
    const searchStringRaw = e.target.value;
    const searchString = cleanValue(searchStringRaw);
    const currentValueSize = e.target.value.length;

    const formIngredients = document.querySelector('#form-ingredients');
    if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
        e.preventDefault();
        // createTag(searchString);
        createTag(searchString, 'ingredient')
        formIngredients.reset();

        btnComboboxContainer.classList.remove('container-input-show');
        btnIngredients.classList.remove('btn-input-show');
        btnIngredients.classList.remove('show');
        btnIngredients.firstChild.textContent = 'Ingrédients';
        inputIngredients.classList.remove('input-show');
        ingredientsList.classList.remove('show');

        displayIngredients(recipes, 'recipes');
    }
});


// Initialisation
function init() {
    displayIngredients(recipes, 'recipes')
    displayRecipes(recipes);
};
init();