import logo from "../../assets/img/logo.png";
import styles from "./Header.module.scss";
export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <img src={logo} alt="logo" />
        <a href="#">Accueil</a>
        <a href="#">Profil</a>
        <a href="#">Réglages</a>
        <a href="#">Communauté</a>
      </nav>
    </header>
  );
}
