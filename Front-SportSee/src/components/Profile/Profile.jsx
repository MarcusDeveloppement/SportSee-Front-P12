import { useEffect, useState } from "react";
import ApiCall from "../../Data/ApiCall";
import styles from "./Profile.module.scss";

export default function Profile({ id }) {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const api = new ApiCall(); 

  useEffect(() => {
    const fetchData = async () => {
      try {

        const userData = await api.getUserData(id);
        setData(userData); 
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, api]); 

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
