import React, { useEffect, useRef, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory, useLocation } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import constant from "../utility/constant";
import { HTTPRequest } from "../utility/lib";
import { setSession } from "../utility/SessionManager";
import Methods from "../utility/Methods";
import Colors from "../utility/Colors";
import { LoaderComponent } from "../component/Loaders/LoaderComponent";

const FetchAuthToken = () => {
  const history = useHistory();
  const location = useLocation();
  const { oktaAuth, authState } = useOktaAuth();

  const didFetchRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const isOps = location?.pathname.includes("ops") ? true : false;

  // Step 1: Handle the code/state redirect from Okta
  useEffect(() => {
    const handleRedirect = async () => {
      if (
        location.search.includes("code=") &&
        location.search.includes("state=")
      ) {
        try {
          await oktaAuth.handleLoginRedirect();
          // After this, Okta context will update authState on next render
        } catch (err) {
          Methods.logger("handleLoginRedirect error: ", JSON.stringify(err));
          setErrorMessage("Error completing login redirect");
        }
      }
    };

    handleRedirect();
  }, [location.search, oktaAuth]);

  // Step 2: Once authenticated, call your backend
  useEffect(() => {
    const callBackendAuth = async () => {
      if (!authState?.isAuthenticated || didFetchRef.current) return;

      didFetchRef.current = true;

      try {
        const accessToken = await oktaAuth.tokenManager.get("accessToken");
        const userInfo = await oktaAuth.getUser();
        let reqObj = {};

        if (isOps) {
          reqObj = {
            userType: "ADMIN",
            mobileNumber: "",
            oauthToken: accessToken?.accessToken,
            emailId: userInfo?.email,
            grantType: "OKTA",
          };
          const resp = await HTTPRequest.POST_GROUP(
            "group",
            reqObj,
            constant.API_GROUP_OPS_LOGIN_VALIDATE_OTP
          );
          if (resp.response !== null) {
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
            setSession(
              window,
              constant.SS_KEY_GROUP_DATA_MOBILE,
              userInfo?.email
            );
            const roleResp = await HTTPRequest.POST_GROUP(
              "group",
              { emailId: userInfo?.email },
              constant.API_GROUP_OPS_ROLE_CHECK
            );
            if (roleResp !== null) {
              setSession(
                window,
                constant.SS_KEY_GROUP_USER_ROLE,
                Methods.encrypt({ type: roleResp.response.role })
              );
            }
            // ✅ NEW: Force Okta context to update before navigation
            await oktaAuth.authStateManager.updateAuthState();

            // ✅ Slight delay to ensure hydration before dashboard mount
            setTimeout(() => {
              history.push({
                pathname: constant.PATH_GROUP_OPS_DASHBOARD,
                state: { username: userInfo?.email },
              });
            }, 300);
            // history.push({
            //   pathname: constant.PATH_GROUP_OPS_DASHBOARD,
            //   state: { username: userInfo?.email },
            // });
          } else {
            setErrorMessage(resp.response.errorMessage);
          }
        } else {
          reqObj = {
            grantType: "OKTA",
            userType: constant.CUSTOMER,
            oauthToken: accessToken?.accessToken,
            emailId: userInfo?.email,
          };

          const resp = await HTTPRequest.POST_GROUP(
            "group",
            reqObj,
            constant.API_GROUP_VALIDATE_MOBILE_OTP
          );
          if (resp?.response) {
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
              constant.SS_KEY_GROUP_DATA_MOBILE,
              userInfo?.email
            );
            setSession(
              window,
              constant.SS_KEY_GROUP_USER_TYPE,
              Methods.encrypt({ type: constant.CUSTOMER })
            );
            history.replace(constant.PATH_GROUP_EE_DASHBOARD);
          } else {
            setErrorMessage(
              resp?.response?.errorMessage || "Authentication failed"
            );
          }
        }
      } catch (err) {
        Methods.logger("FetchAuthToken backend error: ", JSON.stringify(err));
        setErrorMessage("Something went wrong during authentication");
      }
    };

    callBackendAuth();
  }, [authState, oktaAuth, history]);

  return (
    <>
      <Container
        maxWidth={"xl"}
        sx={{
          pl: 0,
          pr: 0,
          height: "150vh",
          bgcolor: Colors.MCHI_CONTAINER_BACKGROUND,
        }}
      >
        {<LoaderComponent />}
      </Container>
      {errorMessage && (
        <Typography
          fontSize={12}
          align="left"
          sx={{ color: "red", fontSize: 14 }}
        >
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default FetchAuthToken;
