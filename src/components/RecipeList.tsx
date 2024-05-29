import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Placeholder from '../assets/placeholder.jpg';

interface Recipe {
  id: string;
  image: string;
  title: string;
}

interface Props {
  recipes: Recipe[];
  query: string;
  currentPage: number;
}

const RecipeList: React.FC<Props> = ({ recipes, query, currentPage }) => {
  return (
    <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}?query=${query}&page=${currentPage}`} className="flex">
          <div
            className="w-full p-[4px] bg-white rounded-[20px] flex flex-col justify-start items-start group"
            style={{ boxShadow: "0px 6px 12px #00000019" }}
          >
            <div className="w-full h-auto min-h-[250px] max-h-[250px]">
              <LazyLoadImage
                width="100%"
                height="100%"
                effect="blur"
                src={recipe.image}
                alt={recipe.title}
                placeholderSrc={Placeholder}
                className="w-full h-auto object-cover object-center rounded-[16px] min-h-[250px] max-h-[250px]"
              />
            </div>
            <h2 className="p-2 pt-[12px] group-hover:text-green-500 transition-all duration-300 ease-in-out text-black text-left">
              {recipe.title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
