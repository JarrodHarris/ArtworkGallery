import { useState } from "react";
import CarouselFeature from "../components/CarouselFeature";
import Divider from "../components/Divider";
import CardDisplay from "../components/CardDisplay";
import { FaCircleInfo } from "react-icons/fa6";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import "./Home.css";

export default function Home() {
  const [anchorEl, setAnchorEl] = useState(null);

  const paragraph =
    "The images shown in the carousel are considered 'favourite' artworks. " +
    "An artwork can be a favourite by clicking on the 'heart' icon located on " +
    "any of the displays within the home or gallery page. This can also be achieved by " +
    "directly selecting favourite when uploading/editing an artwork ";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="home">
      <CarouselFeature />
      <div className="infoContainer">
        <button style={{ border: "none" }} onClick={handleClick}>
          <FaCircleInfo className="info" style={{ fontSize: "35px" }} />
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <Typography
            sx={{
              p: 2,
              background: "#272932",
              color: "white",
              width: "300px",
              textAlign: "center",
            }}
          >
            {paragraph}
          </Typography>
        </Popover>
      </div>
      <>
        <Divider />
      </>
      <div style={{ width: "65%" }}>
        <div className="cardContainer">
          <CardDisplay />
        </div>
      </div>
    </div>
  );
}
