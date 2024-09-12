import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { GrCloudUpload } from "react-icons/gr";
import CryptoJS from "crypto-js";
import FinalReport from "../components/FinalReportsComponents/FinalReport";
import Swal from "sweetalert2";
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
    // console.log("scrutinydata", scrutinyData);
    if (
      drawingFileName === "Upload drawing file" ||
      encryptedFileName === "Upload encrypted file"
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload drawing file and encrypted file before proceeding!",
      });
    } else {
      window.Electron.ipcRenderer.send("process-file", filePath);
    }
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
          <FinalReport finalData={finalData} processedData={processedData} />
        )}
      </div>
    </div>
  );
}
