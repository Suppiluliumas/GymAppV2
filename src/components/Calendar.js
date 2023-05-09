import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";
import { trainings_url } from "../constants";
import { useEffect } from "react";
import dayjs from "dayjs";
export function Calendar() {
  const [trainings, setTrainings] = React.useState([]);

  console.log(trainings);
  const getTrainings = () => {
    fetch(trainings_url)
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getTrainings();
    formatDate();
  }, []);
  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY HH:MM");
  };

  const events = trainings.map((training) => ({
    title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
    start: dayjs(training.date).toDate(),
    end: dayjs(training.date).add(training.duration, "minute").toDate(),
    timeFormat: "H(:mm)",
  }));
  return (
    <div>
      <h1>Trainings in calendar</h1>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        eventTimeFormat = {{
          hour: "numeric",
          minute: "2-digit",
          meridiem: false,
        }}
        start={events.start}
        
        title={events.title}
      />
    </div>
  );
}
