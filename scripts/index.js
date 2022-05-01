const searchBar = document.querySelector('.searchBar');
const btnComboboxContainer = document.querySelector('#dropdown-input');
const inputIngredients = document.querySelector('#input-ingredients');
const btnIngredients = document.querySelector('#btn-ingredients');
const ingredientsList = document.querySelector('#ingredients-list');
const tagIngredients = document.querySelectorAll('.ingredient-tag');
const appliancesList = document.querySelector('#appliances-list');
const ustensilsList = document.querySelector('#ustensils-list');
const recipesList = document.querySelector('#recipes-list');

let arrSearchString = [];
let arrIngredients = [];
let arrAppliances = [];
let arrUstensils = [];
let arrAllTags = [];

const cleanValue = (value) => {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const filterAllDropdown = (searchString) => {

    const filteredRecipes = matchValue(searchString, recipes, 'recipes')

    //filter ingredients
    const filteredIngredientsRaw = filteredRecipes.flatMap((recipe)=> {
       return recipe.ingredients.map((el)=> {
            return cleanValue(el.ingredient)
        })
    })
    const filteredIngredients = [...new Set(filteredIngredientsRaw)].sort()
    displayIngredients(filteredIngredients, 'filteredIngredients');


     //filter appliances
    const filteredAppliancesRaw = filteredRecipes.flatMap((recipe)=> {
       return  cleanValue(recipe.appliance)
    })
    const filteredAppliances = [...new Set(filteredAppliancesRaw)].sort()
    displayAppliances(filteredAppliances, 'filteredAppliances');

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
        if (tagSection.children.length >= 1) {
            let val = arrSearchString.indexOf(e.target.textContent)
            arrSearchString.splice(val, 1)
            arrSearchString.map((el) => {
                const nodeTags = document.querySelectorAll('.tag');
                const arrActiveTags = [...nodeTags].filter(elt => elt.textContent !== el);
                const activeTags = arrActiveTags.map(el => el.textContent);

                displayRecipes(matchValue(el, recipes, 'recipes'))

                filterAllDropdown(searchString)
                console.log('here1')
            })
        } else {
            console.log('here2')
            arrSearchString = [];
            displayRecipes(recipes, 'recipes');
            displayIngredients(recipes, 'recipes')
            displayAppliances(recipes, 'recipes')
        }
    })

    arrSearchString.push(searchString);
    tagSection.appendChild(tag);
    console.log('here3')
    arrSearchString.map(el => {
        displayRecipes(matchValue(el, recipes, 'recipes'))
    })

    const formIngredients = document.querySelector('#form-ingredients');
    formIngredients.reset();
    btnComboboxContainer.classList.remove('container-input-show');
        btnIngredients.classList.remove('btn-input-show');
        btnIngredients.classList.remove('show');
        btnIngredients.firstChild.textContent = 'Ingrédients';
        inputIngredients.classList.remove('input-show');
        ingredientsList.classList.remove('show');

    filterAllDropdown(searchString)
}

const displayIngredients = (array, type) => {
    if (type === 'recipes') {
        let resTot = array.flatMap((recipe) => {
            const res = recipe.ingredients.map(el => {
                const ingredients = cleanValue(el.ingredient);
                return ingredients
            });
            let res2 = [...[], ...res]
            return res2
        });

        arrIngredients = [...new Set(resTot)].sort();
        const htmlString = arrIngredients
            .map((el) => {
                return `<li class="ingredient-tag">${el}</li>`
            }).join('');

        ingredientsList.innerHTML = htmlString;
    }

    if (type === 'filteredIngredients') {

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

const displayAppliances = (array, type) => {
    if (type === 'recipes') {
        let resTot = array.flatMap((recipe) => {
            return cleanValue(recipe.appliance);
        });
        arrAppliances = [...new Set(resTot)].sort();

        const htmlString = arrAppliances
            .map((el) => {
                return `<li class="appliance-tag">${el}</li>`
            }).join('');

        appliancesList.innerHTML = htmlString;
    }

    if (type === 'filteredAppliances') {

        const htmlString = array
            .map((el) => {
                return `<li class="appliance-tag">${el}</li>`
            }).join('');

        appliancesList.innerHTML = htmlString;
    }

    const appliancesItem = document.querySelectorAll('.appliance-tag');
    appliancesItem.forEach((el) => el.addEventListener('click', () => {
        createTag(el.textContent, 'appliance')
    }));

}

const displayUstensils = (array, type) => {
    if (type === 'recipes') {
        let resTot = array.flatMap((recipe) => {
            const res = recipe.ustensils.map(el => {
                const ustensils = cleanValue(el);
                return ustensils
            });
            let res2 = [...[], ...res]
            return res2
        });

        arrUstensils = [...new Set(resTot)].sort();

        const htmlString = arrUstensils
            .map((el) => {
                return `<li class="ustensil-tag">${el}</li>`
            }).join('');

        ustensilsList.innerHTML = htmlString;
    }

    // if (type === 'filteredUstensils') {

    //     const htmlString = array
    //         .map((el) => {
    //             return `<li class="ustensil-tag">${el}</li>`
    //         }).join('');

    //     ustensilsList.innerHTML = htmlString;
    // }

    const ustensilsItem = document.querySelectorAll('.ustensil-tag');
    ustensilsItem.forEach((el) => el.addEventListener('click', () => {
        createTag(el.textContent, 'ustensil')
    }));

}

const displayRecipes = (filteredrecipes) => {
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
    // console.log(searchString, arr, typeArr)
    const searchBarString = document.querySelector('.searchBar').value;
    const tags = document.querySelectorAll('.tag');

    if (typeArr === 'recipes') {
        return arr.filter((recipe) => {
            const recipeNameRaw = recipe.name;
            const recipeName = cleanValue(recipeNameRaw);
            const recipeIngredients = recipe.ingredients;
            const recipeApplianceRaw = recipe.appliance;
            const recipeAppliance = cleanValue(recipeApplianceRaw);
            const recipeUstensils = recipe.ustensils;
            const recipeDescriptionRaw = recipe.description;
            const recipeDescription = cleanValue(recipeDescriptionRaw);
            // console.log(recipeUstensils,recipeAppliance)

            //conditions
            const searchBarConditions = () => {
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

            const tagsConditions = () => {
                //creation
                class Tags {
                    constructor(type, name) {
                        this.type = type;
                        this.name = name;
                    }
                }
                const arrTag = [...tags].map(el => {
                    const type = el.classList[1];
                    return new Tags(type, el.textContent)
                })

                const arrTagDefault = arrTag.map(el => {
                    if (el.type === 'default') {
                        return el.name;
                    }
                }).filter(Boolean)

                const arrTagIngredients = arrTag.map(el => {
                    if (el.type === 'ingredient') {
                        return el.name;
                    }
                }).filter(Boolean)

                const arrTagAppliances = arrTag.map(el => {
                    if (el.type === 'appliance') {
                        return el.name;
                    }
                }).filter(Boolean)

                const arrTagUstensils = arrTag.map(el => {
                    if (el.type === 'ustensil') {
                        return el.name;
                    }
                }).filter(Boolean)

                //conditions/////////////////////////////////////
                const arrTagDefaultCondition = () => {
                    return searchBarConditions()
                }
                const arrTagIngredientCondition = () => {
                    const arrIngredients = recipeIngredients.map(el => {
                        return cleanValue(el.ingredient);
                    })

                    const res = arrTagIngredients.every(tag => {
                        const arrIngredientsEl = arrIngredients.flatMap(el => el.split(' '));

                        if ((arrIngredients.includes(tag) === false) && (arrIngredientsEl.includes(tag) === true)) {
                            return true
                        } else if ((arrIngredients.includes(tag) === false) && (arrIngredientsEl.includes(tag) === false)) {
                            return false
                        } else {
                            return arrIngredients.includes(tag)
                        }

                    })
                    if (res === true) {
                        return true
                    }
                }

                const arrTagApplianceCondition = () => {
                    return arrTagAppliances.every(tag => recipeAppliance.includes(tag))
                }

                const arrTagUstensilCondition = () => {
                    const arrUstensils = recipeUstensils.map(el => {
                        return cleanValue(el);
                    })
                    console.log(arrUstensils)
                    console.log(arrTagUstensils)

                    const res = arrTagUstensils.every(tag => {
                        return arrUstensils.includes(tag)
                    })
                    if (res === true) {
                        return true
                    }
                }

                const allTagsConditions = () => {
                    const resRaw = arrTag.map(el => el.type)
                    const res = [...new Set(resRaw)];

                    function switchType(el) {
                        switch (el) {
                            case 'ingredient':
                                resultat = arrTagIngredientCondition();
                                break;
                            case 'appliance':
                                resultat = arrTagApplianceCondition();
                                break;
                            case 'ustensil':
                                resultat = arrTagUstensilCondition();
                                break;
                            case 'default':
                                resultat = arrTagDefaultCondition();
                                break;
                            default:
                                resultat = arrTagDefaultCondition();
                                break;
                        }
                        return resultat
                    }

                    if (res.length === 1) {
                        return res.map(el => {
                            return switchType(el)
                        }).join(' ')
                    }

                    if (res.length === 2) {
                        return switchType(res[0]) && switchType(res[1])
                    }

                    if (res.length === 3) {
                        return switchType(res[0]) && switchType(res[1]) && switchType(res[2])
                    }

                    if (res.length === 4) {
                        return switchType(res[0]) && switchType(res[1]) && switchType(res[2]) && switchType(res[3])
                    }
                }

                return (
                    allTagsConditions()
                )
            }

            if (tags.length === 0) {
                return (
                    searchBarConditions()
                )
            }
            if (tags.length > 0 && searchBarString === '') {
                return (
                    tagsConditions()
                )

            }  else {
                return (
                    searchBarConditions() &&
                    tagsConditions()
                )
            }
        })
    }

            // if (typeArr === 'searchBar') {
            //     // console.log(arrAllTags)
            //     // console.log(arrIngredients)
            //     // console.log(searchString)
            //     // console.log(arr)
            //     // const ArrRecipeIngredients = recipes.map((recipe) => {
            //     //     const recipeIngredients = recipe.ingredients;
            //     //     recipeIngredients.map(el=>{
                    
            //     //         // console.log(el.ingredient);


            //     //     })
            
            //     // });

            //    const result = recipes.filter((recipe) => {
            //     const recipeIngredients = recipe.ingredients;
            //    return recipeIngredients.some(el => {
            //         const recipeIngredientRaw = el.ingredient;
            //         const recipeIngredient = cleanValue(recipeIngredientRaw);
            //         return recipeIngredient
            //     }) 
            //     return result
            // })

            // console.log(result)
        //             const recipeIngredients = recipe.ingredients;
        //             const arrIngredients = recipeIngredients.map(el => {
        //                 return cleanValue(el.ingredient);
        //             })

        //             const ingredientSearchString = arrIngredients.filter((el) => {
        // console.log(el)
        //             })

                // return arr.filter((ingredient) => {
                //     return (

                //         ingredient.includes(searchString)
                //     )
                // })
        //   }

    if (typeArr === 'ingredients') {
        return arr.filter((ingredient) => {
            return (
                ingredient.includes(searchString)
            )
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
        createTag(searchString, 'default');
        form.reset();
    }

    // const filteredRecipes = matchValue(searchString, recipes, 'recipes')
    // displayRecipes(filteredRecipes);

//     //filter ingredients
//     const filteredIngredientsRaw = filteredRecipes.flatMap((recipe)=> {
//        return recipe.ingredients.map((el)=> {
//             return cleanValue(el.ingredient)
//         })
//     })
//     const filteredIngredients = [...new Set(filteredIngredientsRaw)].sort()
//     displayIngredients(filteredIngredients, 'filteredIngredients');


//  //filter appliances
//   const filteredAppliancesRaw = filteredRecipes.flatMap((recipe)=> {
//        return  cleanValue(recipe.appliance)
//     })
//     const filteredAppliances = [...new Set(filteredAppliancesRaw)].sort()
//     displayAppliances(filteredAppliances, 'filteredAppliances');



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
        displayIngredients(sortfilteredArr, 'filteredIngredients');

        //filter appliances
        const filteredRecipes = matchValue(searchString, recipes, 'recipes')
        const filteredAppliancesRaw = filteredRecipes.flatMap((recipe)=> {
            return  cleanValue(recipe.appliance)
            })
            const filteredAppliances = [...new Set(filteredAppliancesRaw)].sort()
            console.log(filteredAppliances)
            displayAppliances(filteredAppliances, 'filteredAppliances');
    } else {
        displayIngredients(recipes, 'recipes');
        displayAppliances(recipes, 'recipes');
    }
});

inputIngredients.addEventListener('keydown', (e) => {
    const searchStringRaw = e.target.value;
    const searchString = cleanValue(searchStringRaw);
    const currentValueSize = e.target.value.length;

    const formIngredients = document.querySelector('#form-ingredients');
    if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
        e.preventDefault();
        createTag(searchString, 'ingredient')
        formIngredients.reset();

        btnComboboxContainer.classList.remove('container-input-show');
        btnIngredients.classList.remove('btn-input-show');
        btnIngredients.classList.remove('show');
        btnIngredients.firstChild.textContent = 'Ingrédients';
        inputIngredients.classList.remove('input-show');
        ingredientsList.classList.remove('show');

       // displayIngredients(filteredIngredients, 'recipes');
        // const filteredRecipes = matchValue(searchString, recipes, 'recipes')
        // const filteredIngredientsRaw = filteredRecipes.flatMap((recipe)=> {
        //    return recipe.ingredients.map((el)=> {
        //         return cleanValue(el.ingredient)
        //     })
        // })
        // const filteredIngredients = [...new Set(filteredIngredientsRaw)].sort()
        // displayIngredients(filteredIngredients, 'filteredIngredients');

        // //filter appliances
        // const filteredAppliancesRaw = filteredRecipes.flatMap((recipe)=> {
        //     return  cleanValue(recipe.appliance)
        //  })
        //  const filteredAppliances = [...new Set(filteredAppliancesRaw)].sort()
        //  console.log(filteredAppliances)
        //  displayAppliances(filteredAppliances, 'filteredAppliances');


    }
});


// Initialisation
function init() {
    displayIngredients(recipes, 'recipes')
    displayAppliances(recipes, 'recipes');
    displayUstensils(recipes, 'recipes');
    displayRecipes(recipes);
};
init();