import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";
import { db } from "../firebase";
import axios from "../axios";

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

function Carousel() {
  const [carouselCard, Setcarouselcard] = useState([]);

  useEffect(() => {
    async function fetchCarousel() {
      const response = await axios.get("/cardUpload");
      Setcarouselcard(response.data);
      return response;
    }
    fetchCarousel();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <Slider {...settings}>{carouselCard.slice(5, 10).map(createCard)}</Slider>
    </div>
  );
}

export default Carousel;
