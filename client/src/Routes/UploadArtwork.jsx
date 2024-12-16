import React from "react";
import "./uploadArtwork.css";
import DragAndDropImages from "../components/DragAndDropImages";

export default function UploadArtwork() {
  return (
    <div className="uploadArtwork">
      <DragAndDropImages />
    </div>
  );
}
