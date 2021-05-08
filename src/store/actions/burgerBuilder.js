import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientName) => {
  return {
    ingredientName: ingredientName,
    type: actionTypes.ADD_INGREDIENT
  }
};

export const removeIngredient = (ingredientName) => {
  return {
    ingredientName: ingredientName,
    type: actionTypes.REMOVE_INGREDIENT
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const authToPurchase = () => {
  return {
    type: actionTypes.AUTH_TO_PURCHASE
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};