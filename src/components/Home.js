import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipesSuccess } from '../store/actions';

import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import Pagination from './Pagination';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

const Home = () => {

  const [searchParams] = useSearchParams();

  const [query, setQuery] = React.useState(
    searchParams.get("query") || ''
  );

  const [value, setValue] = React.useState(
    searchParams.get("query") || ''
  );

  const [currentPage, setCurrentPage] = React.useState(
    parseInt(searchParams.get("page")) || 1
  );

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  const [totalResults, setTotalResults] = useState(0);
  const [spinner, setSpinner] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const itemsPerPage = 12;
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    setSpinner(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=vegetarian&number=${itemsPerPage}&apiKey=${process.env.REACT_APP_API_KEY}&offset=${(currentPage - 1) * itemsPerPage}`
      );
      dispatch(fetchRecipesSuccess(response.data.results));
      setTotalResults(response.data.totalResults);
      setSpinner(false);
    } catch (error) {
      setErrorMessage('An error occurred while fetching recipes. Please try again later.');
      setSpinner(false);
    }
  }, [dispatch, query, currentPage]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (spinner) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Vegetarian Recipes</title>
      </Helmet>
      <div className="w-full min-h-screen py-10 px-[5%] 2xl:container mx-auto">

        <div className="flex justify-center items-center mb-10">
          <h1 className="text-3xl cursor-pointer" onClick={() => {
            setQuery('');
            setValue('');
            setCurrentPage(1);
            navigate('/')
          }}>
            Vegetarian Recipes
          </h1>
        </div>

        {!errorMessage && (
          <main>
            <SearchBar
              fetchRecipes={fetchRecipes}
              value={value}
              setValue={setValue}
              setQuery={setQuery}
              setCurrentPage={setCurrentPage}
            />
            {recipes.length > 0 ? (
              <>
                <RecipeList
                  recipes={recipes}
                  query={query}
                  currentPage={currentPage}
                />

                {totalResults > itemsPerPage && (
                  <Pagination
                    query={query}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalResults={totalResults}
                    itemsPerPage={itemsPerPage}
                  />
                )}
              </>
            ) : (
              <p className="text-center my-5">No recipes found. Try another search.</p>
            )}
          </main>
        )}

        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

      </div>
    </>
  );
};

export default Home;
