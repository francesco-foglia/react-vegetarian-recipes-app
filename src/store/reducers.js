import { createReducer } from '@reduxjs/toolkit';
import { FETCH_RECIPES_SUCCESS, FETCH_RECIPE_DETAILS_SUCCESS } from './actions';

const initialState = {
  recipes: [],
  recipeDetails: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_RECIPES_SUCCESS, (state, action) => {
      state.recipes = action.payload;
    })
    .addCase(FETCH_RECIPE_DETAILS_SUCCESS, (state, action) => {
      state.recipeDetails = action.payload;
    });
});

export default reducer;
