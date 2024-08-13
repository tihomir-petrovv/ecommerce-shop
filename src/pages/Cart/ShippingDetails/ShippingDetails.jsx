import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { NavLink } from "react-router-dom";
import { PiShoppingCartThin } from "react-icons/pi";
import { useContext, useState } from "react";
import { AppContext } from "../../../components/context/UserContext/UserContext";
import { updateUserAddress } from "../../../services/UserServices/user-services";

export default function ShippingDetails() {
  const { userData } = useContext(AppContext);
  const defaultTheme = createTheme();
  const [form, setForm] = useState({
    client: "",
    phone: "",
    city: "",
    street: "",
    region: "",
    country: "",
  });
  const [showUserOptions, setShowUserOptions] = useState({
    option: "delivery",
  });
  const steps = [
    "My Cart",
    "Shipping Information",
    "Billing Information",
    "Payment",
  ];

  const handleDeliveryOption = (event) => {
    setShowUserOptions({ option: event.target.value });
  };

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const updateUserData = () => {
    updateUserAddress(userData, form);
  };

  if (!userData) {
    return <h1>Loading...</h1>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            gap: "1vw",
            width: "100%",
            borderBottom: "5px solid #d3d3d3",
            padding: "0",
          }}
        >
          <Link
            to="/"
            variant="body2"
            style={{
              color: defaultTheme.palette.primary.main,
            }}
          >
            eShop.bg
          </Link>
          <Stack sx={{ width: "70%" }} spacing={5}>
            <Stepper
              alternativeLabel
              activeStep={1}
              connector={<QontoConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          <Box
            sx={{
              color: "black",
            }}
          >
            <NavLink
              to={"/cart"}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: defaultTheme.palette.primary.main,
              }}
            >
              <PiShoppingCartThin />
              <Typography variant="h6">My Cart</Typography>
            </NavLink>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">
                Delivery Information
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="delivery"
                name="radio-buttons-group"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "20px",
                  alignItems: "center",
                  textAlign: "left",
                  marginBottom: "20px",
                }}
              >
                <FormControlLabel
                  value="delivery"
                  control={<Radio />}
                  label="Delivery to address"
                  sx={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    textAlign: "left",
                    borderRadius: "10px",
                    boxShadow: `-3px -3px 5px 1px ${defaultTheme.palette.primary.main}`,
                    padding: "10px",
                    marginTop: "10px",
                    width: "30%",
                  }}
                  onClick={() => handleDeliveryOption(event)}
                />
                <FormControlLabel
                  value="take"
                  control={<Radio />}
                  label="Take yourself"
                  sx={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    textAlign: "left",
                    borderRadius: "10px",
                    boxShadow: `3px 3px 5px 1px ${defaultTheme.palette.primary.main}`,
                    padding: "10px",
                    marginTop: "10px",
                    width: "30%",
                  }}
                  onClick={() => handleDeliveryOption(event)}
                />
              </RadioGroup>
            </FormControl>
          </Box>
          {showUserOptions.option === "delivery" && userData.addresses ? (
            <Box>
              <Typography variant="h6">Choose address for delivery</Typography>
              {Object.keys(userData.addresses).map((address) => {
                return (
                  <Box key={address}>
                    <FormControlLabel
                      value={address}
                      control={<Radio />}
                    />
                    <Typography variant="h6" sx={{
                        fontWeight: "bold",
                    }}>Person to contact</Typography>
                    <Typography>{userData.addresses[address].client} - phone number - {userData.addresses[address].phone}</Typography>
                    <Typography variant="h6" sx={{
                        fontWeight: "bold",
                    }}>Delivery address</Typography>
                    <Typography>{userData.addresses[address].street} - {userData.addresses[address].city}, {userData.addresses[address].region}, {userData.addresses[address].country}</Typography>
                    <Button>Add new address</Button>
                  </Box>
                );
              })}
            </Box>
          ) : (
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
                    value={form.client}
                  ></TextField>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    onChange={updateForm("phone")}
                    value={form.phone}
                  ></TextField>
                </Box>
              </Box>
              <Typography variant="h6">Add address</Typography>
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
                ></TextField>
                <TextField
                  required
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  autoComplete="street"
                  onChange={updateForm("street")}
                  value={form.street}
                ></TextField>
                <TextField
                  required
                  fullWidth
                  id="region"
                  label="Region"
                  name="region"
                  autoComplete="region"
                  onChange={updateForm("region")}
                  value={form.region}
                ></TextField>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  onChange={updateForm("country")}
                  value={form.country}
                ></TextField>
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
          )}
          {showUserOptions.option === "take" && (
            <Box>
              <TextField
                required
                fullWidth
                id="address"
                label="Supplier Address"
                name="address"
                autoComplete="address"
              ></TextField>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const QontoConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "red",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ ownerState }) => ({
  color: "red",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};
