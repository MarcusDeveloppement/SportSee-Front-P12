import styles from "./SessionDuration.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import ApiCall from "../../Data/ApiCall";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { USER_AVERAGE_SESSIONS } from "../../Data/DataMocked";

const daysOfWeek = ["", "L", "M", "M", "J", "V", "S", "D"];

export default function SessionDuration() {
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
        let userAverage;
        if (useMockData) {
          const mockData = USER_AVERAGE_SESSIONS.find(
            (session) => session.userId === parseInt(id)
          );
          userAverage = mockData;
        } else {
          userAverage = await api.getUserAverageSessions(id);
          setShouldRedraw(true);
        }

        if (userAverage && userAverage.sessions) {
          const formatData = userAverage.sessions.map((sessionData) => ({
            ...sessionData,
            day: daysOfWeek[sessionData.day] || sessionData.day,
          }));

          setData(formatData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        if (!useMockData) {
          setTimeout(() => {
            setShouldRedraw(false);
          }, 0);
        }
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, useMockData]);

  if (data.length === 0) {
    return null;
  }

  const CustomCursor = ({ points, width }) => {
    const { x } = points[0];
    return (
      <Rectangle fill="hsla(0, 0%, 0%, 22%)" x={x} width={width} height={300} />
    );
  };

  return (
    <div className={styles.container}>
      <ResponsiveContainer
        minWidth={268}
        minHeight={280}
        key={shouldRedraw ? "redrawing" : "notRedrawing"}
      >
        <LineChart data={data}>
          <XAxis
            dataKey="day"
            stroke="red"
            axisLine={false}
            padding={{ right: 5, left: 5 }}
            tick={{
              fontSize: 12,
              stroke: "#fff",
              opacity: 0.7,
            }}
            tickLine={false}
          />
          <YAxis
            dataKey="sessionLength"
            hide={true}
            domain={[0, "dataMax + 50"]}
          />
          <Tooltip cursor={<CustomCursor />} content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: "rgba(255,255,255, 0.6)",
              strokeWidth: 10,
              r: 5,
            }}
          />
          <text
            x="50%"
            y="20"
            textAnchor="middle"
            style={{
              fontSize: "15px",
              fill: "#fff",
              fontWeight: "400",
              opacity: 0.8,
            }}
          >
            <tspan x="35%" dy="1.2em">
              Durée moyenne des
            </tspan>
            <tspan x="23%" dy="1.2em">
              sessions
            </tspan>
          </text>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className={styles.tooltipContent}>
        <div className={styles.tooltip}>
          <p>{data.sessionLength}min</p>
        </div>
      </div>
    );
  }

  return null;
}
