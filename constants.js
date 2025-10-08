import Methods from "./Methods";

export default {
  IS_STRICT_ENABLE: false,
  PATH_VCF_CARD: "/vCard",
  PATH_VCF_CARD_LOGIN: "/vCardLogin",
  PATH_VCF_CARD_ADMIN_LOGIN: "/vcard/admin/login",
  PATH_VCF_CARD_ADMIN_DASHBOARD: "/vcard/admin/dashboard",

  PATH_GROUP_EE_LOGIN: "/group/login",
  PATH_GROUP_EE_LOGOUT: "/group/logout",
  PATH_GROUP_EE_LOGIN_CALLBACK: "/group/callback",

  PATH_GROUP_EE_DASHBOARD_2: "/group/dashboard/2",
  PATH_GROUP_EE_DASHBOARD: "/group/dashboard",
  // PATH_GROUP_EE_DASHBOARD: "/group/dashboard",
  PATH_GROUP_EE_CLAIM_STATUS: "/group/claim-status",
  PATH_GROUP_EE_POLICIES: "/group/policies",
  PATH_GROUP_EE_ADMIN: "/group",
  PATH_GROUP_EE_CLIENTS: "/group-clients",
  PATH_GROUP_EE_SERVICE_REQUEST_SELECT_POLICY: "/group/selected-policy",
  PATH_GROUP_EE_SERVICE_REQUEST_CHANGE: "/group/proposer-change",
  PATH_GROUP_EE_TRACK_SERVICE_REQUEST: "/group/track-service-request",

  PATH_GROUP_OPS_LOGIN: "/ops/login",
  PATH_GROUP_OPS_LOGOUT: "/ops/logout",
  PATH_GROUP_OPS_DASHBOARD: "/ops/dashboard",
  PATH_GROUP_OPS_LOGIN_CALLBACK: "/ops/callback",

  PATH_GROUP_OPS_CLIENT_DASHBOARD: "/ops/dashboard/clients",
  PATH_GROUP_OPS_REQUEST_DASHBOARD: "/ops/dashboard/request",

  PATH_GROUP_OPS_CLAIM_STATUS: "/ops/claim-status",
  PATH_GROUP_OPS_SERVICE_REQUEST_SELECT_POLICY: "/ops/selected-policy",
  PATH_Group_OPS_SERVICE_REQUEST_CHANGE: "/ops/proposer-change",
  PATH_GROUP_OPS_TRACK_SERVICE_REQUEST: "/ops/track-service-request",
  PATH_GROUP_OPS_MAKE_PAYMENT: "/ops/makePayment",
  PATH_GROUP_OPS_REVIEW_PAYMENT: "/ops/reviewPayment",
  PATH_GROUP_OPS_CD_STATEMENT_DETAILS: "/ops/cd-statement",
  PATH_GROUP_OPS_ACTIVE_MEMBER: "/ops/active-member",
  PATH_GROUP_OPS_TRACK_REQUEST: "/ops/track-request",
  PATH_GROUP_OPS_NETWORK_LIST: "/ops/network-list",
  PATH_GROUP_OPS_DOWNLOAD_HEALTH_CARD: "/ops/download-health-card",

  PATH_GROUP_CD_STATEMENT_DETAILS: "/group/cd-statement",
  PATH_GROUP_DOWNLOAD_HEALTH_CARD: "/group/download-health-card",
  PATH_GROUP_ACTIVE_MEMBER: "/group/active-member",
  PATH_GROUP_TRACK_REQUEST: "/group/track-request",
  PATH_GROUP_NETWORK_LIST: "/group/network-list",
  PATH_GROUP_SERVICE_REQUEST_SUMMARY: "/group/service-request-summary",
  PATH_GROUP_SERVICE_REQUEST_RAISE: "/group/service-request-raise",
  PATH_GROUP_SERVICE_REQUEST_DOWNLOAD: "/downloadServiceRequestExcel",
  PATH_GROUP_EE_MAKE_PAYMENT: "/group/makePayment",
  PATH_GROUP_EE_REVIEW_PAYMENT: "/group/reviewPayment",
  PATH_PROPOSAL_FORM: "/group/proposal-form",
  PATH_GROUP_TUTORIAL: "/group/tutorial",

  PATH_GROUP_OPS_POLICIES: "/ops/policies",
  PATH_GROUP_OPS_ADMIN: "/ops",

  ORG_NAME: "ManipalCigna Health Insurance Company Limited",
  ORG_SUBTITLE: "(Formerly known as CignaTTK Health Insurance Company Limited)",
  ORG_ADDRESS:
    "401/402 Raheja Titanium Western Express Highway Goregaon (East) Mumbai 400 063 Maharashtra India",
  ORG_CONTACT: "22 6170 3600",
  ORG_TOLL_FREE: "18001024462",
  ORG_WEBSITE: "www.manipalcigna.com",

  API_RESPONSE_SUCCESS: "success",
  API_RESPONSE_PAYMENT_SUCCESS: "Success",
  API_RESPONSE_FAILURE: "fail",

  ALERT_SOME_ERROR: "Some error occured",

  API_RESPONSE_CODE_200: 200,
  API_RESPONSE_CODE_400: 400,
  API_RESPONSE_CODE_500: 500,

  API_VALIDATE_ADMIN: "/vcardapp/validateUser",
  API_SEND_OTP: "/vcardapp/getOTP",
  API_VALIDATE_OTP: "/vcardapp/validateOTP",
  API_GET_VCARD_DETAILS: "/vcardapp/getVCardByMobile",
  API_GET_EMP_DETAILS: "/vcardapp/getVCardByEmpCode",
  API_GET_BRANCH_DETAILS: "/vcardapp/getBranchData",
  API_UPDATE_EMP_DETAILS: "/vcardapp/updateVCard",
  API_DELETE_EMP_DETAILS: "/vcardapp/deleteVCard",

  API_GROUP_SEND_OTP: "/sendotp",
  //sendOtp api changes to sendOtp2 for captcha verification
  API_GROUP_SEND_MOBILE_OTP: "/sendOtp2",
  API_GROUP_VALIDATE_OTP: "/verifyotp",
  API_GROUP_VALIDATE_MOBILE_OTP: "/authenticate",
  API_GROUP_OPS_LOGIN_VALIDATE_OTP: "/authenticate",
  API_GROUP_OPS_ROLE_CHECK: "/checkAdminRole",
  API_GROUP_OPS_SEND_OTP: "/sendOtp",
  API_GROUP_CLIENT: "/client",
  API_GROUP_OPS_VALIDATE_OTP: "/validate",

  API_GROUP_ORDER: "/createOrder",

  API_GROUP_VERIFYPAYMENT: "/verifyPayment",
  API_GROUP_POLICY: "/policy",
  // API_GROUP_GST_INVOICE_LIST: "/getGstInvoiceDetails",
  API_GROUP_ENDORSEMENT_SCHEDULE_LIST: "/getEndorsementNumberDetails",
  API_GROUP_ENDORSEMENT_GET_POLICY_NUMBERS_BY_EMAIL_FOR_MA:
    "/getAllPolicyNumberByEmailIdForMediAssist",
  API_GROUP_ENDORSEMENT_UPLOAD: "/uploads",
  API_GROUP_ENDORSEMENT_TICKETS: "/tickets",
  API_GROUP_SUBMITSERVICEREQUEST: "/submitServiceRequest",
  API_GROUP_CD_STATEMENT_BALANCE: "/cdbalance",
  API_GROUP_CD_STATEMENT_DEATILS: "/cdstatement",
  API_GROUP_DOWNLOAD_CD_STATEMENT: "/downloadCdStatementExcel",
  API_GROUP_DOWNLOAD_CLAIM_DETAILS: "/downloadClaimReport",
  API_GROUP_DOWNLOAD_CLAIM_ANALYSIS: "/claim-analysis/getClaimAnalysisPDF",
  API_GROUP_DOWNLOAD_CLAIM_BY_CLAIM_NO: "/getClaimByPolicyNumber",
  API_GROUP_DOWNLOAD_CLAIM_BY_CLAIM_NO_PARAMOUNT:
    "/getClaimStatusFromParamount",
  API_GROUP_DOWNLOAD_CLAIM_BY_POLICY_NO: "/getClaim",
  API_GROUP_DOWNLOAD_CLAIM_BY_POLICY_NO_V2: "/getClaim?v2=true",

  API_GROUP_ENDORSEMENT_REPORT: "/reports",
  API_GROUP_POLICY_COPY: "/downloadDocument/policyCopy",
  API_GROUP_ENDORSEMENT_SCHEDULE: "/downloadEndorsementDocument",
  API_GROUP_ENDORSEMENT_SCHEDULE_USING_ENDORSEMENT_NO:
    "/endorsementSchedule/endorsementNumber",
  API_GROUP_ACTIVE_MEMBERS_EXCEL: "/memberDeleteExcel",

  API_GROUP_OPS_LOGIN: "/authenticate",
  API_GROUP_UPLOAD_DOC: "/uploadDocument/endorsement",
  API_GROUP_CLIENT_LIST: "/clientslist",
  API_GROUP_QUOTE: "/getQuote",
  API_GROUP_OPS_TICKET_DETAILS: "/getTickets",
  API_GROUP_OPS_ALL_TICKET_DETAILS: "/getTicketsByStatus",
  API_GROUP_OPS_FILTER_TICKET_DETAILS: "/admin/filterTickets",
  API_GROUP_OPS_COUNT: "/admin/ticketCountDashboard",

  API_GROUP_OPS_UPDATE_TICKET_STATUS: "/updateTicketStatus",
  API_GROUP_OPS_TICKET_STATUS_AUDIT_LOGS: "/admin/saveAuditLogs",
  API_GROUP_OPS_CC_EMAIL: "/getCCEmail",
  API_GROUP_ACTIVE_MEMBER: "/member",
  API_GROUP_FILTER_ACTIVE_MEMBER: "/filterActiveMembers",
  API_GROUP_FILTER_TRACK_REQUEST: "/filterEndorsementStatus",
  API_GROUP_ENDORSEMENT_STATUS: "/endorsementStatus",
  API_GROUP_OPS_UPLOAD_DOC: "/uploadDocument/status",
  API_GROUP_RENEW_TOKEN: "/renewToken",
  API_GROUP_DOWNLOAD_TEMPLATE_ENDORSEMENT:
    "/downloadDocument/template/endorsement",
  API_GROUP_DOWNLOAD_TEMPLATE_STATUS: "/downloadDocument/template/status",
  API_OPS_SEND_EMAIL: "/sendEmail",

  API_GROUP_VERIFY_PAYMENT: "/verifyPayment",

  API_GROUP_GENERATE_PAYMENT_RECEIPT: "/paymentReceipt",
  MESSAGE_OTP_VERIFIED: "OTP verified successfully.",
  //proposer form API's
  API_GROUP_LIST_ALL_FORMS: "/filterFormSubmission",
  API_GROUP_LIST_ALL_CLIENTS: "/filterClients",
  API_GROUP_GET_USERTYPE: "/viewRoleDetails",
  API_GROUP_DELETE_FORM: "/deleteFormSubmission",
  API_GROUP_SAVE_PROPOSAL_FORM: "/saveProposalForm",
  API_GROUP_GENERATE_UNIQUE_ID: "/saveToken",
  API_GROUP_GET_CONSENT: "/getConsent",

  API_GROUP_DOWNLOAD_FORM: "/downloadPDF",
  API_GROUP_DOWNLOAD_EXCEL: "/downloadListingExcel",
  API_GROUP_DOWNLOAD_CLIENT_EXCEL: "/downloadClientsExcel",

  API_GROUP_DOWNLOAD_ACTIVE_MEMBERS_EXCEL: "/downloadActiveMembersExcel",
  API_GROUP_DOWNLOAD_TICKET_EXCEL: "/downloadTicketsExcel",
  API_GROUP_ADMIN_DOWNLOAD_TICKET_EXCEL: "/admin/downloadTicketExcel",
  API_GROUP_CLIENTS_RENEWAL_EXCEL: "/downloadRenewalReport",
  API_GROUP_CLIENTS_COMMISSION_EXCEL: "/downloadCommissionReport",
  API_GROUP_DOWNLOAD_KYC_FORM: "/downloadKycDocs",
  API_GROUP_UPDATE_SHARE_TIME: "/updateProposalFormCreation",
  API_GROUP_DOWNLOAD_HEALTH_CARD: "/ecardDetails",
  API_GROUP_DOWNLOAD_HEALTH_CARD_PARAMOUNT: "/ecardLinkParamount",

  API_GROUP_GENERATE_FORM: "/proposalFormCreation",
  API_GROUP_GET_EMPLOYEEE_CODE_BY_POLICY_NO_AND_MEMBER_ID:
    "/getEmployeeCodeByPolicyNumberAndMemberId",

  HEADER_GROUP_TABLE: [
    "Policy Number",
    "Sum Insured",
    "Start Date",
    "End Date",
    "Policy Status",
    "",
  ],
  STATUS_ENFORCED: "Enforced",
  STATUS_CANCELLED: "Cancelled",
  STATUS_TERMINATED: "Terminated",
  DRWAER_GROUP_EE_ITEM: ["Endorsement", "Service Request", "Downloads"],

  FEATURE_VCARD: true,
  FEATURE_VCARD_ADMIN: true,
  FEATURE_GROUP_ENDORSEMENT: true,
  FEATURE_GROUP_OPS_USER: true,

  CURRENT_DEVICE: Methods.detectDevice(),
  DEVICE_iOS: "iOS",
  DEVICE_AndroidOS: "AndroidOS",
  DEVICE_BlackBerryOS: "BlackBerryOS",
  DEVICE_WindowsOS: "WindowsOS",
  DEVICE_MacOS: "MacOS",

  VCARD_TIMEOUT: 5 * 60, //seconds
  GROUP_OPS_TIMEOUT: 60 * 60, //seconds
  GROUP_ADMIN_TIMEOUT: 60 * 60, //seconds

  NOTIFICATION_INFO: "info",
  NOTIFICATION_SUCCESS: "success",
  NOTIFICATION_WARNING: "warning",
  NOTIFICATION_DANGER: "danger",
  NOTIFICATION_ERROR: "error",
  NOTIFICATION_PRIMARY: "primary",

  CRYPTO_NAME: "AES-CTR",
  CRYPTO_LENGTH: 256,

  SS_KEY_GROUP_LOGIN_DETAILS: "_reid",
  SS_KEY_GROUP_CLIENT_DETAILS: "_rcid",
  SS_KEY_GROUP_POLICY_DETAILS: "_rpid",
  SS_KEY_GROUP_CLIENT_LIST: "_rclsid",
  SS_KEY_GROUP_CUSTOMER_SESSION: "_rsid",
  SS_KEY_GROUP_ACCESS_TOKEN: "_rat",
  SS_KEY_GROUP_ACCESS_TOKEN_EXPIRESBY: "_rate",
  SS_KEY_GROUP_TICKET_NUMBER: "_tn",
  SS_KEY_GROUP_SERVICE_RAISE_EXCEL_DATA: "_edata",
  SS_KEY_GROUP_REFRESH_TOKEN: "_rrt",
  SS_KEY_GROUP_REFRESH_TOKEN_EXPIRESBY: "_rrte",
  SS_KEY_GROUP_SET_ENDORSEMENT_FILE: "ef",
  SS_KEY_GROUP_DATA_MOBILE: "_rm",
  SS_KEY_GROUP_OPS_SESSION: "_opgsid",
  SS_KEY_VCARD_ADMIN_SESSION: "_vasid",
  SS_KEY_GROUP_USER_TYPE: "_ut",
  SS_KEY_GROUP_USER_ROLE: "_ur",
  SS_KEY_GROUP_EMAIL1: "e1",
  SS_KEY_GROUP_EMAIL3: "e3",
  SS_KEY_GROUP_EMAIL5: "e5",

  ERROR_FILE_MISSING:
    "Unacceptable file type. Please Upload .xls File Format Only",
  ERROR_INVALID_FILE: "Empty Data Set!.",

  MIME_TYPE_PDF: "application/pdf",
  MIME_TYPE_EXCEL:
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  MIME_TYPE_EXCEL_OLD: "application/vnd.ms-excel",
  EXTENSION_PDF: ".pdf",
  EXTENSION_EXCEL: ".xlsx",

  DATE_POLICY_EXPIRY_FORMAT: "DD/MM/YYYY",
  DATE_TIME_STD_FORMAT: "DD/MM/YYYY HH:mm",
  DATE_STD_FORMAT: "DD/MM/YYYY",

  //userType constants proposal form
  //remove old roles
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  //new roles
  SALES: "SALES",
  OPERATIONS: "OPERATIONS",
  PROPOSER: "PROPOSER",
  SALES_ADMIN: "SALES_ADMIN",
  OPERATIONS_ADMIN: "OPERATIONS_ADMIN",

  ACCEPT: "Accepted",
  REJECT: "Rejected",
  IGNORE: "Ignore",
  RESHARE: "Reshared",
  EDITED_BY_MCHI: "Edited by MCHI",
  FORM_SHARED: "Form Shared",
  FORM_GENERATED: "Form Generated",
  FORM_SUBMITTED: "OTP Verified-Form Submitted",
  FORM_VERIFIED_INPROGRESS: "OTP Verified-In Progress",
  FORM_REVERIFIED_INPROGRESS: "OTP Re-Verified-In Progress",
  FROM_RESUBMITTED: "OTP Re-Verified-Form Submitted",
  FORM_RESHARED: "Form Reshared",
  OTP_REVERIFIED: "OTP Re-Verified",
  OTP_REVERIFICATION_PENDING: "Re-Verification Pending",

  STATUS_LIST: [
    "Form Generated",
    "Edited by MCHI",
    "Form Shared",
    "OTP Verified-In Progress",
    "OTP Verified-Form Submitted",
    "Form Reshared",
  ],
  OTP_STATUS_LIST: ["OTP Verified", "Verification Pending", "OTP Re-Verified"],
  TPA_LIST: ["Mediassist", "TPA"],
  MAX_ENDORSEMENT_NUMBERS: 7,
  MAX_EMAIL_NUMBERS: 9,
  TPA_LIST2: [
    {
      key: "Mediassist",
      displayText: "Mediassist",
    },
  ],
  TPA_LIST3: [
    {
      key: "paramount",
      displayText: "Paramount",
    },
  ],
  TPA_LIST4: [
    {
      key: "Mediassist",
      displayText: "Mediassist",
    },
    {
      key: "paramount",
      displayText: "Paramount",
    },
  ],
  // formtype
  PGIP: "PGIP",
  PARAMOUNT_TPA: "TPA004",
  MEDIASSIST_TPA: "TPA002",

  //ROLES constants :
  USERROLE_UW: "UW",
  USERROLE_CLAIMS: "CLAIMS",
};
