import * as types from '../constants/ActionType'

var initialState = {
    search: '',
}
var myReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.SEARCH_BOOK:
            return {
                ...state,
                search: action.search
            };
        default: 
            return state
    }
}
export default myReducer;