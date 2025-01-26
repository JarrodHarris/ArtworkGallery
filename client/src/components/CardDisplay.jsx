import React, { useEffect } from "react";
import axios from "axios";
import {
  changeArtworkFavourite,
  changeArtworkBackground,
} from "../functions/cardFunctions";
import { FiHeart } from "react-icons/fi";
import { BiSolidImageAdd } from "react-icons/bi";
import { LuImageMinus } from "react-icons/lu";
import "./CardDisplay.css";

export default function CardDisplay() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [artworks, setArtworks] = React.useState([]);
  const [selectOption, setSelectOption] = React.useState("All");

  useEffect(() => {
    const retrieveCardDisplayArtworks = async () => {
      if (selectOption === "All") {
        console.log("all artworks for card display");
        const response = await axios.get("/artworks/allArtworks");
        setArtworks(response.data);
        console.log(response.data);
      } else if (selectOption === "Favourites") {
        console.log("only favourite artworks for card display");
        const response = await axios.get("/artworks/allFavouriteArtworks");
        setArtworks(response.data);
        console.log(response.data);
      }
    };
    retrieveCardDisplayArtworks();
  }, [selectOption]);

  function Card(props) {
    const cardStyle = {
      "--cardColor": props.cardColor,
    };
    return (
      <div className="col">
        <div
          className="card text-center cardProperties h-100"
          style={cardStyle}
          type="button"
          data-bs-toggle="modal"
          data-bs-target={"#cardModal" + props.filename}
        >
          <div style={{ position: "relative", zIndex: "1" }}>
            <img
              src={PF + props.filename}
              className="card-img-top"
              alt="Artwork"
            />
            <div className="backgroundContainer">
              {props.background === true ? (
                <LuImageMinus
                  className="minusBackground"
                  onClick={() => changeArtworkBackground(props.artworkId)}
                />
              ) : (
                <BiSolidImageAdd
                  className="addBackground"
                  onClick={() => changeArtworkBackground(props.artworkId)}
                />
              )}
            </div>
            <div className="heartContainer">
              <FiHeart
                className={
                  props.favourite === true ? "heart filledHeart" : "heart"
                }
                onClick={() => changeArtworkFavourite(props.artworkId)}
              />
            </div>
          </div>
          <div
            className="card-body"
            style={{
              height: "100px",
            }}
          >
            <h5 className="card-title">{props.filename}</h5>
            <p className="card-text" style={{ fontSize: "16px" }}>
              {props.description}
            </p>
          </div>
        </div>
        <CardModal filename={props.filename} />
      </div>
    );
  }

  function CardModal(props) {
    return (
      <div
        className="modal fade"
        id={"cardModal" + props.filename}
        tabIndex="-1"
        aria-labelledby={"cardModalLabel" + props.filename}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={"cardModalLabel" + props.filename}
              >
                {props.filename}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={PF + props.filename}
                className="card-img-top"
                alt="Artwork"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="selectContainer">
        <select
          name="select"
          className="form-select selectProperties"
          aria-label="Artwork filter"
          value={selectOption}
          onChange={(e) => setSelectOption(e.target.value)}
        >
          <option defaultValue={"All"}>All</option>
          <option value="Favourites">Favourites</option>
        </select>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {artworks.map((artwork, i) => (
          <Card
            key={i}
            artworkId={artwork._id}
            filename={artwork.filename}
            description={artwork.description}
            favourite={artwork.favourite}
            background={artwork.background}
            size={artwork.size}
            type={artwork.type}
            cardColor={artwork.cardColor}
          />
        ))}
      </div>
    </>
  );
}
