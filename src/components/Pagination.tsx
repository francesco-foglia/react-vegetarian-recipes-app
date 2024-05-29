import { IconArrowLeft } from '@tabler/icons-react';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

interface Props {
  query: string;
  currentPage: number;
  setCurrentPage: (page: number | ((prevPage: number) => number)) => void;
  totalResults: number;
  itemsPerPage: number;
}

const Pagination: React.FC<Props> = ({ query, currentPage, setCurrentPage, totalResults, itemsPerPage }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center mt-10">
      <button
        onClick={() => {
          setCurrentPage(prevPage => prevPage - 1);
          if (query === "" && currentPage === 2) {
            navigate(`/`);
          } else {
            navigate(`/?query=${query}&page=${currentPage - 1}`);
          }
        }}
        disabled={currentPage === 1}
        className={`w-[50px] h-[50px] mx-3 rounded-full border bg-green-500 border-green-500 transition-all duration-300 ease-in-out flex justify-center items-center ${currentPage === 1 ? 'cursor-default' : ''}`}
      >
        <IconArrowLeft />
      </button>
      <button
        onClick={() => {
          setCurrentPage(prevPage => prevPage + 1);
          navigate(`/?query=${query}&page=${currentPage + 1}`);
        }}
        disabled={currentPage * itemsPerPage >= totalResults}
        className={`w-[50px] h-[50px] mx-3 rounded-full border bg-green-500 border-green-500 transition-all duration-300 ease-in-out flex justify-center items-center ${currentPage * itemsPerPage >= totalResults ? 'cursor-default' : ''}`}
      >
        <IconArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
