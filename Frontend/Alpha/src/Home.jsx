import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Box1 from "./components/Box1";
import Card from "./components/Card";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import axios from "./axios";

function createCard(individualCard) {
  return (
    <Card
      key={individualCard._id}
      id={individualCard._id}
      src={individualCard.src}
      title={individualCard.title}
      p={individualCard.p}
      a={individualCard.a}
      price={individualCard.price}
      star={individualCard.star}
    />
  );
}

function Home() {
  const [card, Setcard] = useState([]);
  //getting the data from a route
  useEffect(() => {
    async function fetchCards() {
      const response = await axios.get("/cardUpload");
      Setcard(response.data);
      return response;
    }
    fetchCards();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <Box1 />
      </div>

      <div className="home__container">
        <div className="home__row">{card.map(createCard)}</div>
      </div>

      <Carousel />
      <Footer />
    </div>
  );
}

export default Home;
