import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Accueil.module.scss";

export default function Accueil() {
  return (
    <div>
      <h1 className={styles.title}>Choisissez un profil</h1>
      <div className={styles.linkContainer}>
          <NavLink to={`/user/12`} key={12}>
            <button>Karl</button>
          </NavLink>
          <NavLink to={`/user/18`} key={18}>
            <button>Cecilia</button>
          </NavLink>
      </div>
    </div>
  );
}
