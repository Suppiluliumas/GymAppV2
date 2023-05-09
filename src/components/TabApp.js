import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";
import CalendarPage from "./CalendarPage";
import TrainingTimeChart from "./TrainingTimeChart";

function TabApp() {
  const [value, setValue] = useState("one");
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Customerlist" />
        <Tab value="two" label="Traininglist" />
        <Tab value="three" label="Calendar" />
        <Tab value="four" label="Chart" />
      </Tabs>
      {value === "one" && <Customerlist />}
      {value === "two" && <Traininglist />}
      {value === "three" && <CalendarPage />}
      {value === "four" && <TrainingTimeChart />}
    </div>
  );
}
export default TabApp;
