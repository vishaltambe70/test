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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  alignItems: "center",
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
  const dispatch = useDispatch();

  const [assetList, setAssetList] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({
    asset_name: "",
    asset_owner: "",
    asset_in_use: "",
    fe: "",
    fe_language_version: "",
    be: "",
    be_language_version: "",
    database_used: "",
    db_version: "",
    db_ip_address: "",
    tables_name: "",
    code_repo_url: "",
  });

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });

  const allAssets = useSelector((state) => state.request.request);
  const [rowCount, setRowCount] = useState(0);

  const {
    status: allAssetsStatus,
    data: allAssetsData,
    error: allAssetsError,
  } = allAssets;

  const dispatchAPICall = (data) => {
    updateTokenIfExpired(window, dispatch);
    dispatch(assetsThunk(data));
  };

  useEffect(() => {
    dispatchAPICall({
      ...formInitialValues,
      page: 0,
      size: paginationModel.pageSize,
    });
  }, [formInitialValues]);

  useEffect(() => {
    validateAPI(
      allAssetsError?.status,
      allAssetsError?.error?.errorCode,
      dispatch,
      navigate
    );
    if (allAssetsStatus === "succeeded") {
      const listData = allAssetsData?.assetList?.content;
      const listCount = allAssetsData?.assetList?.totalElements;
      setAssetList(listData);
      setRowCount(listCount);
    }
  }, [allAssetsStatus]);

  const tableHeader = [
    { field: "asset_name", headerName: "Asset Name", width: 200, type: "string" },
    { field: "asset_owner", headerName: "Asset Owner", width: 200, type: "string" },
    { field: "asset_in_use", headerName: "Asset In Use", width: 150, type: "string" },
    { field: "fe", headerName: "FE", width: 150, type: "string" },
    { field: "fe_language_version", headerName: "FE Language Version", width: 180, type: "string" },
    { field: "be", headerName: "BE", width: 150, type: "string" },
    { field: "be_language_version", headerName: "BE Language Version", width: 180, type: "string" },
    { field: "database_used", headerName: "Database Used", width: 180, type: "string" },
    { field: "db_version", headerName: "DB Version", width: 150, type: "string" },
    { field: "db_ip_address", headerName: "DB IP Address", width: 180, type: "string" },
    { field: "tables_name", headerName: "Tables Name", width: 200, type: "string" },
    { field: "code_repo_url", headerName: "Code Repo URL", width: 250, type: "string" },
  ];

  const handlePaginationModelChange = (newPaginationModel) => {
    const reqBody = {
      ...formInitialValues,
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
    <Card sx={{ flex: 1, borderRadius: "10px", width: "100%", display: "flex" }}>
      <Grid container md={12} xs={12}>
        <Grid item xs={12} md={12} sx={{ borderRadius: "10px", justifyContent: "center", padding: 3 }}>
          <Box sx={{ width: "100%" }}>
            <Grid container sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }} spacing={2}>
              <Grid item>
                <Typography variant="h3" sx={{ mb: 2 }}>Assets</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ mb: "20px", cursor: "pointer", mr: 2, background: "rgb(245, 132, 31)" }}
                  onClick={() => setAdvanceSearchModalOpen(true)}
                  startIcon={<FilterListIcon />}
                >
                  Advanced Filters
                </Button>
                <Button
                  variant="contained"
                  sx={{ mb: "20px", cursor: "pointer", background: "rgb(245, 132, 31)" }}
                  onClick={() => setAddAssetModalOpen(true)}
                  startIcon={<AddIcon />}
                >
                  Add Asset
                </Button>
              </Grid>
            </Grid>
            <DataGrid
              sx={(theme) => ({
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
              })}
              slots={{ toolbar: GridToolbar }}
              paginationModel={paginationModel}
              rowCount={rowCount}
              paginationMode="server"
              onPaginationModelChange={handlePaginationModelChange}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              rows={assetList}
              columns={tableHeader}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Assets;
