import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";
import { db } from "../firebase";

function createCard(individualCard) {
  return (
    <Card
      key={individualCard.id}
      id={individualCard.id}
      src={individualCard.card.src}
      title={individualCard.card.title}
      p={individualCard.card.p}
      a={individualCard.card.a}
      price={individualCard.card.price}
      star={individualCard.card.star}
    />
  );
}

function Carousel() {
  const [carouselCard, Setcarouselcard] = useState([]);

  const getCards = () => {
    db.collection("carouselCards").onSnapshot((snapshot) => {
      let tempCards = [];

      tempCards = snapshot.docs.map((doc) => ({
        id: doc.id, //we can only use id now
        card: doc.data(), //card used in creating Card which has every fields
      }));
      Setcarouselcard(tempCards);
    });
  };

  useEffect(() => {
    //this will call the getcards function only once
    console.log("call cards");
    getCards();
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
      <Slider {...settings}>
        {carouselCard.map(createCard)}
        <Card
          key={1}
          src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/153710784_114142664021089_3735377926884964837_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IfbroHiOTmkAX-0tOX0&ccb=7-4&oh=f438576f580c4b77e1633ec8d922a325&oe=607D3F02"
        />

        <Card
          key={2}
          src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/153710784_114142664021089_3735377926884964837_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IfbroHiOTmkAX-0tOX0&ccb=7-4&oh=f438576f580c4b77e1633ec8d922a325&oe=607D3F02"
        />

        <Card
          key={3}
          src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/153710784_114142664021089_3735377926884964837_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IfbroHiOTmkAX-0tOX0&ccb=7-4&oh=f438576f580c4b77e1633ec8d922a325&oe=607D3F02"
        />

        <Card
          key={4}
          src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/153710784_114142664021089_3735377926884964837_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IfbroHiOTmkAX-0tOX0&ccb=7-4&oh=f438576f580c4b77e1633ec8d922a325&oe=607D3F02"
        />
      </Slider>
    </div>
  );
}

export default Carousel;
