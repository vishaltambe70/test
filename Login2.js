import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authenticateOtp,
  clearError,
  resendOtp,
  sendOtp,
  setError,
} from "../../features/auth/authSlice";
import Colors from "../../utility/Colors";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [error, dispatch]);

  const startOtpTimer = () => {
    let countdown = 120;
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
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      dispatch(setError({ message: "Invalid Email Id" }));
      return;
    }
    const result = await dispatch(sendOtp(email));
    if (!result.error) {
      setShowOTP(true);
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
      navigate("/dashboard");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0c0c0c",
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%" }}>
        {/* Logo Image */}
        <img
          src="/assets/feast-logo.png" // Make sure to place the image in the public/assets folder
          alt="Feast Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <Typography
          variant="h4"
          sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
        >
          Digital TrailBlazers Contest
        </Typography>
        <Card sx={{ backgroundColor: "#1c1c1e", padding: 4, borderRadius: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
            >
              Login
            </Typography>

            {!showOTP ? (
              <>
                <TextField
                  fullWidth
                  label="Email Id"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    input: { color: "#fff" },
                    label: { color: "#aaa" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#444" },
                      "&:hover fieldset": { borderColor: "#666" },
                      "&.Mui-focused fieldset": { borderColor: "#fff" },
                    },
                    mb: 2,
                  }}
                />
                <Button
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#ff9800",
                    color: "#000",
                    fontWeight: "bold",
                    padding: "12px",
                    borderRadius: "30px",
                    "&:hover": { backgroundColor: "#ffa726" },
                  }}
                  onClick={onSendOTPClickHandler}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Send OTP"}
                  <ArrowForwardIcon sx={{ ml: 1 }} />
                </Button>
              </>
            ) : (
              <>
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
                        width: "50px",
                        height: "50px",
                        textAlign: "center",
                        fontSize: "24px",
                        borderRadius: "8px",
                        border: "2px solid #ff9800",
                        backgroundColor: "#222",
                        color: "#fff",
                        margin: "0 5px",
                      }}
                    />
                  )}
                  shouldAutoFocus
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button
                    onClick={onSendOTPClickHandler}
                    disabled={otpTimer > 0 || loading}
                    sx={{ color: "#ff9800", fontSize: "14px", fontWeight: "bold" }}
                  >
                    Resend OTP {otpTimer > 0 && `(${otpTimer}s)`}
                  </Button>
                  <Button
                    onClick={() => setShowOTP(false)}
                    sx={{ color: "#ff9800", fontSize: "14px", fontWeight: "bold" }}
                  >
                    Change Email
                  </Button>
                </Box>
                <Button
                  fullWidth
                  sx={{
                    mt: 3,
                    backgroundColor: "#ff9800",
                    color: "#000",
                    fontWeight: "bold",
                    padding: "12px",
                    borderRadius: "30px",
                    "&:hover": { backgroundColor: "#ffa726" },
                  }}
                  onClick={onSubmitClickHandler}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
