import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import Profile from "../../components/Profile/Profile.jsx";
import { USER_MAIN_DATA } from "../../Data/DataMocked.js";
import styles from "./Dashboard.module.scss";
import DailyActivity from "../../components/DailyActivity/DailyActivity.jsx";
import SessionDuration from "../../components/SessionDuration/SessionDuration.jsx";
import Intensity from "../../components/Intensity/Intensity.jsx";
import Score from "../../components/Score/Score.jsx";

export default function Dashboard() {
  const { id } = useParams();
  const mainData = USER_MAIN_DATA;
  const selectedData = mainData.find((item) => item.id === parseInt(id));

  return (
    <>
      <Header />
      <div className={styles.container}>
        <LateralBar />
        <div className={styles.graphique}>
          <Profile id={selectedData.id} />
          <DailyActivity />
          <div className={styles.graph}>
            <SessionDuration />
            <Intensity />
            <Score />
          </div>
        </div>
      </div>
    </>
  );
}
