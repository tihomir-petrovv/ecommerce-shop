import { useContext, useState, useEffect } from "react";
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
  CircularProgress,
  Stack,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { PiShoppingCartThin } from "react-icons/pi";
import { AppContext } from "../../../components/context/UserContext/UserContext";
import {
  getUserData,
  updateUserAddress,
} from "../../../services/UserServices/user-services";
import AddOtherAddress from "./AddOtherAddress/AddOtherAddress";

export default function ShippingDetails() {
  const { user, userData, setUserContext } = useContext(AppContext);
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
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showPopUpForOtherAddress, setShowPopUpForOtherAddress] =
    useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

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
    setForm({ ...form, [prop]: e.target.value });
  };

  const updateUserData = async () => {
    setLoading(true);
    await updateUserAddress(userData, form);
    if (user) {
      getUserData(user.uid).then((snapshot) => {
        if (snapshot.exists()) {
          setUserContext({
            user: user,
            userData: snapshot.val()[Object.keys(snapshot.val())[0]],
          });
        }
      });
    }
    setTimeout(() => {
      setLoading(false);
      setShowForm(false);
    }, 2000);
  };

  useEffect(() => {
    if (
      userData &&
      userData.addresses &&
      Object.keys(userData.addresses).length > 0
    ) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.addresses) {
      setSelectedAddress(Object.keys(userData.addresses)[0]);
    }
  }, [userData]);

  if (!userData || !user) {
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
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "80vh",

            marginTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              width: "80%",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
              backgroundColor: "rgba(65, 140, 253,0.1)",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            {/* Delivery options starts here (to address, or personal take) */}
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
                  <Typography variant="h4">Delivery Information</Typography>
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
                  onChange={handleDeliveryOption}
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
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {/* Delivery options ends here */}

            {/* Here starts the person information views (the address if user have one, inputs otherwise) */}
            {loading ? (
              <CircularProgress />
            ) : showUserOptions.option === "delivery" && !showForm ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                  gap: "10px",
                  alignItems: "start",
                  padding: "20px",
                  backgroundColor: "rgba(255, 255, 255)",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="h6">
                  Choose address for delivery
                </Typography>
                {userData.addresses &&
                  Object.keys(userData.addresses).map((address) => (
                    <Box
                      key={address}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          borderBottom: "2px solid #d3d3d3",
                          borderTop: "2px solid #d3d3d3",
                          marginBottom: "10px",
                        }}
                      >
                        {/* Check if the user have second address, does this will work*/}
                        <RadioGroup
                          key={address}
                          value={selectedAddress}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                        >
                          <FormControlLabel
                            value={address}
                            control={<Radio />}
                            checked={selectedAddress === address}
                          />
                        </RadioGroup>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            gap: "5px",
                            margin: "10px 0px 10px 0px",
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Person to contact
                          </Typography>
                          <Typography>
                            {userData.addresses[address].client} - phone number
                            - {userData.addresses[address].phone}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Delivery address
                          </Typography>
                          <Typography>
                            {userData.addresses[address].street} -{" "}
                            {userData.addresses[address].city},{" "}
                            {userData.addresses[address].region},{" "}
                            {userData.addresses[address].country}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                <Button onClick={() => setShowPopUpForOtherAddress(true)}>
                  Add new address
                </Button>
              </Box>
            ) : (
              showForm &&
              showUserOptions.option === "delivery" && (
                <AddOtherAddress
                  open={showPopUpForOtherAddress}
                  setClose={setShowPopUpForOtherAddress}
                  form={form}
                  updateForm={updateForm}
                  updateUserData={updateUserData}
                  userData={userData}
                />
              )
            )}
            {/* Here ends person information */}

            {showUserOptions.option === "take" && (
              <Box>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Supplier Address"
                  name="address"
                  autoComplete="address"
                />
              </Box>
            )}

            {showPopUpForOtherAddress && (
              <AddOtherAddress
                open={showPopUpForOtherAddress}
                setClose={setShowPopUpForOtherAddress}
                form={form}
                updateForm={updateForm}
                updateUserData={updateUserData}
              />
            )}
          </Box>
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
