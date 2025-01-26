const router = require("express").Router();
const Artwork = require("../models/Artwork");

//create/upload an artwork
router.post("/", async (req, res) => {
  try {
    const newArtwork = new Artwork(req.body);
    const savedArtwork = await newArtwork.save();
    res.status(200).json(savedArtwork);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all artworks
router.get("/allArtworks", async (req, res) => {
  let artworks = [];

  try {
    artworks = await Artwork.find();
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all favourite artworks
router.get("/allFavouriteArtworks", async (req, res) => {
  let artworks = [];

  try {
    artworks = await Artwork.find({ favourite: "true" });
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get 3 favourite artworks
router.get("/favouriteArtworks", async (req, res) => {
  let artworks = [];

  try {
    artworks = await Artwork.find({ favourite: "true" }).limit(3);
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all 'background' artworks
router.get("/backgroundArtworks", async (req, res) => {
  let artworks = [];

  try {
    artworks = await Artwork.find({ background: "true" });
    res.status(200).json(artworks);
  } catch (error) {
    res.status(500).json(error);
  }
});

//favourite an artwork
router.put("/favouriteUpdate/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const artwork = await Artwork.findById(id);
    await artwork.updateOne({ favourite: !artwork.favourite });
    res.status(200).json(artwork);
    // return artwork.favourite;
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//make artwork as potential background image
router.put("/backgroundUpdate/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const artwork = await Artwork.findById(id);
    await artwork.updateOne({ background: !artwork.background });
    res.status(200).json(artwork);
    // return artwork.background;
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

//update rating
router.put("/ratingUpdate/:id", async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const artwork = await Artwork.findByIdAndUpdate(
      id,
      { rating: rating },
      { new: true } //returns updated record
    );

    res.status(200).json(artwork);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//delete an artwork
router.delete("/:filename", async (req, res) => {
  try {
    const artwork = await Artwork.find({ filename: req.body });
    await artwork.deleteOne();
    res.status(200).json("Artwork has been deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
