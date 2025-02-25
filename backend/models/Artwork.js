const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      max: 60,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    background: {
      type: Boolean,
      default: false,
    },
    lastModifiedDate: {
      type: String,
      // required: true,
    },
    size: {
      type: Number,
      // required: true,
    },
    type: {
      type: String,
      // required: true,
    },
    cardColor: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true } // a timestamp for when an artwork is created or updated
);

module.exports = mongoose.model("Artwork", ArtworkSchema);
