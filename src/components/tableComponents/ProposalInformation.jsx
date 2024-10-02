import React from "react";
import {
  findKeyValue,
  camelCaseToHumanReadable,
  formatDate,
  findValue,
} from "../../utils/utils";
import caseType from "../../formData/caseType";
import landUse from "../../formData/landUseName";
import buildingActivity from "../../formData/buildingActivity";
import buildingUse from "../../formData/buildingUse";
import typeOfBuilding from "../../formData/typeOfBuilding";
import layoutApprovalType from "../../formData/layoutApprovalType";

const ProposalInformation = ({ finalData, processedData }) => {
  console.log(finalData);

  return (
    <div>
      <h3 className=" font-bold text-center  bg-gray-400 border text-gray-700 border-slate-300 p-2">
        Proposal information
      </h3>
      <div className="w-full grid grid-cols-2 gap-2 mb-5">
        <div className="">
          <table className="text-left w-full">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="font-medium border text-gray-700 border-slate-300 p-2"
                >
                  Plot Details (Table A)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  Plot No
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {/* PLOT No. {findKeyValue(finalData, "plotNo")} */}
                  PLOT No. {findKeyValue(finalData, "plotNumber")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("siteAddress")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "ownerAddress")}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="text-left w-full">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="font-medium border text-gray-700 border-slate-300 p-2"
                >
                  Proposal Details (Table C)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("applicationId")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {/* {findKeyValue(finalData, "applicationId")} */}
                  123
                </td>
              </tr>

              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("buildingIsFor")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "buildingFor")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("caseType")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findValue(caseType, finalData.caseType)}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("division")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {/* {findKeyValue(finalData, "division")} */}
                  Bhopal
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("district")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {/* {findKeyValue(finalData, "district")} */}
                  Bhopal
                </td>
              </tr>

              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("ulb")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "ulb")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("zone")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "zone")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("ward")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "ward")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("colonyName")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "colony")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("isPlotIrregular")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "plotIrregular")}
                </td>
              </tr>

              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("landUse")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findValue(landUse, finalData.landUseId)}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("landSubUse")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "landSubUse")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("buildingActivity")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {/* {findKeyValue(finalData, "buildingActivity")} */}
                  {findValue(buildingActivity, finalData.buildingActivityId)}
                </td>
              </tr>

              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("buildingUse")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findValue(buildingUse, finalData.buildingUseId)}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("layoutApproval")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findValue(layoutApprovalType, finalData.layoutApprovalType)}
                </td>
              </tr>

              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("grossPlotArea")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "grossPlotArea")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("netPlotArea")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "netPlotArea")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("plotDepth")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "plotDepth")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("plotWidth")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "plotWidth")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {/* {camelCaseToHumanReadable("roadStreetWidth")} */}
                  Road/Street Width
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "roadStreetWidth")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("typeOfBuilding")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findValue(typeOfBuilding, finalData.typeOfBuildingId)}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("typeOfPlot")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "typeOfPlot")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("noOfFloor")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "proposedNoOfFloors")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="">
          <table className="text-left w-full">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="font-medium border text-gray-700 border-slate-300 p-2"
                >
                  Project Details (Table B)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("typeOfConsultant")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "consultantName")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("applicantName")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "applicantName")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("applicantMobileNo")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "mobileNo")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("applicantEmail")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "emailId")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("developerName")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "developerName")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("developerLicenseNo")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "developerLicenseNo")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("ownerName")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "ownerName")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("ownerMobileNo")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "ownerMobileNo")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("ownerEmail")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "ownerEmailId")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {camelCaseToHumanReadable("postalAddress")}
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "ownerAddress")}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="text-left w-full">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="font-medium border text-gray-700 border-slate-300 p-2"
                >
                  Plot Abutting Details (Table D)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {/* {camelCaseToHumanReadable("minFrontMOS")} */}
                  Front
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "frontType")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {/* {camelCaseToHumanReadable("minFrontage")} */}
                  Rear
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "rearType")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {/* {camelCaseToHumanReadable("minRearMOS")} */}Side 1
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "side1Type")}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                  {/* {camelCaseToHumanReadable("minRoadWidth")} */}
                  Side 2
                </td>
                <td className="font-normal border text-gray-700 border-slate-300 p-2">
                  {findKeyValue(finalData, "side2Type")}
                </td>
              </tr>
              {/* <tr>
                        <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                          {camelCaseToHumanReadable("minSide1MOS")}
                        </td>
                        <td className="font-normal border text-gray-700 border-slate-300 p-2">
                          {findKeyValue(finalData, "minSide1MOS")}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                          {camelCaseToHumanReadable("minSide2MOS")}
                        </td>
                        <td className="font-normal border text-gray-700 border-slate-300 p-2">
                          {findKeyValue(finalData, "minSide2MOS")}
                        </td>
                      </tr> */}
            </tbody>
          </table>
          <div className="grid grid-flow-col gap-2 my-3">
            <div className="border text-gray-700 border-slate-300 p-2">
              <h3 className="border text-gray-700 border-slate-300 p-2 text-center">
                Coverage Allowable
              </h3>
              <div className="font-normal border text-gray-700 border-slate-300 p-2 text-center">
                60
              </div>
            </div>
            <div className="border text-gray-700 border-slate-300 p-2">
              <h3 className="border text-gray-700 border-slate-300 p-2 text-center">
                Total Coverage Achieved
              </h3>
              <div className="font-normal border text-gray-700 border-slate-300 p-2 text-center">
                {findKeyValue(processedData, "Ground Coverage percentage")}
              </div>
            </div>
            <div className="border text-gray-700 border-slate-300 p-2">
              <h3 className="border text-gray-700 border-slate-300 p-2 text-center">
                Result
              </h3>
              <div className="font-normal border text-gray-700 border-slate-300 p-2 text-center">
                Compliant
              </div>
            </div>
          </div>
          <div className="grid grid-flow-col gap-2 my-3">
            <div className="border text-gray-700 border-slate-300 p-2">
              <h3 className="border text-gray-700 border-slate-300 p-2 text-center">
                FAR Allowable
              </h3>
              <div className="font-normal border text-gray-700 border-slate-300 p-2 text-center">
                1.25
              </div>
            </div>
            <div className="border text-gray-700 border-slate-300 p-2">
              <h3 className="border text-gray-700 border-slate-300 p-2 text-center">
                Total FAR Achieved
              </h3>
              <div className="font-normal border text-gray-700 border-slate-300 p-2 text-center">
                {findKeyValue(processedData, "Floor Area Ratio")}
              </div>
            </div>
            <div className="border text-gray-700 border-slate-300 p-2">
              <h3 className="border text-gray-700 border-slate-300 p-2 text-center">
                Result
              </h3>
              <div className="font-normal border text-gray-700 border-slate-300 p-2 text-center">
                Compliant
              </div>
            </div>
          </div>
          <div className="border text-gray-700 border-slate-300 p-2 my-5">
            Processed on: {formatDate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalInformation;
