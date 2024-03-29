import styles from "./CardInfo.module.scss";
import ApiCall from "../../Data/ApiCall";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import cal from "../../assets/img/icon/cal.svg";
import carbs from "../../assets/img/icon/carbs.svg";
import fat from "../../assets/img/icon/fat.svg";
import prot from "../../assets/img/icon/prot.svg";
import { USER_MAIN_DATA } from "../../Data/DataMocked.js";

export default function CardInfo() {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const api = new ApiCall();
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    setUseMockData(import.meta.env.VITE_USE_MOCK_DATA === "true");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let user;
        if (useMockData) {
          const mainData = USER_MAIN_DATA;
          user = mainData.find((item) => item.id === parseInt(id));
        } else {
          user = await api.getUserData(id);
        }

        if (user) {
          setUserData(user);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, useMockData]);

  if (!userData) {
    return null;
  }

  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    userData.keyData;

  return (
    <div className={styles.container}>
      <div className={styles.macroContent}>
        <img src={cal} alt="" />
        <div className={styles.describe}>
          <p>{calorieCount}kCal</p>
          <span>Calories</span>
        </div>
      </div>
      <div className={styles.macroContent}>
        <img src={prot} alt="" />
        <div className={styles.describe}>
          <p>{proteinCount}g</p>
          <span>Proteines</span>
        </div>
      </div>

      <div className={styles.macroContent}>
        <img src={carbs} alt="" />
        <div className={styles.describe}>
          <p>{carbohydrateCount}g</p>
          <span>Glucides</span>
        </div>
      </div>

      <div className={styles.macroContent}>
        <img src={fat} alt="" />
        <div className={styles.describe}>
          <p>{lipidCount}g</p>
          <span>lipides</span>
        </div>
      </div>
    </div>
  );
}
