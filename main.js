import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { LoaderComponent } from "../../components/Loader/LoaderComponent.js";

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
  // Table,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "../../components/snackbar/index.tsx";

import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridFooter,
  GridToolbarColumnsButton,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import AnimatedNumber from "animated-number-react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addAssetsThunk, assetsThunk } from "./reducer/thunk";
import AdvanceSearchModal from "./advanceSearchModal";
import { updateTokenIfExpired } from "../../utility/SessionManager";
import Methods, { validateAPI } from "../../utility/Methods";
import AddAssetModal from "./addAssetModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Backdrop from "../../components/backdrop/index.tsx";
import SnackbarComponent from "../../components/snackbar/index.tsx";

// import { LoaderComponent } from "../../components/loader/LoaderComponent";

const StyledTotalCard = styled(Card)(({ theme }) => ({
  height: "100px",
  paddingLeft: "40px",
  paddingRight: "40px",
  marginRight: "40px",
  marginBottom: "40px",
  minWidth: "100px",
  backgroundColor: "#ffffff",
  color: "#000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  aliignItems: "center",
}));

const customToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
};

const Assets = () => {
  const navigate = useNavigate();

  const [assetsList, setAssetsList] = useState([]);
  const [showclaimType, setShowClaimType] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const [openCount, setSnackbarOpenCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [openFilter, setSnackbarOpenFilter] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [advanceSearchModalOpen, setAdvanceSearchModalOpen] = useState(false);
  const [addAssetModalOpen, setAddAssetModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const [formInitialValues, setFormInitialValues] = useState({
    assetName: "",
    assetOwner: "",
    assetInUseFrom: "",
    frontend: "",
    frontendLanguageVersion: "",
    backend: "",
    backendLanguageVersion: "",
    databaseUsed: "",
    databaseVersion: "",
    databaseIpAddress: "",
    tablesName: "",
    codeRepoUrl: "",
  });
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 20,
    page: 0,
  });

  const allRequests = useSelector((state) => state.assets.assets);
  const addUpdateAssets = useSelector((state) => state.assets.addAssets);
  const [rowCount, setRowCount] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const {
    status: allRequestsStatus,
    data: allRequestsData,
    error: allRequestsError,
  } = allRequests;

  const {
    status: addUpdateAssetsStatus,
    data: addUpdateAssetsData,
    error: addUpdateAssetsError,
  } = addUpdateAssets;

  const handleClick = () => {
    setSnackbarOpen({ open: false, severity: "", message: "" });
  };

  const handleShowSnackbar = (severity, message) => {
    setSnackbarOpen({
      open: true,
      severity: severity,
      message: message,
    });
  };
  const dispatchAPICall = (data) => {
    updateTokenIfExpired(window, dispatch);
    dispatch(assetsThunk(data));
  };

  useEffect(() => {
    dispatchAPICall({
      assetName: formInitialValues.assetName,
      assetOwner: formInitialValues.assetOwner,
      // assetInUseFrom: formInitialValues.assetInUseFrom,
      // frontend: formInitialValues.frontend,
      // frontendLanguageVersion: formInitialValues.frontendLanguageVersion,
      // backend: formInitialValues.backend,
      // backendLanguageVersion: formInitialValues.backendLanguageVersion,
      // databaseUsed: formInitialValues.databaseUsed,
      // databaseVersion: formInitialValues.databaseVersion,
      // databaseIpAddress: formInitialValues.databaseIpAddress,
      // tablesName: formInitialValues.tablesName,
      // codeRepoUrl: formInitialValues.codeRepoUrl,
      page: 0,
      size: paginationModel.pageSize,
    });
  }, [formInitialValues, addUpdateAssetsStatus]);

  useEffect(() => {
    //to backend added in all API calls if token expired case
    validateAPI(
      allRequestsError?.status,
      allRequestsError?.error?.errorCode,
      dispatch,
      navigate
    );
    if (allRequestsStatus === "succeeded") {
      const listData = allRequestsData?.assets?.content;
      const listCount = allRequestsData?.assets?.totalElements;
      // setSnackbarOpenCount(allRequestsData?.newCount);
      // setClosedCount(allRequestsData?.closedCount);
      // setInProgressCount(allRequestsData?.inProgressCount);
      // setTotalCount(allRequestsData?.totalCount);
      setAssetsList(listData);
      setRowCount(listCount);
    }
  }, [allRequestsStatus]);

  useEffect(() => {
    if (addUpdateAssetsStatus === "succeeded") {
      handleShowSnackbar("success", addUpdateAssetsData);
    } else if (addUpdateAssetsStatus === "failed") {
      handleShowSnackbar("error", addUpdateAssetsData);
    }
  }, [addUpdateAssetsStatus]);

  const advanceSearchModalHandler = () => {
    setAdvanceSearchModalOpen(false);
  };

  const addAssetModalHandler = () => {
    setAddAssetModalOpen(false);
    setRowToEdit(null);
  };

  const submitClickHandler = async (values) => {
    setFormInitialValues(values);
    setPaginationModel({
      page: 0,
      pageSize: paginationModel.pageSize,
    });
    advanceSearchModalHandler();
  };

  const submitAddAssetForm = async (values) => {
    dispatch(addAssetsThunk(values));
    addAssetModalHandler();
    dispatchAPICall({
      assetName: formInitialValues.assetName,
      assetOwner: formInitialValues.assetOwner,
      // assetInUseFrom: formInitialValues.assetInUseFrom,
      // frontend: formInitialValues.frontend,
      // frontendLanguageVersion: formInitialValues.frontendLanguageVersion,
      // backend: formInitialValues.backend,
      // backendLanguageVersion: formInitialValues.backendLanguageVersion,
      // databaseUsed: formInitialValues.databaseUsed,
      // databaseVersion: formInitialValues.databaseVersion,
      // databaseIpAddress: formInitialValues.databaseIpAddress,
      // tablesName: formInitialValues.tablesName,
      // codeRepoUrl: formInitialValues.codeRepoUrl,
      page: 0,
      size: paginationModel.pageSize,
    });
  };

  const handleDelete = (row) => {
    let updatedVal = {};
    Object.assign(updatedVal, row); //copy the original object to the new object
    updatedVal["isDeleted"] = true;
    console.log(updatedVal);
    console.log("upadted val", updatedVal);
    //!dispatch delete action
    dispatch(addAssetsThunk(updatedVal));
    setDeleteModalOpen(false);
    setRowToDelete(null);
    dispatchAPICall({
      assetName: formInitialValues.assetName,
      assetOwner: formInitialValues.assetOwner,
      // assetInUseFrom: formInitialValues.assetInUseFrom,
      // frontend: formInitialValues.frontend,
      // frontendLanguageVersion: formInitialValues.frontendLanguageVersion,
      // backend: formInitialValues.backend,
      // backendLanguageVersion: formInitialValues.backendLanguageVersion,
      // databaseUsed: formInitialValues.databaseUsed,
      // databaseVersion: formInitialValues.databaseVersion,
      // databaseIpAddress: formInitialValues.databaseIpAddress,
      // tablesName: formInitialValues.tablesName,
      // codeRepoUrl: formInitialValues.codeRepoUrl,
      page: 0,
      size: paginationModel.pageSize,
    });
  };

  const handleFilterReset = () => {
    setFormInitialValues({
      ...formInitialValues,
      assetName: "",
      assetOwner: "",
      // assetInUseFrom: "",
      // frontend: "",
      // frontendLanguageVersion: "",
      // backend: "",
      // backendLanguageVersion: "",
      // databaseUsed: "",
      // databaseVersion: "",
      // databaseIpAddress: "",
      // tablesName: "",
      // codeRepoUrl: "",
    });
    setFiltersApplied(false);

    setPaginationModel({
      page: 0,
      pageSize: paginationModel.pageSize,
    });
    advanceSearchModalHandler();
  };

  const tableHeader = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          // <GridActionsCellItem
          //   icon={
          //     <Tooltip title="View">
          //       <VisibilityIcon />
          //     </Tooltip>
          //   }
          //   label="View"
          //   className="textPrimary"
          //   onClick={() => {
          //     // handleDocumentView(row?.trace_id, 0, 5);
          //     // setSelectedTraceId(row?.trace_id);
          //     // setDocumentModalOpen(true);
          //   }}
          //   color="primary"
          // />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => {
              setAddAssetModalOpen(true);
              setRowToEdit(row);
            }}
            color="primary"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            className="textPrimary"
            onClick={() => {
              setDeleteModalOpen(true);
              setRowToDelete(row);

              // handleDocumentView(row?.trace_id, 0, 5);
              // setSelectedTraceId(row?.trace_id);
              // setDocumentModalOpen(true);
            }}
            color="error"
          />,
        ];
      },
    },
    {
      field: "assetName",
      headerName: "Asset Name",
      width: 200,
      type: "string",
    },
    {
      field: "assetOwner",
      headerName: "Asset Owner",
      width: 200,
      type: "string",
    },
    {
      field: "assetInUseFrom",
      headerName: "Asset In Use",
      width: 200,
      renderCell: (value) => {
        return Methods.formatDateTime(value?.row?.assetInUseFrom);
      },
    },
    { field: "frontend", headerName: "Frontend", width: 150, type: "string" },
    {
      field: "frontendLanguageVersion",
      headerName: "FE Language Version",
      width: 180,
      type: "string",
    },
    { field: "backend", headerName: "Backend", width: 150, type: "string" },
    {
      field: "backendLanguageVersion",
      headerName: "BE Language Version",
      width: 180,
      type: "string",
    },
    {
      field: "databaseUsed",
      headerName: "Database Used",
      width: 180,
      type: "string",
    },
    {
      field: "databaseVersion",
      headerName: "DB Version",
      width: 150,
      type: "string",
    },
    {
      field: "databaseIpAddress",
      headerName: "DB IP Address",
      width: 180,
      type: "string",
    },
    {
      field: "tablesName",
      headerName: "Tables Name",
      width: 200,
      type: "string",
    },
    {
      field: "codeRepoUrl",
      headerName: "Code Repo URL",
      width: 250,
      type: "string",
    },
  ];

  const cardClickEvent = (name) => {
    let status = "";
    if (name === "New") {
      status = name;
    } else if (name === "InProgress") {
      status = name;
    } else if (name === "Closed") {
      status = name;
    } else {
      status = "";
    }
    setFormInitialValues({
      ...formInitialValues,
      status: status,
    });
  };

  const handleCloseFilter = () => {
    setSnackbarOpenFilter(false);
  };

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const handlePaginationModelChange = (newPaginationModel) => {
    // We have the cursor, we can allow the page transition.
    console.log("newPaginationModel", newPaginationModel);
    const reqBody = {
      assetName: formInitialValues.assetName,
      assetOwner: formInitialValues.assetOwner,
      // assetInUseFrom: formInitialValues.assetInUseFrom,
      // frontend: formInitialValues.frontend,
      // frontendLanguageVersion: formInitialValues.frontendLanguageVersion,
      // backend: formInitialValues.backend,
      // backendLanguageVersion: formInitialValues.backendLanguageVersion,
      // databaseUsed: formInitialValues.databaseUsed,
      // databaseVersion: formInitialValues.databaseVersion,
      // databaseIpAddress: formInitialValues.databaseIpAddress,
      // tablesName: formInitialValues.tablesName,
      // codeRepoUrl: formInitialValues.codeRepoUrl,
      page: newPaginationModel.page,
      size: newPaginationModel.pageSize,
    };
    dispatchAPICall(reqBody);
    setPaginationModel({
      page: newPaginationModel.page,
      pageSize: newPaginationModel.pageSize,
    });
  };

  return (
    <Card
      sx={{
        flex: 1,
        borderRadius: "10px",
        width: "100%",
        display: "flex",
        // border: "2px solid rgb(245, 132, 31)",
        // boxShadow: "rgb(245, 132, 31) 0px 2px 10px",
      }}
    >
      {allRequestsStatus === "pending" ? <Backdrop /> : null}
      {addUpdateAssetsStatus === "pending" ? <Backdrop /> : null}

      {/* {showLoader && <LoaderComponent />} */}
      <Grid container md={12} xs={12}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            borderRadius: "10px",
            justifyContent: "center",
            padding: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              "& .super-app.red": {
                backgroundColor: "#FD4532",
                color: "#FFF",
              },
              "& .super-app.green": {
                backgroundColor: "#50B948",
                color: "#FFF",
              },
              "& .super-app.yellow": {
                backgroundColor: "#FCB43C",
                color: "#FFF",
              },
              "& .super-app.new": {
                backgroundColor: "#0284C9",
                color: "#FFF",
              },
            }}
          >
            {/* <Grid
              container
              justifyContent={"space-between"}
              sx={{
                width: "100%",
                display: "flex",
                marginBottom: "20px",
                mt: 2,
              }}
            >
              <Grid item md={3} sx={{ pl: 1, pr: 1 }}>
                <StyledTotalCard
                  onClick={() => cardClickEvent("")}
                  sx={{ cursor: "pointer", borderLeft: "10px solid blue" }}
                >
                  <Typography align={"center"} variant={"h3"}>
                    {totalCount}
                  </Typography>
                  <Typography align={"center"} variant={"h6"}>
                    {"Total "}
                  </Typography>
                </StyledTotalCard>
              </Grid>

               <Grid item md={3} sx={{ pl: 1, pr: 1 }}>
                <StyledTotalCard
                  onClick={() => cardClickEvent("New")}
                  sx={{ cursor: "pointer", borderLeft: "10px solid #0284C9" }}
                >
                  <Typography align={"center"} variant={"h3"}>
                    {openCount}
                  </Typography>
                  <Typography align={"center"} variant={"h6"}>
                    {"New"}
                  </Typography>
                </StyledTotalCard>
              </Grid>
              <Grid item md={3} sx={{ pl: 1, pr: 1 }}>
                <StyledTotalCard
                  onClick={() => cardClickEvent("InProgress")}
                  sx={{ cursor: "pointer", borderLeft: "10px solid #FCB43C" }}
                >
                  <Typography align={"center"} variant={"h3"}>
                    {inProgressCount}
                  </Typography>
                  <Typography align={"center"} variant={"h6"}>
                    {"In Progress "}
                  </Typography>
                </StyledTotalCard>
              </Grid>
              <Grid item md={3} sx={{ pl: 1, pr: 1 }}>
                <StyledTotalCard
                  onClick={() => cardClickEvent("Closed")}
                  sx={{ borderLeft: "10px solid #50B948", cursor: "pointer" }}
                >
                  <Typography align={"center"} variant={"h3"}>
                    {closedCount}
                  </Typography>
                  <Typography align={"center"} variant={"h6"}>
                    {"Closed "}
                  </Typography>
                </StyledTotalCard>
              </Grid> 
            </Grid> */}
            <Grid
              container
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              spacing={2}
            >
              <Grid item>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Assets
                </Typography>
              </Grid>

              <Grid item>
                {filtersApplied ? (
                  <Button
                    variant="contained"
                    sx={{
                      mb: "20px",
                      cursor: "pointer",
                      mr: 2,
                      // background: "rgb(245, 132, 31)",
                    }}
                    onClick={() => handleFilterReset()}
                  >
                    Reset filters
                  </Button>
                ) : null}
                <Badge
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  badgeContent={filtersApplied ? "!" : 0}
                  color="error"
                >
                  <Button
                    variant="contained"
                    sx={{
                      mb: "20px",
                      cursor: "pointer",
                      mr: 2,
                      background: "rgb(245, 132, 31)",
                    }}
                    onClick={(event) => {
                      setAdvanceSearchModalOpen(true);
                    }}
                    startIcon={<FilterListIcon />}
                  >
                    Advanced Filters
                  </Button>
                </Badge>
                <Button
                  variant="contained"
                  sx={{
                    mb: "20px",
                    cursor: "pointer",
                    background: "rgb(245, 132, 31)",
                  }}
                  onClick={(event) => {
                    setAddAssetModalOpen(true);
                  }}
                  startIcon={<AddIcon />}
                >
                  Add Assest
                </Button>
              </Grid>
            </Grid>
            <DataGrid
              sx={(theme) => {
                return {
                  height: "500px",
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#0284c9",
                    color: "#fff",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    textOverflow: "clip",
                    fontWeight: "bold",
                    fontSize: "16px",
                    whiteSpace: "break-spaces !important",
                    lineHeight: 1,
                  },
                  "& .MuiDataGrid-cell": {
                    textOverflow: "clip",
                    whiteSpace: "break-spaces !important",
                  },
                  "& .MuiTablePagination-selectLabel": {
                    [theme.breakpoints.down(600)]: {
                      display: "block",
                    },
                  },
                  "& .MuiTablePagination-select": {
                    [theme.breakpoints.down(600)]: {
                      marginRight: "10px",
                      marginLeft: "2px",
                    },
                  },
                  "& .MuiDataGrid-row": {
                    // marginTop: "5px",
                    // marginBottom: "5px",
                  },
                  "& .MuiTablePagination-actions": {
                    [theme.breakpoints.down(600)]: {
                      marginLeft: "5px",
                    },
                  },
                };
              }}
              slots={{
                toolbar: GridToolbar,
              }}
              slotProps={{
                columnsManagement: {
                  disableColumnFilter: true,
                  disableShowHideToggle: true,
                  disableResetButton: true,
                },
              }}
              // getRowId={assetsList.assetId}
              paginationModel={paginationModel}
              rowCount={rowCount}
              paginationMode="server"
              onPaginationModelChange={handlePaginationModelChange}
              pageSizeOptions={[1, 2, 5, 10, 20, 50, 100]}
              // components={{ LoadingOverlay: Backdrop }}
              hideFooterSelectedRowCount={true}
              // rows={filteredRows.length !== 0 ? filteredRows : assetsList}
              rows={assetsList}
              columns={tableHeader}
              getRowId={(row) => row.assetId}
            />
          </Box>
        </Grid>
        {advanceSearchModalOpen && (
          <AdvanceSearchModal
            open={advanceSearchModalOpen}
            openHandler={advanceSearchModalHandler}
            formInitialValues={formInitialValues}
            submitClickHandler={submitClickHandler}
            handleFilterReset={handleFilterReset}
            setFiltersApplied={setFiltersApplied}
          />
        )}
        {addAssetModalOpen && (
          <AddAssetModal
            open={addAssetModalOpen}
            openHandler={addAssetModalHandler}
            rowToEdit={rowToEdit}
            submitClickHandler={submitAddAssetForm}
            //  handleFilterReset={handleFilterReset}
            //  setFiltersApplied={setFiltersApplied}
          />
        )}

        <Dialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <>Delete selected Asset?</>
            <CloseIcon
              onClick={() => setDeleteModalOpen(false)}
              color="primary"
              sx={{ cursor: "pointer" }}
            />
          </DialogTitle>

          <DialogContent>
            <Typography>
              Are you sure you want to delete {rowToDelete?.assetName}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Grid justifyContent={"end"}>
              <Button
                color="error"
                variant="contained"
                onClick={(row) => handleDelete(rowToDelete)}
                sx={{ mr: 2 }}
              >
                Delete
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setDeleteModalOpen(false)}
              >
                close
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>

        {/* Successful/Failed  API's snackbar */}
        {
          <SnackbarComponent
            message={snackbarOpen?.message}
            isOpen={snackbarOpen?.open}
            purpose={snackbarOpen?.severity}
            handleClick={handleClick}
          />
        }
      </Grid>
    </Card>
  );
};

export default Assets;
