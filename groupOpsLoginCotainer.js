import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import OtpInput from "react-otp-input";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import { LoaderComponent } from "../../../component/Loaders/LoaderComponent";
import { HTTPRequest } from "../../../utility/lib";
import constant from "../../../utility/constant";
import Colors from "../../../utility/Colors";
import { HeaderComponent } from "../../../component/Header/HeaderComponent";
import { background_orange_gradient } from "../../../assets/jss/material";
import { useCookies } from "react-cookie";
import Methods from "../../../utility/Methods";
import { ARRAY_GROUP_SESSIONS } from "../../../utility/SessionConstant";
import Carousel from "react-material-ui-carousel";
import { Divider, Grid } from "@mui/material";
import {
  ArrowForward,
  SettingsSystemDaydreamRounded,
} from "@mui/icons-material";
import Hidden from "@material-ui/core/Hidden";
import { setSession } from "../../../utility/SessionManager";
import SnackbarContent from "../../../component/General/SnackbarContent";
import FooterComponent from "../../../component/General/FooterComponent";
import oktaAuth from "../../../utility/oktaAuth";

const otpValidity = 120;
export function GroupOpsLoginContainer(props) {
  const [cookies, setCookies] = useCookies(ARRAY_GROUP_SESSIONS);
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(null);
  const history = useHistory();

  useEffect(() => {
    document.title = "Group Endorsement Portal";
  }, []);

  const onSubmitClickHandler = async () => {
    try {
      if (OTP === "") {
        setErrorMessage("Please Enter Otp");
        return;
      }
      setShowLoader(true);
      const reqObj = {
        userType: "ADMIN",
        mobileNumber: "",
        emailId: emailId,
        grantType: "otp",
        otp: OTP,
      };

      const resp = await HTTPRequest.POST_GROUP(
        "group",
        reqObj,
        constant.API_GROUP_OPS_LOGIN_VALIDATE_OTP
      );
      if (resp.response !== null) {
        setShowLoader(false);
        setSession(
          window,
          constant.SS_KEY_GROUP_ACCESS_TOKEN,
          resp.response.accessToken
        );
        setSession(
          window,
          constant.SS_KEY_GROUP_ACCESS_TOKEN_EXPIRESBY,
          resp.response.accessTokenExpiresBy
        );
        setSession(
          window,
          constant.SS_KEY_GROUP_REFRESH_TOKEN,
          resp.response.refreshToken
        );
        setSession(
          window,
          constant.SS_KEY_GROUP_REFRESH_TOKEN_EXPIRESBY,
          resp.response.refreshTokenExpiresBy
        );
        setSession(
          window,
          constant.SS_KEY_GROUP_USER_TYPE,
          Methods.encrypt({ type: constant.ADMIN })
        );
        setSession(window, constant.SS_KEY_GROUP_DATA_MOBILE, emailId);

        const roleResp = await HTTPRequest.POST_GROUP(
          "group",
          { emailId: emailId },
          constant.API_GROUP_OPS_ROLE_CHECK
        );
        if (roleResp !== null) {
          setSession(
            window,
            constant.SS_KEY_GROUP_USER_ROLE,
            Methods.encrypt({ type: roleResp.response.role })
          );
        }

        console.log("here in llogin push ");

        history.push({
          pathname: constant.PATH_GROUP_OPS_DASHBOARD,
          state: { username: emailId },
        });
        window.location.reload();
        return;
      } else {
        setErrorMessage(resp.response.errorMessage);
      }
    } catch (error) {
      Methods.logger("onSubmitClickHandler: error ", JSON.stringify(error));
      if (error.response) {
        setShowNotification(
          Methods.getNotificationObj(
            error.response.data.error.errorMessage,
            constant.NOTIFICATION_DANGER
          )
        );
        setErrorMessage(error?.response?.data?.error.errorMessage);
        setOTP("");
      } else {
        alert(constant.ALERT_SOME_ERROR);
      }
    }
    setShowLoader(false);
  };

  const startOtpTimer = () => {
    let countdown = otpValidity;
    let timer = setInterval(() => {
      if (countdown > 0) {
        countdown -= 1;
        setOtpTimer(countdown);
      } else {
        clearInterval(timer);
        setOtpTimer(0);
      }
    }, 1000);
  };

  const onSendOTPClickHandler = async (type) => {
    if (emailId == "") {
      setErrorMessage("Please enter email id");
      return;
    }

    if (type == "resend" && otpTimer.length > 0) {
      return;
    }

    var data =
      "^(?<!..)[a-zA-Z0-9_.+-]*[a-zA-Z0-9]+@[a-zA-Z0-9-]*[a-zA-Z]+.[a-zA-Z0-9-.]*[a-zA-Z]{2}$";
    var claimidvalid = emailId.match(data) && emailId?.split("@").length === 2;
    if (!claimidvalid) {
      setErrorMessage("Invalid Email Id");
      return;
    }

    try {
      setShowLoader(true);
      const reqObj = {
        userType: "ADMIN",
        emailId: emailId,
      };

      const resp = await HTTPRequest.POST_GROUP(
        "group",
        reqObj,
        constant.API_GROUP_OPS_SEND_OTP
      );

      Methods.logger("onSendOTPClickHandler: resp ", JSON.stringify(resp));
      if (resp.response !== null) {
        if (type == "send") {
          setShowOTP(!showOTP);
        }
        startOtpTimer();
        setErrorMessage(null);
      } else {
        setErrorMessage(resp.response.errorMessage);
      }
    } catch (error) {
      if (error.response) {
        setShowNotification(
          Methods.getNotificationObj(
            error.response.data.error.errorMessage,
            constant.NOTIFICATION_DANGER
          )
        );
        setErrorMessage(error.response.data.error.errorMessage);
      } else {
        alert(constant.ALERT_SOME_ERROR);
      }
      Methods.logger("onSendOTPClickHandler Error: ", JSON.stringify(error));
    }
    setShowLoader(false);
  };

  const onLogin = async () => {
    try {
      setShowLoader(true);
      // Set the original URI to dashboard so user goes there after login
      await oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error("Login error:", error);
      setShowLoader(false);
    }
  };

  const onTextChange = (e, type) => {
    const value = e.target.value;
    if (type == "mobile") {
      setEmailId(value);
      setErrorMessage("");
    }
  };

  const changeMobileNumber = () => {
    setShowOTP(!showOTP);
  };

  var items = [
    {
      name: "Random Name #1",
      description: "MCHI Banner!",
      srcSet: `${process.env.REACT_APP_PUBLIC_URL}/Global-cover-Web-banner-810X270_1.jpg`,
      src: `${process.env.REACT_APP_PUBLIC_URL}/Global-cover-Web-banner-810X270_1.jpg`,
      // srcSet: "/endorsement/Global-cover-Web-banner-810X270_1.jpg",
      // src: "/endorsement/Global-cover-Web-banner-810X270_1.jpg",
    },
    // {
    //   name: "Random Name #2",
    //   description: "MCHI Banner2!",
    //   srcSet: "/endorsement/Global-cover-Web-banner-810X270_1.jpg",
    //   src: "A-plan-Web-banner-810X270.jpg",
    // },
  ];

  const onNotificationHandler = () => {
    setShowNotification(null);
  };

  return (
    <>
      {showLoader && <LoaderComponent />}
      <HeaderComponent />
      <Container
        maxWidth={"xl"}
        sx={{
          pl: 0,
          pr: 0,
          height: "150vh",
          marginBottom: "-140px",
          bgcolor: Colors.MCHI_CONTAINER_BACKGROUND,
        }}
      >
        <Container fixed>
          <Hidden mdUp implementation="css">
            <Box style={{ paddingTop: "100px" }}>
              <Card style={{ padding: "27px" }}>
                <CardContent style={{ padding: "30px 40px" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <header>
                      <h3 style={{ marginTop: "0" }}>Login with Email Id</h3>
                    </header>
                    {!showOTP ? (
                      <>
                        <TextField
                          id="outlined-basic"
                          label="Email id"
                          variant="outlined"
                          value={emailId}
                          error={mobileError}
                          helperText={mobileError ? "Invalid email id" : ""}
                          onChange={(e) => onTextChange(e, "mobile")}
                          sx={{ borderRadius: "10px" }}
                          required
                        />
                        {errorMessage != null && (
                          <Typography
                            fontSize={12}
                            align="left"
                            sx={{ color: "red", fontSize: 14 }}
                          >
                            {errorMessage}
                          </Typography>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    {showOTP ? (
                      <div></div>
                    ) : (
                      <>
                        <Button
                          variant="text"
                          type="submit"
                          endIcon={<ArrowForward />}
                          //color="primary"
                          style={{
                            marginTop: "8px",
                            marginBottom: "8px",

                            ...background_orange_gradient,
                            height: 40,
                            borderRadius: 20,
                            color: Colors.WHITE,
                            padding: "16px",
                          }}
                          onClick={() => onSendOTPClickHandler("send")}
                        >
                          Send OTP
                        </Button>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              height: "1px",
                              backgroundColor: "#ccc",
                            }}
                          ></div>
                          <span
                            style={{
                              padding: "0 10px",
                              fontWeight: "bold",
                            }}
                          >
                            OR
                          </span>
                          <div
                            style={{
                              flex: 1,
                              height: "1px",
                              backgroundColor: "#ccc",
                            }}
                          ></div>
                        </div>

                        <Grid sx={{ display: "flex" }}>
                          <Button
                            variant="text"
                            type="submit"
                            fullWidth
                            endIcon={<ArrowForward />}
                            //color="primary"
                            style={{
                              marginTop: "12px",
                              marginBottom: "8px",
                              ...background_orange_gradient,
                              height: 40,
                              borderRadius: 20,
                              color: Colors.WHITE,
                              padding: "16px",
                            }}
                            onClick={() => onLogin()}
                          >
                            Login using OKTA
                          </Button>
                        </Grid>
                      </>
                    )}
                  </div>

                  {showOTP ? (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <OtpInput
                          value={OTP}
                          onChange={setOTP}
                          OTPLength={4}
                          isInputNum={true}
                          inputStyle={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                          }}
                          separator={<span>&nbsp;&nbsp;&nbsp;</span>}
                          renderInput={(props) => (
                            <input
                              {...props}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "10px",
                              }}
                            />
                          )}
                        />
                      </div>
                      {errorMessage != null && (
                        <Typography
                          fontSize={12}
                          sx={{ color: "red", fontSize: 14 }}
                        >
                          {errorMessage}
                        </Typography>
                      )}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <Button
                          variant="text"
                          type="submit"
                          onClick={() => onSendOTPClickHandler("resend")}
                          disabled={otpTimer > 0}
                          style={{
                            color: "blue",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Resend OTP
                        </Button>
                        {true && (
                          <Typography fontSize={12} align="right">
                            {moment.utc(otpTimer * 1000).format("mm:ss")}
                          </Typography>
                        )}
                      </div>
                      <div onClick={() => changeMobileNumber()}>
                        <h4
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                        >
                          Change Email Id
                        </h4>
                      </div>
                      <CardActions style={{ marginTop: 8, padding: "0px" }}>
                        <Button
                          onClick={() => onSubmitClickHandler()}
                          variant="contained"
                          endIcon={<ArrowForward />}
                          //color="primary"
                          style={{
                            marginTop: "8px",
                            ...background_orange_gradient,
                            height: 40,
                            borderRadius: 20,
                            color: Colors.WHITE,
                            padding: "16px",
                          }}
                        >
                          Submit
                        </Button>
                      </CardActions>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Box>
          </Hidden>
          <Grid
            container
            fixed
            spacing={2}
            style={{ paddingTop: window.innerWidth > 700 ? "170px" : "" }}
          >
            <Grid md={8} sm={8} xs={12}>
              <div>
                <Carousel autoPlay={true} autoPlaySpeed={5000}>
                  {items.map((item, i) => (
                    <div>
                      <a
                        target="_blank"
                        href="https://www.manipalcigna.com"
                        rel="noopener noreferrer"
                      >
                        <picture>
                          <source
                            media="(min-width: 768px)"
                            srcSet={item.srcSet}
                          />
                          <img
                            src={item.src}
                            alt="Digilocker customer emailer"
                            style={{ maxWidth: "100%" }}
                          />
                        </picture>
                      </a>
                    </div>
                  ))}
                </Carousel>
              </div>
            </Grid>
            <Grid md={4}>
              <Hidden mdDown implementation="css">
                <Box>
                  <Card style={{ padding: "27px" }}>
                    <CardContent style={{ padding: "30px 40px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <header>
                          <h3 style={{ marginTop: "0" }}>
                            Login with Email Id
                          </h3>
                        </header>
                        {!showOTP ? (
                          <>
                            <TextField
                              id="outlined-basic"
                              label="Email id"
                              variant="outlined"
                              value={emailId}
                              error={mobileError}
                              helperText={mobileError ? "Invalid email id" : ""}
                              onChange={(e) => onTextChange(e, "mobile")}
                              sx={{ borderRadius: "10px" }}
                              required
                              type={"email"}
                            />
                            {errorMessage != null && (
                              <Typography
                                fontSize={12}
                                sx={{ color: "red", fontSize: 14 }}
                              >
                                {errorMessage}
                              </Typography>
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                      <div
                        style={{
                          marginTop: 10,
                          flex: 1,
                          flexDirection: "column",
                        }}
                      >
                        {showOTP ? (
                          <div></div>
                        ) : (
                          <>
                            <Button
                              variant="text"
                              type="submit"
                              endIcon={<ArrowForward />}
                              //color="primary"
                              style={{
                                marginTop: "8px",
                                marginBottom: "8px",

                                ...background_orange_gradient,
                                height: 40,
                                borderRadius: 20,
                                color: Colors.WHITE,
                                padding: "16px",
                              }}
                              onClick={() => onSendOTPClickHandler("send")}
                            >
                              Send OTP
                            </Button>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  flex: 1,
                                  height: "1px",
                                  backgroundColor: "#ccc",
                                }}
                              ></div>
                              <span
                                style={{
                                  padding: "0 10px",
                                  fontWeight: "bold",
                                }}
                              >
                                OR
                              </span>
                              <div
                                style={{
                                  flex: 1,
                                  height: "1px",
                                  backgroundColor: "#ccc",
                                }}
                              ></div>
                            </div>

                            <Grid sx={{ display: "flex" }}>
                              <Button
                                variant="text"
                                type="submit"
                                fullWidth
                                endIcon={<ArrowForward />}
                                //color="primary"
                                style={{
                                  marginTop: "12px",
                                  marginBottom: "8px",
                                  ...background_orange_gradient,
                                  height: 40,
                                  borderRadius: 20,
                                  color: Colors.WHITE,
                                  padding: "16px",
                                }}
                                onClick={() => onLogin()}
                              >
                                Login using OKTA
                              </Button>
                            </Grid>
                          </>
                        )}
                      </div>

                      {showOTP ? (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flex: 1,
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <OtpInput
                              value={OTP}
                              onChange={setOTP}
                              OTPLength={4}
                              isInputNum={true}
                              inputStyle={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "10px",
                              }}
                              separator={<span>&nbsp;&nbsp;&nbsp;</span>}
                              renderInput={(props) => (
                                <input
                                  {...props}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "10px",
                                  }}
                                />
                              )}
                            />
                          </div>
                          {errorMessage != null && (
                            <Typography
                              fontSize={12}
                              align="left"
                              sx={{ color: "red", fontSize: 14 }}
                            >
                              {errorMessage}
                            </Typography>
                          )}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <Button
                              variant="text"
                              type="submit"
                              onClick={() => onSendOTPClickHandler("resend")}
                              disabled={otpTimer > 0}
                              style={{
                                color: "blue",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              Resend OTP
                            </Button>
                            {true && (
                              <Typography fontSize={12} align="right">
                                {moment.utc(otpTimer * 1000).format("mm:ss")}
                              </Typography>
                            )}
                          </div>
                          <div onClick={() => changeMobileNumber()}>
                            <h4
                              style={{
                                fontWeight: "bold",
                                textDecoration: "underline",
                                cursor: "pointer",
                                marginTop: "10px",
                              }}
                            >
                              Change Login Id
                            </h4>
                          </div>
                          <CardActions style={{ marginTop: 8, padding: "0px" }}>
                            <Button
                              onClick={() => onSubmitClickHandler()}
                              variant="contained"
                              endIcon={<ArrowForward />}
                              //color="primary"
                              style={{
                                marginTop: "8px",
                                ...background_orange_gradient,
                                height: 40,
                                borderRadius: 20,
                                color: Colors.WHITE,
                                padding: "16px",
                              }}
                            >
                              Submit
                            </Button>
                          </CardActions>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </Box>
              </Hidden>
            </Grid>
          </Grid>
          {showNotification != null && (
            <Box sx={{ pt: 2 }}>
              <SnackbarContent
                message={showNotification.message}
                close
                color={showNotification.color}
                customUI={showNotification.customUI}
                closeNotification={() => onNotificationHandler()}
              />
            </Box>
          )}
        </Container>
      </Container>
      {<FooterComponent isExpandable={true} />}
    </>
  );
}
