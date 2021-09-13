import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../designs/addProduct.css";
import LoadingDiv from "./LoadingDiv";
import MessageDiv from "./MessageDiv";
import Navbar from "./Navbar";
import axios from "../axios";
import { useHistory, useParams } from "react-router";

const initialState = {
  _id: "",
  title: "",
  price: 249,
  p: "",
  category: "",
};

function AddProduct() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const history = useHistory();

  const { id } = useParams();
  const productId = id;

  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState(false);
  const [onEdit, setEdit] = useState(false);

  //const Allcategories = useSelector((state) => state.productCategories);
  // const { categories } = Allcategories;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (userInfo && userInfo.isAdmin) {
        const file = e.target.files[0];

        if (!file) return alert("File does not exist");

        if (file.size > 1024 * 4024) return alert("File too large!");

        if (file.type !== "image/jpeg" && file.type !== "image/png")
          return alert("File not supported");

        setLoading(true);
        const url = await axios.get("/s3Url");
        const setUrl = url.data.url;

        await fetch(setUrl, {
          method: "PUT",
          headers: { "Content-Type": "multipart/form-data" },
          body: file,
        });

        const imageUrl = setUrl.split("?")[0];

        setLoading(false);

        setImages(imageUrl);
      } else
        return alert(
          "You are not an Admin and please mail us how did you got here"
        );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDestroy = async () => {
    try {
      if (userInfo && userInfo.isAdmin) {
        setLoading(true);
        const response = await axios.post("/s3Url", { images });
        setLoading(false);
        setImages(false);
      } else
        return alert(
          "You are not an Admin and please mail us how did you got here"
        );
    } catch (err) {
      alert(err);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userInfo && userInfo.isAdmin) {
        if (!images) return alert("Image upload is necessary");

        if (onEdit) {
          const response = await axios.put(
            `/cardUpload/${productId}`,
            { ...product, src: images },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
        } else {
          const response = await axios.post(
            "/cardUpload",
            { ...product, src: images },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
        }

        setImages(false);
        setProduct(initialState);
        history.push("/");
      } else return alert("You are not an admin");
    } catch (err) {
      setError(err.message);
    }
  };
  const styleUpload = {
    display: images ? "block" : "none",
  };

  useEffect(() => {
    if (productId) {
      setEdit(true);

      async function fetchData() {
        const response = await axios.get(`/cardUpload/${productId}`);
        setProduct(response.data);
        setImages(response.data.src);
      }
      fetchData();
    } else {
      setEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [productId]);

  return (
    <div>
      <Navbar />
      <div className="create_product">
        <div className="img_up">
          <input type="file" name="file" id="file_up" onChange={handleUpload} />
          {loading ? (
            <div id="file_img">
              <LoadingDiv />
            </div>
          ) : (
            <div id="file_img" style={styleUpload}>
              <img src={images ? images : ""} alt="" />
              <span val="1" onClick={handleDestroy}>
                x
              </span>
            </div>
          )}
        </div>
        {error ? (
          <MessageDiv status="danger">{error}</MessageDiv>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="title">Product Title</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={product.title}
                onChange={handleChangeInput}
              />
            </div>

            <div className="row">
              <label htmlFor="price">Product Price</label>
              <input
                type="number"
                name="price"
                id="price"
                required
                value={product.price}
                onChange={handleChangeInput}
              />
            </div>

            <div className="row">
              <label htmlFor="description">Product Description</label>
              <textarea
                type="text"
                name="p"
                id="description"
                placeholder="More than 70 characters is required to unlock button"
                required
                value={product.p}
                onChange={handleChangeInput}
                rows="5"
              />
            </div>

            <div className="row category">
              <select
                name="category"
                value={product.category}
                onChange={handleChangeInput}
              >
                <option value="">Please select a category</option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {product.p.length > 70 && (
              <button type="submit">{onEdit ? "Update" : "Create"}</button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
