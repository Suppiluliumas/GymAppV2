import React, { useState, useEffect } from "react";
import { new_training_url, trainings_url } from "../constants";
import {
  LocalizationProvider,
  StaticDateTimePicker,
  
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";


export default function AddTraining(props) {
  const today = dayjs();
  const [open, setOpen] = useState(false);
  const [trainings, setTrainings] = React.useState({
    date: null,
    duration: "",
    activity: "",
    customer: props.params.links[1].href,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    addNewTraining(trainings);
    setOpen(false);
  };
  const getTrainings = () => {
    fetch(trainings_url)
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };
  const addNewTraining = (trainings) => {
    fetch(new_training_url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(trainings),
    })
      .then((response) => {
        if (response.ok) {
          alert("Training was added successfully");
          getTrainings();
        } else {
          alert("Something went wrong when adding a new training");
          console.error(trainings);
        }
      })
      .catch((err) => console.error(err));
  };

  

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add training for customer</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <StaticDateTimePicker 
              orientation="landscape"
              defaultValue={today}
              minDate={today}
              maxDate={"01-01-2025"}
              ampm={false}
              label="Date and time"
              value={trainings.date}
              onChange={(newDate) => {
                setTrainings({ ...trainings, date: newDate.toISOString() });
              }}
            />
          </LocalizationProvider>

          <TextField
            margin="dense"
            label="Duration in minutes"
            value={trainings.duration}
            onChange={(event) =>
              setTrainings({
                ...trainings,
                duration: event.target.value,
              })
            }
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Activity"
            value={trainings.activity}
            onChange={(event) =>
              setTrainings({ ...trainings, activity: event.target.value })
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
