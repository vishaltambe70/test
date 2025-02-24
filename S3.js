import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  Badge,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "../../components/snackbar/index.tsx";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAssetsThunk, assetsThunk } from "./reducer/thunk";
import AdvanceSearchModal from "./advanceSearchModal";
import AddAssetModal from "./addAssetModal";
import SnackbarComponent from "../../components/snackbar/index.tsx";

const Assets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [assetsList, setAssetsList] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({
    isDeleted: false,
    serverId: 0,
    hostName: "",
    ipAddress: "",
    serverRole: "",
    environment: "",
    hostProvider: "",
    ramSizeGb: "",
    coreCount: "",
    requestionNumber: "",
    osVersion: "",
    patchFrequency: 0,
    lastPatchDatetime: new Date().toISOString(),
    assetIdList: [0],
  });
  const [paginationModel, setPaginationModel] = useState({ pageSize: 20, page: 0 });
  const [snackbarOpen, setSnackbarOpen] = useState({ open: false, severity: "", message: "" });
  const [addAssetModalOpen, setAddAssetModalOpen] = useState(false);
  const [advanceSearchModalOpen, setAdvanceSearchModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);

  const allRequests = useSelector((state) => state.assets.assets);
  const addUpdateAssets = useSelector((state) => state.assets.addAssets);

  useEffect(() => {
    dispatch(assetsThunk({ ...formInitialValues, page: 0, size: paginationModel.pageSize }));
  }, [formInitialValues, paginationModel.pageSize]);

  useEffect(() => {
    if (allRequests.status === "succeeded") {
      setAssetsList(allRequests.data?.assets?.content || []);
    }
  }, [allRequests.status]);

  const submitAddAssetForm = (values) => {
    dispatch(addAssetsThunk(values));
    setAddAssetModalOpen(false);
  };

  const handleDelete = () => {
    if (rowToDelete) {
      const updatedRow = { ...rowToDelete, isDeleted: true };
      dispatch(addAssetsThunk(updatedRow));
      setDeleteModalOpen(false);
    }
  };

  return (
    <Card sx={{ flex: 1, borderRadius: "10px", width: "100%" }}>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h3">Servers</Typography>
              <Button variant="contained" onClick={() => setAddAssetModalOpen(true)} startIcon={<AddIcon />}>
                Add Server
              </Button>
            </Grid>

            <DataGrid
              rows={assetsList}
              columns={[
                { field: "hostName", headerName: "Host Name", width: 200 },
                { field: "ipAddress", headerName: "IP Address", width: 200 },
                { field: "serverRole", headerName: "Server Role", width: 200 },
                { field: "environment", headerName: "Environment", width: 200 },
                { field: "hostProvider", headerName: "Host Provider", width: 200 },
                { field: "ramSizeGb", headerName: "RAM Size (GB)", width: 150 },
                { field: "coreCount", headerName: "Core Count", width: 150 },
                { field: "osVersion", headerName: "OS Version", width: 200 },
                { field: "patchFrequency", headerName: "Patch Frequency", width: 150 },
                { field: "lastPatchDatetime", headerName: "Last Patch Date", width: 200 },
                {
                  field: "actions",
                  headerName: "Actions",
                  width: 150,
                  renderCell: (params) => (
                    <>
                      <Button onClick={() => { setRowToEdit(params.row); setAddAssetModalOpen(true); }}>Edit</Button>
                      <Button color="error" onClick={() => { setRowToDelete(params.row); setDeleteModalOpen(true); }}>Delete</Button>
                    </>
                  ),
                },
              ]}
              pageSize={paginationModel.pageSize}
              onPageChange={(newPage) => setPaginationModel({ ...paginationModel, page: newPage })}
              paginationMode="server"
            />
          </Box>
        </Grid>
      </Grid>

      {addAssetModalOpen && (
        <AddAssetModal
          open={addAssetModalOpen}
          openHandler={() => setAddAssetModalOpen(false)}
          rowToEdit={rowToEdit}
          submitClickHandler={submitAddAssetForm}
        />
      )}

      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Delete Server?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {rowToDelete?.hostName}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>Delete</Button>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <SnackbarComponent
        message={snackbarOpen.message}
        isOpen={snackbarOpen.open}
        purpose={snackbarOpen.severity}
        handleClick={() => setSnackbarOpen({ open: false, severity: "", message: "" })}
      />
    </Card>
  );
};

export default Assets;
                
