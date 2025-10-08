import React, { useEffect, useState } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
//import { makeStyles } from '@material-ui/core';
import "./App.css";
import constant from "./utility/constant";
import { VCardContainer } from "./container/vcard/VCardContainer";
import { VCardLoginContainer } from "./container/vcard/VCardLoginContainer";
import { GroupLoginContainer } from "./container/GroupEE/GroupLoginContainer";
import { GroupOpsLoginContainer } from "./container/GroupOps/Admin/GroupOpsLoginContainer";
import { ErrorContainer } from "./container/Error/ErrorContainer";
import Admin from "./layouts/Admin";
import { GroupOpsDashboard } from "./container/GroupOps/Admin/GroupOpsDashboard";
import { GroupClientContainer } from "./container/GroupEE/GroupClientContainer";
import { AdminLoginContainer } from "./container/vcard/AdminLoginContainer";
import { VCardAdminContainer } from "./container/vcard/VCardAdminContainer";
import { MakePayment } from "./container/GroupEE/MakePayment";
import { ReviewPayment } from "./container/GroupEE/ReviewPayment";
import HealthCard from "./container/GroupEE/HealthCard";
import { Tutorial } from "./container/Tutorial/Tutorial";
import { SessionTimeoutModal } from "./component/Modals/SessionTimeoutModal";
import OpsAdmin from "./layouts/OpsAdmin";
import { getSession } from "./utility/SessionManager";
import Methods from "./utility/Methods";
import ScrollToTop from "./utility/ScrollToTop";

import OktaAuthProvider from "./layouts/OktaAuthProvider";
import { LoginCallback } from "@okta/okta-react";
import FetchAuthToken from "./layouts/FetchAuthToken";

const history = createBrowserHistory({ basename: "/endorsement" });
//const history = createBrowserHistory();
function App() {
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const encData = getSession(window, constant.SS_KEY_GROUP_USER_TYPE);
    if (encData?.length > 0) {
      setUserType(Methods.decrypt(encData)?.type);
    }
  }, []);

  return (
    <>
      {/*<HeaderComponent />*/}
      <div>
        <OktaAuthProvider>
          <SessionTimeoutModal />
          {/* <FetchAuthToken /> */}
          <Router history={history}>
            <ScrollToTop />
            <Route exact path={"/"} component={ErrorContainer} />
            <Route
              exact
              path={constant.PATH_GROUP_TUTORIAL}
              component={Tutorial}
            />
            <Route
              exact
              path={constant.PATH_GROUP_EE_LOGIN_CALLBACK}
              component={FetchAuthToken}
            />
            <Route exact path={constant.PATH_GROUP_EE_LOGOUT}>
              <Redirect to={constant.PATH_GROUP_EE_LOGIN} />
            </Route>

            {constant.FEATURE_VCARD && (
              <>
                <Route
                  exact
                  path={constant.PATH_VCF_CARD}
                  key={constant.PATH_VCF_CARD}
                  component={VCardContainer}
                />
                <Route
                  exact
                  path={constant.PATH_VCF_CARD_LOGIN}
                  key={constant.PATH_VCF_CARD_LOGIN}
                  component={VCardLoginContainer}
                />
              </>
            )}
            {constant.FEATURE_VCARD_ADMIN && (
              <>
                <Route
                  exact
                  path={constant.PATH_VCF_CARD_ADMIN_LOGIN}
                  key={constant.PATH_VCF_CARD_ADMIN_LOGIN}
                  component={AdminLoginContainer}
                />

                <Route
                  exact
                  path={constant.PATH_VCF_CARD_ADMIN_DASHBOARD}
                  key={constant.PATH_VCF_CARD_ADMIN_DASHBOARD}
                  component={VCardAdminContainer}
                />
              </>
            )}

            {constant.FEATURE_GROUP_ENDORSEMENT && (
              <>
                {
                  <Route
                    exact
                    path={constant.PATH_GROUP_EE_REVIEW_PAYMENT}
                    key={constant.PATH_GROUP_EE_REVIEW_PAYMENT}
                    component={ReviewPayment}
                  />
                }
                {
                  <Route
                    exact
                    path={constant.PATH_GROUP_DOWNLOAD_HEALTH_CARD}
                    key={constant.PATH_GROUP_DOWNLOAD_HEALTH_CARD}
                    component={HealthCard}
                  />
                }
                {
                  <Route
                    exact
                    path={constant.PATH_GROUP_EE_MAKE_PAYMENT}
                    key={constant.PATH_GROUP_EE_MAKE_PAYMENT}
                    component={MakePayment}
                  />
                }

                {
                  <Route
                    exact
                    path={constant.PATH_GROUP_EE_LOGIN}
                    key={constant.PATH_GROUP_EE_LOGIN}
                    component={GroupLoginContainer}
                  />
                }

                {
                  <Route
                    exact
                    path={constant.PATH_GROUP_EE_CLIENTS}
                    key={constant.PATH_GROUP_EE_CLIENTS}
                    component={GroupClientContainer}
                  />
                }
                {/* <Route
                exact
                path={constant.PATH_GROUP_EE_DASHBOARD_2}
                key={constant.PATH_GROUP_EE_DASHBOARD_2}
                component={GroupDashboardContainer}
              />
              <Route
                exact
                path={constant.PATH_GROUP_EE_DASHBOARD_2}
                key={constant.PATH_GROUP_EE_DASHBOARD_2}
                component={GroupDashboardContainer}
              /> */}
                <Switch>
                  <Route
                    path={constant.PATH_GROUP_EE_ADMIN}
                    component={Admin}
                    key={constant.PATH_GROUP_EE_ADMIN}
                  />
                  {
                    <Redirect
                      from={constant.PATH_GROUP_EE_ADMIN}
                      to={constant.PATH_GROUP_EE_DASHBOARD}
                      key={"r" + constant.PATH_GROUP_EE_ADMIN}
                    />
                  }
                </Switch>
              </>
            )}

            {constant.FEATURE_GROUP_OPS_USER && (
              <>
                <Route
                  exact
                  path={constant.PATH_GROUP_OPS_LOGIN}
                  key={constant.PATH_GROUP_OPS_LOGIN}
                  component={GroupOpsLoginContainer}
                />
                <Route
                  exact
                  path={constant.PATH_GROUP_OPS_LOGIN_CALLBACK}
                  component={FetchAuthToken}
                />
                <Route exact path={constant.PATH_GROUP_OPS_LOGOUT}>
                  <Redirect to={constant.PATH_GROUP_OPS_LOGIN} />
                </Route>

                {/* <Route
                exact
                path={constant.PATH_GROUP_OPS_DASHBOARD}
                key={constant.PATH_GROUP_OPS_DASHBOARD}
                component={GroupOpsOldDashboard}
              /> */}

                {userType === "ADMIN" && (
                  <Switch>
                    <Route
                      path={constant.PATH_GROUP_OPS_ADMIN}
                      component={OpsAdmin}
                      key={constant.PATH_GROUP_OPS_ADMIN}
                    />
                    {
                      <Redirect
                        from={constant.PATH_GROUP_OPS_ADMIN}
                        to={constant.PATH_GROUP_OPS_DASHBOARD}
                        key={"r" + constant.PATH_GROUP_OPS_ADMIN}
                      />
                    }
                  </Switch>
                )}
              </>
            )}
          </Router>
        </OktaAuthProvider>
      </div>
    </>
  );
}

export default App;
