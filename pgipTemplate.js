import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import "../styles/cis.css"; // relative path - adjust if you place CSS elsewhere

/**
 * CISTemplate
 * Props:
 *  - policyNumber: string
 *  - productName: string
 *  - coverages: array of objects (see below)
 *  - footerUIN: string
 *  - logoUrl: string (optional)
 *
 * Each coverage item can be:
 * {
 *   id: number|string,
 *   coverCode: "42114101",
 *   benefitName: "In-patient Hospitalisation Expenses Cover",
 *   description: "Plain text description...",
 *   financialOtherClause: "<br/>i. clause as html..."  // optional HTML string
 *   groupId: "GRP002"
 * }
 *
 * financialOtherClause or description will be sanitized & injected as HTML.
 */
const CISTemplate = ({
  policyNumber,
  productName = "ManipalCigna ProHealth Group Insurance Policy",
  coverages = [],
  footerUIN = "MCIHLGP21172V032021",
  logoUrl = "https://www.manipalcigna.com/themes/custom/manipalcigna/logo.svg",
}) => {
  // sanitize helper
  const safeHtml = (html) => {
    if (!html) return "";
    return DOMPurify.sanitize(html, { FORCE_BODY: true });
  };

  // Helper to render main coverage rows from coverages array
  const renderCoverageRows = () => {
    if (!Array.isArray(coverages) || coverages.length === 0) {
      return (
        <tr>
          <td></td>
          <td>Policy Coverage</td>
          <td>No coverage data available.</td>
          <td></td>
        </tr>
      );
    }

    return coverages.map((cov, idx) => {
      const htmlToRender = cov.financialOtherClause || cov.description || "";
      return (
        <tr key={cov.id ?? idx}>
          <td></td>
          <td>{cov.benefitName || cov.title || "Coverage"}</td>
          <td dangerouslySetInnerHTML={{ __html: safeHtml(htmlToRender) }} />
          <td className="policy-clause">{cov.coverCode || ""}</td>
        </tr>
      );
    });
  };

  return (
    <div className="cis-container">
      <div className="cis-header">
        <div className="logo">
          {logoUrl ? <img src={logoUrl} alt="logo" /> : null}
        </div>
        <div className="meta">
          <div>Toll Free No: 1800-102-4462</div>
          <div>
            Website: <a href="https://www.manipalcigna.com">www.manipalcigna.com</a>
          </div>
        </div>
      </div>

      <h2>{productName}</h2>
      <h3>CUSTOMER INFORMATION SHEET / KNOW YOUR POLICY</h3>

      <p className="lead">
        This document provides key information about your policy. You are also advised to go through your policy document.
      </p>

      <table className="cis-table" role="table" aria-label="Customer Information Sheet">
        <thead>
          <tr>
            <th style={{ width: "6%" }}>S. No</th>
            <th style={{ width: "28%" }}>Title</th>
            <th>Description (Please refer the Policy Clause Number in next column)</th>
            <th style={{ width: "12%" }}>Policy Clause</th>
          </tr>
        </thead>

        <tbody id="cis-body">
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
            <td>* Indemnity (Where insured losses are covered up to the Sum Insured under the policy)</td>
            <td></td>
          </tr>

          <tr>
            <td>4</td>
            <td>Sum Insured (Basis) (Along with amount)</td>
            <td>
              Floater Sum Insured – Where all members under the policy have a single sum insured limit
              which may be utilized by any or all members. As per Member Annexure.
            </td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>5</td>
            <td colSpan="3">Policy Coverage (What the policy covers?)</td>
          </tr>

          {/* Insert dynamic coverage rows */}
          {renderCoverageRows()}

          {/* Example static rows after dynamic list: (you can remove if not required) */}
          <tr>
            <td></td>
            <td>In-patient Hospitalization</td>
            <td>
              Covered up to the Sum Insured for any disease/ illness or injury.<br />
              <strong>Day Care:</strong> All Day Care Treatment/Procedures covered up to Sum Insured.
            </td>
            <td>D.I.1</td>
          </tr>

          <tr className="title-row">
            <td>6</td>
            <td colSpan="3">Exclusions (what the policy does not cover)</td>
          </tr>

          <tr>
            <td></td>
            <td>E.I.4 Investigation &amp; Evaluation</td>
            <td>
              Expenses related to any admission primarily for diagnostics and evaluation purposes only are excluded.
            </td>
            <td>E.I.4</td>
          </tr>

          <tr>
            <td></td>
            <td>E.I.5 Rest Cure; Rehabilitation</td>
            <td>
              Expenses related to custodial care and rest cure not required for treatment are excluded.
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
            <td>Covered from Day 1 (not applicable in case of continuous renewal or accidents)</td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>8</td>
            <td colSpan="3">Financial limits of coverage</td>
          </tr>

          <tr>
            <td></td>
            <td>Sub-limit</td>
            <td>Nil (unless specified in the policy schedule)</td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>9</td>
            <td colSpan="3">Claims / Claims Procedure</td>
          </tr>

          <tr>
            <td></td>
            <td>Claims Procedure</td>
            <td>
              Visit the claims page for details: <a href="https://www.manipalcigna.com/claims">https://www.manipalcigna.com/claims</a>
              <br /><br />
              <strong>TAT:</strong> Pre-authorization - 1 hour (from last complete document). Final settlement - 3 hours (from last complete document).
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
              Call toll-free 1800-102-4462 or write to <a href="mailto:servicesupport@manipalcigna.com">servicesupport@manipalcigna.com</a>.
            </td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>11</td>
            <td colSpan="3">Grievances / Complaint</td>
          </tr>

          <tr>
            <td></td>
            <td>Grievance Levels</td>
            <td>
              Level 1: Health Relationship Managers – Toll-free 1800-102-4462.<br />
              Level 2/3: Contact grievance redressal officers (details on website).<br />
              Level 4: Insurance Ombudsman (see official website).
            </td>
            <td></td>
          </tr>

          <tr className="title-row">
            <td>12</td>
            <td colSpan="3">Things to remember</td>
          </tr>

          <tr>
            <td></td>
            <td>Free Look &amp; Renewal</td>
            <td>
              Free look: 30 days from date of receipt (new policies). To avail, write to <a href="mailto:servicesupport@manipalcigna.com">servicesupport@manipalcigna.com</a> or visit branch.
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
            <td>Please disclose all pre-existing disease/condition(s) before buying a policy. Non-disclosure may render the policy void.</td>
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
              I have read the above and confirm having noted the details.<br /><br />
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
        <div>Note - Benefits and exclusion are applicable as per the plan chosen under the group scheme offered. Please refer the policy schedule for more details.</div>
        <div style={{ marginTop: 6 }}>{`ManipalCigna ProHealth Group Insurance Policy UIN: ${footerUIN}`}</div>
      </div>
    </div>
  );
};

CISTemplate.propTypes = {
  policyNumber: PropTypes.string,
  productName: PropTypes.string,
  coverages: PropTypes.arrayOf(PropTypes.object),
  footerUIN: PropTypes.string,
  logoUrl: PropTypes.string,
};

export default CISTemplate;
