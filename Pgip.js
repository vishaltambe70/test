import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import "./styles.css";

const Pgip = ({
  policyNumber,
  productName = "ManipalCigna ProHealth Group Insurance Policy",
  coverageList = [],
  financialLimitsList = [],
  footerUIN = "MCIHLGP21172V032021",
  logoUrl = "https://www.manipalcigna.com/themes/custom/manipalcigna/logo.svg",
}) => {
  const safeHtml = (html) => {
    if (!html) return "";
    return DOMPurify.sanitize(html, { FORCE_BODY: true });
  };

  /** ---------- Render Dynamic Sections ---------- **/

  // SECTION 5: Policy Coverage
  const renderCoverageRows = () => {
    if (!Array.isArray(coverageList) || coverageList.length === 0) {
      return (
        <tr>
          <td></td>
          <td>Policy Coverage</td>
          <td>No coverage data available.</td>
          <td></td>
        </tr>
      );
    }

    return coverageList.map((item, idx) => (
      <tr key={item.slNo || idx}>
        <td></td>
        <td>{item.coverageTitle || item.benefitName}</td>
        <td>
          {item.coverageDescription ? (
            <div
              dangerouslySetInnerHTML={{
                __html: safeHtml(item.coverageDescription),
              }}
            />
          ) : (
            item.description
          )}
        </td>
        <td className="policy-clause">{item.clauseNo || ""}</td>
      </tr>
    ));
  };

  // SECTION 8: Financial Limits of Coverage
  const renderFinancialLimits = () => {
    if (!Array.isArray(financialLimitsList) || financialLimitsList.length === 0) {
      return (
        <tr>
          <td></td>
          <td>Sub-limit</td>
          <td>Nil (unless specified in the policy schedule)</td>
          <td></td>
        </tr>
      );
    }

    return financialLimitsList.map((item, idx) => (
      <tr key={idx}>
        <td></td>
        <td>{item.limitTitle}</td>
        <td
          dangerouslySetInnerHTML={{
            __html: safeHtml(item.limitDescription || ""),
          }}
        />
        <td className="policy-clause">{item.clauseNo || ""}</td>
      </tr>
    ));
  };

  /** ---------- Template ---------- **/

  return (
    <div className="cis-container">
      {/* Header */}
      <div className="cis-header">
        <div className="logo">
          {logoUrl ? <img src={logoUrl} alt="logo" /> : null}
        </div>
        <div className="meta">
          <div>Toll Free No: 1800-102-4462</div>
          <div>
            Website:{" "}
            <a href="https://www.manipalcigna.com">www.manipalcigna.com</a>
          </div>
        </div>
      </div>

      <h2>{productName}</h2>
      <h3>CUSTOMER INFORMATION SHEET / KNOW YOUR POLICY</h3>

      <p className="lead">
        This document provides key information about your policy. You are also
        advised to go through your policy document.
      </p>

      {/* Table */}
      <table className="cis-table" role="table">
        <thead>
          <tr>
            <th style={{ width: "6%" }}>S. No</th>
            <th style={{ width: "28%" }}>Title</th>
            <th>Description (Please refer Policy Clause Number)</th>
            <th style={{ width: "12%" }}>Policy Clause</th>
          </tr>
        </thead>

        <tbody>
          {/* Static Rows */}
          <tr>
            <td>1</td>
            <td>Name of Insurance Product/Policy</td>
            <td>{productName}</td>
            <td></td>
          </tr>

          <tr>
            <td>2</td>
            <td>Policy Number</td>
            <td className="policy-number">{policyNumber || "—"}</td>
            <td></td>
          </tr>

          <tr>
            <td>3</td>
            <td>Type of Insurance Product / Policy</td>
            <td>
              * Indemnity (Where insured losses are covered up to the Sum
              Insured under the policy)
            </td>
            <td></td>
          </tr>

          <tr>
            <td>4</td>
            <td>Sum Insured (Basis) (Along with amount)</td>
            <td>
              Floater Sum Insured – Where all members under the policy have a
              single sum insured limit which may be utilized by any or all
              members. As per Member Annexure.
            </td>
            <td></td>
          </tr>

          {/* Dynamic Section 5 */}
          <tr className="title-row">
            <td>5</td>
            <td colSpan="3">Policy Coverage (What the policy covers?)</td>
          </tr>
          {renderCoverageRows()}

          {/* Static Section 6 onwards */}
          <tr className="title-row">
            <td>6</td>
            <td colSpan="3">Exclusions (What the policy does not cover)</td>
          </tr>
          <tr>
            <td></td>
            <td>E.I.4 Investigation & Evaluation</td>
            <td>
              Expenses related to any admission primarily for diagnostics and
              evaluation purposes only are excluded.
            </td>
            <td>E.I.4</td>
          </tr>

          <tr>
            <td></td>
            <td>E.I.5 Rest Cure; Rehabilitation</td>
            <td>
              Expenses related to custodial care and rest cure not required for
              treatment are excluded.
            </td>
            <td>E.I.5</td>
          </tr>

          <tr className="title-row">
            <td>7</td>
            <td colSpan="3">Waiting period</td>
          </tr>
          <tr>
            <td></td>
            <td>Initial waiting period</td>
            <td>
              Covered from Day 1 (not applicable in case of continuous renewal
              or accidents)
            </td>
            <td></td>
          </tr>

          {/* Dynamic Section 8 */}
          <tr className="title-row">
            <td>8</td>
            <td colSpan="3">Financial limits of coverage</td>
          </tr>
          {renderFinancialLimits()}

          {/* Remaining Static Sections */}
          <tr className="title-row">
            <td>9</td>
            <td colSpan="3">Claims / Claims Procedure</td>
          </tr>
          <tr>
            <td></td>
            <td>Claims Procedure</td>
            <td>
              Visit:{" "}
              <a href="https://www.manipalcigna.com/claims">
                https://www.manipalcigna.com/claims
              </a>
              <br />
              <br />
              <strong>TAT:</strong> Pre-authorization - 1 hour. Final settlement
              - 3 hours from receipt of last document.
            </td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>10</td>
            <td colSpan="3">Policy Servicing</td>
          </tr>
          <tr>
            <td></td>
            <td>Customer Service</td>
            <td>
              Call toll-free 1800-102-4462 or email:{" "}
              <a href="mailto:servicesupport@manipalcigna.com">
                servicesupport@manipalcigna.com
              </a>
            </td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>11</td>
            <td colSpan="3">Grievances / Complaints</td>
          </tr>
          <tr>
            <td></td>
            <td>Grievance Levels</td>
            <td>
              Level 1: Health Relationship Managers – 1800-102-4462<br />
              Level 2: Grievance Redressal Officer – see website<br />
              Level 3: Chief Grievance Redressal Officer<br />
              Level 4: Insurance Ombudsman (refer official website)
            </td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>12</td>
            <td colSpan="3">Things to remember</td>
          </tr>
          <tr>
            <td></td>
            <td>Free Look Period & Renewal</td>
            <td>
              Free Look: 30 days from policy receipt for new individual
              policies. Write to{" "}
              <a href="mailto:servicesupport@manipalcigna.com">
                servicesupport@manipalcigna.com
              </a>{" "}
              or visit the branch.
            </td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>13</td>
            <td colSpan="3">Your Obligations</td>
          </tr>
          <tr>
            <td></td>
            <td>Disclosure</td>
            <td>
              Please disclose all pre-existing diseases before buying a policy.
              Non-disclosure may render the policy void.
            </td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>14</td>
            <td colSpan="3">Declaration by the Policyholder</td>
          </tr>
          <tr>
            <td></td>
            <td>Declaration</td>
            <td>
              I have read the above and confirm having noted the details.
              <div className="signature">
                <div style={{ width: "40%" }} />
                <div className="sig-box">Signature of Policyholder</div>
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className="footer-note">
        <div>
          Note - Benefits and exclusions apply as per the chosen plan under the
          group scheme. Refer policy schedule for full details.
        </div>
        <div style={{ marginTop: 6 }}>
          {`ManipalCigna ProHealth Group Insurance Policy UIN: ${footerUIN}`}
        </div>
      </div>
    </div>
  );
};

Pgip.propTypes = {
  policyNumber: PropTypes.string,
  productName: PropTypes.string,
  coverageList: PropTypes.arrayOf(PropTypes.object),
  financialLimitsList: PropTypes.arrayOf(PropTypes.object),
  footerUIN: PropTypes.string,
  logoUrl: PropTypes.string,
};

export default Pgip;
