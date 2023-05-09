import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button} from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { customers_url, new_training_url } from "../constants";
import AddCustomer from "./AddCustomer";
import { Snackbar } from "@mui/material";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

export default function Customerlist() {
  const gridRef = useRef();
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [columnDefs] = useState([
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "city", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      cellRenderer: (params) => (
        <AddTraining params={params.data} addTraining={AddTraining} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <EditCustomer params={params.data} editCustomer={editCustomer} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Button
          size="large"
          color="error"
          onClick={() => deleteCustomer(params)}
        >
          Delete
        </Button>
      ),
      width: 120,
    },
  ]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetch(customers_url)
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const addCustomer = (customer) => {
    fetch(customers_url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Customer was added successfully.");
          setOpen(true);
          getCustomers();
        } else alert("Something went wrong when adding a new customer");
        console.error(customer);
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (params) => {
    if (window.confirm("Are you sure?")) {
      fetch(params.data.links[1].href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer was deleted successfully.");
            setOpen(true);
            getCustomers();
          } else alert("Something went wrong in deletion:" + response.status);
        })
        .catch((err) => console.error(err));
    }
  };
  const editCustomer = (customers_url, updatedCustomer) => {
    fetch(customers_url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Customer was edited successfully.");
          setOpen(true);
          getCustomers();
        } else alert("Something went wrong in edit:" + response.statusText);
      })
      .catch((err) => console.error(err));
  };
  const onBtnExport = () => {
    gridRef.current.api.exportDataAsCsv();
  };

  return (
    <>
      <AddCustomer addCustomer={addCustomer} />

      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          pagination={true}
          paginationPageSize={10}
          rowData={customers}
          columnDefs={columnDefs}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message={msg}
      />
      <button onClick={onBtnExport}>Download CSV export file</button>
    </>
  );
}
