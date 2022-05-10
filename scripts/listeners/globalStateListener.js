import createSearchValuesObj from "../factories/searchValuesObj-factory.js"

const refreshGlobalStateListener = (arrSearchValues) => {
 
    // const refreshGlobalState = new CustomEvent('refresh', {
    //     detail: {
    //         searchValue: "",
    //         type: "",
    //         arrSearchValues: arrSearchValues
    //     },
    //     bubbles: true,
    //     cancelable: true,
    //     composed: false
    // })
    
    
    document.addEventListener('refresh', (e) => {
    
        if (e.detail.type === 'searchBar') {
            if (e.detail.searchValue.length >= 3) {
                // if e.detail.searchValue e.detail.type 'searchBar' & >= 3 => if no val in the global state, create new obj e.detail.type 'searchBar' : if there are val in the global state, check if they are of e.detail.type 'searchBar'? replace the value : create a new obj of this new e.detail.type
                if (arrSearchValues.length === 0) {
                    arrSearchValues.push(createSearchValuesObj(e.detail.searchValue, e.detail.type))
                    console.log(arrSearchValues)
                } else {
                    const res = arrSearchValues.some((el) => el.e.detail.type.includes(e.detail.type))
                    if (res === true) {
                        arrSearchValues.map((el, idx) => {
                            if (el.e.detail.type === 'searchBar') {
                                arrSearchValues.splice(idx, 1, createSearchValuesObj(e.detail.searchValue, e.detail.type))
                                console.log(arrSearchValues)
                            }
                        })
                    } else {
                        arrSearchValues.push(createSearchValuesObj(e.detail.searchValue, e.detail.type))
                        console.log(arrSearchValues)
                    }
                }
            } else {
                if (arrSearchValues.length > 0) {
                    arrSearchValues.map((el, idx) => {
                        if (el.e.detail.type === 'searchBar') {
                            arrSearchValues.splice(idx, 1)
                            console.log(arrSearchValues)
                        }
                    })
                }
            }
        }
    
    
        if (e.detail.type !== 'searchBar') {
            const res = arrSearchValues.some((el) => el.name.includes(e.detail.searchValue))
            console.log(res)
            if (res === true) {
                arrSearchValues.map((el, idx) => {
                    if (el.name === e.detail.searchValue) {
                        arrSearchValues.splice(idx, 1, createSearchValuesObj(e.detail.searchValue, e.detail.type))
                        console.log(arrSearchValues)
                    }
                })
            } else {
            arrSearchValues.push(createSearchValuesObj(e.detail.searchValue, e.detail.type))
            console.log(arrSearchValues)
            }
        }
    
        console.log(e.detail.searchValue)
        console.log(e.detail.type)
        
    })
}


// export default refreshGlobalStateListener