import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import OtpInput from "react-otp-input";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utility/Colors";
import { getSession, setLoginDetails } from "../../utility/SessionManager";
import { background_orange_gradient } from "../../assets/jss/material";
import {
  authenticateOtp,
  clearError,
  resendOtp,
  sendOtp,
  setError,
} from "../../features/auth/authSlice";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import constants from "../../common/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, authToken } = useSelector((state) => state.auth);
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpValidity, setOtpValidity] = useState(120);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearError()), 5000); // Clear error after 3 seconds
    }
  }, [error, dispatch]);
  useEffect(() => {
    if (getSession(window, constants.SS_KEY_GROUP_ACCESS_TOKEN)) {
      navigate(constants.PATH_DASHBOARD);
    }
  }, [navigate]);

  const startOtpTimer = () => {
    let countdown = otpValidity;
    const timer = setInterval(() => {
      if (countdown > 0) {
        countdown -= 1;
        setOtpTimer(countdown);
      } else {
        clearInterval(timer);
        setOtpTimer(0);
      }
    }, 1000);
  };

  const onSendOTPClickHandler = async () => {
    if (!email) {
      dispatch(clearError());
      return;
    }
    var data =
      "^(?<!..)[a-zA-Z0-9_.+-]*[a-zA-Z0-9]+@[a-zA-Z0-9-]*[a-zA-Z]+.[a-zA-Z0-9-.]*[a-zA-Z]{2}$";
    var emailidvalid = email.match(data) && email?.split("@").length === 2;
    if (!emailidvalid) {
      dispatch(setError({ message: "Invalid Email Id" }));
      return;
    }
    const result = await dispatch(sendOtp(email));
    setOtpValidity(120);
    if (!result.error) {
      setShowOTP(true);
      startOtpTimer();
    }
  };

  const onResendOTPClickHandler = async () => {
    await dispatch(resendOtp(email));
    if (!error) {
      startOtpTimer();
    }
  };

  const onSubmitClickHandler = async () => {
    if (OTP === "") {
      dispatch(clearError());
      return;
    }
    const resp = await dispatch(authenticateOtp({ emailId: email, otp: OTP }));
    if (!resp?.payload?.error) {
      setOtpValidity(0);
      // setShowLoader(false);
      setLoginDetails(resp.payload.response);
      navigate(constants.PATH_DASHBOARD);

      // window.location.reload();
    }
  };

  const onTextChange = (e) => {
    setEmail(e.target.value);
    dispatch(clearError());
  };

  const changeEmailId = () => {
    setOtpValidity(0);
    setShowOTP(false);
  };

  return (
    <Container maxWidth="sm" sx={{ placeItems: "center" }}>
      <Box sx={{ pt: 16, maxWidth: "500px", minWidth: "430px" }}>
        <Card sx={{ p: 3, pb: 1 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold" }} align="center">
              Login with Email Id
            </Typography>
            {!showOTP && (
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  sx={{ width: "340px" }}
                  label="Email Id"
                  value={email}
                  onChange={onTextChange}
                  error={!!error}
                  helperText={error}
                />
              </Box>
            )}
            {!showOTP && (
              <Button
                sx={{
                  mt: 2,
                  ...background_orange_gradient,
                  height: 40,
                  borderRadius: 20,
                  color: Colors.WHITE,
                  padding: "16px",
                }}
                onClick={onSendOTPClickHandler}
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send OTP <ArrowForwardIcon />
                  </>
                )}
              </Button>
            )}
            {showOTP && (
              <Box sx={{ marginTop: 2 }}>
                <OtpInput
                  value={OTP}
                  onChange={setOTP}
                  numInputs={4}
                  renderSeparator={<span>&nbsp;</span>}
                  containerStyle={{ justifyContent: "center" }}
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{
                        width: "20px",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    />
                  )}
                  shouldAutoFocus
                />
                {error && <Typography color="error">{error}</Typography>}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    onClick={onResendOTPClickHandler}
                    disabled={otpTimer > 0 || loading}
                    style={{
                      color: "blue",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Resend OTP
                  </Button>
                  {otpTimer > 0 && (
                    <Typography sx={{ padding: "15px" }}>
                      {moment.utc(otpTimer * 1000).format("mm:ss")}
                    </Typography>
                  )}
                  <Button
                    onClick={changeEmailId}
                    style={{
                      padding: "15px",
                      color: "blue",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Change Email Id
                  </Button>
                </Box>
                <Button
                  fullWidth
                  style={{
                    marginTop: "8px",
                    ...background_orange_gradient,
                    height: 40,
                    borderRadius: 20,
                    color: Colors.WHITE,
                    padding: "16px",
                  }}
                  onClick={onSubmitClickHandler}
                  disabled={loading}
                >
                  {true ? (
                    <>
                      {loading && (
                        <CircularProgress
                          sx={{
                            width: "20px !important",
                            height: "20px !important",
                            p: 1,
                          }}
                        />
                      )}
                      Submit
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
