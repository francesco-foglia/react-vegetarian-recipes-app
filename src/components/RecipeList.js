import React from 'react';
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const RecipeList = ({ recipes, query, currentPage }) => {
  return (
    <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}?query=${query}&page=${currentPage}`} className="flex">
          <div className="w-full p-4 bg-white rounded-[20px] flex flex-col justify-between items-start group" style={{ boxShadow: "0px 6px 12px #00000019" }}>

            <LazyLoadImage
              width="100%"
              height="100%"
              effect="blur"
              src={recipe.image}
              alt={recipe.title}
              placeholderSrc="https://spoonacular.com/recipeImages/157993-556x370.jpg"
              className="w-full h-auto object-cover object-center rounded-[16px] min-h-[250px] max-h-[250px]"
            />

            <h2 className="mt-3 group-hover:text-green-500 transition-all duration-300 ease-in-out">
              {recipe.title}
            </h2>

          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
