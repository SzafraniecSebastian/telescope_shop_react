import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "normalize.css/normalize.css";
import "./slider-animations.css";
import "./styles.css";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

const HomeSlider = () => {
  const slides = [
    {
      index: 1,
      title: "Discover more",
      description:
        "No matter if you want to observe solar system plannets, closest stars or even other galaxies, we have product which match your needs",
      image: slider1
    },
    {
      index: 2,
      title: "Best products",
      description: "We offer best brands Brasser, Celeston, Pyrex",
      image: slider2
    },
    {
      index: 3,
      title: "Don't wait",
      description: "Click button below to see our offer",
      image: slider3
    }
  ];
  return (
    <Slider>
      {slides.map(oneSlide => {
        const { index, title, description, image } = oneSlide;

        return (
          <div
            key={index}
            className="slider-content"
            style={{
              background: `url('${image}') no-repeat center center`,
              backgroundSize: "cover"
            }}
          >
            <div className="inner">
              <h1>{title}</h1>
              <p>{description}</p>
              <Link to={routes.products}>
                <button className="button">Our offer</button>{" "}
              </Link>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default HomeSlider;
