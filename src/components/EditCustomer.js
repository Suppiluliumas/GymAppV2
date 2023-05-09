import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
export default function EditCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: props.params.firstname,
      lastname: props.params.lastname,
      streetaddress: props.params.streetaddress,
      postcode: props.params.postcode,
      city: props.params.city,
      email: props.params.email,
      phone: props.params.phone,
    });
  };

  const handleClose = (event, reason) => {
    if (reason !== "backDropClick") {
      setOpen(false);
    }
  };
  const handleSave = () => {
    props.editCustomer(props.params.links[1].href, customer);
  };

  return (
    <div>
      <Button size="large" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Firstname"
            value={customer.firstname}
            onChange={(event) =>
              setCustomer({ ...customer, firstname: event.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Lastname"
            value={customer.lastname}
            onChange={(event) =>
              setCustomer({ ...customer, lastname: event.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Streetaddress"
            value={customer.streetaddress}
            onChange={(event) =>
              setCustomer({ ...customer, streetaddress: event.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            onChange={(event) =>
              setCustomer({ ...customer, postcode: event.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="City"
            value={customer.city}
            onChange={(event) =>
              setCustomer({ ...customer, city: event.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            onChange={(event) =>
              setCustomer({ ...customer, email: event.target.value })
            }
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Phone"
            value={customer.phone}
            onChange={(event) =>
              setCustomer({ ...customer, phone: event.target.value })
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
