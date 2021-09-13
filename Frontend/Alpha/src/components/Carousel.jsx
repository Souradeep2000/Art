import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../designs/slider.css";
import Slider from "react-slick";
import Card from "./Card";
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
      numReviews={individualCard.numReviews}
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
        Setcarouselcard(response.data.products);
      }
      return response;
    }
    fetchCarousel();
  }, [isMountedRef]);

  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <div className="container" style={{ marginBottom: "40px" }}>
      <Slider {...settings}>{carouselCard.slice(7).map(createCard)}</Slider>
    </div>
  );
}

export default Carousel;
