import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export default function AddOtherAddress({
  open,
  setClose,
  form,
  updateForm,
  updateUserData,
  userData,
}) {
  const handleClose = () => {
    setClose(false);
  };

  if (open) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new address</DialogTitle>
        <DialogContent>
          <Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                  flexWrap: "wrap",
                  "& .MuiTextField-root": {
                    flex: "1 0 40%",
                  },
                }}
              >
                <TextField
                  required
                  fullWidth
                  id="client"
                  label="Person to contact"
                  name="client"
                  autoComplete="client"
                  onChange={updateForm("client")}
                  value={form.client ? form.client : userData.firstName}
                />
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={updateForm("phone")}
                  value={form.phone ? form.phone : userData.phoneNumber}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
                flexWrap: "wrap",
                "& .MuiTextField-root": {
                  flex: "1 0 40%",
                },
              }}
            >
              <TextField
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                onChange={updateForm("city")}
                value={form.city}
              />
              <TextField
                required
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoComplete="street"
                onChange={updateForm("street")}
                value={form.street}
              />
              <TextField
                required
                fullWidth
                id="region"
                label="Region"
                name="region"
                autoComplete="region"
                onChange={updateForm("region")}
                value={form.region}
              />
              <TextField
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                onChange={updateForm("country")}
                value={form.country}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            sx={{
              width: "20%",
            }}
            onClick={() => {
              updateUserData(), handleClose();
            }}
          >
            Save info
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box>
      <Box>
        <Typography variant="h6">Client information</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            flexWrap: "wrap",
            "& .MuiTextField-root": {
              flex: "1 0 40%",
            },
          }}
        >
          <TextField
            required
            fullWidth
            id="client"
            label="Person to contact"
            name="client"
            autoComplete="client"
            onChange={updateForm("client")}
            value={form.client ? form.client : userData.firstName}
          />
          <TextField
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            onChange={updateForm("phone")}
            value={form.phone ? form.phone : userData.phoneNumber}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          flexWrap: "wrap",
          "& .MuiTextField-root": {
            flex: "1 0 40%",
          },
        }}
      >
        <TextField
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          autoComplete="city"
          onChange={updateForm("city")}
          value={form.city}
        />
        <TextField
          required
          fullWidth
          id="street"
          label="Street"
          name="street"
          autoComplete="street"
          onChange={updateForm("street")}
          value={form.street}
        />
        <TextField
          required
          fullWidth
          id="region"
          label="Region"
          name="region"
          autoComplete="region"
          onChange={updateForm("region")}
          value={form.region}
        />
        <TextField
          required
          fullWidth
          id="country"
          label="Country"
          name="country"
          autoComplete="country"
          onChange={updateForm("country")}
          value={form.country}
        />
        <Button
          sx={{
            width: "20%",
          }}
          onClick={updateUserData}
        >
          Save info
        </Button>
      </Box>
    </Box>
  );
}

AddOtherAddress.propTypes = {
  open: PropTypes.bool,
  setClose: PropTypes.func,
  form: PropTypes.object,
  updateForm: PropTypes.func,
  updateUserData: PropTypes.func,
  userData: PropTypes.object,
};
