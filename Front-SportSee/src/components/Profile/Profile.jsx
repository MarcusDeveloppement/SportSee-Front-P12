import { useEffect, useState } from "react";
import { USER_MAIN_DATA } from "../../Data/DataMocked";
import styles from "./Profile.module.scss";

export default function Profile({ id }) {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(USER_MAIN_DATA);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id && data.length > 0) {
      const user = data.find((item) => item.id === parseInt(id));
      if (user) {
        setFirstName(user.userInfos.firstName);
      }
    }
  }, [id, data]);

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
