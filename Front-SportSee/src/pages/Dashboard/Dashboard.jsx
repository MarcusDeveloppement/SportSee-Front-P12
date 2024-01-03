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

export default function Dashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = new ApiCall();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData && !error && loading) {
      const fetchData = async () => {
        try {
          const fetchedData = await api.getUserData(id);

          if (!fetchedData) {
            navigate("/notfound");
            return;
          }
          setUserData(fetchedData);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [api, id, navigate, userData, error, loading]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorPopup}>
        <div className={styles.errorContent}>
          <h2>Erreur de chargement du serveur</h2>
          <h3>
            Une erreur s'est produite lors du chargement des données à partir du
            serveur.
          </h3>
          <p>({error.message})</p>
          <a href="http://localhost:5173/">Retour</a>
        </div>
      </div>
    );
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
          <div className={styles.graphique}>
            <div className={styles.displayAdapt}>
              <div className={styles.profil}>
                <Profile id={userData.id} />
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
        </div>
      </div>
    </>
  );
}
