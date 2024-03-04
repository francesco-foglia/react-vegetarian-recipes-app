export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPE_DETAILS_SUCCESS = 'FETCH_RECIPE_DETAILS_SUCCESS';

export const fetchRecipesSuccess = (recipes) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
});

export const fetchRecipeDetailsSuccess = (recipeDetails) => ({
  type: FETCH_RECIPE_DETAILS_SUCCESS,
  payload: recipeDetails,
});
