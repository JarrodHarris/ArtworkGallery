import React from "react";
import axios from "axios";
import {
  changeArtworkFavourite,
  changeArtworkBackground,
  changeRating,
} from "../functions/cardFunctions";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { HiCog6Tooth } from "react-icons/hi2";
import { MdEdit } from "react-icons/md";
import { BiSolidImageAdd } from "react-icons/bi";
import { LuImageMinus } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import "./CardGallery.css";

export default function CardGallery() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [artworks, setArtworks] = React.useState([]);
  const [backgroundArtworks, setBackgroundArtworks] = React.useState([]);
  const [backgroundIndex, setBackgroundIndex] = React.useState(0);
  const [cardHover, setCardHover] = React.useState(false); //CARDHOVER NOT IN USE

  //going to implement a cog icon that when pressed will allow the artworks to be edited. This is will the edit icon when\
  // hovering over each artwork and when clicked will bring to a modal similar to when user is uploading artwork
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    const retrieveAllArtworks = async () => {
      const response = await axios.get("/artworks/allArtworks");
      console.log("all artworks for card display");
      setArtworks(response.data.data);
      // console.log(response.data);
    };
    const retrieveBackgroundArtworks = async () => {
      const response = await axios.get("/artworks/backgroundArtworks");
      setBackgroundArtworks(response.data);
      console.log("background artworks to choose from");
      console.log(response.data.data);
      // console.log(backgroundArtworks.length);
    };
    const selectRandomBackground = () => {
      setBackgroundIndex(
        Math.floor(Math.random() * backgroundArtworks?.length)
      );
      console.log(backgroundIndex);
    };

    retrieveAllArtworks();
    retrieveBackgroundArtworks();
    selectRandomBackground();
  }, []);

  function Card(props) {
    const cardStyle = {
      "--cardColor": props.cardColor,
    };
    return (
      <div className="col flipCard">
        <div
          className="card text-center cardProperties flipCardInner"
          style={cardStyle}
          // type="button"
          // data-bs-toggle="modal"
          // data-bs-target={"#cardModal" + props.filename}
        >
          <div className="flipCardFront">
            <div
              className="cardImage"
              onMouseOver={() => setCardHover(true)} //may not need due to not using cardHover useState NOTENOTENOTE
              onMouseOut={() => setCardHover(false)}
            >
              <img
                src={PF + props.filename}
                className={
                  editable === true
                    ? " editableCard card-img-top"
                    : "card-img-top"
                }
                alt="Artwork"
              />

              {!editable && (
                <>
                  <div className="backgroundIconContainer">
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
                  <div className="starRatingContainer">
                    <Stack spacing={1}>
                      <Rating
                        name="rating"
                        size="medium"
                        value={props.rating}
                        onChange={(e) =>
                          changeRating(props.artworkId, e.target.value)
                        }
                        precision={0.5}
                      />
                    </Stack>
                  </div>
                </>
              )}
            </div>
            {
              /* {cardHover &&*/ editable && (
                <div className="editContainer">
                  <MdEdit style={{ width: "30px", height: "30px" }} />
                </div>
              )
            }

            <div className="card-body" style={{ height: "100px" }}>
              <h5 className="card-title">{props.filename}</h5>
              <p className="card-text" style={{ fontSize: "16px" }}>
                {props.description}
                {props.favourite}
              </p>
            </div>
            <div
              className="card-footer"
              style={{
                display: "flex",
                marginTop: "10px",
              }}
            >
              <small className="text-body-secondary">{props.size} mb</small>
              <small
                className="text-body-secondary"
                style={{
                  marginLeft: "110px",
                }}
              >
                <b>{props.type}</b>
              </small>
            </div>
          </div>
          <CardBack
            filename={props.filename}
            cardColor={props.cardColor}
            lastModifiedDate={props.lastModifiedDate}
            favourite={props.favourite}
            background={props.background}
          />
        </div>
      </div>
    );
  }

  function CardBack(props) {
    return (
      <div className="flipCardBack">
        <div className="flipCardBackContainer">
          <div>
            <h5>{props.filename}</h5>
            <h5>{props.cardColor}</h5>
            <h5>{props.lastModifiedDate}</h5>
          </div>

          <div>
            <h5>{props.favourite}</h5>
            test
            <h5>{props.background}</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>Showcase of Artworks</h2>
      </div>
      <div
        className="cardGalleryContainer row row-cols-1 row-cols-md-4 g-3"
        style={{
          backgroundImage:
            backgroundArtworks.length > 0
              ? `url(${
                  PF + "/" + backgroundArtworks[backgroundIndex]?.filename
                })`
              : "#f0eff4",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {artworks.map((artwork, i) => (
          <Card
            key={i}
            artworkId={artwork._id}
            filename={artwork.filename}
            description={artwork.description}
            favourite={artwork.favourite}
            rating={artwork.rating}
            background={artwork.background}
            size={artwork.size}
            type={artwork.type}
            cardColor={artwork.cardColor}
            createdAt={artwork.createdAt}
            lastModifiedDate={artwork.lastModifiedDate}
          />
        ))}
        <div className="editCogContainer ">
          <button
            type="button"
            onClick={() => setEditable(!editable)}
            className="btn d-flex flex-row"
            style={{
              width: "150px",
              backgroundColor: "#272932",
              color: "#f0eff4",
            }}
          >
            {!editable ? "Edit Mode" : "Editing"}
            <HiCog6Tooth className="editCog" />
          </button>
        </div>
      </div>
    </>
  );
}
