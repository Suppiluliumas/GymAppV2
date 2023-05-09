import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
export default function AddCustomer(props,params) {
  
  const [open, setOpen] = React.useState(false);
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
  };
  const handleClose = (event, reason) => {
    setOpen(false);
  };
  const handleSave = () => {
    props.addCustomer(customer);
    setOpen(false);
  };
  



  return (
    <div>
      
      <Button variant="contained" onClick={handleClickOpen}>
        New customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add customer</DialogTitle>
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
