import React from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";

const Pagination = ({ query, currentPage, setCurrentPage, totalResults, itemsPerPage }) => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center mt-10">
      <button onClick={() => {
        setCurrentPage(prevPage => prevPage - 1);
        if (query === "" && currentPage === 2) {
          navigate(`/`)
        } else {
          navigate(`/?query=${query}&page=${parseInt(currentPage) - 1}`)
        }
      }}
        disabled={currentPage === 1}
        className={`w-[50px] h-[50px] mx-3 rounded-full border bg-white border-green-500 transition-all duration-300 ease-in-out flex justify-center items-center ${currentPage === 1 ? 'cursor-default' : 'hover:bg-green-500 hover:text-white'}`}>
        <IconArrowLeft />
      </button>
      <button onClick={() => {
        setCurrentPage(prevPage => prevPage + 1);
        navigate(`/?query=${query}&page=${parseInt(currentPage) + 1}`)
      }}
        disabled={currentPage * itemsPerPage >= totalResults}
        className={`w-[50px] h-[50px] mx-3 rounded-full border bg-white border-green-500 transition-all duration-300 ease-in-out flex justify-center items-center ${currentPage * itemsPerPage >= totalResults ? 'cursor-default' : 'hover:bg-green-500 hover:text-white'}`}>
        <IconArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
