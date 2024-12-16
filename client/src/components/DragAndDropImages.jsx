import { useState, useCallback } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import EditImagesModal from "./EditImagesModal";

export default function DragAndDropImages() {
  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const removeFile = (e, name) => {
    e.preventDefault();
    setFiles((files) => files.filter((file) => file.name !== name));

    if (files.length === 1) {
      //checks if the last file is deleted and sets visibility of button to edit images to false
      setVisibility(false);
    }
  };

  //The useCallback hook is a built-in hook in React that lets you memoize a callback function by preventing it from being recreated on every render. In simple terms, it means that the callback function is cached and does not get redefined on every render.
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles);

    // acceptedFiles? checks if array exists, otherwise returns as undefined
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map(
          (file) => Object.assign(file, { preview: URL.createObjectURL(file) }) //creates an additional field to file that is 'preview' where we can show an image tag
        ),
      ]);
      setVisibility(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
    maxSize: 1024 * 30000, //30 mbs
  });

  return (
    <div className="container">
      <div className="dragAndDropArea" {...getRootProps()}>
        <FaFileUpload style={{ marginBottom: "10px", fontSize: "80px" }} />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>Drag and drop images here click </p>
            <p>or</p>
            <p>to select files</p>
          </>
        )}
      </div>
      {
        /* Preview */
        //URL.revokeObjectURL(file.preview); stopping memory leaks by taking out the preview field in file
      }
      <div
        style={{
          maxHeight: "415px",
          width: "1400px",
          overflowY: "auto",
        }}
      >
        <table className="table table-hover text-center fs-2">
          <thead className="table-dark" style={{ position: "sticky" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Filename</th>
              <th scope="col">Preview</th>
              <th scope="col">Size</th>
              <th scope="col">Delete</th>
              <th scope="col">Upload</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {files.map((file, index) => (
              <tr style={{ cursor: "pointer", height: "80px" }} key={file.name}>
                {/**key could become index as there might be mutiple files with the same name */}
                <th scope="row">{index + 1}</th>
                <td>{file.name}</td>
                <td className="text-center">
                  <img
                    src={file.preview}
                    className="rounded"
                    alt=""
                    with={100}
                    height={100}
                    // onLoad={() => {
                    //   URL.revokeObjectURL(file.preview);
                    // }}
                  />
                </td>
                <td>{file.size}</td>
                <td className="text-center">
                  <FaTrashAlt
                    style={{ fontSize: "50px" }}
                    className="trash-remove"
                    onClick={(e) => removeFile(e, file.name)}
                  />
                </td>
                <td className="text-center">
                  <IoIosCheckbox style={{ color: "green", fontSize: "50px" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibility && <EditImagesModal files={files} />}
    </div>
  );
}
