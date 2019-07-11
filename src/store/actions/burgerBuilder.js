import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }

};

export const fetchIngredientsFail = () =>{
  return{
      type: actionTypes.FETCH_INGREDIENTS_FAIL
  }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-596ee.firebaseio.com/ingredients.json").then(response => {
            dispatch(setIngredients(response.data))
        }).catch(error => {
            dispatch(fetchIngredientsFail)
        });
    }
};