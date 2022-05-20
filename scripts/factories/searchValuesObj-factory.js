const createSearchValuesObj = (searchValue, type) => {
    class searchObj {
        constructor(type, name) {
            this.type = type;
            this.name = name;
        }
    }

    return (
        type === 'searchBar' ?
        new searchObj('searchBar', searchValue) :
        type === 'ingredient' ?
        new searchObj('ingredient', searchValue) :
        type === 'appliance' ?
        new searchObj('appliance', searchValue) :
        type === 'ustensil' ?
        new searchObj('ustensil', searchValue) :
        new searchObj('default', searchValue)
    )
}

export default createSearchValuesObj;