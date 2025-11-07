import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import "./Pgip.css";

/**
 * Pgip.js - full static content filled from images
 * - Dynamic: coverageList (section 5), financialLimitsList (section 8)
 * - Static: rest of the CIS content (copied from the uploaded images)
 */

const Pgip = ({
  policyNumber = "—",
  productName = "ManipalCigna ProHealth Group Insurance Policy",
  coverageList = [],
  financialLimitsList = [],
  footerUIN = "MCIHLGP21172V032021",
  logoUrl = null,
}) => {
  const sanitize = (html) =>
    html ? DOMPurify.sanitize(String(html)) : "";

  const renderCoverageRows = () => {
    if (!Array.isArray(coverageList) || coverageList.length === 0) {
      return (
        <tr className="coverage-row">
          <td></td>
          <td>Policy Coverage</td>
          <td>No coverages available.</td>
          <td></td>
        </tr>
      );
    }

    return coverageList.map((c, idx) => (
      <tr className="coverage-row" key={c.slNo ?? idx}>
        <td></td>
        <td className="title-cell">{c.coverageTitle || c.benefitName}</td>
        <td className="desc-cell">
          {c.coverageDescription ? (
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(c.coverageDescription),
              }}
            />
          ) : (
            c.description
          )}
        </td>
        <td className="clause-cell">{c.clauseNo || ""}</td>
      </tr>
    ));
  };

  const renderFinancialRows = () => {
    if (!Array.isArray(financialLimitsList) || financialLimitsList.length === 0) {
      return (
        <tr>
          <td></td>
          <td>Financial limits</td>
          <td>
            (i) Sublimit – Nil<br />
            (ii) Co-Payment – Nil<br />
            (iii) Deductible – Annual Aggregate - Nil
          </td>
          <td></td>
        </tr>
      );
    }

    return financialLimitsList.map((f, idx) => (
      <tr key={idx}>
        <td></td>
        <td className="title-cell">{f.limitTitle || f.title}</td>
        <td
          className="desc-cell"
          dangerouslySetInnerHTML={{
            __html: sanitize(f.limitDescription || f.description || ""),
          }}
        />
        <td className="clause-cell">{f.clauseNo || ""}</td>
      </tr>
    ));
  };

  return (
    <div className="pgip-root">
      <header className="pgip-header">
        <div className="header-left">
          <div>Toll Free No: 1800-102-4462</div>
          <div>
            Website: <a href="https://www.manipalcigna.com">www.manipalcigna.com</a>
          </div>
        </div>
        <div className="header-right">
          {logoUrl ? <img src={logoUrl} alt="logo" /> : <div className="logo-placeholder" />}
        </div>
      </header>

      <main className="pgip-main">
        <h2 className="center small">{productName}</h2>
        <h3 className="center">CUSTOMER INFORMATION SHEET/KNOW YOUR POLICY</h3>

        <div className="notice-box">
          This document provides key information about your policy. You are also advised to go through your policy document.
        </div>

        <table className="cis-table" cellPadding="0" cellSpacing="0" role="table">
          <thead>
            <tr>
              <th style={{ width: "6%" }}>S. No</th>
              <th style={{ width: "18%" }}>Title</th>
              <th>Description (Please refer Policy Clause Number)</th>
              <th style={{ width: "12%" }}>Policy Clause</th>
            </tr>
          </thead>

          <tbody>
            {/* 1 */}
            <tr>
              <td>1</td>
              <td>Name of Insurance Product/Policy</td>
              <td>{productName}</td>
              <td></td>
            </tr>

            {/* 2 */}
            <tr>
              <td>2</td>
              <td>Policy Number</td>
              <td className="policy-number">{policyNumber}</td>
              <td></td>
            </tr>

            {/* 3 */}
            <tr>
              <td>3</td>
              <td>Type of Insurance Product / Policy</td>
              <td>* Indemnity (Where insured losses are covered up to the Sum Insured under the policy)</td>
              <td></td>
            </tr>

            {/* 4 */}
            <tr>
              <td>4</td>
              <td>Sum Insured (Basis) (Along with amount)</td>
              <td>
                Floater Sum Insured – Where all members under the policy have a single sum insured limit which may be utilized by any or all members.<br />
                As per Member Annexure.
              </td>
              <td></td>
            </tr>

            {/* 5 Title row */}
            <tr className="section-title">
              <td>5</td>
              <td colSpan="3">Policy Coverage (What the policy covers?) (Policy Clause Number/s)</td>
            </tr>

            {/* 5 dynamic rows */}
            {renderCoverageRows()}

            {/* 6 Exclusions — full static content from images */}
            <tr className="section-title">
              <td>6</td>
              <td colSpan="3">Exclusions (what the policy does not cover)</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.4 Investigation & Evaluation - Code- Excl 04</td>
              <td>
                a. Expenses related to any admission primarily for diagnostics and evaluation purposes only are excluded.<br />
                b. Any diagnostic expenses which are not related or not incidental to the current diagnosis and treatment are excluded.
              </td>
              <td>E.I.4</td>
            </tr>

            <tr>
              <td></td>
              <td>
                E.I.5 Rest Cure, rehabilitation and respite care- Code- Excl 05
              </td>
              <td>
                a. Expenses related to any admission primarily for enforced bed rest and not for receiving treatment. This also includes custodial care either at home or in a nursing facility for personal care such as help with activities of daily living such as bathing, dressing, moving around either by skilled nurses or assistant or non-skilled persons.
              </td>
              <td>E.I.5</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.6 Obesity/Weight Control: Code- Excl 06</td>
              <td>
                Expenses related to the surgical treatment of obesity that does not fulfil all the below conditions:<br />
                1. Surgery to be conducted is upon the advice of the Doctor.<br />
                2. The surgery/Procedure conducted should be supported by clinical protocols.<br />
                3. The member has to be 18 years of age or older.<br />
                4. Body Mass Index (BMI): a. greater than or equal to 40 or b. greater than or equal to 35 in conjunction with any of the following severe co-morbidities following failure of less invasive methods of weight loss: i. Obesity-related cardiomyopathy ii. Coronary heart disease iii. Severe Sleep Apnea iv. Uncontrolled Type2 Diabetes.
              </td>
              <td>E.I.6</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.7 Change-of-Gender treatments: Code- Excl 07</td>
              <td>
                Expenses related to any treatment, including surgical management, to change characteristics of the body to those of the opposite sex.
              </td>
              <td>E.I.7</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.8 Cosmetic or plastic Surgery: Code- Excl 08</td>
              <td>
                Expenses for cosmetic or plastic surgery or any treatment to change appearance unless for reconstruction following an Accident, Burn(s) or Cancer or as part of medically necessary treatment to remove a direct and immediate health risk to the insured. For this to be considered a medical necessity, it must be certified by the attending Medical Practitioner for reconstruction following an Accident, Burn(s) or Cancer.
              </td>
              <td>E.I.8</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.9 Hazardous or Adventure sports: Code- Excl 09</td>
              <td>
                Expenses related to any treatment necessitated due to participation as a professional in hazardous or adventure sports, including but not limited to, para-jumping, rock climbing, mountaineering, rafting, motor racing, horse racing or scuba diving, hand gliding, sky diving, deep-sea diving.
              </td>
              <td>E.I.9</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.10 Breach of law: Code- Excl 10</td>
              <td>
                Expenses for treatment directly arising from or consequent upon any Insured Person committing or attempting to commit a breach of law with criminal intent (e.g. intentional self-injury, suicide or attempted suicide (whether sane or insane)).
              </td>
              <td>E.I.10</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.11 Excluded Providers: Code- Excl 11</td>
              <td>
                Expenses incurred towards treatment in any hospital or by any Medical Practitioner or any other provider specifically excluded by the Insurer and disclosed on its website / notified to the policyholders are not admissible. However, in case of life threatening situations or following an accident, expenses up to the stage of stabilization are payable but not the complete claim. Details of excluded providers shall be provided with the policy document.
              </td>
              <td>E.I.11</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.12 Treatment for Alcoholism, drug or substance abuse or any addictive condition and consequences thereof. Code- Excl 12</td>
              <td>
                Treatment for alcoholism, drug or substance abuse or any addictive condition and consequences thereof are excluded.
              </td>
              <td>E.I.12</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.13 Treatments received in health hydros, nature cure clinics, spas or similar establishments or private beds registered as a nursing home attached to such establishments or where admission is arranged wholly or partly for domestic reasons. Code- Excl13</td>
              <td>
                Treatments received in health hydros, nature cure clinics, spas or similar establishments or private beds registered as nursing home attached to such establishments are excluded.
              </td>
              <td>E.I.13</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.14 Dietary supplements and substances that can be purchased without prescription, including but not limited to Vitamins, minerals and Organic substances unless prescribed by a Medical Practitioner as part of Hospitalization claim or day care procedure. Code- Excl 14</td>
              <td>
                Dietary supplements and over-the-counter substances not prescribed as part of hospitalization/day-care treatment are excluded unless explicitly allowed.
              </td>
              <td>E.I.14</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.15 Refractive Error: Code- Excl 15</td>
              <td>
                Expenses related to the treatment for correction of eye sight due to refractive error less than 7.5 dioptres are excluded.
              </td>
              <td>E.I.15</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.16 Unproven Treatments: Code- Excl 16</td>
              <td>
                Expenses related to any unproven treatment, services and supplies for or in connection with any treatment. Unproven treatments are treatments, procedures or supplies that lack significant medical documentation to support their effectiveness.
              </td>
              <td>E.I.16</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.17 Sterility and Infertility: Code- Excl 17</td>
              <td>
                Expenses related to sterility and infertility including: (i) Any type of contraception, sterilization (ii) Assisted Reproduction services including artificial insemination and advanced reproductive technologies such as IVF, ZIFT, GIFT, ICSI (iii) Gestational Surrogacy (iv) Reversal of sterilization.
              </td>
              <td>E.I.17</td>
            </tr>

            <tr>
              <td></td>
              <td>E.I.18 Maternity: Code Excl 18</td>
              <td>
                Medical treatment expenses traceable to childbirth (including complicated deliveries and caesarean sections incurred during Hospitalization) except ectopic pregnancy; expenses towards miscarriage (unless due to an accident) and lawful medical termination of pregnancy during the policy period. Specific exclusions and limits apply as per the policy schedule.
              </td>
              <td>E.I.18</td>
            </tr>

            {/* Additional Exclusions list summary (from images) */}
            <tr>
              <td></td>
              <td>Specific Exclusions (summary)</td>
              <td>
                E.II.1 Dental Treatment, dentures or Surgery of any kind unless necessitated due to an Accident and requiring minimum 24 hours Hospitalization; E.II.2 Circumcision unless necessary for Treatment of an Illness or Injury; E.II.3 Instrument used in treatment of Sleep Apnea Syndrome and oxygen concentrators; E.II.4 External Congenital Anomaly; E.II.5 Prostheses and medical appliances not required intra-operatively; E.II.6 Any stay in Hospital without undertaking any Treatment; E.II.7 Treatment received outside India; E.II.8 Costs of donor screening or costs incurred in an organ transplant surgery involving organs not harvested from a human body; E.II.9 Non-Allopathic treatment except AYUSH where covered; E.II.10 All expenses caused by ionizing radiation or contamination by radioactivity; E.II.11 War-like situations; E.II.12 Non-medical expenses (refer annexure); E.II.13 Existing diseases disclosed as per ICD codes and underwriting.
              </td>
              <td></td>
            </tr>

            {/* 7 Waiting period */}
            <tr className="section-title">
              <td>7</td>
              <td colSpan="3">Waiting period</td>
            </tr>
            <tr>
              <td></td>
              <td>Waiting period - Time period during which specified diseases/treatments are not covered</td>
              <td>
                • Initial waiting Period: Covered from Day 1 (not applicable in case of continuous renewal or accidents).<br />
                • Specific Waiting periods (Not applicable for claims arising due to an accident): Covered from Day 1 –<br />
                a) Cataract,<br />
                b) Hysterectomy for Menorrhagia or Fibromyoma or prolapse of Uterus unless necessitated by malignancy myomectomy for fibroids,<br />
                c) Knee Replacement Surgery (other than caused by an Accident), Non-infectious Arthritis, Gout, Rheumatism, Osteoarthritis and Osteoporosis, Joint Replacement Surgery (other than caused by Accident) etc.
              </td>
              <td></td>
            </tr>

            {/* 8 Financial limits (dynamic) */}
            <tr className="section-title">
              <td>8</td>
              <td colSpan="3">Financial limits of coverage</td>
            </tr>
            {renderFinancialRows()}

            {/* Following static part of Financial limits long list (from images) */}
            <tr>
              <td></td>
              <td>Other Limits & Conditions</td>
              <td>
                In addition to the conditions mentioned above, all the terms will be as mentioned in ManipalCigna ProHealth Group Insurance Policy.<br />
                1) Type of cover- Family Floater.<br />
                2) Family Definition – Self + Spouse + 2 Dependent Children + 2 Dependent Parents / In Laws (Combinations are not allowed).<br />
                3) Number of life covered at inception: Self - 14, Spouse - 11, Children - 18, Parents - 27.
              </td>
              <td></td>
            </tr>

            {/* 9 Claims/Claims Procedure */}
            <tr className="section-title">
              <td>9</td>
              <td colSpan="3">Claims/Claims Procedure</td>
            </tr>
            <tr>
              <td></td>
              <td>Details and TAT</td>
              <td>
                Details of procedure to be followed for cashless services as well as for reimbursement of claim including pre and post hospitalization: To know the process for our cashless and reimbursement claims visit <a href="https://www.manipalcigna.com/claims">https://www.manipalcigna.com/claims</a>.<br /><br />
                <strong>Turn Around Time (TAT) for claim settlement</strong><br />
                i. TAT for pre-authorization of cashless facility – 1 hour from the last complete document for initial approval.<br />
                ii. TAT for cashless final bill settlement – 3 hours from the last complete document.<br /><br />
                Web links for the followings:<br />
                i. Network hospital details - https://www.manipalcigna.com/locate-us<br />
                ii. Helpline Number - https://www.manipalcigna.com/claims<br />
                iii. Hospital which are blacklisted or from where no claims will be accepted - https://www.manipalcigna.com/locate-us<br />
                iv. Link for downloading claim form - https://www.manipalcigna.com/downloads/claims
              </td>
              <td></td>
            </tr>

            {/* 10 Policy Servicing */}
            <tr className="section-title">
              <td>10</td>
              <td colSpan="3">Policy Servicing</td>
            </tr>
            <tr>
              <td></td>
              <td>Customer Service</td>
              <td>
                For hassle free policy servicing contact us at our service toll-free number 1800-102-4462 or write to us at <a href="mailto:servicesupport@manipalcigna.com">servicesupport@manipalcigna.com</a>.<br /><br />
                Claims: In case of any assistance related to claims contact us at 1800-102-4462 or write to us at <a href="mailto:contact@healthindiatpa.com">contact@healthindiatpa.com</a>.
              </td>
              <td></td>
            </tr>

            {/* 11 Grievances/Complaints */}
            <tr className="section-title">
              <td>11</td>
              <td colSpan="3">Grievances/Complaints</td>
            </tr>
            <tr>
              <td></td>
              <td>LEVEL 1</td>
              <td>
                Health Relationship Managers - Call our toll-free number 1800-102-4462 between 9:00 AM to 9:00 PM. Email us at <a href="mailto:headcustomercare@manipalcigna.com">headcustomercare@manipalcigna.com</a><br />
                For Senior Citizen Assistance - <a href="mailto:Seniorcitizensupport@ManipalCigna.com">Seniorcitizensupport@ManipalCigna.com</a>
              </td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td>LEVEL 2</td>
              <td>
                Grievance Redressal Officer - Call us on 022-71781389 between 10 am to 6 pm (Monday to Friday). Email at <a href="mailto:complaints@manipalcigna.com">complaints@manipalcigna.com</a>
              </td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td>LEVEL 3</td>
              <td>
                Chief Grievance Redressal Officer - Call on 022-71781300 between 10 am to 6 pm (Monday to Friday). Email at <a href="mailto:Compliance@manipalcigna.com">Compliance@manipalcigna.com</a>
              </td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td>LEVEL 4</td>
              <td>
                Approach Ombudsman if the channels above have still not met your expectations. The office name and address details applicable for your state can be obtained from https://www.cioins.co.in/Ombudsman.<br /><br />
                Courier: Any of our branch office or corporate office during business hours. Insured Person may also approach the grievance cell at any of company's branches with the details of the grievance.
              </td>
              <td></td>
            </tr>

            {/* 12 Things to remember */}
            <tr className="section-title">
              <td>12</td>
              <td colSpan="3">Things to remember</td>
            </tr>

            <tr>
              <td></td>
              <td>Free Look Cancellations</td>
              <td>
                The Free Look period shall be applicable on new individual health insurance policies and not on renewals or Ported/Migrated policies.<br /><br />
                The insured person shall be allowed a free look period of 30 days from date of receipt of the policy document to review the terms and conditions of the policy and to return the same if not acceptable.<br /><br />
                Free look is applicable only, if the insured has not made any claim or opted for any benefit during the Free Look Period.<br /><br />
                To avail:<br />
                - Customer can request for cancellation writing to <a href="mailto:servicesupport@manipalcigna.com">servicesupport@manipalcigna.com</a> from the registered email id with us OR<br />
                - Customer can also visit any MCHI Branch and give a written request.
              </td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td>Policy Renewal & Migration</td>
              <td>
                Policy Renewal: The policy shall ordinarily be renewable except on grounds of established fraud or non-disclosure or misrepresentation by the insured person.<br /><br />
                Migration: The Insured Person will have the option to migrate the Policy to other health insurance products/plans offered by the company by applying for migration of the policy at least 30 days before the policy renewal date as per IRDAI guidelines on Migration. If such person is presently covered and has been continuously covered without any lapses under any health insurance product/plan offered by the company, the insured person will get the accrued continuity benefits in waiting periods as per IRDAI guidelines on migration.
              </td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td>Portability & Change in Sum Insured</td>
              <td>
                Portability: The Insured Person will have the option to port the Policy to other insurers by applying to such insurer to port the entire policy along with all the members of the family, if any, at least 45 days before, but not earlier than 60 days from the policy renewal date as per IRDAI guidelines related to portability. If such person is presently covered and has been continuously covered without any lapses, the proposed Insured Person will get accrued continuity benefits in waiting periods as per IRDAI guidelines on portability.<br /><br />
                Change in Sum Insured: It will be allowed at the time of Renewal of the Policy. You can submit a request for the changes by filling the proposal form before the expiry of the Policy. We reserve Our right to carry out underwriting in relation to acceptance of request for change of Sum Insured.
              </td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td>Moratorium Period</td>
              <td>
                After completion of 60 continuous months of coverage (including portability and migration) in health insurance policy, no policy and claim shall be contestable by the insurer on grounds of non-disclosure, misrepresentation, except on grounds of established fraud. This period of 60 continuous months is called moratorium period. The moratorium would be applicable for the sums insured of the first policy and subsequently completion of 60 continuous months would be applicable from date of enhancement of sums insured only on the enhanced limits.
              </td>
              <td></td>
            </tr>

            {/* 13 Your Obligations */}
            <tr className="section-title">
              <td>13</td>
              <td colSpan="3">Your Obligations</td>
            </tr>
            <tr>
              <td></td>
              <td>Disclosure</td>
              <td>
                Please disclose all Pre-existing disease/s or condition/s before buying a Policy. The Policy shall be null and void and all premiums paid thereon shall be forfeited to the Company in the event of misrepresentation, mis-description or non-disclosure of any material fact by the policyholder.
              </td>
              <td></td>
            </tr>

            {/* 14 Declaration */}
            <tr className="section-title">
              <td>14</td>
              <td colSpan="3">Declaration by the Policyholder</td>
            </tr>
            <tr>
              <td></td>
              <td>Declaration</td>
              <td>
                I have read the above and confirm having noted the details.<br /><br />
                Place: ________ &nbsp;&nbsp; Date: ________<br /><br />
                (Signature of Policyholder)
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="footer">
          <div>Note - Benefits and exclusion are applicable as per the plan chosen under the group scheme offered, please refer the policy schedule for more details.</div>
          <div className="uin">ManipalCigna ProHealth Group Insurance Policy UIN: {footerUIN}</div>
        </div>
      </main>
    </div>
  );
};

Pgip.propTypes = {
  policyNumber: PropTypes.string,
  productName: PropTypes.string,
  coverageList: PropTypes.array,
  financialLimitsList: PropTypes.array,
  footerUIN: PropTypes.string,
  logoUrl: PropTypes.string,
};

export default Pgip;
