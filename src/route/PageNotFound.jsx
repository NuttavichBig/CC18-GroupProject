import React from "react";
import notfound from "../assets/notfound.png";
import HeaderUserPage from "../Components/Nav-Footer-Chat/HeaderUserPage";

export default function PageNotFound() {
  return (
    <div
      style={{
        backgroundImage: `url(${notfound})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <HeaderUserPage />
      </div>
    </div>
  );
}
