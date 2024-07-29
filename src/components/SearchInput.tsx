import React, { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { Search as SearchIcon } from '@/assets/icons/Search';

interface SearchInputProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch }) => {
  const [innerSearch, setInnerSearch] = useState(search);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 500),
    [setSearch]
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInnerSearch(event.target.value);
      debouncedSearch(event.target.value);
    },
    [debouncedSearch]
  );

  return (
    <div className="p-4 pr-8 pl-8 border w-full md:w-1/3 border-gray-300 rounded-full shadow-md flex flex-row justify-between align-middle">
      <input
        className="border-none w-full avo-shadow-none focus:outline-none pr-2 text-xs md:text-md"
        onChange={handleOnChange}
        type="text"
        value={innerSearch}
        placeholder="Search address, city, state, zip code"
      />
      <SearchIcon />
    </div>
  );
};

export default SearchInput;
