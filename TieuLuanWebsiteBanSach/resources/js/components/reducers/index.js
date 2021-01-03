import {combineReducers} from 'redux';
import products from './addproduct'
import searchBook from './searchBook';

const myReducer = combineReducers({
    products,
    searchBook,
});

export default myReducer;