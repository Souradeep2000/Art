import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./actions/productActions";
import "./designs/home.css";
import Navbar from "./components/Navbar";
import Box1 from "./components/Box1";
import Card from "./components/Card";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import MessageDiv from "./components/MessageDiv";
import LoadingDiv from "./components/LoadingDiv";

function createCard(individualCard) {
  return (
    <Card
      key={individualCard._id}
      _id={individualCard._id}
      src={individualCard.src}
      title={individualCard.title}
      p={individualCard.p}
      a={individualCard.a}
      price={individualCard.price}
      star={individualCard.star}
      numReviews={individualCard.numReviews}
    />
  );
}

function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, card } = productList;

  //getting the data from a route
  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingDiv></LoadingDiv>
      ) : error ? (
        <MessageDiv status="danger">{error}</MessageDiv>
      ) : (
        <div>
          <Navbar />
          <div className="container-fluid">
            <Box1 />
          </div>

          <div className="home__container">
            <div className="home__row">{card.slice(0, 7).map(createCard)}</div>
          </div>

          <Carousel />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
