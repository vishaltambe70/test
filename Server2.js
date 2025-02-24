import React from "react"; import CloseIcon from "@mui/icons-material/Close"; import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid, Box, } from "@mui/material"; import { Field, Form, Formik } from "formik"; import * as Yup from "yup"; import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"; import dayjs from "dayjs";

const AddServerModal = ({ open, openHandler, rowToEdit, submitClickHandler, }) => { const validationSchema = Yup.object({ isDeleted: Yup.boolean().required("Required"), serverId: Yup.number().required("Required"), hostName: Yup.string().required("Required"), ipAddress: Yup.string().required("Required"), serverRole: Yup.string().required("Required"), environment: Yup.string().required("Required"), hostProvider: Yup.string().required("Required"), ramSizeGb: Yup.string().required("Required"), coreCount: Yup.string().required("Required"), requestionNumber: Yup.string().required("Required"), osVersion: Yup.string().required("Required"), patchFrequency: Yup.number().required("Required"), lastPatchDatetime: Yup.date().required("Required"), assetIdList: Yup.array().of(Yup.number()).required("Required"), });

return ( <Dialog open={open} onClose={openHandler} fullWidth maxWidth="md"> <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} > {rowToEdit ? <>Edit Server</> : <>Add Server</>} <CloseIcon onClick={() => openHandler()} color="primary" sx={{ cursor: "pointer" }} /> </DialogTitle>

<DialogContent>
    <Formik
      initialValues={{
        isDeleted: rowToEdit?.isDeleted || false,
        serverId: rowToEdit?.serverId || 0,
        hostName: rowToEdit?.hostName || "",
        ipAddress: rowToEdit?.ipAddress || "",
        serverRole: rowToEdit?.serverRole || "",
        environment: rowToEdit?.environment || "",
        hostProvider: rowToEdit?.hostProvider || "",
        ramSizeGb: rowToEdit?.ramSizeGb || "",
        coreCount: rowToEdit?.coreCount || "",
        requestionNumber: rowToEdit?.requestionNumber || "",
        osVersion: rowToEdit?.osVersion || "",
        patchFrequency: rowToEdit?.patchFrequency || 0,
        lastPatchDatetime: rowToEdit?.lastPatchDatetime || dayjs(),
        assetIdList: rowToEdit?.assetIdList || [0],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted Values:", values);
        submitClickHandler(values);
      }}
    >
      {(props) => (
        <Form>
          <Grid container spacing={2} sx={{ p: 1 }}>
            {[
              { name: "isDeleted", label: "Is Deleted", type: "checkbox" },
              { name: "serverId", label: "Server ID", type: "input" },
              { name: "hostName", label: "Host Name", type: "input" },
              { name: "ipAddress", label: "IP Address", type: "input" },
              { name: "serverRole", label: "Server Role", type: "input" },
              { name: "environment", label: "Environment", type: "input" },
              { name: "hostProvider", label: "Host Provider", type: "input" },
              { name: "ramSizeGb", label: "RAM Size (GB)", type: "input" },
              { name: "coreCount", label: "Core Count", type: "input" },
              { name: "requestionNumber", label: "Requestion Number", type: "input" },
              { name: "osVersion", label: "OS Version", type: "input" },
              { name: "patchFrequency", label: "Patch Frequency", type: "input" },
              { name: "assetIdList", label: "Asset ID List", type: "input" },
            ].map((field) => (
              <Grid item xs={12} md={6} key={field.name}>
                <Field name={field.name}>
                  {({ field: formikField, meta }) => (
                    <TextField
                      {...formikField}
                      variant="outlined"
                      size="small"
                      label={field.label}
                      type={field.type === "checkbox" ? "checkbox" : "text"}
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>
            ))}

            <Grid item xs={12} md={6}>
              <Field name="lastPatchDatetime">
                {({ field, meta }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      {...field}
                      label="Last Patch Datetime"
                      value={dayjs(props.values.lastPatchDatetime)}
                      onChange={(value) =>
                        props.setFieldValue("lastPatchDatetime", value)
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

); };

export default AddServerModal;

