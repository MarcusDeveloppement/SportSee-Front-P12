import styles from "./DailyActivity.module.scss";
import { USER_ACTIVITY } from "../../Data/DataMocked.js";
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

  useEffect(() => {
    const userActivity = USER_ACTIVITY.find(
      (user) => user.userId === parseInt(id)
    );

    if (userActivity) {
      setData(userActivity.sessions);
    }
  }, [id]);

  if (data.length === 0) return null;

  const sessionsCountData = data.map((session, index) => ({
    sessions: index + 1,
    calories: session.calories,
    kilogram: session.kilogram,
    day: session.day, // Conserver cette clé pour les données BarChart
  }));

  return (
    <ResponsiveContainer height={200}>
      <BarChart data={sessionsCountData} barGap={8} barCategoryGap={1}>
        <CartesianGrid vertical={false} strokeDasharray="1 1" />
        <XAxis dataKey="sessions" />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tick={{ fontSize: 14 }}
          tickCount={3}
          dx={15}
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
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className={styles.tooltip}>
        <p>{data.kilogram}kg</p>
        <p>{data.calories}Kcal</p>
      </div>
    );
  }

  return null;
}
