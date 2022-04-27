function recipeFactory(datas) {

    const {
        id,
        name,
        servings,
        ingredients,
        time,
        description,
        appliance,
        ustensils
    } = datas;

// console.log(datas)

    function getIngredient() {
        const arrIngredients = [];
        const ingredientItem = ingredients.map(el => {
            arrIngredients.push(el.ingredient);
        });
        return arrIngredients;
    }
    getIngredient();



    function getAppliance() {
        return appliance;
    }

    function getUstensil() {
        const arrUstensils = [];
        const ustensilItem = ustensils.map(el => {
            arrUstensils.push(el);
        });
        return arrUstensils;
    }

    function getArticle() {

            const articleRaw = 
            `
                <li class="article-container">
                    <article class="card shadow-sm p-0 border-0 mx-auto mb-5" data-id=${id}>
                            <img class="card-img-top" src="" alt=" ">
                        <div class="card-body">
                            <header class="d-flex justify-content-between align-items-center mb-2">
                                <h2 class="card-title mb-0">${name}</h2>
                                <span class="fw-bolder"><img src="./assets/watch.svg" alt="" class="time">${time} mins</span>
                            </header>
                            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start card-description">
                                    <ul class="list-unstyled">${ ingredients.map(el => {
                                    return `<li><span class="fw-bolder ingredient-item">${el.ingredient} :</span> ${el.quantity ? el.quantity : ''} ${el.unit ? el.unit : ''}</li>`
                                }).join('')}</ul>
                                <p class="card-text h-100 ml-2-md description">${description}</p>
                            </div>
                        </div>
                    </article>
               </li>
            `
            const arr = articleRaw.split('\n');
            const arrTrim = arr.map((el) => el.trim());
            const articleClean = arrTrim.join('');

            const ingredientsClean = [];
            ingredients.map(el => {
                ingredientsClean.push(el.ingredient);
            });


            const ustensilsClean = [];
            ustensils.map(el => {
                ustensilsClean.push(el);
            });


            const appliancesClean = appliance;



            class Article {
                constructor(id, article, ingredients, ustensils, appliances) {
                    this.id = id;
                    this.article = article;
                    this.ingredients = ingredients;
                    this.ustensils = ustensils;
                    this.appliances = appliances;
                }
            }
        
            const article = new Article(id, articleClean, ingredientsClean, ustensilsClean, appliancesClean);
            return article;

    }



    return {
        getIngredient,
        getAppliance,
        getUstensil,
        getArticle
    }

}