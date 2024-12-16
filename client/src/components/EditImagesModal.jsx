import React, { useState } from "react";
import { RiArrowDropLeftFill } from "react-icons/ri";
import { RiArrowDropRightFill } from "react-icons/ri";
import axios from "axios";

// URL.REVOKEOBJECTURL() PROBS NEED TO BE CALLED OR THERE IS GOING TO BE A MEMORY LEAK

export default function EditImagesModal({ files }) {
  const [index, setIndex] = useState(0);
  const [successAlert, setSuccessAlert] = useState(false);

  //FORM DATA
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [cardColor, setCardColor] = useState("#4bb3fd");
  const [artworks, setArtworks] = useState([]);

  const saveArtwork = (event) => {
    event.preventDefault();

    //conversion to megabytes
    let size = 0;
    size = files[index].size / 1048576;
    let roundedSize = parseFloat(size.toFixed(2));

    if (filename !== "") {
      console.log("filename was change", filename);
      setArtworks([
        ...artworks,
        {
          filename: filename,
          description: description,
          lastModifiedDate: files[index].lastModifiedDate,
          size: roundedSize,
          type: files[index].type,
          cardColor: cardColor,
        },
      ]);
    } else {
      console.log("filename was left", filename);

      setArtworks([
        ...artworks,
        {
          filename: event.target.filename.placeholder,
          description: description,
          lastModifiedDate: files[index].lastModifiedDate,
          size: roundedSize,
          type: files[index].type,
          cardColor: cardColor,
        },
      ]);
    }
    clearStates();
  };

  const clearStates = () => {
    setFilename("");
    setDescription("");
    setCardColor("#ffffff");
  };

  //saving artworks(images) to public/images
  const uploadArtworks = async (event) => {
    event.preventDefault();

    try {
      artworks.forEach(async (artwork) => {
        axios.post("/artworks", artwork);
      });
    } catch (error) {
      console.log(error);
    }

    for (let i = 0; i <= artworks.length; i++) {
      console.log(artworks);
      const data = new FormData();
      // data.append("name", artworks[0].filename);
      data.append("file", files[i]);

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    setSuccessAlert(true);
  };

  //wrap around functions, essentially acting as a carasoul
  const previousArtwork = (event) => {
    event.preventDefault();
    if (files.length === 1) {
      //if there is only one image, wrap around
      return;
    } else if (index > 0) {
      setIndex(index - 1);
    } else if (index === 0) {
      setIndex(files.length - 1);
    }
  };
  const nextArtwork = (event) => {
    event.preventDefault();
    if (files.length === 1) {
      return;
    } else if (index === files.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn secondary-button"
        style={{ marginTop: "20px" }}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Finalize Images
      </button>
      {successAlert && (
        <div className="alert alert-success fs-2 mt-2" role="alert">
          Artworks have been Successfully uploaded!
        </div>
      )}
      {/* Modal */}
      <div
        className="modal fade modal-xl"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-2" id="staticBackdropLabel">
                Edit your Artworks
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* FORM */}
            <div className="modal-body">
              <div className="modal-left">
                <img
                  src={files[index].preview}
                  className="rounded"
                  style={{ marginTop: "10px" }}
                  alt=""
                  with={300}
                  height={300}
                  // onLoad={() => {
                  //   URL.revokeObjectURL(files[index].preview);
                  // }}
                />
                <div style={{ flexDirection: "row" }}>
                  <RiArrowDropLeftFill
                    className="arrow-icon"
                    onClick={(event) => previousArtwork(event)}
                  />
                  <RiArrowDropRightFill
                    className="arrow-icon"
                    onClick={(event) => nextArtwork(event)}
                  />
                </div>
              </div>
              <div className="modal-right fs-2">
                <form className="container-lg" onSubmit={saveArtwork}>
                  <div className="row mb-2">
                    <label htmlFor="filename" className="form-label fs-4">
                      Filename(optional)
                    </label>
                    <input
                      type="text"
                      className="form-control col-sm"
                      id="filename"
                      name="filename"
                      value={filename}
                      placeholder={files[index].name}
                      onChange={(e) => setFilename(e.target.value)}
                    />
                    <span className="input-group-text col-sm-3">
                      {files[index].type}
                    </span>
                  </div>
                  <div className="row mb-2">
                    <label htmlFor="description" className="form-label fs-4">
                      Description
                    </label>
                    <textarea
                      className="form-control col"
                      rows="6"
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="lastModifiedDate"
                      className="form-label fs-4"
                    >
                      Last Modified Date
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="lastModifiedDate"
                      name="lastModifiedDate"
                      value={files[index].lastModifiedDate}
                      aria-label="lastModifiedDate"
                      disabled
                      readOnly
                    ></input>
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label htmlFor="size" className="form-label fs-4">
                        {"Size (Bytes)"}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="size"
                        name="size"
                        value={files[index].size}
                        aria-label="size"
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="cardColor" className="form-label fs-4">
                        Color Picker for Card
                      </label>
                      <input
                        type="color"
                        className="form-control form-control-color"
                        id="cardColor"
                        name="cardColor"
                        value={cardColor}
                        title="Choose your color"
                        onChange={(e) => setCardColor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* END OF FORM */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={uploadArtworks}
              >
                Commit and Upload Images
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
