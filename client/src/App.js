import React from "react";
import { IconContext } from "react-icons";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./Routes/Home";
import Gallery from "./Routes/Gallery";
import UploadArtwork from "./Routes/UploadArtwork";
import About from "./Routes/About";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const AppLayout = () => (
    <IconContext.Provider value={{ color: "undefined", size: "1em" }}>
      <Navbar />
      <Outlet />
    </IconContext.Provider>
  );

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          //HOME PAGE
          path: "/",
          element: <Home />,
        },
        {
          //GALLERY PAGE
          path: "gallery",
          element: <Gallery />,
        },
        {
          //UPLOADARTWORK PAGE
          path: "uploadArtwork",
          element: <UploadArtwork />,
        },
        {
          //ABOUT PAGE
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
