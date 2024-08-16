import { useNavigate } from "react-router-dom";
import logo from "../assets/images/mp.png";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFormData } from "../store/formSlice";
import {
  findKeyValue,
  camelCaseToHumanReadable,
  formatDate,
  findAllKeyValues,
} from "../utils/utils";
import BuildingGeneralDetailsTable from "../components/tableComponents/BuildingGeneralDetails";
import FloorwiseBreakupTable from "../components/tableComponents/FloorWiseBreakup";
import NonFARBreakupTable from "../components/tableComponents/NonFARBreakup";
import SecondaryParameters from "../components/tableComponents/SecondaryParameters";
import BasementHeightDetails from "../components/tableComponents/BasementHeightDetails";
import FireWaterTankCalculation from "../components/tableComponents/FireWaterTankCalculation";
import WaterTankCalculation from "../components/tableComponents/WaterTankCalculation";
import BathroomRelatedHeightDeatils from "../components/tableComponents/BathroomRelatedHeightDetails";
import DimensionsAndVentilationDetails from "../components/tableComponents/DimensionsAndVentilationDetails";
import VentilationShaftCalculation from "../components/tableComponents/VentilationShaftDetails";
import RiserCountPerFlight from "../components/tableComponents/RiserCountPerFlight";
import OtherHelightDetails from "../components/tableComponents/OtherHeightDetails";
import KitchenHeightDetails from "../components/tableComponents/KitchenHeightDetails";
import HabitableHeightDeatils from "../components/tableComponents/HabitableHeightDetails";
import StaircaseDetails from "../components/tableComponents/StaircaseDetails";
import ContinuousBalcony from "../components/tableComponents/ContinuousBalcony";
import ECSParkingReuired from "../components/tableComponents/ECSParkingRequired";

const finalFormData = {
  actualFrontage: "1",
  applicationId: "123",
  buildingActivity: "Guest Houses",
  buildingIsFor: "Self Use",
  buildingUse: "Educational",
  bulidingHeight: "1",
  caseType: "ERECT",
  colonyName: "sdc",
  deductionInPlot: "1",
  developerLicenseNo: "1234567890",
  developerName: "gcgcg",
  district: "Bhopal",
  division: "Bhopal",
  email: "asc@gmail.com",
  existBuidlingHeight: "1",
  existBuildUpArea: "1",
  existGroundCovrage: "1",
  existingNoOfFloor: "1",
  floorAreaRation: "1.25",
  grossPlotArea: "1",
  groundCoverageAera: "1",
  isPlotIrregular: "No",
  landSubUse: "Mandi",
  landUse: "Industrial Zone",
  layoutApproval: "Colony Regularized by ULB",
  maxBuildingHeight: "N/A",
  maxGroundCovrage: "50",
  minFrontMOS: "N/A",
  minFrontage: "N/A",
  minRearMOS: "N/A",
  minRequiredParking: "On No. of Bed",
  minRoadWidth: "N/A",
  minSide1MOS: "N/A",
  minSide2MOS: "N/A",
  mobileNo: "1234567890",
  name: "sdc",
  netPlotArea: "1",
  noOfFloor: "3",
  ownerEmail: "asc@gmail.com",
  ownerMobileNo: "1234567890",
  ownerName: "asasc",
  plotDepth: "1",
  plotNo: "12",
  plotWidth: "1",
  postalAddress: "ascascascascsac",
  propBuildUpArea: "1",
  roadWidending: "1",
  siteAddress: "ascascascascascasc",
  streetWidth: "1",
  typeOfBuilding: "Residential Buildings hieght up to 12.5 Meters",
  typeOfConstruction:
    "A building intended to be used for any social charitable, culture, Educational purposes, Dharmasala and similar types of building and any other purpose not specifically provided for",
  typeOfConsultant: "Architect",
  typeOfPlot: "Single Plot",
  ulb: "Berasia",
  ward: "12",
  zone: "21",
};

export default function HomePage() {
  const [filePath, setFilePath] = useState();

  const finalData = useSelector((state) => state.form.formData);
  const finalDataLength = Object.keys(finalData).length;
  const dispatch = useDispatch();

  // if (filePath) console.log(filePath);

  const handleFileSelect = () => {
    window.Electron.ipcRenderer.send("process-file", filePath);
  };

  const navigate = useNavigate();

  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    window.Electron.ipcRenderer.on("file-processed", (result) => {
      console.log("Received processed data:", result);
      setProcessedData(result); // Update state with received data
    });

    return () => {
      window.Electron.ipcRenderer.removeListener("file-processed");
    };
  }, []);

  const showFinalData = () => {
    console.log(finalData);
  };

  return (
    <div className="h-full flex justify-center">
      <div className="flex flex-col P-4 items-start h-auto w-full bg-slate-300 my-auto rounded-md">
        <div className="flex bg-gray-600 justify-between items-center w-full px-2 py-1 rounded-t-md">
          <h1 className="text-white">Dashboard</h1>
        </div>

        <div className="w-full flex justify-between items-center px-5 my-3">
          <div className="flex gap-2">
            <Button
              className="bg-blue-600 text-base"
              onClick={() => {
                dispatch(removeFormData());
                navigate("/projectdetails");
              }}
            >
              New
            </Button>
            {finalDataLength > 3 && (
              <Button
                onClick={handleFileSelect}
                className="bg-green-600 text-base"
              >
                Scrutinize
              </Button>
            )}
            {/* <Button onClick={() => showFinalData()} className="bg-red-600">
              Final Data
            </Button> */}
            {finalDataLength > 3 && (
              <input
                type="file"
                onChange={(e) => {
                  setFilePath(e.target.files[0].path);
                }}
              />
            )}
          </div>
        </div>

        {processedData && (
          <div className="w-full flex justify-center">
            <div className="bg-white border-gray-200 shadow tab-sty-report p-5">
              <div className="m-auto mb-8 relative">
                <img
                  className="h-20 w-20 absolute top-0 left-0"
                  src={logo}
                  alt="logo"
                />
                <h1 className="text-2xl text-cyan-700 text-center">
                  Scrutiny Report
                </h1>
              </div>
              <div className="flex justify-center mb-3">
                <h2 className="w-1/4 font-medium text-center p-1 border border-slate-900">
                  Type of Building
                </h2>
                <h2 className="w-1/4 font-medium text-center p-1 border border-slate-900">
                  Row Type
                </h2>
              </div>

              {/* Proposal information */}
              <div>
                <h3 className=" font-medium text-center p-1 bg-gray-400 border border-slate-900">
                  Proposal information
                </h3>
                <div className="w-full grid grid-cols-2 gap-2 mb-5">
                  <div className="">
                    <table className="text-left w-full">
                      <thead>
                        <tr>
                          <th
                            colSpan={2}
                            className="font-medium border border-slate-900"
                          >
                            Plot Details (Table A)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="">
                          <td className="w-1/4 font-medium border border-slate-900">
                            Plot No
                          </td>
                          <td className="font-normal border border-slate-900">
                            PLOT No. {findKeyValue(finalData, "plotNo")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("siteAddress")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "siteAddress")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="text-left w-full">
                      <thead>
                        <tr>
                          <th
                            colSpan={2}
                            className="font-medium border border-slate-900"
                          >
                            Proposal Details (Table C)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("applicationId")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "applicationId")}
                          </td>
                        </tr>

                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("buildingIsFor")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "buildingIsFor")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("caseType")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "caseType")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("division")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "division")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("district")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "district")}
                          </td>
                        </tr>

                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("ulb")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "ulb")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("zone")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "zone")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("ward")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "ward")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("colonyName")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "colonyName")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("isPlotIrregular")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "isPlotIrregular")}
                          </td>
                        </tr>

                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("landUse")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "landUse")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("landSubUse")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "landSubUse")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("buildingActivity")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "buildingActivity")}
                          </td>
                        </tr>

                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("buildingUse")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "buildingUse")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("layoutApproval")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "layoutApproval")}
                          </td>
                        </tr>

                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("grossPlotArea")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "grossPlotArea")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("netPlotArea")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "netPlotArea")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("plotDepth")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "plotDepth")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("plotWidth")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "plotWidth")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {/* {camelCaseToHumanReadable("roadStreetWidth")} */}
                            Road/Street Width
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "roadStreetWidth")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("typeOfBuilding")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "typeOfBuilding")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("typeOfPlot")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "typeOfPlot")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("noOfFloor")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "noOfFloor")}
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
                            className="font-medium border border-slate-900"
                          >
                            Project Details (Table B)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("typeOfConsultant")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "typeOfConsultant")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("applicantName")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "applicantName")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("applicantMobileNo")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "applicantMobileNo")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("applicantEmail")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "applicantEmail")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("developerName")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "developerName")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("developerLicenseNo")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "developerLicenseNo")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("ownerName")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "ownerName")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("ownerMobileNo")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "ownerMobileNo")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("ownerEmail")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "ownerEmail")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {camelCaseToHumanReadable("postalAddress")}
                          </td>
                          <td className="font-normal border border-slate-900">
                            {findKeyValue(finalData, "postalAddress")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="text-left w-full">
                      <thead>
                        <tr>
                          <th
                            colSpan={2}
                            className="font-medium border border-slate-900"
                          >
                            Plot Abutting Details (Table D)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {/* {camelCaseToHumanReadable("minFrontMOS")} */}
                            Front
                          </td>
                          <td className="font-normal border border-slate-900">
                            {/* {findKeyValue(finalData, "minFrontMOS")} */}N/A
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {/* {camelCaseToHumanReadable("minFrontage")} */}
                            Rear
                          </td>
                          <td className="font-normal border border-slate-900">
                            {/* {findKeyValue(finalData, "minFrontage")} */}N/A
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {/* {camelCaseToHumanReadable("minRearMOS")} */}Side
                            1
                          </td>
                          <td className="font-normal border border-slate-900">
                            {/* {findKeyValue(finalData, "minRearMOS")} */}N/A
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border border-slate-900">
                            {/* {camelCaseToHumanReadable("minRoadWidth")} */}
                            Side 2
                          </td>
                          <td className="font-normal border border-slate-900">
                            {/* {findKeyValue(finalData, "minRoadWidth")} */}N/A
                          </td>
                        </tr>
                        {/* <tr>
                        <td className="w-1/4 font-medium border border-slate-900">
                          {camelCaseToHumanReadable("minSide1MOS")}
                        </td>
                        <td className="font-normal border border-slate-900">
                          {findKeyValue(finalData, "minSide1MOS")}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-1/4 font-medium border border-slate-900">
                          {camelCaseToHumanReadable("minSide2MOS")}
                        </td>
                        <td className="font-normal border border-slate-900">
                          {findKeyValue(finalData, "minSide2MOS")}
                        </td>
                      </tr> */}
                      </tbody>
                    </table>
                    <div className="grid grid-flow-col gap-2 my-3">
                      <div className="border border-slate-900">
                        <h3 className="border border-slate-900 text-center">
                          Coverage Allowable
                        </h3>
                        <div className="font-normal border border-slate-900 text-center">
                          60
                        </div>
                      </div>
                      <div className="border border-slate-900">
                        <h3 className="border border-slate-900 text-center">
                          Total Coverage Achieved
                        </h3>
                        <div className="font-normal border border-slate-900 text-center">
                          {findKeyValue(
                            processedData,
                            "Ground Coverage percentage"
                          )}
                        </div>
                      </div>
                      <div className="border border-slate-900">
                        <h3 className="border border-slate-900 text-center">
                          Result
                        </h3>
                        <div className="font-normal border border-slate-900 text-center">
                          Compliant
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-flow-col gap-2 my-3">
                      <div className="border border-slate-900">
                        <h3 className="border border-slate-900 text-center">
                          FAR Allowable
                        </h3>
                        <div className="font-normal border border-slate-900 text-center">
                          1.25
                        </div>
                      </div>
                      <div className="border border-slate-900">
                        <h3 className="border border-slate-900 text-center">
                          Total FAR Achieved
                        </h3>
                        <div className="font-normal border border-slate-900 text-center">
                          {findKeyValue(processedData, "Floor Area Ratio")}
                        </div>
                      </div>
                      <div className="border border-slate-900">
                        <h3 className="border border-slate-900 text-center">
                          Result
                        </h3>
                        <div className="font-normal border border-slate-900 text-center">
                          Compliant
                        </div>
                      </div>
                    </div>
                    <div className="border border-slate-900 p-1 my-5">
                      Processed on: {formatDate()}
                    </div>
                  </div>
                </div>
              </div>
              {/* Comparison User Input and Information from Drawing and Database */}
              <div className="bg-white border-gray-200 shadow my-5">
                <h3 className="font-medium text-center p-1 bg-gray-400 border border-slate-900">
                  Comparison User Input and Information from Drawing and
                  Database
                </h3>
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th
                        colSpan={5}
                        className="font-medium border border-slate-900"
                      >
                        User Inputs (Parameters of Approved Layout)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr>
                      <td className="font-medium border border-slate-900">
                        No. of Floors
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">Given as input : </span>
                        {findKeyValue(finalData, "noOfFloor")}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">
                          Extracted from the drawing :{" "}
                        </span>
                        {findKeyValue(processedData, "Number of floors:")}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">
                          Difference in number :{" "}
                        </span>
                        {Math.abs(
                          findKeyValue(processedData, "Number of floors:") -
                            findKeyValue(finalData, "noOfFloor")
                        )}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">Result : </span>
                        {Math.abs(
                          findKeyValue(processedData, "Number of floors:") -
                            findKeyValue(finalData, "noOfFloor")
                        ) === 0
                          ? "Compliant"
                          : "Non Compliant"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium border border-slate-900">
                        Building Height
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">Given as input : </span>
                        {findKeyValue(finalData, "bulidingHeight")}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">
                          Extracted from the drawing :{" "}
                        </span>
                        {findKeyValue(processedData, "Building height:")}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">
                          Difference in number :{" "}
                        </span>
                        {Math.abs(
                          findKeyValue(processedData, "Building height:") -
                            findKeyValue(finalData, "bulidingHeight")
                        )}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">Result : </span>
                        {Math.abs(
                          findKeyValue(processedData, "Building height:") -
                            findKeyValue(finalData, "bulidingHeight")
                        ) === 0
                          ? "Compliant"
                          : "Non Compliant"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium border border-slate-900">
                        Proposed Builtup Area
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">Given as input : </span>
                        {findKeyValue(finalData, "propBuildUpArea")}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">
                          Extracted from the drawing :{" "}
                        </span>
                        {findKeyValue(processedData, "Proposed builtup area:")}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">
                          Difference in number :{" "}
                        </span>
                        {Math.abs(
                          findKeyValue(
                            processedData,
                            "Proposed builtup area:"
                          ) - findKeyValue(finalData, "propBuildUpArea")
                        )}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">Result : </span>
                        {Math.abs(
                          findKeyValue(
                            processedData,
                            "Proposed builtup area:"
                          ) - findKeyValue(finalData, "propBuildUpArea")
                        ) === 0
                          ? "Compliant"
                          : "Non Compliant"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium border border-slate-900">
                        Gross Plot Area
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">Given as input : </span>
                        {findKeyValue(finalData, "grossPlotArea")}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">
                          Extracted from the drawing :{" "}
                        </span>
                        {findKeyValue(processedData, "Plot area:")}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">
                          Difference in number :{" "}
                        </span>
                        {Math.abs(
                          findKeyValue(processedData, "Plot area:") -
                            findKeyValue(finalData, "grossPlotArea")
                        )}
                      </td>
                      <td className="font-normal border border-slate-900">
                        <span className="font-medium">Result : </span>
                        {Math.abs(
                          findKeyValue(processedData, "Plot area:") -
                            findKeyValue(finalData, "grossPlotArea")
                        ) === 0
                          ? "Compliant"
                          : "Non Compliant"}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/4 font-medium border border-slate-900">
                        {camelCaseToHumanReadable("typeOfConstruction")}
                      </td>
                      <td
                        colSpan={4}
                        className="font-normal border border-slate-900"
                      >
                        {findKeyValue(finalData, "typeOfConstruction")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Building General Details */}
              <BuildingGeneralDetailsTable
                data={processedData["Building General Details Table"]}
              />
              {/* Comparison of Colony Rules with Master Plan / BVN */}
              <div className="bg-white border-gray-200 shadow my-5">
                <h3 className="font-medium text-center p-1 bg-gray-400 border border-slate-900">
                  Comparison of Colony Rules with Master Plan / BVN
                </h3>
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th className="font-medium border border-slate-900">
                        Section
                      </th>
                      <th className="font-medium border border-slate-900">
                        Parameter
                      </th>
                      <th className="font-medium border border-slate-900">
                        Minimum Required
                      </th>
                      <th className="font-medium border border-slate-900">
                        Maximum Permissible
                      </th>
                      <th className="font-medium border border-slate-900">
                        Required Values As per Colony Rules
                      </th>
                      <th className="font-medium border border-slate-900">
                        Provided
                      </th>
                      <th className="font-medium border border-slate-900">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">
                        Building Height
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">9</td>
                      <td className="font-normal border border-slate-900">9</td>
                      <td className="font-normal border border-slate-900">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border border-slate-900">
                        Net Plot Area
                      </td>
                      <td className="font-normal border border-slate-900">
                        75
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        92.72
                      </td>
                      <td className="font-normal border border-slate-900">
                        92.72
                      </td>
                      <td className="font-normal border border-slate-900">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border border-slate-900">
                        FAR
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.25
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.25
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.2455
                      </td>
                      <td className="font-normal border border-slate-900">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border border-slate-900">
                        Ground Coverage (In Percentage)
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        50.00
                      </td>
                      <td className="font-normal border border-slate-900">
                        60.00
                      </td>
                      <td className="font-normal border border-slate-900">
                        50.50
                      </td>
                      <td className="font-normal border border-slate-900">
                        Compliant as per Colony Cell but violated BVN/MasterPlan
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">
                        Road Width
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        9.00
                      </td>
                      <td className="font-normal border border-slate-900">
                        9.00
                      </td>
                      <td className="font-normal border border-slate-900">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        BVR 53(1)
                      </td>
                      <td className="font-normal border border-slate-900">
                        Frontage of Plot
                      </td>
                      <td className="font-normal border border-slate-900">
                        7.00
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        7.60
                      </td>
                      <td className="font-normal border border-slate-900">
                        7.60
                      </td>
                      <td className="font-normal border border-slate-900">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border border-slate-900">
                        Front Open Space
                      </td>
                      <td className="font-normal border border-slate-900">3</td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        3.00
                      </td>
                      <td className="font-normal border border-slate-900">
                        3.00
                      </td>
                      <td className="font-normal border border-slate-900">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border border-slate-900">
                        Side1 Open Space
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">0</td>
                      <td className="font-normal border border-slate-900">
                        Not Provided
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border border-slate-900">
                        Side2 Open Space
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">0</td>
                      <td className="font-normal border border-slate-900">
                        Not provided
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border border-slate-900">
                        Rear Open Space
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.5
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.50
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.60
                      </td>
                      <td className="font-normal border border-slate-900">
                        Compliant
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*Primary Parameters */}
              <div className="bg-white border-gray-200 shadow my-5">
                <h3 className="font-medium text-center p-1 bg-gray-400 border border-slate-900">
                  Primary Parameters
                </h3>
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th className="font-medium border border-slate-900">
                        Rules/Table
                      </th>
                      <th className="font-medium border border-slate-900">
                        Parameter
                      </th>
                      <th className="font-medium border border-slate-900">
                        Minimum Required
                      </th>
                      <th className="font-medium border border-slate-900">
                        Maximum Permissible
                      </th>
                      <th className="font-medium border border-slate-900">
                        Provided
                      </th>
                      <th className="font-medium border border-slate-900">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">
                        Area of Road widening
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        Not Provided
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        BVR 64
                      </td>
                      <td className="font-normal border border-slate-900">
                        Site Area Requirement for Service Floor
                      </td>
                      <td className="font-normal border border-slate-900">
                        1,000.00
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        Not Provided
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        BVR 58 [1(C)]
                      </td>
                      <td className="font-normal border border-slate-900">
                        Projection Plot Clearance Front
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.5
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        Not Provided
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        BVR 58 [1(C)]
                      </td>
                      <td className="font-normal border border-slate-900">
                        Projection Plot Clearance Side1
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.5
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        Not Provided
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        BVR 58 [1(C)]
                      </td>
                      <td className="font-normal border border-slate-900">
                        Projection Plot Clearance Side2
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.5
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        Not Provided
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        BVR 58 [1(C)]
                      </td>
                      <td className="font-normal border border-slate-900">
                        Projection Plot Clearance Rear
                      </td>
                      <td className="font-normal border border-slate-900">
                        1.5
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                      <td className="font-normal border border-slate-900">
                        Not Provided
                      </td>
                      <td className="font-normal border border-slate-900">
                        N/A
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*Ground Coverage Breakup */}
              <div className="bg-white border-gray-200 shadow my-5">
                <h3 className="font-medium text-center p-1 bg-gray-400 border border-slate-900">
                  Ground Coverage Breakup
                </h3>
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th className="font-medium border border-slate-900">
                        Floor Name
                      </th>
                      <th className="font-medium border border-slate-900">
                        Plinth
                      </th>
                      <th className="font-medium border border-slate-900">
                        Object in Plinth
                      </th>
                      <th className="font-medium border border-slate-900">
                        Object outside Plinth
                      </th>
                      <th className="font-medium border border-slate-900">
                        Plinth Area
                      </th>
                      <th className="font-medium border border-slate-900">
                        Plinth Deduction Area
                      </th>
                      <th className="font-medium border border-slate-900">
                        Outer Allowable Area
                      </th>
                      <th className="font-medium border border-slate-900">
                        Outer Allowable Non Area
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        Floor-Ground
                      </td>
                      <td className="font-normal border border-slate-900">
                        Single
                      </td>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">
                        54.29
                      </td>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">-</td>
                    </tr>
                    <tr>
                      <td className="font-normal border border-slate-900">
                        Floor-Ground
                      </td>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">
                        Staircase
                      </td>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">
                        7.47
                      </td>
                      <td className="font-normal border border-slate-900">-</td>
                      <td className="font-normal border border-slate-900">-</td>
                    </tr>
                    <tr>
                      <td className="font-medium border border-slate-900">
                        Total
                      </td>
                      <td className="font-medium border border-slate-900">-</td>
                      <td className="font-medium border border-slate-900">-</td>
                      <td className="font-medium border border-slate-900">-</td>
                      <td className="font-medium border border-slate-900">
                        54.29
                      </td>
                      <td className="font-medium border border-slate-900">
                        7.47
                      </td>
                      <td className="font-medium border border-slate-900">
                        0.00
                      </td>
                      <td className="font-medium border border-slate-900">
                        0.00
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border border-slate-900"
                      >
                        Coverage Area = 54.29 - 7.47 +0.00
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border border-slate-900"
                      >
                        46.82
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border border-slate-900"
                      >
                        Proposed Coverage Area
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border border-slate-900"
                      >
                        46.82117
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border border-slate-900"
                      >
                        Existing Coverage Area
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border border-slate-900"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border border-slate-900"
                      >
                        Total Coverage Area
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border border-slate-900"
                      >
                        46.82117
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border border-slate-900"
                      >
                        Coverage Percentage
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border border-slate-900"
                      >
                        50.5
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*Floorwise Breakup */}
              <FloorwiseBreakupTable
                data={processedData["Floor Wise Breakup Table"]}
              />
              {/*NonFar Breakup */}
              <NonFARBreakupTable
                data={processedData["Non FAR Breakup Table"]}
              />
              {/* Secondary Parameters */}
              <SecondaryParameters />
              {/* Basement Height Details */}
              <BasementHeightDetails />
              {/* Habitable Height Details */}
              <HabitableHeightDeatils />
              {/* Kitchen Height Details */}
              <KitchenHeightDetails />
              {/* Bathroom Related Height Details */}
              <BathroomRelatedHeightDeatils />
              {/* Other Height Details */}
              <OtherHelightDetails />
              {/* Continuous Balcony */}
              <ContinuousBalcony />
              {/* ECS Parking Required */}
              <ECSParkingReuired />
              {/* Area, Dimensions And Ventilation Details */}
              <DimensionsAndVentilationDetails />
              {/* Staircase Details [BVR 80] */}
              <StaircaseDetails />
              {/* Riser Count Per Flight [BVR 80(5)] */}
              <RiserCountPerFlight />
              {/* Ventilation Shaft Details [BVR 56 (6b)] */}
              <VentilationShaftCalculation />
              {/* Water Tank Calculation */}
              <WaterTankCalculation />
              {/* Fire Water Tank Calculation */}
              <FireWaterTankCalculation />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
