import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchInput } from "../actions/searchAction";

function Searchbar() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log(search);
    dispatch(searchInput(search));
  };

  return (
    <div className="searchBox">
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        <Link to="/search">
          <button
            className="btn btn-outline-warning my-2 my-sm-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Searchbar;
