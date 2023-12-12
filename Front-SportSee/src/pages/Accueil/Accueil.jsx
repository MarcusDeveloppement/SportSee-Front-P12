import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Accueil.module.scss";
import { USER_MAIN_DATA } from "../../Data/DataMocked";

export default function Accueil() {
  return (
    <div>
      <h1 className={styles.title}>Choisissez un profil</h1>
      <div className={styles.linkContainer}>
        {USER_MAIN_DATA.map((user) => (
          <NavLink to={`/user/${user.id}`} key={user.id}>
            <button>{user.userInfos.firstName}</button>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
