import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const AddServerModal = ({
  open,
  openHandler,
  rowToEdit,
  submitClickHandler,
}) => {
  const validationSchema = Yup.object({
    assetName: Yup.string().required("Required"),
    assetOwner: Yup.string().required("Required"),
    assetInUseFrom: Yup.date().required("Required"),
    frontend: Yup.string().required("Required"),
    frontendLanguageVersion: Yup.string().nullable(true),
    backend: Yup.string().required("Required"),
    backendLanguageVersion: Yup.string().nullable(true),
    databaseUsed: Yup.string().required("Required"),
    databaseVersion: Yup.string().required("Required"),
    databaseIpAddress: Yup.string().required("Required"),
    tablesName: Yup.string().nullable(true),
    codeRepoUrl: Yup.string().url("Invalid URL").required("Required"),
  });

  return (
    <Dialog open={open} onClose={openHandler} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-backendtween",
          alignItems: "center",
        }}
      >
        {rowToEdit ? <>Edit Asset</> : <>Add Asset</>}
        <CloseIcon
          onClick={() => openHandler()}
          color="primary"
          sx={{ cursor: "pointer" }}
        />
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={{
            assetId: rowToEdit?.assetId || "",
            assetName: rowToEdit?.assetName || "",
            assetOwner: rowToEdit?.assetOwner || "",
            assetInUseFrom: rowToEdit?.assetInUseFrom || "",
            frontend: rowToEdit?.frontend || "",
            frontendLanguageVersion: rowToEdit?.frontendLanguageVersion || "",
            backend: rowToEdit?.backend || "",
            backendLanguageVersion: rowToEdit?.backendLanguageVersion || "",
            databaseUsed: rowToEdit?.databaseUsed || "",
            databaseVersion: rowToEdit?.databaseVersion || "",
            databaseIpAddress: rowToEdit?.databaseIpAddress || "",
            tablesName: rowToEdit?.tablesName || "",
            codeRepoUrl: rowToEdit?.codeRepoUrl || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("valuuuuuuuuu", values);
            //edit add row id here
            submitClickHandler(values);
          }}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2} sx={{ p: 1 }}>
                {[
                  { name: "assetName", label: "Asset Name", type: "input" },
                  { name: "assetOwner", label: "Asset Owner", type: "input" },
                  {
                    name: "assetInUseFrom",
                    label: "Asset In Use",
                    type: "date",
                  },
                  { name: "frontend", label: "Frontend", type: "input" },
                  {
                    name: "frontendLanguageVersion",
                    label: "frontend Language Version",
                    type: "input",
                  },
                  { name: "backend", label: "Backend", type: "input" },
                  {
                    name: "backendLanguageVersion",
                    label: "backend Language Version",
                    type: "input",
                  },
                  {
                    name: "databaseUsed",
                    label: "Database Used",
                    type: "input",
                  },
                  {
                    name: "databaseVersion",
                    label: "DB Version",
                    type: "input",
                  },
                  {
                    name: "databaseIpAddress",
                    label: "DB IP Address",
                    type: "input",
                  },
                  { name: "tablesName", label: "Tables Name", type: "input" },
                  {
                    name: "codeRepoUrl",
                    label: "Code Repo URL",
                    type: "input",
                  },
                ].map((field) => (
                  <>
                    {field?.type === "input" ? (
                      <Grid item xs={12} md={6} key={field.name}>
                        <Field name={field.name}>
                          {({ field: formikField, meta }) => (
                            <TextField
                              {...formikField}
                              variant="outlined"
                              size="small"
                              label={field.label}
                              fullWidth
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                    ) : (
                      <Grid item xs={12} md={6}>
                        <Field name={field.name}>
                          {({ field, meta }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                {...field}
                                label="Asset In Use"
                                value={dayjs(props.values.assetInUse)}
                                onChange={(value) =>
                                  props.setFieldValue(field.name, value)
                                }
                                slotProps={{
                                  textField: {
                                    fullWidth: true,
                                    size: "small",
                                    error: meta.touched && Boolean(meta.error),
                                    helperText: meta.touched && meta.error,
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          )}
                        </Field>
                      </Grid>
                    )}
                  </>
                ))}
                {/* Asset In Use (Date & Time Picker) */}
                {/* <Grid item xs={12} md={6}>
                  <Field name="assetInUse">
                    {({ field, meta }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          {...field}
                          label="Asset In Use"
                          value={dayjs(props.values.assetInUse)}
                          onChange={(value) =>
                            props.setFieldValue("assetInUse", value)
                          }
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                              error: meta.touched && Boolean(meta.error),
                              helperText: meta.touched && meta.error,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  </Field>
                </Grid> */}
              </Grid>

              <DialogActions>
                <Button onClick={openHandler}>Cancel</Button>
                <Button type="submit" variant="contained">
                  {rowToEdit ? "Save" : "Add"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddServerModal;
