import React, { useState, useEffect, useRef } from "react";

import {
  InputBase,
  Grid,
  Button,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { theme } from "../../theme/theme";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BikeClient from "../../pages/client/Bike";
import AlertMessage from "./message";
import { engine } from "./formOptions";
import bikeMakeList from "./bikeMakeList";
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import { colorList, modelList } from "_constants/bike.constants";
import { regionList } from "_constants/home.constants";
import { getBikeImageFromModel } from "_helpers/bike.functions";

const BootstrapInput = withStyles((theme) => ({
  root: {
    label: {
      marginTop: theme.spacing(0),
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  root: {
    maxHeight: "570px",
    overflowY: "scroll",
    overflowX: "hidden",
    paddingRight: "32px",
  },
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: "500",
    border: "none",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.input,
    padding: "8px 12px",
    position: "relative",
    width: "420px",
    color: theme.palette.text.header,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus, &:hover, &:active, &:focus-visible, &:focus-within": {
      border: "collapse",
      borderColor: "transparent",
      opacity: "0.8",
      borderRadius: theme.shape.borderRadius,
    },
  },
  upload: {
    visibility: "hidden",
    width: 0,
  },
  uploadLabel: {
    margin: theme.spacing(2),
    padding: "12px 40px",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  label: {
    display: "block",
    color: "#4C5F69",
    margin: "6px 16px",
    fontWeight: "normal",
  },
  button: {
    padding: "12px 40px",
  },
  pr16: {
    paddingRight: "16px",
  },
  mr16: {
    marginRight: theme.spacing(2),
  },
  padLeft: {
    paddingLeft: "16px",
  },
  select: {
    marginTop: theme.spacing(1),
    border: "none",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.input,
    padding: "8px 12px",
    position: "relative",
    width: "420px",
    color: theme.palette.text.header,
    fontWeight: "500",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus, &:hover, &:active, &:focus-visible, &:focus-within": {
      border: "collapse",
      borderColor: "transparent",
      backgroundColor: theme.palette.background.input,
      borderRadius: theme.shape.borderRadius,
      color: "white",
    },
  },
  selectOptions: {
    backgroundColor: theme.palette.background.input,
    borderColor: theme.palette.secondary.main,
    borderRadius: "8px",
    border: "none",
    color: theme.palette.text.muted,
    padding: "0",
    width: "420px",
    marginLeft: "-12px",
    marginTop: "-2px",
    boxShadow: "none",
    "& .MuiList-padding": { paddingTop: "0px", paddingBottom: "0px" },
    "& .MuiListItem-root": {
      borderRadius: 0,
      padding: "10px 26px 10px 12px",
      width: "100%",
      border: "none",
    },
    "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: "transparent",
    },
    "select &:focus, select &:hover": {
      border: "none",
    },
  },
  error: {
    color: theme.palette.error.main,
    fontSize: "12px",
  },
  pickerInput: {
    marginTop: theme.spacing(1),
    border: "none",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.input,
    padding: "8px 12px",
    position: "relative",
    textDecoration: "none",
    width: "400px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus, &:hover, &:active, &:focus-visible, &:focus-within": {
      border: "collapse",
      borderColor: "transparent",
      backgroundColor: theme.palette.background.input,
      borderRadius: theme.shape.borderRadius,
    },
  },
  pickerButton: {
    background: "none",
    color: theme.palette.text.primary,
  },
  pickerRoot: {
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.header,
    "& .MuiPickersCalendarHeader-transitionContainer": {
      width: "120px",
    },
    "&::-webkit-calendar-picker-indicator": {
      filter: "invert(1)",
    },
  },
  inputText: {
    color: "white",
  },
});
// styling for select menu
const MenuProps = {
  PaperProps: {
    style: {
      width: "420px",
      maxHeight: "400px",
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

const ModalProps = {
  PaperProps: {
    style: {
      backgroundColor: "#28353D",
      color: "#fff",
    },
  },
};

const defaultValues = {
  type: bikeMakeList[0],
  model: modelList[0].value,
  riderdome_device_id: "",
  year: "",
  color: colorList[0].value,
  transmission_type: "",
  gear_box: "",
  engine: engine[0].value,
  region: regionList[0].value,
  vin_code: "",
  license_plate: "",
};
const defaultMessage = {
  title: null,
  content: null,
  type: null, //green for success, red for error
  open: false,
};

const maxDate = new Date();
const maxYear = moment(new Date()).format("YYYY");

const AddBike = (props) => {
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setError,
    clearErrors,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({ defaultValues });
  const loadBikes = props.loadBikes;
  MenuProps.PaperProps.className = classes.selectOptions;
  const [maintenanceDate, setMaintenanceDate] = useState(maxDate);
  const [nextMaintenance, setNextMaintenance] = useState(maxDate);
  const [year, setYear] = useState(moment(maxDate).format("YYYY"));
  const [status, setStatus] = useState(1);
  const [message, setMessage] = useState({
    ...defaultMessage,
  });
  const [preview, setPreview] = useState(
    getBikeImageFromModel(modelList[0].value)
  );

  const [inputRef, setInputFocus] = useFocus();
  const yearValue = getValues("year");
  const dateValue = getValues("last_maintenance");
  const nextDate = getValues("next_maintenance");

  const handleDateSelect = (date, type) => {
    let mdate = date && moment(date, "DD/MM/YYYY");
    if (date && mdate.isValid() === false) {
      setError(type, { type: "invalid", message: "Invalid Date" });
    } else {
      clearErrors(type);
    }
    // props.onchange(true);
    switch (type) {
      case "last_maintenance":
        setMaintenanceDate(date);
        setValue("last_maintenance", date);
        break;
      case "next_maintenance":
        setNextMaintenance(date);
        setValue("next_maintenance", date);
        break;
      default:
        break;
    }
  };

  const handleYearChange = (date) => {
    props.onchange(true);
    if (date) {
      let year = moment(date, "YYYY");
      let formattedYear = moment(date).format("YYYY");
      setYear(formattedYear);
      setValue("year", formattedYear);
      if (formattedYear > maxYear || year.isValid() === false) {
        setError("year", { type: "invalid", message: "Invalid Year" });
      } else {
        clearErrors("year");
      }
    } else {
      setYear(null);
      setValue("year", null);
    }
  };

  useEffect(() => {
    register("last_maintenance", { required: false });
    register("next_maintenance", { required: false });
    register("year", { required: true });
  }, [register]);

  useEffect(() => {
    setMaintenanceDate(dateValue || null);
  }, [setMaintenanceDate, dateValue]);

  useEffect(() => {
    setYear(yearValue || null);
  }, [setYear, yearValue]);

  useEffect(() => {
    setNextMaintenance(nextDate || null);
  }, [setNextMaintenance, nextDate]);

  const onFormSubmit = (data) => {
    BikeClient.post(data, props.token)
      .then((data) => {
        setMessage({
          title: "Successful!",
          content: "New bike has been added succesfully!",
          type: "green",
          open: true,
        });
        props.onchange(false);
        setStatus(1);
        setMaintenanceDate(null);
        setPreview(getBikeImageFromModel(modelList[0].value));
        loadBikes();
        props.setRefresh(true);
      })
      .catch((e) => {
        setStatus(2);
        setMessage({
          title: "Failed",
          content: `${e.message} Please try again`,
          type: "red",
          open: true,
        });
      });
  };

  const handleClose = () => {
    setMessage({
      ...defaultMessage,
    });
  };

  const checkField = async (value, fieldName) => {
    let { data } = await BikeClient.postCheckField(
      { value, fieldName },
      props.token
    );
    if (data.status == "success") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setInputFocus();
  }, []);

  const reloadForm = () => {
    const resetForm = async () => await reset();
    const closeModal = async () => await handleClose();
    setStatus(0);
    resetForm().then(() => closeModal().then(() => setInputFocus()));
  };

  const closeForm = () => {
    // close all modal
    handleClose();
    props.handleClose();
    // set Status back to original
    // window.location.reload();
    setStatus(0);
  };

  const handleChangeModel = (e) => {
    const { value } = e.target;
    setValue("model", value);
    const imageSrc = getBikeImageFromModel(value);
    setPreview(imageSrc);
  };

  console.log(watch());
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Grid container spacing={5}>
          <Grid item sx={6}>
            <label htmlFor="type" className={classes.label}>
              Make *
            </label>
            <Controller
              control={control}
              name="type"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  classes={{ icon: classes.icon, iconOpen: classes.iconOpen }}
                  className={classes.select}
                  id="type"
                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                  IconComponent={ExpandMoreIcon}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    props.onchange(true);
                  }}
                >
                  {bikeMakeList.map((make, key) => (
                    <MenuItem value={make} key={key}>
                      {make}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <div className={classes.error}>
              {errors.type?.type === "required" && "*Required"}
            </div>
          </Grid>
          <Grid item sx={6}>
            <label htmlFor="model" className={classes.label}>
              Model *
            </label>
            <Controller
              control={control}
              name="model"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  classes={{ icon: classes.icon, iconOpen: classes.iconOpen }}
                  className={classes.select}
                  id="model"
                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                  IconComponent={ExpandMoreIcon}
                  {...field}
                  onChange={(e) => {
                    props.onchange(true);
                    handleChangeModel(e);
                  }}
                >
                  {modelList.map((model, key) => (
                    <MenuItem value={model.value} key={key}>
                      {model.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <div className={classes.error}>
              {errors.model?.type === "required" && "*Required"}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item sx={6}>
            <label htmlFor="year" className={classes.label}>
              Year *
            </label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.pickerRoot}>
                <KeyboardDatePicker
                  clearable
                  disableFuture
                  views={["year"]}
                  disableToolbar
                  variant="dialog"
                  format="yyyy"
                  margin="normal"
                  id="year"
                  placeholder="2000"
                  helperText={""}
                  value={year}
                  onChange={(date) => {
                    handleYearChange(date);
                  }}
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      input: classes.inputText,
                    },
                  }}
                  DialogProps={ModalProps}
                  leftArrowButtonProps={{
                    classes: { root: classes.pickerButton },
                  }}
                  rightArrowButtonProps={{
                    classes: { root: classes.pickerButton },
                  }}
                  className={classes.pickerInput}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
            <div className={classes.error}>
              {errors.year?.type === "required" && "*Required"}
              {errors.year?.type === "invalid" && errors.year?.message}
            </div>
          </Grid>
          <Grid item sx={6}>
            <label htmlFor="color" className={classes.label}>
              Color
            </label>
            <Controller
              control={control}
              name="color"
              //   rules={{ required: true }}
              render={({ field }) => (
                <Select
                  classes={{ icon: classes.icon, iconOpen: classes.iconOpen }}
                  className={classes.select}
                  id="color"
                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                  IconComponent={ExpandMoreIcon}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    props.onchange(true);
                  }}
                >
                  {colorList.map((color, key) => (
                    <MenuItem value={color.value} key={key}>
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <div className={classes.error}>
              {errors.color?.type === "required" && "*Required"}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item sx={6}>
            <label htmlFor="engine" className={classes.label}>
              Engine *
            </label>
            {/* change to select */}
            <Controller
              control={control}
              name="engine"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  classes={{ icon: classes.icon, iconOpen: classes.iconOpen }}
                  className={classes.select}
                  id="engine"
                  //   defaultValue="fuel"
                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                  IconComponent={ExpandMoreIcon}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    props.onchange(true);
                  }}
                >
                  {engine.map((type, key) => (
                    <MenuItem value={type.value} key={key}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <div className={classes.error}>
              {errors.engine?.type === "required" && "*Required"}
            </div>
          </Grid>
          <Grid item sx={6}>
            <label htmlFor="region" className={classes.label}>
              Region *
            </label>
            {/* change to select */}
            <Controller
              control={control}
              name="region"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  classes={{ icon: classes.icon, iconOpen: classes.iconOpen }}
                  className={classes.select}
                  id="region"
                  //   defaultValue="fuel"
                  input={<BootstrapInput />}
                  MenuProps={MenuProps}
                  IconComponent={ExpandMoreIcon}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    props.onchange(true);
                  }}
                >
                  {regionList.map((region, key) => (
                    <MenuItem value={region.value} key={key}>
                      {region.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <div className={classes.error}>
              {errors.engine?.type === "required" && "*Required"}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item sx={6}>
            <label htmlFor="last_maintenance" className={classes.label}>
              Last Maintenance
            </label>
            {/* change to date input */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.pickerRoot}>
                <KeyboardDatePicker
                  clearable
                  maxDate={maxDate}
                  openTo="month"
                  disableToolbar
                  variant="dialog"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="last_maintenance"
                  placeholder="18/07/2021"
                  helperText={""}
                  value={maintenanceDate}
                  onChange={(date) =>
                    handleDateSelect(date, "last_maintenance")
                  }
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      input: classes.inputText,
                    },
                  }}
                  DialogProps={ModalProps}
                  leftArrowButtonProps={{
                    classes: { root: classes.pickerButton },
                  }}
                  rightArrowButtonProps={{
                    classes: { root: classes.pickerButton },
                  }}
                  className={classes.pickerInput}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
            <div className={classes.error}>
              {errors.last_maintenance?.type === "invalid" &&
                errors.last_maintenance?.message}
            </div>
          </Grid>
          <Grid item sx={6}>
            <label htmlFor="next_maintenance" className={classes.label}>
              Next Maintenance
            </label>
            {/* change to date input */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.pickerRoot}>
                <KeyboardDatePicker
                  clearable
                  minDate={maxDate}
                  openTo="month"
                  disableToolbar
                  variant="dialog"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="next_maintenance"
                  placeholder="18/07/2021"
                  helperText={""}
                  value={nextMaintenance}
                  onChange={(date) =>
                    handleDateSelect(date, "next_maintenance")
                  }
                  InputProps={{
                    disableUnderline: true,
                    classes: {
                      input: classes.inputText,
                    },
                  }}
                  DialogProps={ModalProps}
                  leftArrowButtonProps={{
                    classes: { root: classes.pickerButton },
                  }}
                  rightArrowButtonProps={{
                    classes: { root: classes.pickerButton },
                  }}
                  className={classes.pickerInput}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
            <div className={classes.error}>
              {errors.next_maintenance?.type === "invalid" &&
                errors.next_maintenance?.message}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item sx={6}>
            <label htmlFor="license_plate" className={classes.label}>
              License Plate Number *
            </label>
            <Controller
              control={control}
              name="license_plate"
              rules={{
                required: true,
                validate: async (a) => await checkField(a, "license_plate"),
              }}
              render={({ field }) => (
                <InputBase
                  className={classes.input}
                  id="license_plate"
                  type="text"
                  placeholder="e.g. SFG1345E"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    props.onchange(true);
                  }}
                />
              )}
            />
            <div className={classes.error}>
              {errors.license_plate?.type === "required" && "*Required"}
              {errors.license_plate?.type === "validate" &&
                "license_plate already existed"}
            </div>
          </Grid>
          <Grid item sx={6}>
            <label htmlFor="riderdome_device_id" className={classes.label}>
              Rider Dome Unit ID *
            </label>
            <Controller
              control={control}
              name="riderdome_device_id"
              rules={{
                required: true,
                validate: async (a) =>
                  await checkField(a, "riderdome_device_id"),
              }}
              render={({ field }) => (
                <InputBase
                  className={classes.input}
                  id="riderdome_device_id"
                  type="text"
                  placeholder="RiderDome Device ID S/N"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    props.onchange(true);
                  }}
                />
              )}
            />
            <div className={classes.error}>
              {errors.riderdome_device_id?.type === "required" && "*Required"}
              {errors.riderdome_device_id?.type === "validate" &&
                "riderdome_device_id already existed"}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item sx={6}>
            <label htmlFor="bike-image" className={classes.label}>
              Bike Image
            </label>
            <Box display="flex" alignItems="center">
              <img src={preview} width="210" alt="Bike Preview" />
            </Box>
          </Grid>
        </Grid>
        <Box style={{ margin: "3em 0" }}>
          <Button
            type="submit"
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Box>
      </form>
      <AlertMessage
        open={message.open}
        close={handleClose}
        title={message.title}
        titleStyle={message.type}
        ariaLabelledby="add-new-bike-message"
        ariaDescribedby="add-new-bike-message"
      >
        <Box textAlign="center">
          {message.content}
          {status === 1 ? ( // success
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.mr16}
                onClick={reloadForm}
              >
                Add Another Bike
              </Button>
              <Button variant="outlined" color="primary" onClick={closeForm}>
                Close
              </Button>
            </Box>
          ) : status === 2 ? (
            <Box mt={4}>
              <Button variant="contained" color="primary" onClick={handleClose}>
                OK
              </Button>
            </Box>
          ) : null}
        </Box>
      </AlertMessage>
    </div>
  );
};

export default AddBike;

// http://dev.virtualearth.net/REST/v1/Autosuggest?query="yangon"&includeEntityTypes="Address"&key=3BRsExeOEHkwgjHM3KGk~CsLEw758yLTzEonmP7vsaQ~ArD8PvKP7PhQ1k7VJqwbhXdVK_0PLLZtjae7cXj-gmt1jWSzr0uUvK96Wn4eQ0Sp

