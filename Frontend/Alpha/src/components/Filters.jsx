import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSearch } from "../actions/searchAction";
import axios from "../axios";
import "../designs/filters.css";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

function Filters() {
  const [products, setProducts] = useState([]);
  const [filterMenu, setFilterMenu] = useState(false);

  const inputSearch = useSelector((state) => state.inputSearch);
  const { searchedText } = inputSearch;

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  const categories = [
    {
      name: "birthday-gifts",
      _id: "1",
    },
    {
      name: "wedding-gifts",
      _id: "2",
    },
    {
      name: "Aniversary-gifts",
      _id: "3",
    },
  ];

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/cardUpload?limit=${page * 9}&${category}&${sort}&title[regex]=${
          category ? " " : searchedText
        }`
      );
      setProducts(res.data.products);

      setResult(res.data.result);
    };
    getProducts();
  }, [category, sort, page, searchedText]);

  useEffect(() => {
    dispatch(listSearch(products));
  }, [products]);

  const showFilters = () => {
    setFilterMenu(!filterMenu);
  };
  return (
    <div>
      <DoubleArrowIcon
        style={{ position: "fixed", marginTop: -10 }}
        onClick={showFilters}
      />
      {filterMenu && (
        <div className="filter-box">
          <div className="filter_menu">
            <h1 style={{ background: "crimson", color: "white" }}>
              Apply Filters
            </h1>
            <div className="Row">
              <span>Category:</span>
              <select
                name="category"
                value={category}
                onChange={handleCategory}
              >
                <option value="">All Products</option>
                {categories.map((category) => (
                  <option value={"category=" + category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="Row">
              <span>Sort by:</span>
              <select
                name="category"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Newest</option>
                <option value="sort=oldest">Oldest</option>
                <option value="sort=-price">Price: High-Low</option>
                <option value="sort=price">Price: Low-High</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="load_more">
        {result < page * 9 ? (
          " "
        ) : (
          <button onClick={() => setPage(page + 1)}>Load More </button>
        )}
      </div>
    </div>
  );
}

export default Filters;
