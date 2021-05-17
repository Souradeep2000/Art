import React, { useState, useEffect, useRef } from "react";
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
      _id={individualCard._id}
      src={individualCard.src}
      title={individualCard.title}
      p={individualCard.p}
      a={individualCard.a}
      price={individualCard.price}
      star={individualCard.star}
    />
  );
}

// cleaning useeffect
function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

function Carousel() {
  const [carouselCard, Setcarouselcard] = useState([]);
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    async function fetchCarousel() {
      const response = await axios.get("/cardUpload");
      if (isMountedRef.current) {
        Setcarouselcard(response.data);
      }
      return response;
    }
    fetchCarousel();
  }, [isMountedRef]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="container" style={{ marginBottom: "40px" }}>
      <Slider {...settings}>{carouselCard.slice(5, 10).map(createCard)}</Slider>
    </div>
  );
}

export default Carousel;
