import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Oups! la page que vous demandez n'existe pas.</p>
      <Link to="/">Retourner sur la page d'accueil</Link>
    </div>
  );
}
