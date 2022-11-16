import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { localStorageService } from "../services/localStorageService";
import "./Favorites.css";

export default function Favorites(props) {
  const navigate = useNavigate();
  const favs = localStorageService.get("favorites") || [];

  const handleFavClick = (name) => {
    props.get(name);
    navigate("/");
  };
  return (
    <div className="buttons">
      <Link to={"/"}>
        <button>Home</button>
        <br />
      </Link>
      <Link to={"/favorites"}>
        <button>Favorites</button>
        <br />
      </Link>
      <br></br>
      <h1 style={{ display: "block" }}>My Favorites</h1>
      <div className="favs">
        {favs.map((fav) => {
          return (
            <div key={fav?.key}>
              {fav && (
                <button onClick={() => handleFavClick(fav.name)}>
                  {fav.name} {fav.value} {fav.unit} {fav.key}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
