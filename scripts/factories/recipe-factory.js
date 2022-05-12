function recipeFactory(datas) {

    function getIngredient() {
        return datas.map((el) => {
            return `<li class="ingredient-tag">${el}</li>`
        }).join('');
    }

    function getAppliance() {
        return datas.map((el) => {
            return `<li class="appliance-tag">${el}</li>`
        }).join('');
    }

    function getUstensil() {
        return datas.map((el) => {
            return `<li class="ustensil-tag">${el}</li>`
        }).join('');
    }

    function getArticle() {
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

        const article =
            `
                <li class="article-container col-md">
                    <article class="card shadow-sm p-0 border-0 mx-auto mb-5" data-id=${id}>
                            <img class="card-img-top" src="" alt=" ">
                        <div class="card-body p-0">
                            <header class="d-flex flex-column justify-content-between m-3">
                                <h2 class="card-title mb-2">${name}</h2>
                                <span class="fw-bolder"><img src="./assets/watch.svg" alt="" class="time">${time} min</span>
                            </header>
                            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start card-description mx-3 mt-2 mb-3">
                                    <ul class="list-unstyled">${ ingredients.map(el => {
                                    return `<li><span class="fw-bolder ingredient-item">${el.ingredient} </span>${el.quantity ? `: ${el.quantity}` : ''} ${el.unit ? 
                                        (el.unit === 'grammes'? 'g' : 
                                            (el.unit === 'cuillères à soupe'||'cuillère à soupe' ? '&nbsp;c. à s.' :
                                            el.unit)
                                        ) :
                                        ''
                                    }
                                    </li>`
                                }).join('')}</ul>
                                <p class="card-text h-100 ml-2-md description">${description}</p>
                            </div>
                        </div>
                    </article>
               </li>
            `
        return article;
    }


    return {
        getIngredient,
        getAppliance,
        getUstensil,
        getArticle
    }

}

export default recipeFactory