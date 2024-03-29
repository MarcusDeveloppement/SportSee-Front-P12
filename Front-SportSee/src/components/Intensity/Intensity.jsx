import styles from "./Intensity.module.scss";
import ApiCall from "../../Data/ApiCall";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { USER_PERFORMANCE } from "../../Data/DataMocked.js";
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
  const [shouldRedraw, setShouldRedraw] = useState(false);
  const { id } = useParams();
  const api = new ApiCall();
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    setUseMockData(import.meta.env.VITE_USE_MOCK_DATA === "true");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userPerformance;
        if (useMockData) {
          const mockData = USER_PERFORMANCE.find(
            (performance) => performance.userId === parseInt(id)
          );
          userPerformance = mockData;
        } else {
          userPerformance = await api.getUserPerformance(id);
        }

        if (userPerformance && userPerformance.data) {
          const formattedData = userPerformance.data.map((entry) => ({
            subject: frenchTranslation[entry.kind],
            A: entry.value,
          }));
          setData(formattedData);
          setShouldRedraw(true);
          setTimeout(() => {
            setShouldRedraw(false);
          }, 0);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, useMockData]);

  if (data.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer
      width="35%"
      height={281}
      className={styles.container}
      key={shouldRedraw ? "redrawing" : "notRedrawing"}
    >
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis
          className={styles.text}
          dataKey="subject"
          tick={{ fill: "white", fontSize: 12, margin: 100 }}
          dy={4}
        />
        <PolarRadiusAxis style={{ display: "none" }} />
        <Radar name="Performance" dataKey="A" fill="red" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
