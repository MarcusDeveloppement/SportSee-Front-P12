import styles from "./LateralBar.module.scss";
import yoga from "../../assets/img/yoga.png";
import swim from "../../assets/img/swim.png";
import bike from "../../assets/img/bike.png";
import dumbbell from "../../assets/img/dumbbell.png";
export default function LateralBar() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={yoga} alt="icon yoga" />
        <img src={swim} alt="icon natation" />
        <img src={bike} alt="icon cycliste" />
        <img src={dumbbell} alt="icon haltère" />
      </div>
      <div className={styles.text}>
        <p>Copiryght, SportSee 2020</p>
      </div>
    </div>
  );
}
