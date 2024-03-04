import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeDetailsSuccess } from '../store/actions';

import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { IconArrowLeft } from '@tabler/icons-react';

const RecipeDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [query] = React.useState(
    searchParams.get("query") || ''
  );

  const [currentPage] = React.useState(
    parseInt(searchParams.get("page")) || 1
  );

  const dispatch = useDispatch();
  const recipeDetails = useSelector(state => state.recipeDetails);

  const [spinner, setSpinner] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setSpinner(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        dispatch(fetchRecipeDetailsSuccess(response?.data));
        setSpinner(false);
      } catch (error) {
        setErrorMessage('An error occurred while fetching recipe details. Please try again later.');
        setSpinner(false);
      }
    };

    fetchRecipeDetails();
  }, [id, dispatch]);

  if (spinner) return <Spinner />;

  return (
    <div className="w-full min-h-screen py-10 px-[5%] 2xl:container mx-auto">
      <h2 className="text-3xl text-left mb-10">{recipeDetails?.title}</h2>

      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 h-[350px] rounded-[20px] mb-10 mr-auto bg-white overflow-hidden" style={{ boxShadow: "0px 6px 12px #00000019" }}>

        <LazyLoadImage
          width="100%"
          height="100%"
          effect="blur"
          src={recipeDetails?.image}
          alt={recipeDetails?.title}
          placeholderSrc="https://spoonacular.com/recipeImages/157993-556x370.jpg"
          className="w-full h-full mb-10 object-cover object-center rounded-[18px] border-4 border-white"
        />

      </div>

      <h3 className="text-2xl mb-5">Ingredients</h3>
      <div className="w-full flex flex-wrap justify-start items-stretch mb-6">
        {recipeDetails?.extendedIngredients?.map((ingredient, index) => (
          ingredient.nameClean &&
          <div
            key={index}
            className="w-[140px] mr-4 mb-4 p-3 flex flex-col justify-between items-center bg-white rounded-[18px]" style={{ boxShadow: "0px 6px 12px #00000019" }}>
            <small className="font-medium text-center">
              {ingredient.measures.metric.amount}
              {ingredient.measures.metric.unitShort}
            </small>

            <LazyLoadImage
              width="100%"
              height="100%"
              effect="blur"
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
              alt={ingredient.image}
              placeholderSrc="https://spoonacular.com/recipeImages/157993-556x370.jpg"
              className="w-[50px] h-[50px] m-auto my-2"
            />

            <small className="font-medium text-center">{ingredient.nameClean}</small>
          </div>
        ))}
      </div>

      <h3 className='text-2xl mb-5'>Instructions</h3>
      <div className="mb-10">
        {recipeDetails?.analyzedInstructions[0]?.steps.map((step, index) => (
          <div key={index} className="flex justify-start items-start mb-2.5">
            <small className="min-w-[24px] max-w-[24px] h-[24px] mr-3 p-1 rounded-full flex justify-center items-center bg-green-500 text-white font-semibold">{index + 1}</small>
            <p dangerouslySetInnerHTML={{ __html: step.step }} className="font-normal text-justify"></p>
          </div>
        ))}
      </div>

      <button onClick={() => {
        if (query === "" && currentPage === 1) {
          navigate(`/`)
        } else {
          navigate(`/?query=${query}&page=${currentPage}`);
        }
      }}
        className={`w-[50px] h-[50px] rounded-full border bg-white border-green-500 transition-all duration-300 ease-in-out flex justify-center items-center hover:bg-green-500 hover:text-white`}>
        <IconArrowLeft />
      </button>

      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default RecipeDetail;
