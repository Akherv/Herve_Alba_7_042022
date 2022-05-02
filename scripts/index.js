// DOM selection
const searchBar = document.querySelector('.searchBar');
const form = document.querySelector('form');
const tagSection = document.querySelector('#tags');
const btnComboboxContainer = document.querySelector('#dropdown-input');
const formIngredients = document.querySelector('#form-ingredients');
const inputIngredients = document.querySelector('#input-ingredients');
const btnIngredients = document.querySelector('#btn-ingredients');
const ingredientsList = document.querySelector('#ingredients-list');
const tagIngredients = document.querySelectorAll('.ingredient-tag');
const appliancesList = document.querySelector('#appliances-list');
const ustensilsList = document.querySelector('#ustensils-list');
const recipesList = document.querySelector('#recipes-list');

// arrays
let allRecipes = recipes;
let arrsearchValue = [];
let arrIngredients = [];
let arrAppliances = [];
let arrUstensils = [];
let arrAllTags = [];

// utilities
const cleanValue = (value) => {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\.]/g, '');
}

const singularWord = function (word, arr) {
    if (/[a-z]*s$/.test(word)) {
        const res = word.replace(/s$/, '')
        if (arr.includes(res)) {
            return res
        } else {
            return word
        }
    } else {
        return word
    }
};

const filterAllDropdown = (searchValue) => {

    const filteredRecipes = matchValue(searchValue, recipes, 'recipes')

    //filter ingredients
    const filteredIngredientsRaw = filteredRecipes.flatMap((recipe) => {
        return recipe.ingredients.map((el) => {
            return cleanValue(el.ingredient)
        })
    })
    const filteredIngredients = [...new Set(filteredIngredientsRaw)].sort()
    displayIngredients(filteredIngredients, 'filteredIngredients');

    //filter appliances
    const filteredAppliancesRaw = filteredRecipes.flatMap((recipe) => {
        return cleanValue(recipe.appliance)
    })
    const filteredAppliances = [...new Set(filteredAppliancesRaw)].sort()
    displayAppliances(filteredAppliances, 'filteredAppliances')
}

// creation & display component
const createTag = (searchValue, type) => {
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
    tag.textContent = searchValue
    arrsearchValue.push(searchValue);
    tagSection.appendChild(tag);

    // structuration of the tag object
    const tags = document.querySelectorAll('.tag');
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
    arrAllTags = arrTag;

    // listener on remove
     tag.addEventListener('click', (e) => {
        tag.remove();
        if (tagSection.children.length >= 1) {
            let val = arrsearchValue.indexOf(e.target.textContent)
            arrsearchValue.splice(val, 1)
            arrsearchValue.map((el) => {
                const nodeTags = document.querySelectorAll('.tag');
                const arrActiveTags = [...nodeTags].filter(elt => elt.textContent !== el);
                const activeTags = arrActiveTags.map(el => el.textContent);
                // filterAll
                displayRecipes(matchValue(el, recipes, 'recipes'))
                filterAllDropdown(searchValue)
            })

        } else {
            // reset
            arrsearchValue = [];
            displayRecipes(recipes, 'recipes');
            displayIngredients(recipes, 'recipes')
            displayAppliances(recipes, 'recipes')
        }
    })
    
    // reset form
    formIngredients.reset();
    btnComboboxContainer.classList.remove('container-input-show');
    btnIngredients.classList.remove('btn-input-show');
    btnIngredients.classList.remove('show');
    btnIngredients.firstChild.textContent = 'Ingrédients';
    inputIngredients.classList.remove('input-show');
    ingredientsList.classList.remove('show');

    // filter elements
    displayRecipes(matchValue(searchValue, recipes, 'recipes'));
    filterAllDropdown(searchValue)
}

const displayIngredients = (array, type) => {

    if (type === 'recipes') {
        // clean values
        let arrFirstClean = array.flatMap((recipe) => {
            const res = recipe.ingredients.map(el => {
                return cleanValue(el.ingredient);
            });
            return [...[], ...res]
        });
        const arrSecondClean = arrFirstClean.map(el => singularWord(el, arrFirstClean))
        arrIngredients = [...new Set(arrSecondClean)].sort();
        // create HTML component
        const htmlString = arrIngredients
            .map((el) => {
                return `<li class="ingredient-tag">${el}</li>`
            }).join('');
        ingredientsList.innerHTML = htmlString;
    }

    if (type === 'filteredIngredients') {
        // create HTML component
        const htmlString = array
            .map((el) => {
                return `<li class="ingredient-tag">${el}</li>`
            }).join('');
        ingredientsList.innerHTML = htmlString;
    }

     // listener create tag
    const ingredients = document.querySelectorAll('.ingredient-tag');
    ingredients.forEach((el) => el.addEventListener('click', () => {
        createTag(el.textContent, 'ingredient')
    }));
}

const displayAppliances = (array, type) => {

    if (type === 'recipes') {
        // clean values
        let arrClean = array.flatMap((recipe) => {
            return cleanValue(recipe.appliance);
        });
        arrAppliances = [...new Set(arrClean)].sort();
        // create HTML component
        const htmlString = arrAppliances
            .map((el) => {
                return `<li class="appliance-tag">${el}</li>`
            }).join('');
        appliancesList.innerHTML = htmlString;
    }

    if (type === 'filteredAppliances') {
         // create HTML component
        const htmlString = array
            .map((el) => {
                return `<li class="appliance-tag">${el}</li>`
            }).join('');
        appliancesList.innerHTML = htmlString;
    }

    // listener create tag
    const appliancesItem = document.querySelectorAll('.appliance-tag');
    appliancesItem.forEach((el) => el.addEventListener('click', () => {
        createTag(el.textContent, 'appliance')
    }));
}

const displayUstensils = (array, type) => {

    if (type === 'recipes') {
         // clean values
        let arrClean = array.flatMap((recipe) => {
            const res = recipe.ustensils.map(el => {
                return cleanValue(el);
            });
            return [...[], ...res]
        });

        arrUstensils = [...new Set(arrClean)].sort();
        // create HTML component
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

    // listener create tag
    const ustensilsItem = document.querySelectorAll('.ustensil-tag');
    ustensilsItem.forEach((el) => el.addEventListener('click', () => {
        createTag(el.textContent, 'ustensil')
    }));

}

const displayRecipes = (filteredrecipes) => {

    // if match create recipe
    if (filteredrecipes.length > 0) {
        const htmlString = filteredrecipes
            .map((recipe) => {
                const cards = recipeFactory(recipe).getArticle();
                return cards.article;
            })
            .join('');
        recipesList.innerHTML = htmlString;
    } else {
        // no match
        recipesList.innerHTML = `<li class="no-match">No match</li>`;
    }

};

// conditions to match
const matchValue = (searchValue, arr, typeArr) => {
    // DOM values
    const searchBarString = document.querySelector('.searchBar').value;
    const tags = document.querySelectorAll('.tag');

    // conditions to filter recipes on recipe-list
    if (typeArr === 'recipes') {
        return arr.filter((recipe) => {
            const recipeName = cleanValue(recipe.name);
            const recipeIngredients = recipe.ingredients;
            const recipeAppliance = cleanValue(recipe.appliance);
            const recipeUstensils = recipe.ustensils;
            const recipeDescription = cleanValue(recipe.description);

            //conditions at least 1 match in (title || ingredient || description) for searchbar values or tag default
            const searchBarConditions = (tag) => {

                if (tag) {////////////////  recipe must contains each default tag either in (title || ingredient || description) on to return true
                    return (
                        recipeName.includes(tag) ||
                        recipeIngredients.some(el => {
                            const recipeIngredient = cleanValue(el.ingredient);
                            return recipeIngredient.includes(tag);
                        }) ||
                        recipeDescription.includes(tag)
                    )
                } else {
                    return (
                        recipeName.includes(searchValue) ||
                        recipeIngredients.some(el => {
                            const recipeIngredient = cleanValue(el.ingredient);
                            return recipeIngredient.includes(searchValue);
                        }) ||
                        recipeDescription.includes(searchValue)
                    )
                }
            }

            //conditions () for searchbar values or tag default
            const tagsConditions = () => {

                //individuals tag conditions 
                const arrTagDefaultCondition = () => {
                    const arrTagDefault = arrAllTags.map(el => {
                        if (el.type === 'default') {
                            return el.name;
                        }
                    }).filter(Boolean)

                    // if (arrTagDefault.length >= 1) {
                    //     const arrTagDefaultItems = arrTagDefault.map(el => {
                    //         return cleanValue(el);
                    //     })

                    //     const res = arrTagDefaultItems.some(el => {
                    //             if (searchBarConditions(el) === false) {
                    //                 return false
                    //             } else {
                    //                 console.log(el,searchBarConditions(el),recipe)
                    //                 return true
                    //             }
                    //         })
                    //         console.log(res)
                    //     return recipe
                    // } else {
                    //     return searchBarConditions()
                    // }
                  return  searchBarConditions()
                    
                }

                const arrTagIngredientCondition = () => {

                    const arrTagIngredients = arrAllTags.map(el => {
                        if (el.type === 'ingredient') {
                            return el.name;
                        }
                    }).filter(Boolean)
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

                    const arrTagAppliances = arrAllTags.map(el => {
                        if (el.type === 'appliance') {
                            return el.name;
                        }
                    }).filter(Boolean)

                    return arrTagAppliances.every(tag => recipeAppliance.includes(tag))
                }

                const arrTagUstensilCondition = () => {

                    const arrTagUstensils = arrAllTags.map(el => {
                        if (el.type === 'ustensil') {
                            return el.name;
                        }
                    }).filter(Boolean)

                    const arrUstensils = recipeUstensils.map(el => {
                        return cleanValue(el);
                    })
                    const res = arrTagUstensils.every(tag => {
                        return arrUstensils.includes(tag)
                    })
                    if (res === true) {
                        return true
                    }
                }


                //creation of the global chain of allTagsconditions
                const allTagsConditions = () => {
                    const resRaw = arrAllTags.map(el => el.type)
                    const res = [...new Set(resRaw)];

                    // According to tag type (default || ingredient || appliance || ustensil) fire each individual condition
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

                    // According to the number of different type, create the chaining of tag conditions
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

            // Return the final condition case (searchbarcondition || tagCondition || (or searchbarcondition && tagCondition)
            if (tags.length === 0) {
                return (
                    searchBarConditions()
                )
            }
            if (tags.length > 0 && searchBarString === '') {
                return (
                    tagsConditions()
                )

            } else {
                return (
                    searchBarConditions() &&
                    tagsConditions()
                )
            }
        })
    }

    // conditions to filter ingredient input on dropdown
    if (typeArr === 'ingredients') {
        return arr.filter((ingredient) => {
            return (
                ingredient.includes(searchValue)
            )
        })
    }
}

// Globals Listeners
searchBar.addEventListener('keyup', (e) => {
    // DOM values
    const searchValue = cleanValue(e.target.value);
    const currentValueSize = e.target.value.length;
    const tags = document.querySelectorAll('.tag');
    const tagSize = tags.length;

    // condition to fire the differents filters or reset filter at initialisation
    if (currentValueSize < 3 && tagSize > 0) {
        console.log('filter recipe with last tag')
        // tagconditions([])
    } else if (currentValueSize >= 3 && tagSize === 0) {
        console.log('3val & pas de tag')
        displayRecipes(matchValue(searchValue, recipes, 'recipes'));
    } else if (currentValueSize >= 3 && tagSize > 0) {
        console.log('3val & tag')
        // searchcondition(string) + tagcondition([])
    } else {
        // reset
        console.log('Init')
        displayRecipes(allRecipes);
    }
});

searchBar.addEventListener('keydown', (e) => {
    // DOM values
    const searchValueRaw = e.target.value;
    const searchValue = cleanValue(searchValueRaw);
    const currentValueSize = e.target.value.length;

    // condition to fire the tag creation / reset input / filterAll
    if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
        e.preventDefault();
        createTag(searchValue, 'default');
        form.reset();
        // filterAll/////////////////
    }
});

btnIngredients.addEventListener('click', () => {
    // creation of the style of custom dropdow ingredient
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
     // DOM values
    const searchValue = cleanValue( e.target.value);
    const currentValueSize = e.target.value.length;

    // condition to fire the differents filters or reset filter at initialisation
    if (currentValueSize >= 3) {
        const ingredientsArr = arrIngredients.map((el) => el)
        const filteredIngredients = matchValue(searchValue, ingredientsArr, 'ingredients')
        const sortfilteredArr = filteredIngredients.sort((a, b) => a + b)
        displayIngredients(sortfilteredArr, 'filteredIngredients');

        //filter appliances
        const filteredRecipes = matchValue(searchValue, recipes, 'recipes')
        const filteredAppliancesRaw = filteredRecipes.flatMap((recipe) => {
            return cleanValue(recipe.appliance)
        })
        const filteredAppliances = [...new Set(filteredAppliancesRaw)].sort()
        displayAppliances(filteredAppliances, 'filteredAppliances');
    } else { // reset
        displayIngredients(recipes, 'recipes');
        displayAppliances(recipes, 'recipes');
    }
});

inputIngredients.addEventListener('keydown', (e) => {
    // DOM values
    const searchValue = cleanValue( e.target.value);
    const currentValueSize = e.target.value.length;

    // condition to fire the tag creation / reset input / filterAll
    const formIngredients = document.querySelector('#form-ingredients');
    if (((e.key || e.code) === ('Enter' || 13)) && (currentValueSize >= 3)) {
        e.preventDefault();
        createTag(searchValue, 'ingredient')
        formIngredients.reset();
        // filterAll//////

        //remove dropdown style
        btnComboboxContainer.classList.remove('container-input-show');
        btnIngredients.classList.remove('btn-input-show');
        btnIngredients.classList.remove('show');
        btnIngredients.firstChild.textContent = 'Ingrédients';
        inputIngredients.classList.remove('input-show');
        ingredientsList.classList.remove('show');
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