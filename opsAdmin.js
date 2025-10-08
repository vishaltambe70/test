import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Sidebar from "../component/General/Sidebar";
import Hidden from "@material-ui/core/Hidden";
import routes from "./OpsRoutes";

import styles from "../assets/jss/layouts/adminStyle";

import bgImage from "../assets/images/banner/sidebar-2.jpg";
import logo from "../assets/images/logo/Manipal_Logo.png";
import constant from "../utility/constant";
import Methods from "../utility/Methods";
import {
  clearGroupSessionCookies,
  getSession,
  getUserDetails,
  getUserDetailsCookies,
} from "../utility/SessionManager";
import { HTTPRequest } from "../utility/lib";
import { LoaderComponent } from "../component/Loaders/LoaderComponent";
import Colors from "../utility/Colors";
import Navbar from "../component/Navbars/Navbar";
import { useCookies } from "react-cookie";
import { ARRAY_GROUP_SESSIONS } from "../utility/SessionConstant";
import FooterComponent from "../component/General/FooterComponent";
import { HeaderComponent } from "../component/Header/HeaderComponent";
import { HomeRepairService, Logout } from "@mui/icons-material";
import { GroupOpsDashboard } from "../container/GroupOps/Admin/GroupOpsDashboard";
import { LandingDashboard } from "../container/GroupOps/Admin/LandingDashboard";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { GroupPolicies } from "../container/GroupOps/Admin/GroupPolicies";
import { NetworkList } from "../container/GroupOps/Admin/NetworkList";
import { GroupClaimStatus } from "../container/GroupOps/Admin/GroupClaimStatus";
import { ClientsDashboard } from "../container/GroupOps/Admin/ClientsDashboard";

let ps;
const OpsRoleRoutes = [
  {
    path: "/dashboard",
    name: "Ops Dashboard",
    icon: HomeRepairService,
    component: GroupOpsDashboard,
    layout: "/ops",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: Logout,
    component: null,
    layout: "/group",
  },
];

const UwClaimsRoleRoutes = [
  {
    path: "/dashboard",
    name: "Ops Dashboard",
    icon: HomeRepairServiceIcon,
    component: ClientsDashboard,
    layout: "/ops",
  },

  // {
  //   path: "/service-request",
  //   name: "Service Request",
  //   icon: HomeRepairServiceIcon,
  //   component: ServiceRequestComponent,
  //   layout: "/ops",
  // },
  {
    path: "/policies",
    name: "policies",
    icon: HomeRepairServiceIcon,
    component: GroupPolicies,
    layout: "/ops",
  },

  {
    path: "/network-list",
    name: "network list",
    icon: HomeRepairServiceIcon,
    component: NetworkList,
    layout: "/ops",
  },

  {
    path: "/claim-status",
    name: "claim member",
    icon: HomeRepairServiceIcon,
    component: GroupClaimStatus,
    layout: "/ops",
  },

  {
    path: "/logout",
    name: "Logout",
    icon: Logout,
    component: null,
    layout: "/group",
  },
];

const useStyles = makeStyles(styles);

let mobile, clientId;
let client_name = "";
export default function OpsAdmin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  const history = useHistory();
  const location = useLocation();
  const [cookies, setCookies, removeCookie] = useCookies(ARRAY_GROUP_SESSIONS);
  // states and functions
  const [image, setImage] = useState(bgImage);
  const [color, setColor] = useState("blue");
  const [fixedClasses, setFixedClasses] = useState("dropdown show");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const mobileView = window.innerWidth <= 700;

  const switchRoutes = (role) => {
    console.log("userRole inside switch ", userRole);
    let allroutes =
      userRole === "CRM"
        ? routes
        : userRole === constant.USERROLE_UW ||
          userRole === constant.USERROLE_CLAIMS
        ? UwClaimsRoleRoutes
        : OpsRoleRoutes;
    return (
      <Switch>
        {allroutes?.map((prop, key) => {
          Methods.logger("Routes: ", prop.path + "_" + key);
          if (prop.layout === "/ops") {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={prop.path + "_" + key}
              />
            );
          }
          return (
            <Route
              path="endorsement/ops/login"
              render={() => {
                return <Redirect to="endorsement/ops/login" />;
              }}
              key="login_route"
            />
          );
        })}
        {/*<Redirect from="/ops" to="/ops/dashboard" />*/}
      </Switch>
    );
  };

  useEffect(() => {
    const encRoleData = getSession(window, constant.SS_KEY_GROUP_USER_ROLE);

    if (encRoleData?.length > 0) {
      setUserRole(Methods.decrypt(encRoleData)?.type);
    }

    mobile = location.state?.mobile;
    clientId = location.state?.clientId;
    Methods.logger("Admin Location ", mobile, clientId);
    if (!mobile || !clientId) {
      const details = getUserDetailsCookies(cookies);
      Methods.logger("Admin Cookies ", details);
      if (details != null) {
        mobile = details.mobile;
        clientId = details.clientId;
      }
    }
    // if (!mobile || !clientId) {
    //   clearGroupSessionCookies(removeCookie, window)
    //   history.replace(constant.PATH_GROUP_EE_LOGIN)
    //   return
    // }
    const data = { mobile: mobile, clientId: clientId };
    const encryptedLogin = Methods.encrypt(data);
    setCookies(
      constant.SS_KEY_GROUP_LOGIN_DETAILS,
      encryptedLogin,
      Methods.getCookieOptions()
    );

    //setSession(window, constant.SS_KEY_GROUP_LOGIN_DETAILS, encryptedLogin)

    getDetails(data);
  }, []);

  const getDetails = async (data) => {
    setShowLoader(false);
    setIsLoading(true);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeFunction);

    return function cleanup() {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);

  if (!isLoading) {
    return <>{showLoader && <LoaderComponent />}</>;
  }
  return (
    <>
      {console.log("on ops admin page")}
      <div className={classes.wrapper}>
        <div ref={mainPanel} key={"mainPanel"}>
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          <HeaderComponent
            routes={routes}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
            key={"navbar"}
          />
          <section>
            {getRoute() ? (
              <div>
                {console.log("inside getRoute function", userRole)}
                <div
                // className={classes.container}
                >
                  {userRole === "CRM" ||
                  userRole === constant.USERROLE_UW ||
                  userRole === constant.USERROLE_CLAIMS
                    ? switchRoutes("CRM")
                    : userRole === "OPS"
                    ? switchRoutes()
                    : switchRoutes()}
                </div>
              </div>
            ) : (
              <div className={classes.map} key={"routes"}>
                {userRole === "CRM" ||
                userRole === constant.USERROLE_UW ||
                userRole === constant.USERROLE_CLAIMS
                  ? switchRoutes("CRM")
                  : userRole === "OPS"
                  ? switchRoutes()
                  : switchRoutes()}
              </div>
            )}
          </section>

          {<FooterComponent isExpandable={true} />}
        </div>
      </div>
    </>
  );
}
