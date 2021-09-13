import React, { useEffect, useState } from "react";
import axios from "../axios";

function Filters() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
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
    setSearch("");
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/cardUpload?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      //  console.log(res.data.products);

      setResult(res.data.result);
      //console.log("res-->", res.data.result);
    };
    getProducts();
  }, [category, sort, page, search]);
  return (
    <div className="filter_menu">
      <div className="Row">
        <span>Filters:</span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="load_more">
        {result < page * 9 ? (
          " "
        ) : (
          <button onClick={() => setPage(page + 1)}>Load More </button>
        )}
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
  );
}

export default Filters;
