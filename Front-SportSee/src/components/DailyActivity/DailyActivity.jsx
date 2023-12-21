import styles from "./DailyActivity.module.scss";
import ApiCall from "../../Data/ApiCall";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DailyActivity() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const api = new ApiCall(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userActivity = await api.getUserActivity(id); 

        if (userActivity && userActivity.sessions) {
          setData(userActivity.sessions);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [api, id]);

  if (!data || data.length === 0) return null;

  const sessionsCountData = data.map((session) => ({
    day: session.day,
    calories: session.calories,
    kilogram: session.kilogram,
  }));

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Activité quotidienne</h2>
        <div className={styles.dotContent}>
          <p>
            <span>
              <i className={`fa-solid fa-circle ${styles.blackdot}`}></i>
            </span>
            Poids (kg)
          </p>
          <p>
            <span>
              <i className={`fa-solid fa-circle ${styles.reddot}`}></i>
            </span>
            Calories brûlées (kCal)
          </p>
        </div>
      </div>
      <ResponsiveContainer height={200}>
        <BarChart data={sessionsCountData} barGap={8} barCategoryGap={1}>
          <CartesianGrid vertical={false} strokeDasharray="1 1" />
          <XAxis
            dataKey="day"
            tickFormatter={formatDate}
            tickLine={false}
            axisLine={{ stroke: "#9b9eac" }}
            tick={{ fill: "#9b9eac" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tick={{ fontSize: 14, fill: "#9b9eac" }}
            tickCount={3}
            dx={15}
            tickLine={false}
          />
          <YAxis yAxisId="left" hide />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            yAxisId="right"
            dataKey="kilogram"
            fill="#282d30"
            barSize={8}
            stackId="stack"
            radius={[5, 5, 0, 0]}
          />
          <Bar
            yAxisId="left"
            dataKey="calories"
            fill="#ff0101"
            barSize={8}
            style={{ borderRadius: "5px" }}
            stackId="stack"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className={styles.tooltip}>
        <p>{data.kilogram} kg</p>
        <p>{data.calories} kCal</p>
      </div>
    );
  }

  return null;
}
