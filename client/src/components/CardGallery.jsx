import React, { useEffect } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import "./CardGallery.css";

export default function CardGallery() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [artworks, setArtworks] = React.useState([]);

  useEffect(() => {
    const retrieveAllArtworks = async () => {
      console.log("all artworks for card display");
      const response = await axios.get("/artworks/allArtworks");
      setArtworks(response.data);
      console.log(response.data);
    };
    retrieveAllArtworks();
  }, []);

  const changeArtworkFavourite = async (artworkId) => {
    console.log("artwork to be made as a favourite: " + artworkId); //testing

    try {
      await axios.put("/artworks/favouriteUpdate/" + artworkId);

      console.log("Artwork successfully changed");

      window.location.reload(); //can either use this where it refreshes whole page, or need to figure out how to only reload component
    } catch (error) {
      console.log(error);
    }
  };

  function Card(props) {
    const cardStyle = {
      "--cardColor": props.cardColor,
    };
    return (
      <div className="col">
        <div
          className="card text-center cardProperties"
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
            <FiHeart
              className={
                props.favourite === true ? "heart filledHeart" : "heart"
              }
              onClick={() => changeArtworkFavourite(props.artworkId)}
            />
          </div>
          <div
            className="card-body"
            style={{
              height: "100px",
            }}
          >
            <h5 className="card-title">{props.filename}</h5>
            <p className="card-text">{props.description}</p>
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
      <div className="cardGalleryContainer row row-cols-1 row-cols-md-4 g-3">
        {artworks.map((artwork, i) => (
          <Card
            key={i}
            artworkId={artwork._id}
            filename={artwork.filename}
            description={artwork.description}
            favourite={artwork.favourite}
            cardColor={artwork.cardColor}
            createdAt={artwork.createdAt}
          />
        ))}
      </div>
    </>
  );
}
