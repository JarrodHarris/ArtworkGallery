import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CarouselFeature.css";

export default function CarouselFeature() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const retrieveFavouriteArtworks = async () => {
      const response = await axios.get("/artworks/favouriteArtworks");
      setArtworks(response.data);
      // console.log("--------------");
      // console.log(response.data);
      // console.log("-------------");
    };
    retrieveFavouriteArtworks();
    // console.log(artworks.length);
  }, []);

  function FirstCarousel(props) {
    return (
      <div className="carousel-item active">
        <img
          src={PF + props.filename}
          className="d-block w-100 image img-fluid"
          alt="Artwork"
        />
        <div className="carousel-caption d-none d-md-block">
          <h4>{props.description}</h4>
        </div>
      </div>
    );
  }

  function CarouselItem(props) {
    return (
      <div className="carousel-item">
        <img
          src={PF + props.filename}
          className="d-block w-100 image img-fluid"
          alt="Artwork"
        />
        <div className="carousel-caption d-none d-md-block">
          <h4>{props.description}</h4>
        </div>
      </div>
    );
  }

  return (
    <>
      {artworks.length > 0 && artworks.length <= 3 ? (
        <>
          <div
            id="carouselExampleCaptions"
            className="carousel slide carouselFeatures carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <FirstCarousel
                filename={artworks[0].filename}
                description={artworks[0].description}
              />

              {artworks.length >= 2 ? (
                <CarouselItem
                  filename={artworks[1].filename}
                  description={artworks[1].description}
                />
              ) : (
                <></>
              )}
              {artworks.length === 3 ? (
                <CarouselItem
                  filename={artworks[2].filename}
                  description={artworks[2].description}
                />
              ) : (
                <></>
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div>no images</div>
        </>
      )}
    </>
  );
}
