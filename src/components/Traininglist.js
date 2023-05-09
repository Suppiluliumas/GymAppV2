import { AgGridReact } from "ag-grid-react";
import React, { useState, useEffect } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";

import {trainings_url } from "../constants";

import { Button, Snackbar } from "@mui/material";


function Traininglist() {
  const [msg, setMsg] = useState("");
  const[open, setOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [columnDefs] = useState([
    { field: "id", sortable: true, filter: true, hide: true },
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (params) => formatDate(params.value),
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    {
      field: "customer.id",
      sortable: true,
      filter: true,
      hide: true,
    },
    { field: "customer.firstname", sortable: true, filter: true },
    { field: "customer.lastname", sortable: true, filter: true },
    { field: "customer.streetaddress", sortable: true, filter: true },
    { field: "customer.postcode", sortable: true, filter: true },
    { field: "customer.city", sortable: true, filter: true },
    { field: "customer.email", sortable: true, filter: true },
    { field: "customer.phone", sortable: true, filter: true },
    {
      cellRenderer: (params) => (
        <Button
          size="large"
          color="error"
          onClick={() => deleteTraining(params)} 
        >
          Delete
        </Button>
      ),
      width: 120,
    },
  ]);

  useEffect(() => {
    getTrainings();
    formatDate();
    
  }, []);

  const getTrainings = () => {
    fetch(trainings_url)
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
      
  };
  const deleteTraining = (params) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://traineeapp.azurewebsites.net/api/trainings/"+params.data.id, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Training was deleted successfully.");
            setOpen(true);
            getTrainings();
          } else alert("Something went wrong in deletion:" + response.status);
        })
        .catch((err) => console.error(err));
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY HH:MM");
  };

  return (
    <>
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          pagination={true}
          paginationPageSize={10}
          rowData={trainings}
          columnDefs={columnDefs}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={msg}
      />
      
    </>
  );
}
export default Traininglist;
