import { useEffect, useState } from "react";
import ApiCall from "../../Data/ApiCall";
import styles from "./Profile.module.scss";
import { USER_MAIN_DATA } from "../../Data/DataMocked";

export default function Profile({ id }) {
  const [data, setData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const api = new ApiCall();
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    setUseMockData(import.meta.env.VITE_USE_MOCK_DATA === "true");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userData;
        if (useMockData) {
          // Recherche dans les données simulées
          userData = USER_MAIN_DATA.find((user) => user.id === parseInt(id));
        } else {
          // Appel API
          userData = await api.getUserData(id);
        }

        if (userData) {
          setData(userData);
          setFirstName(userData.userInfos.firstName);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, useMockData]);

  useEffect(() => {
    if (data && data.userInfos) {
      setFirstName(data.userInfos.firstName);
    }
  }, [data]);

  return (
    <div className={styles.nameContainer}>
      <h1 className={styles.name}>
        {`Bonjour `}
        <span>{firstName}</span>
      </h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}
