import styles from "./Intensity.module.scss";
import { USER_PERFORMANCE } from "../../Data/DataMocked.js";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const frenchTranslation = {
  1: "Cardio",
  2: "Énergie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité",
};

export default function Intensity() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const userPerformance = USER_PERFORMANCE.find(
      (user) => user.userId === parseInt(id)
    );

    if (userPerformance) {
      const formattedData = userPerformance.data.map((entry, index) => ({
        subject: frenchTranslation[index + 1],
        A: entry.value,
      }));
      setData(formattedData);
    }
  }, [id]);

  if (data.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="43%" height={281} className={styles.container}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "white", fontSize: 12, margin: 150 }}
          dy={4}
        />
        <PolarRadiusAxis style={{ display: "none" }} />
        <Radar name="Performance" dataKey="A" fill="red" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
