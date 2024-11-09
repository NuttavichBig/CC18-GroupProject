import React from "react";
import bgImage from "../assets/bgImage.png";
import HeaderUserPage from "../Components/Nav-Footer-Chat/HeaderUserPage";

export default function Unauthorized() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div >
      <HeaderUserPage />
      </div>
    </div>
  );
}
