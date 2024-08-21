import { useNavigate } from "react-router-dom";
import logo from "../assets/images/mp.png";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { GrCloudUpload } from "react-icons/gr";
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

import CryptoJS from "crypto-js";

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
  const [drawingFileName, setDrawingFileName] = useState("Upload drawing file");
  const [encryptedFileName, setEncryptedFileName] = useState(
    "Upload encrypted file"
  );
  const [filePath, setFilePath] = useState();
  const [finalData, setFinalData] = useState();

  // const finalData = useSelector((state) => state.form.formData);
  // const finalDataLength = Object.keys(finalData).length;
  // const dispatch = useDispatch();

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

  const key = CryptoJS.enc.Utf8.parse("1234567890123456");
  const iv = CryptoJS.enc.Utf8.parse("1234567890123456");

  function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv });
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDrawingFileName(file.name);
      setFilePath(file.path);
    }
  };

  const handleEncryption = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEncryptedFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const encryptedData = reader.result;
        try {
          const decryptedData = decrypt(encryptedData);
          setFinalData(decryptedData);
        } catch (e) {
          console.error("Failed to decrypt data:", e);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="h-full flex justify-center">
      <div className="flex flex-col P-4 items-start h-auto w-full bg-slate-300 my-auto rounded-md">
        <div className="flex bg-gray-600 justify-between items-center w-full px-2 py-1 rounded-t-md">
          <h1 className="text-white">Dashboard</h1>
        </div>

        {/* <div className="w-full flex justify-between items-center px-5 my-3">
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
            <Button onClick={() => showFinalData()} className="bg-red-600">
              Final Data
            </Button>
            {finalDataLength > 3 && (
              <input
                type="file"
                onChange={(e) => {
                  setFilePath(e.target.files[0].path);
                }}
              />
            )}
          </div>
        </div> */}
        <div className="w-full flex ">
          <div className=" w-[90%] justify-start flex items-center px-5 my-3">
            <div className="w-[15%] mr-4">
              <label htmlFor="drawingfile">Select drawing file: &nbsp;</label>
              <br />
              <label
                for="drawingfile"
                title={drawingFileName}
                className=" text-ellipsis overflow-hidden flex bg-blue-700 cursor-pointer text-white p-2 border border-blue-500 rounded-md
               custom-file-upload"
              >
                <GrCloudUpload />
                &nbsp; {drawingFileName}
              </label>
              <input
                type="file"
                id="drawingfile"
                className=""
                onChange={handleFileChange}
              />
            </div>
            <div className="w-[15%]">
              <label htmlFor="drawingfile">Select encrypted file: &nbsp;</label>
              <label
                for="encryptedfile"
                title={encryptedFileName}
                className="flex  bg-blue-700 text-white p-2 border border-blue-500 rounded-md
               custom-file-upload"
              >
                <GrCloudUpload />
                &nbsp; {encryptedFileName}
              </label>
              <input
                type="file"
                id="encryptedfile"
                onChange={handleEncryption}
              />
            </div>

            {/* <Button onClick={() => showFinalData()} className="bg-red-600">
            Final Data
          </Button> */}
          </div>
          <div className=" w-[10%] justify-start flex items-center px-5 my-3">
            <Button
              onClick={handleFileSelect}
              className="bg-green-600 text-base"
            >
              Scrutinize
            </Button>
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
                <h2 className="w-1/4 font-medium text-center border text-gray-700 border-slate-300 p-2">
                  Type of Building
                </h2>
                <h2 className="w-1/4 font-medium text-center border text-gray-700 border-slate-300 p-2">
                  Row Type
                </h2>
              </div>

              {/* Proposal information */}
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
                            {findKeyValue(finalData, "caseType")}
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
                            {findKeyValue(finalData, "landUse")}
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
                            {findKeyValue(finalData, "buildingActivity")}
                          </td>
                        </tr>

                        <tr>
                          <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                            {camelCaseToHumanReadable("buildingUse")}
                          </td>
                          <td className="font-normal border text-gray-700 border-slate-300 p-2">
                            {findKeyValue(finalData, "buildingUse")}
                          </td>
                        </tr>
                        <tr>
                          <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                            {camelCaseToHumanReadable("layoutApproval")}
                          </td>
                          <td className="font-normal border text-gray-700 border-slate-300 p-2">
                            {findKeyValue(finalData, "layoutApprovalType")}
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
                            {findKeyValue(finalData, "typeOfBuilding")}
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
                            {/* {camelCaseToHumanReadable("minRearMOS")} */}Side
                            1
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
                          {findKeyValue(
                            processedData,
                            "Ground Coverage percentage"
                          )}
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
              {/* Comparison User Input and Information from Drawing and Database */}
              <div className="bg-white border-gray-200 shadow my-5">
                <h3 className="font-bold text-center bg-gray-400 border text-gray-700 border-slate-300 p-2">
                  Comparison User Input and Information from Drawing and
                  Database
                </h3>
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th
                        colSpan={5}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        User Inputs (Parameters of Approved Layout)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        No. of Floors
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">Given as input : </span>
                        {findKeyValue(finalData, "proposedNoOfFloors")}
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">
                          Extracted from the drawing :{" "}
                        </span>
                        {findKeyValue(processedData, "Number of floors:")}
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">
                          Difference in number :{" "}
                        </span>
                        {Math.abs(
                          findKeyValue(processedData, "Number of floors:") -
                            findKeyValue(finalData, "proposedNoOfFloors")
                        )}
                      </td>
                      <td
                        className={` font-bold border p-2 ${
                          Math.abs(
                            findKeyValue(processedData, "Number of floors:") -
                              findKeyValue(finalData, "proposedNoOfFloors")
                          ) === 0
                            ? "text-green-700 border-slate-300"
                            : "text-red-700 border-slate-300"
                        }`}
                      >
                        <span className="font-medium">Result : </span>
                        {Math.abs(
                          findKeyValue(processedData, "Number of floors:") -
                            findKeyValue(finalData, "proposedNoOfFloors")
                        ) === 0
                          ? "Compliant"
                          : "Non Compliant"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        Building Height
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">Given as input : </span>
                        {findKeyValue(finalData, "proposedBuildingHeight")}
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">
                          Extracted from the drawing :{" "}
                        </span>
                        {findKeyValue(processedData, "Building height:")}
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">
                          Difference in number :{" "}
                        </span>
                        {Math.abs(
                          findKeyValue(processedData, "Building height:") -
                            findKeyValue(finalData, "proposedBuildingHeight")
                        )}
                      </td>
                      <td
                        className={` font-bold border p-2 ${
                          Math.abs(
                            findKeyValue(processedData, "Number of floors:") -
                              findKeyValue(finalData, "proposedNoOfFloors")
                          ) === 0
                            ? "text-green-700 border-slate-300"
                            : "text-red-700 border-slate-300"
                        }`}
                      >
                        <span className="font-medium">Result : </span>
                        {Math.abs(
                          findKeyValue(processedData, "Building height:") -
                            findKeyValue(finalData, "proposedBuildingHeight")
                        ) === 0
                          ? "Compliant"
                          : "Non Compliant"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        Proposed Builtup Area
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">Given as input : </span>
                        {findKeyValue(finalData, "proposedBuiltUpArea")}
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">
                          Extracted from the drawing :{" "}
                        </span>
                        {findKeyValue(processedData, "Proposed builtup area:")}
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">
                          Difference in number :{" "}
                        </span>
                        {Math.abs(
                          findKeyValue(
                            processedData,
                            "Proposed builtup area:"
                          ) - findKeyValue(finalData, "proposedBuiltUpArea")
                        ).toFixed(2)}
                      </td>
                      <td
                        className={` font-bold border p-2 ${
                          Math.abs(
                            findKeyValue(processedData, "Number of floors:") -
                              findKeyValue(finalData, "proposedNoOfFloors")
                          ) === 0
                            ? "text-green-700 border-slate-300"
                            : "text-red-700 border-slate-300"
                        }`}
                      >
                        <span className="font-medium">Result : </span>
                        {Math.abs(
                          findKeyValue(
                            processedData,
                            "Proposed builtup area:"
                          ) - findKeyValue(finalData, "proposedBuiltUpArea")
                        ) === 0
                          ? "Compliant"
                          : "Non Compliant"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        Gross Plot Area
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">Given as input : </span>
                        {findKeyValue(finalData, "grossPlotArea")}
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">
                          Extracted from the drawing :{" "}
                        </span>
                        {findKeyValue(processedData, "Plot area:")}
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        <span className="font-medium">
                          Difference in number :{" "}
                        </span>
                        {Math.abs(
                          findKeyValue(processedData, "Plot area:") -
                            findKeyValue(finalData, "grossPlotArea")
                        )}
                      </td>
                      <td
                        className={` font-bold border p-2 ${
                          Math.abs(
                            findKeyValue(processedData, "Number of floors:") -
                              findKeyValue(finalData, "proposedNoOfFloors")
                          ) === 0
                            ? "text-green-700 border-slate-300"
                            : "text-red-700 border-slate-300"
                        }`}
                      >
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
                      <td className="w-1/4 font-medium border text-gray-700 border-slate-300 p-2">
                        {camelCaseToHumanReadable("typeOfConstruction")}
                      </td>
                      <td
                        colSpan={4}
                        className="font-normal border text-gray-700 border-slate-300 p-2"
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
                <h3 className="font-bold text-center bg-gray-400 border text-gray-700 border-slate-300 p-2">
                  Comparison of Colony Rules with Master Plan / BVN
                </h3>
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Section
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Parameter
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Minimum Required
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Maximum Permissible
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Required Values As per Colony Rules
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Provided
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Building Height
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        9
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        9
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Net Plot Area
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        75
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        92.72
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        92.72
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        FAR
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.25
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.25
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.24
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Ground Coverage (In Percentage)
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        50.00
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        60.00
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        50.50
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Compliant as per Colony Cell but violated BVN/MasterPlan
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Road Width
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        9.00
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        9.00
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        BVR 53(1)
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Frontage of Plot
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        7.00
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        7.60
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        7.60
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Front Open Space
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        3
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        3.00
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        3.00
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Compliant
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Side1 Open Space
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        0
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Not Provided
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Side2 Open Space
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        0
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Not provided
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        MP-BHO-4-T-2
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Rear Open Space
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.5
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.50
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.60
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Compliant
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*Primary Parameters */}
              <div className="bg-white border-gray-200 shadow my-5">
                <h3 className="font-bold text-center bg-gray-400 border text-gray-700 border-slate-300 p-2">
                  Primary Parameters
                </h3>
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Rules/Table
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Parameter
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Minimum Required
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Maximum Permissible
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Provided
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Area of Road widening
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Not Provided
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        BVR 64
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Site Area Requirement for Service Floor
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1,000.00
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Not Provided
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        BVR 58 [1(C)]
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Projection Plot Clearance Front
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.5
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Not Provided
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        BVR 58 [1(C)]
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Projection Plot Clearance Side1
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.5
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Not Provided
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        BVR 58 [1(C)]
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Projection Plot Clearance Side2
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.5
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Not Provided
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        BVR 58 [1(C)]
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Projection Plot Clearance Rear
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        1.5
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Not Provided
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        N/A
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*Ground Coverage Breakup */}
              <div className="bg-white border-gray-200 shadow my-5">
                <h3 className="font-bold text-center bg-gray-400 border text-gray-700 border-slate-300 p-2">
                  Ground Coverage Breakup
                </h3>
                <table className="text-left w-full">
                  <thead>
                    <tr>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Floor Name
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Plinth
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Object in Plinth
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Object outside Plinth
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Plinth Area
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Plinth Deduction Area
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Outer Allowable Area
                      </th>
                      <th className="font-medium border text-gray-700 border-slate-300 p-2">
                        Outer Allowable Non Area
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Floor-Ground
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Single
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        54.29
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Floor-Ground
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        Staircase
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        7.47
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-normal border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                    </tr>
                    <tr>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        Total
                      </td>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        -
                      </td>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        54.29
                      </td>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        7.47
                      </td>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        0
                      </td>
                      <td className="font-medium border text-gray-700 border-slate-300 p-2">
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        Coverage Area = 54.29 - 7.47 +0.00
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        46.82
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        Proposed Coverage Area
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        46.82
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        Existing Coverage Area
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        0
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        Total Coverage Area
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        46.8
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={5}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
                      >
                        Coverage Percentage
                      </td>
                      <td
                        colSpan={3}
                        className="font-medium border text-gray-700 border-slate-300 p-2"
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
