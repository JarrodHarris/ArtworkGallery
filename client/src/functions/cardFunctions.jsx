import axios from "axios";

export const changeArtworkFavourite = async (artworkId) => {
  console.log("artwork to be made as a favourite: " + artworkId); //testing

  try {
    await axios.put("/artworks/favouriteUpdate/" + artworkId);

    console.log("Artwork successfully changed");

    window.location.reload(); //can either use this where it refreshes whole page, or need to figure out how to only reload component
  } catch (error) {
    console.log(error);
  }
};

export const changeArtworkBackground = async (artworkId) => {
  console.log("artwork to be made as a background: " + artworkId); //testing

  try {
    await axios.put("/artworks/backgroundUpdate/" + artworkId);

    console.log("Artwork successfully changed");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

export const changeRating = async (artworkId, newRating) => {
  console.log("Artwork to be updated with new rating: " + artworkId); //testing

  try {
    const updatedArtwork = {
      rating: newRating,
    };

    await axios.put("/artworks/ratingUpdate/" + artworkId, updatedArtwork);

    console.log("Artwork successfully changed");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
