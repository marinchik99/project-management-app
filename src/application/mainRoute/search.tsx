import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../store/store';
import '../../css/search.css';

function Search() {
  // const { movieSearchValue } = useAppSelector(({ movieReducer }) => movieReducer);
  // const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');

  // useEffect(() => {
  //   setSearchValue(movieSearchValue);
  // }, []);

  const updateSearchValue = (item: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(item.target.value);
  };

  // const handleKey = (event: KeyboardEvent) => {
  //   if (event.key === 'Enter') {
  //     dispatch(updateMoviesSearchResult(searchValue));
  //   }
  // };

  return (
    <div className="search-wrap">
      <input
        className="input-search"
        type="search"
        placeholder="Search"
        value={searchValue || ''}
        onChange={(item) => updateSearchValue(item)}
        // onKeyDown={handleKey}
      />
      <button
        className="btn search-btn"
        // onClick={() => dispatch(updateMoviesSearchResult(searchValue))}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
