import ApiCall from "../../Data/ApiCall";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./Score.module.scss";

export default function Score() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const api = new ApiCall(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.getUserData(id); 
        if (userData) {
          const todayScorePercentage = userData.todayScore * 100;
          setData([
            { name: "Today Score", value: todayScorePercentage },
            { name: "Remaining", value: 100 - todayScorePercentage },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, api]);

  if (data.length === 0) return null;

  const COLORS = ["#ff0000", "#FBFBFB"];
  return (
    <>
      <ResponsiveContainer
        className={styles.container}
        width="30%"
        height={280}
      >
        <PieChart>
          <text
            x="15%"
            y={30}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#333333"
            fontSize={18}
            fontWeight="bold"
          >
            Score
          </text>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={95}
            outerRadius={107}
            startAngle={190}
            endAngle={-180}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              name,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              if (name === "Remaining") {
                return null;
              }

              return (
                <>
                  <circle cx={cx} cy={cy} r={innerRadius} fill="#FFFFFF" />
                  <text
                    x={cx + 2}
                    y={cy - 20}
                    fill="black"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: 28, fontWeight: 900 }}
                  >
                    {`${value.toFixed(0)}%`}
                  </text>
                  <text
                    x={cx}
                    y={cy + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#74798C"
                    style={{ fontSize: 18, fontWeight: 400 }}
                  >
                    de votre
                  </text>
                  <text
                    x={cx - 1}
                    y={cy + 32}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#74798C"
                    style={{ fontSize: 18, fontWeight: 400 }}
                  >
                    objectif
                  </text>
                </>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                cornerRadius={10}
                stroke="none"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
