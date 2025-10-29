import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import constant from "../../../utility/constant.js";
import { HTTPRequest } from "../../../utility/lib.js";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import UIElement from "../../../utility/UIElement.js";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import AddIcon from "@mui/icons-material/Add";

import FilterListIcon from "@mui/icons-material/FilterList";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  getPolicySession,
  getRefreshTokenExpiry,
  getAccessToken,
  getAccessTokenExpiry,
  getUserDetailsCookies,
  getMobileNumber,
  setSession,
  getSession,
} from "../../../utility/SessionManager.js";
import {
  Grid,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Typography,
  Toolbar,
  // MenuIcon,
  AppBar,
  Button,
  Container,
  Box,
  ClickAwayListener,
  MenuList,
  ButtonGroup,
  Popper,
  Grow,
  Tooltip,
  getDrawerUtilityClass,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  background_gradient,
  background_orange_gradient,
  numberCard,
} from "../../../assets/jss/material.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { LoaderComponent } from "../../../component/Loaders/LoaderComponent.js";
import Colors from "../../../utility/Colors.js";
import { useHistory } from "react-router-dom";
import FormGenerationModal from "../../../component/Modals/FormGenerationModal.js";
import { useCookies } from "react-cookie";
import { ARRAY_GROUP_SESSIONS } from "../../../utility/SessionConstant.js";
import Methods from "../../../utility/Methods.js";
import Snackbar from "../../../component/General/snackbar/index.js";

import DeleteProposalModal from "../../../component/Modals/DeleteProposalModal.js";
import FileSaver from "file-saver";
import getDateFormat from "../../../utility/Methods.js";
import AdvanceSearchModal from "../../../component/Modals/advanceSearchModalForClients.js";
import RenewalModal from "../../../component/Modals/renewalModalForClients.js";
import ArchiveIcon from "@mui/icons-material/Archive";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import RemarksProposalModal from "../../../component/Modals/RemarksProposalModal.js";
import AssistantDirectionRoundedIcon from "@mui/icons-material/AssistantDirectionRounded";
import CloseIcon from "@mui/icons-material/Close";
import EditFormModal from "../../../component/Modals/EditFormModal.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  MESSAGE_DOCUMENT_DOWNLOAD,
  MESSAGE_SOME_ERROR,
} from "../../../utility/Message.js";
import useRenewToken from "../../../utility/useRenewToken.js";
import { HeaderComponent } from "../../../component/Header/HeaderComponent.js";
import FooterComponent from "../../../component/General/FooterComponent.js";
import { ArrowBack } from "@mui/icons-material";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";
const axios = require("axios");

const StyledTableCell = styled(TableCell)(({ theme, minWidth }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(to top, #0184c9 , #004779)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  minWidth: minWidth,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const fileDownload = require("js-file-download");
export function CisDashboard() {
  const [userType, setUserType] = useState(constant.SALES);
  const [showLoader, setShowLoader] = useState(false);
  const clientEmail = getMobileNumber(window);

  const [advanceSearchModalOpen, setAdvanceSearchModalOpen] = useState(false);
  const [renewalModalOpen, setRenewalModalOpen] = useState(false);

  // <-- Updated initial values: added new filter fields
  const [formInitialValues, setFormInitialValues] = useState({
    clientName: "",
    mobileNumber: "",
    clientId: "",
    policyNumber: "",
    // New filters (policyNumber duplicates existing, but kept for clarity — ensure modal sends correct key)
    quotationNumber: "",
    policyStatus: "",
    productName: "",
    planCode: "",
    tpaName: "",
  });

  const [renewalValues, setRenewalValues] = useState({
    fromDate: "",
    toDate: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    isOpen: "",
    type: "",
  });
  const history = useHistory();
  const encData2 = getSession(window, constant.SS_KEY_GROUP_USER_ROLE);
  let roleType = Methods.decrypt(encData2)?.type || "";

  const getDateFormat = (testDate) => {
    let date = new Date(testDate);
    // Check if the input date string is in ISO 8601 format
    if (isNaN(date.getTime()) && testDate.includes("T")) {
      // Parse ISO 8601 format
      date = new Date(testDate);
    }
    // Convert UTC time to IST (UTC +5:30)
    date.setMinutes(date.getMinutes() + 330); // 330 minutes = 5 hours 30 minutes
    var dateStr =
      ("00" + date.getDate()).slice(-2) +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    return dateStr;
  };

  const getIndianDateFormat = (testDate) => {
    let date = new Date(testDate);
    // Check if the input date string is in ISO 8601 format
    if (isNaN(date.getTime()) && testDate.includes("T")) {
      // Parse ISO 8601 format
      date = new Date(testDate);
    }
    // Convert UTC time to IST (UTC +5:30)
    // date.setMinutes(date.getMinutes() + 330); // 330 minutes = 5 hours 30 minutes
    var dateStr =
      ("00" + date.getDate()).slice(-2) +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    return dateStr;
  };

  const [clientList, setClientList] = useState(null);
  const [countData, setCountData] = useState(null);
  const location = useLocation();
  const [rowsCount, setRowsCount] = useState(0);
  const [page, setPage] = React.useState(location?.state?.page || 0);
  const [rowsPerPage, setRowsPerPage] = React.useState(
    location?.state?.rowsPerPage || 5
  );
  const [isCommissionRequest, setIsCommissionRequest] = useState(false);
  const checkTokenExpiry = useRenewToken();
  const accessToken = getAccessToken(window);

  const memoizedPolicyNumbers = useMemo(() => {
    if (clientList) return clientList?.map((item) => item.policyNumber);
  }, [clientList]);
  useEffect(() => {
    let token = getAccessToken(window);
    if (token === null) {
      history.replace(constant.PATH_GROUP_EE_LOGIN);
      return;
    }

    // getClientList();
  }, []);

  const getClientList = async () => {
    setShowLoader(true);
    // to verify token expiry
    await checkTokenExpiry();
    try {
      // Build request object with pagination AND optional filters.
      // NOTE: adjust keys if backend expects snake_case (e.g. policy_number).
      const reqObj = {
        paginationRequest: {
          page: page,
          size: rowsPerPage,
        },
        // only include fields if they are non-empty
        ...(formInitialValues?.clientName && {
          clientName: formInitialValues.clientName,
        }),
        ...(formInitialValues?.mobileNumber && {
          mobileNumber: formInitialValues.mobileNumber,
        }),
        ...(formInitialValues?.clientId && {
          clientId: formInitialValues.clientId,
        }),
        ...(formInitialValues?.policyNumber && {
          policyNumber: formInitialValues.policyNumber,
        }),
        ...(formInitialValues?.quotationNumber && {
          quotationNumber: formInitialValues.quotationNumber,
        }),
        ...(formInitialValues?.policyStatus && {
          policyStatus: formInitialValues.policyStatus,
        }),
        ...(formInitialValues?.productName && {
          productName: formInitialValues.productName,
        }),
        ...(formInitialValues?.planCode && { planCode: formInitialValues.planCode }),
        ...(formInitialValues?.tpaName && { tpaName: formInitialValues.tpaName }),
      };

      const resp = await HTTPRequest.POST_GROUP(
        "group",
        reqObj,
        // constant.API_GROUP_LIST_ALL_CLIENTS
        constant.API_GROUP_LIST_ALL_CIS
      );
      if (resp) {
        setShowLoader(false);
        // keep existing behavior — adapt when backend starts returning these fields
        // setCountData(resp.response);
        // setRowsCount(resp.response?.totalElements);
        // setClientList(resp.response?.clients);
        // setSession(
        //   window,
        //   constant.SS_KEY_GROUP_CLIENT_LIST,
        //   Methods.encrypt(resp.response.clients)
        // );

        //   const data = {
        //     mobile: resp.response?.clients[0]?.mobile1,
        //     clientId: resp.response?.clients[0]?.clientId,
        //     policyNumber: resp.response?.clients[0]?.policyNumber,
        //   };
        //   const encryptedLogin = Methods.encrypt(data);
        //   setSession(window, constant.SS_KEY_GROUP_LOGIN_DETAILS, encryptedLogin);
        //   setSession(
        //     window,
        //     constant.SS_KEY_GROUP_CLIENT_DETAILS,
        //     Methods.encrypt(resp.response.clients[0])
        //   );
      }
    } catch (error) {
      console.log("error", error);
      setAlert((alert) => ({
        ...alert,
        message: `Failed to load data.${error}`,
        isOpen: true,
        type: "error",
      }));
    }
    setShowLoader(false);
  };
  const submitClickHandler = async (values) => {
    // advanceLeadSearch(values);
    setFormInitialValues(values);
    setPage(0);
    advanceSearchModalHandler();
  };

  const renewalClickHandler = async (values) => {
    // Api call here and download functionality by passing values
    try {
      setShowLoader(true);

      //to verify access token expiry
      await checkTokenExpiry();
      const reqObj = {
        fromDate: values.fromDate,
        toDate: values.toDate,
      };

      const headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${getAccessToken(window)}`,
      };

      const config = {
        url: URL,
        responseType: "arraybuffer",
        headers,
      };
      const mainUrl = process.env.REACT_APP_API_GROUP_UTILITY_URL;
      const fileName = isCommissionRequest
        ? "Commission_Details_Excel.csv"
        : "Renewal_Details_Excel.csv";
      const path = isCommissionRequest
        ? mainUrl + "/admin" + constant.API_GROUP_CLIENTS_COMMISSION_EXCEL
        : mainUrl + "/admin" + constant.API_GROUP_CLIENTS_RENEWAL_EXCEL;
      const resp = await axios.post(path, reqObj, config);

      if (resp) {
        const blob = new Blob([resp.data]);
        fileDownload(blob, fileName);
        setAlert({
          message: MESSAGE_DOCUMENT_DOWNLOAD,
          isOpen: true,
          type: constant.NOTIFICATION_SUCCESS,
        });
        setShowLoader(false);
        // downloadFile(resp, ".pdf");
      }
    } catch (error) {
      console.log("error", error?.response);
      let text = "";
      if (error?.response?.data)
        text = await new TextDecoder("utf-8").decode(error?.response?.data);
      const jsonResp = text ? await JSON?.parse(text) : "";
      setAlert((alert) => ({
        ...alert,
        message: jsonResp?.error?.errorMessage || MESSAGE_SOME_ERROR,
        isOpen: true,
        type: constant.NOTIFICATION_ERROR,
      }));
      setShowLoader(false);
    }
    renewalModalHandler();
  };

  const handleFilterReset = () => {
    setFormInitialValues({
      ...formInitialValues,
      clientName: "",
      mobileNumber: "",
      clientId: "",
      policyNumber: "",
      quotationNumber: "",
      policyStatus: "",
      productName: "",
      planCode: "",
      tpaName: "",
    });
    setPage(0);
    advanceSearchModalHandler();
  };

  const columns = [
    {
      id: "clientId",
      label: "Actions",
      minWidth: 80,
      align: "center",
      hide: false,
    },
    {
      id: "clientId",
      label: "Client ID",
      minWidth: 100,
      align: "center",
      hide: false,
    },
    {
      id: "clientName",
      label: "Client Name",
      minWidth: 300,
      align: "center",
      hide: false,
    },
    {
      id: "policyNumber",
      label: "Policy Number",
      minWidth: 170,
      align: "center",
      hide: false,
    },
    {
      id: "pinCode",
      label: "Pincode",
      minWidth: 170,
      align: "center",
      hide: false,
    },
  ];

  const selectedClient = (client_detail) => {
    const data = {
      mobile: client_detail?.mobile1,
      clientId: client_detail?.clientId,
      policyNumber: client_detail?.policyNumber,
    };
    const encryptedLogin = Methods.encrypt(data);
    setSession(window, constant.SS_KEY_GROUP_LOGIN_DETAILS, encryptedLogin);
    setSession(
      window,
      constant.SS_KEY_GROUP_CLIENT_DETAILS,
      Methods.encrypt(client_detail)
    );
  };

  const ActionHandler = (rowData) => {
    if (rowData.clientId !== null) {
      selectedClient(rowData);
      history.push({
        pathname: constant.PATH_GROUP_OPS_POLICIES,
        state: {
          client_id: rowData.clientId,
          page: page,
          rowsPerPage: rowsPerPage,
        },
      });
    }
  };

  const downloadExcelFile = async () => {
    //to check token Expiry
    await checkTokenExpiry();
    try {
      setShowLoader(true);

      const reqObj = {
        emailId: clientEmail,
      };

      const headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${getAccessToken(window)}`,
      };

      const config = {
        url: URL,
        responseType: "arraybuffer",
        headers,
      };
      const mainUrl = process.env.REACT_APP_API_GROUP_UTILITY_URL;
      const path = mainUrl + constant.API_GROUP_DOWNLOAD_CLIENT_EXCEL;

      const resp = await axios.post(path, reqObj, config);

      if (resp) {
        const blob = new Blob([resp.data]);
        fileDownload(blob, "client-list.xlsx");
        setAlert({
          message: MESSAGE_DOCUMENT_DOWNLOAD,
          isOpen: true,
          type: constant.NOTIFICATION_SUCCESS,
        });
        setShowLoader(false);
        // downloadFile(resp, ".pdf");
      }
    } catch (error) {
      console.log("error", error);
      setAlert((alert) => ({
        ...alert,
        message:
          error?.response?.data?.error.errorMessage || MESSAGE_SOME_ERROR,
        isOpen: true,
        type: "error",
      }));
      setShowLoader(false);
    }
  };

  useEffect(() => {
    if (!clientEmail) {
      history.replace(constant.PATH_GROUP_EE_LOGIN);
      return;
    }
    // getClientList();
  }, []);

  useEffect(() => {
    getClientList();
  }, [page, rowsPerPage, formInitialValues]);

  const handleKycFileDownload = async (proposerFormNo, fileName) => {
    if (fileName) {
      try {
        setShowLoader(true);
        //to verify access token expiry
        await checkTokenExpiry();
        const reqObj = {
          proposalFormNumber: proposerFormNo,
          filename: fileName,
        };
        const updateDetailsData = new FormData();
        updateDetailsData.append("proposalFormNo", proposerFormNo);
        updateDetailsData.append("filename", fileName);
        updateDetailsData.append("userType", userType);

        const headers = {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Authorization: `Bearer ${getAccessToken(window)}`,
        };

        const config = {
          url: URL,
          responseType: "arraybuffer",
          headers,
        };
        const mainUrl = process.env.REACT_APP_API_GROUP_UTILITY_URL;
        const path = mainUrl + constant.API_GROUP_DOWNLOAD_KYC_FORM;

        const resp = await axios.post(path, updateDetailsData, config);

        if (resp) {
          const blob = new Blob([resp.data]);
          fileDownload(blob, `${fileName}`);
          setShowLoader(false);
        }
      } catch (error) {
        console.log("error", error);
        setShowLoader(false);
      }
    }
  };

  const handleChangeShareReshareTime = async (proposalFormNo, shareType) => {
    try {
      setShowLoader(true);

      const reqObj = {
        proposalFormNumber: proposalFormNo,
        clientId: "",
        otpCaptured: "",
        otpVerifiedTimestamp: "",
        otpReVerifiedTimestamp: "",
        firstLinkShareTimestamp: shareType === "SHARE" ? new Date() : "",
        secondLinkShareTimestamp: shareType === "RESHARE" ? new Date() : "",

        updatedBy: clientEmail,
      };

      const resp = await HTTPRequest.POST_GROUP(
        "group",
        reqObj,
        constant.API_GROUP_UPDATE_SHARE_TIME
      );
      if (resp) {
        setShowLoader(false);
        getClientList();
      }
    } catch (error) {
      console.log("error", error);
    }
    setShowLoader(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const advanceSearchModalHandler = () => {
    setAdvanceSearchModalOpen(false);
  };

  const renewalModalHandler = () => {
    setRenewalModalOpen(false);
  };
  const handleSnackClose = () => {
    setAlert({
      message: "",
      isOpen: "",
      type: "",
    });
  };

  return (
    <div>
      <HeaderComponent />
      {showLoader && <LoaderComponent />}
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <Box
            sx={[
              {
                paddingY: 2,
                paddingX: 1,
                justifyContent: "space-between",
                height: "200px",
                paddingTop: "130px",
                pb: "100px",
              },
              background_gradient,
            ]}
          >
            <Tooltip title="Back">
              <Button
                sx={{ mt: 2 }}
                onClick={() =>
                  history.push({
                    pathname: constant.PATH_GROUP_OPS_DASHBOARD,
                    // state: { mobile: mobile, clientId: selectedClient },
                  })
                }
              >
                <ArrowBack sx={{ color: "#fff" }} fontSize="large" />
              </Button>
            </Tooltip>
            <Container>
              <Typography
                variant="h5"
                //noWrap
                sx={{
                  alignSelf: "center",
                  display: window.innerWidth > 700 ? "flex" : "",
                  justifyContent: "space-between",
                }}
                color={Colors.WHITE}
              >
                {/* previously written code just added a div for consistent UI */}
                <div className={"cls_mgqixnl0_328a7e"}>
                  <Typography
                    variant="h5"
                    //noWrap
                    sx={{
                      alignSelf: "center",
                      display: window.innerWidth > 700 ? "flex" : "",
                      justifyContent: "space-between",
                    }}
                    color={Colors.WHITE}
                  >
                    <div className={"cls_mgqixnl0_cc780d"}>
                      <span>CIS DETAILS</span>
                    </div>
                  </Typography>
                </div>

                <div>
                  <Tooltip title="Advance Search">
                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        mr: "20px",
                        mb: "20px",
                        cursor: "pointer",
                        background: "linear-gradient(to top, #f26221, #f5851f)",
                      }}
                      onClick={() => {
                        setAdvanceSearchModalOpen(true);
                      }}
                    >
                      <FilterListIcon />
                    </Button>
                  </Tooltip>
                </div>
              </Typography>
            </Container>
          </Box>
        </Card>
      </Grid>
      <Container maxWidth={"xl"}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            pl: 0,
            pr: 0,
            pb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-150px",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((col) => {
                    return (
                      <>
                        {col?.hide === true ? null : (
                          <StyledTableCell
                            key={col.id}
                            align={col.align}
                            minWidth={col.minWidth}
                          >
                            {col.label}
                          </StyledTableCell>
                        )}
                      </>
                    );
                  })}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {clientList &&
                  clientList.map((row) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column?.hide) {
                            return null;
                          } else {
                            return (
                              <>
                                {column.label === "Actions" ? (
                                  <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {" "}
                                    {/* view icon */}
                                    <Tooltip title="View Details">
                                      <IconButton
                                        edge="start"
                                        aria-label="menu"
                                        onClick={(event) => {
                                          // setViewData(row);
                                          ActionHandler(row);
                                        }}
                                        className={"cls_mgqixnl0_e60c2f"}
                                      >
                                        <VisibilityIcon color="primary"></VisibilityIcon>
                                      </IconButton>
                                    </Tooltip>
                                  </StyledTableCell>
                                ) : (
                                  <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.indianTimeFormat && value ? (
                                      getIndianDateFormat(value)
                                    ) : column.format && value ? (
                                      getDateFormat(value)
                                    ) : column.formatIcon ? (
                                      <>
                                        {value && value === constant.IGNORE ? (
                                          <>
                                            <CancelIcon
                                              sx={{ ml: 1, mr: 1 }}
                                              color="error"
                                            />{" "}
                                            {value}
                                          </>
                                        ) : (
                                          "N/A"
                                        )}
                                      </>
                                    ) : (
                                      value
                                    )}
                                  </StyledTableCell>
                                )}
                              </>
                            );
                          }
                        })}
                      </StyledTableRow>
                    );
                  })}
                {clientList === null || clientList.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell
                      align={"center"}
                      //entering static no as we want to show error at center of the table
                      colSpan={columns?.length}
                      // colSpan={ARRAY_HEADERS.length}
                    >
                      No records found
                    </StyledTableCell>
                  </StyledTableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rowsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Snackbar
            message={alert?.message}
            isOpen={alert?.isOpen}
            purpose={alert?.type}
            handleSnackClose={handleSnackClose}
          />
        </Paper>
        {advanceSearchModalOpen && (
          <AdvanceSearchModal
            open={advanceSearchModalOpen}
            openHandler={advanceSearchModalHandler}
            formInitialValues={formInitialValues}
            submitClickHandler={submitClickHandler}
            handleFilterReset={handleFilterReset}
          />
        )}
      </Container>
      {<FooterComponent isExpandable={true} />}
    </div>
  );
}
