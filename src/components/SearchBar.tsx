import { IconSearch } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import { SetStateAction } from 'react';
import { useNavigate } from "react-router-dom";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar = ({ value, setValue, setQuery, setCurrentPage }: Props) => {

  const navigate = useNavigate();

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    setCurrentPage(1);
    const valueToQuery = value.trim().toLowerCase().replace(/\s{2,}/g, ' ');
    setQuery(valueToQuery);
    navigate(`/?query=${valueToQuery}&page=${1}`);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto mb-10 flex justify-center items-center relative">
      <input
        type="text" value={value} inputMode="search" placeholder="Search ingredients..."
        className="outline-none w-full max-w-[400px] h-[50px] py-4 px-4 pr-[45px] rounded-l-[30px] border border-green-500 bg-white text-base text-black"
        onChange={handleChange} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      {value &&
        <IconX
          className="w-[20px] h-[20px] cursor-pointer absolute top-1/2 right-16 translate-y-[-50%] text-black hover:text-green-500"
          onClick={() => {
            setQuery('');
            setValue('');
            setCurrentPage(1);
            navigate('/');
          }}
        />
      }
      <button className="w-[50px] min-w-[50px] h-[50px] rounded-r-[30px] rounded-l-[0px] border border-green-500 bg-green-500 hover:text-white flex justify-center items-center transition-all duration-300 ease-in-out"
        onClick={handleSubmit}>
        <IconSearch />
      </button>
    </div>
  );
};

export default SearchBar;
