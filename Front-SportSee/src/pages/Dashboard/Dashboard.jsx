import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import LateralBar from "../../components/LateralBar/LateralBar";
import Profile from "../../components/Profile/Profile.jsx";
import ApiCall from "../../Data/ApiCall.js";
import styles from "./Dashboard.module.scss";
import DailyActivity from "../../components/DailyActivity/DailyActivity.jsx";
import SessionDuration from "../../components/SessionDuration/SessionDuration.jsx";
import Intensity from "../../components/Intensity/Intensity.jsx";
import Score from "../../components/Score/Score.jsx";
import CardInfo from "../../components/CardInfo/CardInfo.jsx";
import { USER_MAIN_DATA } from "../../Data/DataMocked.js";
import close from "../../assets/img/close.png";
export default function Dashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = new ApiCall();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);
  const handleCloseError = () => {
    setError(null);
  };

  useEffect(() => {
    setUseMockData(import.meta.env.VITE_USE_MOCK_DATA === "true");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData started", { useMockData });
      try {
        let fetchedData;
        if (useMockData) {
          const mainData = USER_MAIN_DATA;
          fetchedData = mainData.find((item) => item.id === parseInt(id));
        } else {
          fetchedData = await api.getUserData(id);
        }

        if (!fetchedData) {
          throw new Error("Data not found");
        }
        setUserData(fetchedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (!userData && !error) {
      fetchData();
    }
  }, [id, useMockData]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (!userData) {
    return null;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <LateralBar />
        <div className={styles.globalContent}>
          {error && (
            <div className={styles.errorPopup}>
              <div className={styles.errorContent}>
                <button
                  onClick={handleCloseError}
                  className={styles.closeButton}
                >
                  <img src={close} alt="icone fermeture" />
                </button>
                <h2>Erreur de chargement des données du serveur</h2>
                <h3>Veuillez réessayer ultérieurement.</h3>
                <p>les données affichées sont les données simulées</p>
                <a href="http://localhost:5173/">Retour</a>
              </div>
            </div>
          )}
          <>
            <div className={styles.graphique}>
              <div className={styles.displayAdapt}>
                <div className={styles.profil}>
                  <Profile id={userData?.id} />
                </div>
                <DailyActivity />
                <div className={styles.graph}>
                  <SessionDuration />
                  <Intensity />
                  <Score />
                </div>
              </div>
              <CardInfo />
            </div>
          </>
        </div>
      </div>
    </>
  );
}
