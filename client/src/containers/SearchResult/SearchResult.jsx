import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import './SearchResult.scss';
import {
  searchState,
  clearSearch,
  searchNiche,
  searchProducts,
} from '../../actions/searchResult';

const SearchResult = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [searchSelection, setSearchSelection] = useState('supplierLocation');

  const onChangeSelection = (e) => {
    setSearchSelection(e.target.value);
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchSelection === 'supplierLocation') {
      dispatch(searchState(search));
    } else if (searchSelection === 'supplierNiche') {
      dispatch(searchNiche(search));
    } else {
      dispatch(searchProducts(search));
    }
    window.scrollTo(0, 300);
    dispatch(clearSearch());
  };

  return (
    <Fragment>
      <form
        onSubmit={(e) => onSubmit(e)}
        autoComplete="off"
        spellCheck="false"
        className="searchbar"
      >
        <div>
          <select
            className="searchbar__dropdown"
            name="searchSelection"
            value={searchSelection}
            onChange={(e) => onChangeSelection(e)}
          >
            <option
              value="supplierLocation"
              className="searchbar__dropdown--option"
            >
              Find Suppliers By Location
            </option>
            <option
              value="supplierNiche"
              className="searchbar__dropdown--option"
            >
              Find Suppliers By Niche
            </option>
            <option
              value="searchProduct"
              className="searchbar__dropdown--option"
            >
              Search Products
            </option>
          </select>
        </div>

        <input
          type="text"
          className="searchbar__textinput"
          placeholder="Search Suppliers By Loaction, Niche or Product.."
          name="search"
          maxLength="80"
          value={search}
          onChange={(e) => onChange(e)}
        />
        <i
          class="fa fa-search"
          aria-hidden="true"
          disabled={search === ''}
          onClick={(e) => onSubmit(e)}
        ></i>
      </form>
    </Fragment>
  );
};

export default SearchResult;
