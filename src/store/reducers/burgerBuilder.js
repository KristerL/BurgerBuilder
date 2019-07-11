import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility";

const initialState ={
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state,action) =>{
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] +1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) =>{
    const updatedIngr = {[action.ingredientName]: state.ingredients[action.ingredientName] +1}
    const updatedIngri = updateObject(state.ingredients, updatedIngr);
    const updatedSt = {
        ingredients: updatedIngri,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedSt);
};

const setIngredients = (state,action) =>{
    return updateObject(state, {
        ingredients:{
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat,
            cheese: action.ingredients.cheese,
        },
        totalPrice: 4,
        error: false
    });
};

const burgerBuilder = (state= initialState, action) =>{
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENT:return addIngredient(state,action);

        case actionTypes.REMOVE_INGRIDIENT: return removeIngredient(state,action);

        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);

        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return updateObject(state, {error:true});
        default:
            return state;
    }
};

export default burgerBuilder;