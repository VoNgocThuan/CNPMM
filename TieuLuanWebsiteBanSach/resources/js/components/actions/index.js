import * as types from './../constants/ActionType'

export const addProduct =(total,cartlist,totalCart) =>{
    return {
        type: types.ADD_PRODUCT,
        total: total,
        cartlist: cartlist,
        totalCart: totalCart
    }
}

export const searchProduct =(keywords_submit) =>{
    return {
        type: types.SEARCH_PRODUCT,
        keywords_submit: keywords_submit
    }
}

export const searchBook =(search) =>{
    return {
        type: types.SEARCH_BOOK,
        search: search
    }
}