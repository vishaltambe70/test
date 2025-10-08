import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import { EndorsementComponent } from "../component/GroupClient/EndorsementComponent";
import { ServiceRequestComponent } from "../component/GroupClient/ServiceRequestComponent";
import { DownloadComponent } from "../component/GroupClient/DownloadComponent";
import { GroupDashboardContainer } from "../container/GroupEE/GroupDashboardContainer";
import {
  ChangeCircleOutlined,
  DocumentScannerOutlined,
} from "@mui/icons-material";

import { GroupPolicies } from "../container/GroupOps/Admin/GroupPolicies";
import { ServiceRequest } from "../container/GroupOps/Admin/GroupServiceRequest";
import { ServiceRequestChange } from "../container/GroupOps/Admin/GroupServiceRequestChange";
import { NetworkList } from "../container/GroupOps/Admin/NetworkList";
import { TrackServiceRequest } from "../container/GroupOps/Admin/GroupTrackServiceRequest";
import { GroupCdStatementDetails } from "../container/GroupOps/Admin/GroupCdStatementDetails";
import { GroupActiveMember } from "../container/GroupOps/Admin/GroupActiveMember";
import { GroupClaimStatus } from "../container/GroupOps/Admin/GroupClaimStatus";

import { GroupTrackRequest } from "../container/GroupOps/Admin/GroupTrackRequest";
import { GroupEndoresmentSummary } from "../container/GroupOps/Admin/GroupEndorsementSummary";
import { GroupServiceRequestRaise } from "../container/GroupOps/Admin/GroupServiceRequestRaise";
import { ProposalForm } from "../container/GroupOps/Admin/ProposalForm";
import HealthCard from "../container/GroupOps/Admin/HealthCard";
import constant from "../utility/constant";
import { ClientsDashboard } from "../container/GroupOps/Admin/ClientsDashboard";
import { GroupOpsDashboard } from "../container/GroupOps/Admin/GroupOpsDashboard";
import { LandingDashboard } from "../container/GroupOps/Admin/LandingDashboard";
const dashboardRoutes = [
  {
    path: "/dashboard/clients",
    name: "All Client",
    icon: HomeRepairServiceIcon,
    component: ClientsDashboard,
    layout: "/ops",
  },
  {
    path: "/dashboard/request",
    name: "Ops Dashboard",
    icon: HomeRepairServiceIcon,
    component: GroupOpsDashboard,
    layout: "/ops",
  },
  {
    path: "/dashboard",
    name: "Ops Dashboard",
    icon: HomeRepairServiceIcon,
    component: LandingDashboard,
    layout: "/ops",
  },

  {
    path: "/endorsement-request",
    name: "Endorsement Request",
    icon: HomeRepairServiceIcon,
    component: EndorsementComponent,
    layout: "/ops",
  },
  {
    path: "/service-request",
    name: "Service Request",
    icon: HomeRepairServiceIcon,
    component: ServiceRequestComponent,
    layout: "/ops",
  },
  {
    path: "/policies",
    name: "policies",
    icon: HomeRepairServiceIcon,
    component: GroupPolicies,
    layout: "/ops",
  },
  {
    path: "/selected-policy",
    name: "service request",
    icon: HomeRepairServiceIcon,
    component: ServiceRequest,
    layout: "/ops",
  },
  {
    path: "/proposer-change",
    name: "proposer change",
    icon: HomeRepairServiceIcon,
    component: ServiceRequestChange,
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
    path: "/track-service-request",
    name: "track service reuest",
    icon: HomeRepairServiceIcon,
    component: TrackServiceRequest,
    layout: "/ops",
  },
  {
    path: "/cd-statement",
    name: "cd statement",
    icon: HomeRepairServiceIcon,
    component: GroupCdStatementDetails,
    layout: "/ops",
  },
  {
    path: "/active-member",
    name: "active member",
    icon: HomeRepairServiceIcon,
    component: GroupActiveMember,
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
    path: "/track-request",
    name: "track request",
    icon: HomeRepairServiceIcon,
    component: GroupTrackRequest,
    layout: "/ops",
  },
  {
    path: "/service-request-summary/",
    name: "service request summary",
    icon: HomeRepairServiceIcon,
    component: GroupEndoresmentSummary,
    layout: "/ops",
  },
  {
    path: "/service-request-raise/",
    name: "service request raise",
    icon: HomeRepairServiceIcon,
    component: GroupServiceRequestRaise,
    layout: "/ops",
  },
  {
    path: "/download-health-card",
    name: "Health Card",
    icon: HomeRepairServiceIcon,
    component: HealthCard,
    layout: "/ops",
  },
  {
    path: "/proposal-form",
    name: "Proposal Form",
    icon: HomeRepairServiceIcon,
    component: ProposalForm,
    layout: "/ops",
  },
  // {
  //   path: "/policies",
  //   name: "Policies",
  //   icon: HomeRepairServiceIcon,
  //   component: GroupPolicies,
  //   layout: "/group",
  // },
  /*, {
  path: "/download",
  name: "Download",
  icon: DownloadIcon,
  component: DownloadComponent,
  layout: "/group",
},*/
  /*{
  path: "/upload",
  name: "Upload Document",
  icon: DocumentScannerOutlined,
  component: DownloadComponent,
  layout: "/group",
},*/
  {
    path: "/change-client",
    name: "Change Client",
    icon: ChangeCircleOutlined,
    component: null,
    layout: "/group",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: LogoutIcon,
    component: null,
    layout: "/group",
  },
];

export default dashboardRoutes;
