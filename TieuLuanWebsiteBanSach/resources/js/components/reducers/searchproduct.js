import * as types from '../constants/ActionType'

var data = JSON.parse(localStorage.getItem('tasks'))
var initialState = {
    keywords_submit: ""
}
var myReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.SEARCH_PRODUCT:
            console.log("actionSearch: ",action);
            return {
                ...state,
                keywords_submit: action.keywords_submit
            };
        default: 
            return state
    }
}
export default myReducer;