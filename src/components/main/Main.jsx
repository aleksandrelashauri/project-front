import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { addData } from "../redux/Actions/actionsInput";
import useStyles from "./mainStyles.js";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as yup from "yup";
import axios from "axios";
import Webcam from "react-webcam";

export default function Main() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [mail, setMail] = useState("");
  const [birthday, setBirthday] = useState(dayjs("2022-09-18T21:11:54"));
  const [children, setChildren] = useState("");
  const [english, setEnglish] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("german");
  const [image, setImage] = useState("");

  const steps = ["o", "n", "e", "r"];

  const webcamRef = React.useRef(null);

  const WebcamComponent = () => <Webcam />;
  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user",
  };
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  });

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    isLastStep() ? submitValue() : null;
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    city: yup.string().strict().required(),
    phone: yup.number().required().positive().integer(),
    mail: yup.string().email().required(),
  });

  const submitValue = async () => {
    const inputList = {
      firstName,
      lastName,
      phone,
      city,
      mail,
      birthday,
      children,
      english,
      nativeLanguage,
      image,
    };
    try {
      await schema.validate(inputList);
      const response = await axios("/persons/add-person", {
        method: "post",
        data: {
          firstName: inputList.firstName,
          lastName: inputList.lastName,
          phone: inputList.phone,
          city: inputList.city,
          mail: inputList.mail,
          birthday: inputList.birthday,
          english: inputList.english,
          nativeLanguage: inputList.nativeLanguage,
          image: inputList.image,
        },
      });
      dispatch(addData(inputList));
      toast.success("success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(" Please Fill All Required Fields correctly!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleChange = (newValue) => {
    setBirthday(newValue);
  };

  const renderHandle = () => {
    if (activeStep === 0) {
      return (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="first name"
            type="text"
            fullWidth
            variant="outlined"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="last name"
            type="text"
            fullWidth
            variant="outlined"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="Phone Number"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            margin="dense"
            id="city"
            label="city"
            type="text"
            fullWidth
            variant="outlined"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            margin="dense"
            id="mail"
            label="mail"
            type="mail"
            fullWidth
            variant="outlined"
            value={mail}
            required
            onChange={(e) => setMail(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of birth"
              inputFormat="MM/DD/YYYY"
              value={birthday}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      );
    } else if (activeStep === 1) {
      return (
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            do you have children
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onClick={(e) => setChildren(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="yes" />
            <FormControlLabel value="no" control={<Radio />} label="no" />
          </RadioGroup>
        </FormControl>
      );
    } else if (activeStep === 2) {
      return (
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            English level
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setEnglish(e.target.value)}
          >
            <FormControlLabel value="none" control={<Radio />} label="none" />
            <FormControlLabel
              value="beginner"
              control={<Radio />}
              label="beginner"
            />
            <FormControlLabel
              value="intermediate"
              control={<Radio />}
              label="intermediate"
            />
            <FormControlLabel
              value="advanced"
              control={<Radio />}
              label="advanced"
            />
          </RadioGroup>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label">
              native language
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={nativeLanguage}
              label="native language"
              onChange={(e) => setNativeLanguage(e.target.value)}
            >
              <MenuItem value={"german"}>german </MenuItem>
              <MenuItem value={"english"}>english</MenuItem>
              <MenuItem value={"georgian"}>georgian</MenuItem>
            </Select>
          </FormControl>
        </FormControl>
      );
    } else {
      return (
        <div className="webcam-container">
          <div className="webcam-img">
            {image == "" ? (
              <Webcam
                audio={false}
                height={200}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={220}
                videoConstraints={videoConstraints}
              />
            ) : (
              <img src={image} />
            )}
          </div>
          <div>
            {image != "" ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setImage("");
                }}
                className="webcam-btn"
              >
                Retake Image
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  capture();
                }}
                className="webcam-btn"
              >
                Capture
              </button>
            )}
          </div>
        </div>
      );
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep} className={classes.line}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}></StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderHandle()}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="secondary"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              ></Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                {isLastStep() ? "SUBMIT" : " Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}
