import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card";

function Carousel() {
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
        <Card src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/153710784_114142664021089_3735377926884964837_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IfbroHiOTmkAX-0tOX0&ccb=7-4&oh=f438576f580c4b77e1633ec8d922a325&oe=607D3F02" />

        <Card src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/153710784_114142664021089_3735377926884964837_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IfbroHiOTmkAX-0tOX0&ccb=7-4&oh=f438576f580c4b77e1633ec8d922a325&oe=607D3F02" />

        <Card src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/153710784_114142664021089_3735377926884964837_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IfbroHiOTmkAX-0tOX0&ccb=7-4&oh=f438576f580c4b77e1633ec8d922a325&oe=607D3F02" />

        <Card src="https://instagram.fccu3-1.fna.fbcdn.net/v/t51.2885-15/e35/153710784_114142664021089_3735377926884964837_n.jpg?tp=1&_nc_ht=instagram.fccu3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=IfbroHiOTmkAX-0tOX0&ccb=7-4&oh=f438576f580c4b77e1633ec8d922a325&oe=607D3F02" />
      </Slider>
    </div>
  );
}

export default Carousel;
