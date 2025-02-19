import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  Badge,
  // Table,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridFooter,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import AnimatedNumber from "animated-number-react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { assetsThunk } from "./reducer/thunk";
import AdvanceSearchModal from "./advanceSearchModal";
import { updateTokenIfExpired } from "../../utility/SessionManager";
import { validateAPI } from "../../utility/Methods";
import AddAssetModal from "./addAssetModal";

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

const Assests = () => {
  const navigate = useNavigate();

  const [requestList, setRequestsList] = useState([]);
  const [showclaimType, setShowClaimType] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const [openCount, setOpenCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [advanceSearchModalOpen, setAdvanceSearchModalOpen] = useState(false);
  const [addAssetModalOpen, setAddAssetModalOpen] = useState(false);

  const [formInitialValues, setFormInitialValues] = useState({
    trace_id: "",
    document_coming_via: "",
    status: "",
    tenant_id: "",
    policy_number: "",
    claim_number: "",
    claim_inward_number: "",
    tenant_request_id: "",
    product_endpoint: "",
    no_of_documents: "",
    vendor_id: "",
    request_type: "",
  });
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 20,
    page: 0,
  });

  const allRequests = useSelector((state) => state.request.request);

  const [rowCount, setRowCount] = useState(0);

  const {
    status: allRequestsStatus,
    data: allRequestsData,
    error: allRequestsError,
  } = allRequests;

  const dispatchAPICall = (data) => {
    updateTokenIfExpired(window, dispatch);
    dispatch(assetsThunk(data));
  };

  useEffect(() => {
    dispatchAPICall({
      trace_id: formInitialValues.trace_id,
      document_coming_via: formInitialValues.document_coming_via,
      status: formInitialValues.status,
      tenant_id: formInitialValues.tenant_id,
      policy_number: formInitialValues.policy_number,
      claim_number: formInitialValues.claim_number,
      claim_inward_number: formInitialValues.claim_inward_number,
      tenant_request_id: formInitialValues.tenant_request_id,
      product_endpoint: formInitialValues.product_endpoint,
      no_of_documents: formInitialValues.no_of_documents,
      vendor_id: formInitialValues.vendor_id,
      request_type: formInitialValues.request_type,
      page: 0,
      size: paginationModel.pageSize,
    });
  }, [formInitialValues]);

  useEffect(() => {
    //to be added in all API calls if token expired case
    validateAPI(
      allRequestsError?.status,
      allRequestsError?.error?.errorCode,
      dispatch,
      navigate
    );
    if (allRequestsStatus === "succeeded") {
      const listData = allRequestsData?.requestList?.content;
      const listCount = allRequestsData?.requestList?.totalElements;
      setOpenCount(allRequestsData?.newCount);
      setClosedCount(allRequestsData?.closedCount);
      setInProgressCount(allRequestsData?.inProgressCount);
      setTotalCount(allRequestsData?.totalCount);
      setRequestsList(listData);
      setRowCount(listCount);
    }
  }, [allRequestsStatus]);

  const advanceSearchModalHandler = () => {
    setAdvanceSearchModalOpen(false);
  };

  const addAssetModalHandler = () => {
    setAddAssetModalOpen(false);
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
    // setFormInitialValues(values);
    // setPaginationModel({
    //   page: 0,
    //   pageSize: paginationModel.pageSize,
    // });
    addAssetModalHandler();
  };

  const handleFilterReset = () => {
    setFormInitialValues({
      ...formInitialValues,
      trace_id: "",
      document_coming_via: "",
      status: "",
      tenant_id: "",
      policy_number: "",
      claim_number: "",
      claim_inward_number: "",
      tenant_request_id: "",
      product_endpoint: "",
      no_of_documents: "",
      vendor_id: "",
      request_type: "",
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
      field: "trace_id",
      headerName: "Trace Id",
      width: "300",
      disableColumnMenu: true,
      sortable: true,
      align: "left",
      headerAlign: "left",
      type: "string",
    },
    {
      field: "document_coming_via",
      headerName: "Doc Via",
      type: "string",
      width: "150",
      disableColumnMenu: true,
      sortable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "status",
      headerName: "Status",
      width: "150",
      disableColumnMenu: true,
      sortable: true,
      align: "left",
      headerAlign: "left",
      type: "string",
    },
    {
      field: "tenant_id",
      headerName: "Tenant Id",
      width: "150",
      disableColumnMenu: true,
      sortable: true,
      align: "left",
      headerAlign: "left",
      type: "string",
    },
    {
      field: "policyNumber",
      headerName: "Policy number",
      width: "150",
      disableColumnMenu: true,
      sortable: true,
      align: "left",
      headerAlign: "left",
      type: "string",
    },
    {
      field: "claim_number",
      headerName: "Claim Number",
      width: "150",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      headerAlign: "left",
      type: "string",
    },
    {
      field: "claim_inward_number",
      headerName: "Claim Inward Number",
      width: "200",
      disableColumnMenu: true,
      sortable: true,
      align: "left",
      headerAlign: "left",
      type: "string",
    },
    {
      field: "tenant_request_id",
      headerName: "Request Id",
      width: "150",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      headerAlign: "left",
      type: "string",
    },
    {
      field: "product_endpoint",
      headerName: "Product Endpoint",
      width: "150",
      disableColumnMenu: true,
      sortable: true,
      align: "left",
      headerAlign: "left",
      type: "string",
    },

    {
      field: "no_of_documents",
      headerName: "No. of Docs",
      width: "150",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      headerAlign: "left",
      type: "string",
    },
    {
      field: "vendor_id",
      headerName: "Vendor Id",
      width: "150",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      headerAlign: "left",
      type: "string",
    },

    {
      field: "request_type",
      headerName: "Request Type",
      width: "150",
      disableColumnMenu: true,
      sortable: false,
      align: "left",
      headerAlign: "left",
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
    setOpenFilter(false);
  };

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const handlePaginationModelChange = (newPaginationModel) => {
    // We have the cursor, we can allow the page transition.

    const reqBody = {
      trace_id: formInitialValues.trace_id,
      document_coming_via: formInitialValues.document_coming_via,
      status: formInitialValues.status,
      tenant_id: formInitialValues.tenant_id,
      policy_number: formInitialValues.policy_number,
      claim_number: formInitialValues.claim_number,
      claim_inward_number: formInitialValues.claim_inward_number,
      tenant_request_id: formInitialValues.tenant_request_id,
      product_endpoint: formInitialValues.product_endpoint,
      no_of_documents: formInitialValues.no_of_documents,
      vendor_id: formInitialValues.vendor_id,
      request_type: formInitialValues.request_type,
      page: newPaginationModel.page,
      size: paginationModel.pageSize,
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
            <Grid
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
            </Grid>
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
              {/* <Grid item>
                <Button
                  variant="contained"
                  sx={{ mb: "20px", cursor: "pointer" }}
                  // onClick={(event) => {
                  //   setShowClaimType(event.currentTarget);
                  // }}
                  startIcon={<AddIcon />}
                >
                  New Request
                </Button>
              </Grid> */}
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
              paginationModel={paginationModel}
              rowCount={rowCount}
              paginationMode="server"
              onPaginationModelChange={handlePaginationModelChange}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              // components={{ LoadingOverlay: Backdrop }}
              hideFooterSelectedRowCount={true}
              // rows={filteredRows.length !== 0 ? filteredRows : requestList}
              rows={requestList}
              columns={tableHeader}
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
            //  formInitialValues={formInitialValues}
            submitClickHandler={submitAddAssetForm}
            //  handleFilterReset={handleFilterReset}
            //  setFiltersApplied={setFiltersApplied}
          />
        )}

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            borderRadius: "10px",
            justifyContent: "center",
            padding: 3,
          }}
        ></Grid>
      </Grid>
    </Card>
  );
};

export default Assests;
