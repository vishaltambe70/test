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

const AddAssetModal = ({ open, openHandler, submitHandler }) => {
  const validationSchema = Yup.object({
    assetName: Yup.string().required("Required"),
    assetOwner: Yup.string().required("Required"),
    assetInUse: Yup.string().required("Required"),
    fe: Yup.string().required("Required"),
    feLanguageVersion: Yup.string().required("Required"),
    be: Yup.string().required("Required"),
    beLanguageVersion: Yup.string().required("Required"),
    databaseUsed: Yup.string().required("Required"),
    dbVersion: Yup.string().required("Required"),
    dbIpAddress: Yup.string().required("Required"),
    tablesName: Yup.string().required("Required"),
    codeRepoUrl: Yup.string().url("Invalid URL").required("Required"),
  });

  return (
    <Dialog open={open} onClose={openHandler} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <>Add Asset</>
        <CloseIcon
          onClick={() => openHandler()}
          color="primary"
          sx={{ cursor: "pointer" }}
        />
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={{
            assetName: "",
            assetOwner: "",
            assetInUse: "",
            fe: "",
            feLanguageVersion: "",
            be: "",
            beLanguageVersion: "",
            databaseUsed: "",
            dbVersion: "",
            dbIpAddress: "",
            tablesName: "",
            codeRepoUrl: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            submitHandler(values);
          }}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2} sx={{ p: 1 }}>
                {[
                  { name: "assetName", label: "Asset Name" },
                  { name: "assetOwner", label: "Asset Owner" },
                  { name: "assetInUse", label: "Asset In Use" },
                  { name: "fe", label: "FE" },
                  { name: "feLanguageVersion", label: "FE Language Version" },
                  { name: "be", label: "BE" },
                  { name: "beLanguageVersion", label: "BE Language Version" },
                  { name: "databaseUsed", label: "Database Used" },
                  { name: "dbVersion", label: "DB Version" },
                  { name: "dbIpAddress", label: "DB IP Address" },
                  { name: "tablesName", label: "Tables Name" },
                  { name: "codeRepoUrl", label: "Code Repo URL" },
                ].map((field) => (
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
                ))}
              </Grid>

              <DialogActions>
                <Button onClick={openHandler}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Add Asset
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddAssetModal;
