import { useState, useEffect } from "react";
import { trainings_url } from "../constants";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

export default function TrainingTimeChart() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    getTrainings();

  }, []);

  const getTrainings = () => {
    fetch(trainings_url)
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const sumDurations = trainings.reduce((trainingDuration, { activity, duration }) => {
    trainingDuration[activity] = trainingDuration[activity] ? trainingDuration[activity] + duration : duration;
    return trainingDuration;
  }, {});
  return (
    <div>
      <BarChart
        width={1000}
        height={1000}
        data={Object.entries(sumDurations).map(([activity, duration]) => ({
          activity,
          duration,
        }))}
      >
        <XAxis dataKey="activity" />
        <YAxis label={{ value: "Duration in minutes", angle: -90 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
