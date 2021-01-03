import * as types from '../constants/ActionType'

var data = JSON.parse(localStorage.getItem('tasks'))
var initialState = {
    total: 0,
    cartlist: [],
    totalCart: 0,
    keywords_submit: ""
}
var myReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.ADD_PRODUCT:
            console.log("action: ",action);
            return {
                ...state,
                cartlist: action.cartlist,
                total: action.total,
                totalCart: action.totalCart
            };
        default: 
            return state
    }
}
export default myReducer;