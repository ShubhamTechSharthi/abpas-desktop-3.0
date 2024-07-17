import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import MuiInput from "../components/MuiInput";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeneratePdf from "../components/GeneratePdf";
import { removeFormData } from "../store/formSlice";

export default function HomePage() {
  const [filePath, setFilePath] = useState();

  const finalData = useSelector((state) => state.form.formData);
  const finalDataLength = Object.keys(finalData).length;
  const dispatch = useDispatch();

  if (filePath) console.log(filePath);

  const handleFileSelect = () => {
    window.Electron.ipcRenderer.send("process-file", filePath);
  };

  const navigate = useNavigate();

  const [processedData, setProcessedData] = useState(null);

  useEffect(() => {
    window.Electron.ipcRenderer.on("file-processed", (result) => {
      console.log("Received processed data:", result);
      setProcessedData(result); // Update state with received data
      console.log("processed data", processedData);
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
      <div className="flex flex-col items-start h-auto w-full bg-slate-300 my-auto rounded-md">
        <div className="flex bg-gray-600 justify-between items-center w-full px-2 py-1 rounded-t-md">
          <h1 className="text-white">Open Project</h1>
          <button className="text-white" onClick={() => navigate("/")}>
            <RxCross2 />
          </button>
        </div>

        <div className="w-full flex justify-between items-center px-5 my-3">
          <div className="flex gap-3">
            <MuiInput id="project-code" label="Project Code" className="w-36" />
            <MuiInput id="search-text" label="Search Text" className="w-36" />
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-blue-600 text-base"
              onClick={() => {
                dispatch(removeFormData());
                navigate("/projectdetails");
              }}
            >
              NEW
            </Button>
            {finalDataLength > 3 && (
              <Button
                onClick={handleFileSelect}
                className="bg-green-600 text-base"
              >
                SCRUTINIZE
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
            {/* {processedData && <GeneratePdf scrutinyData={processedData} />} */}
            {/* <GeneratePdf scrutinyData={processedData} /> */}
          </div>
        </div>
        {/* <div>
          {processedData && <pre>{JSON.stringify(processedData, null, 2)}</pre>}
        </div> */}
        {processedData && (
          <div className="w-full p-5">
            <h1 className="text-2xl mb-5 text-blue-800">Scrutiny Report</h1>
            <div>
              <h2 className="text-xl mb-5 text-blue-800">Form Data</h2>
              <div className="w-full grid grid-cols-4 gap-4 border border-slate-900 p-2">
                {Object.entries(finalData).map(([key, value], index) => (
                  <div key={index} className="border border-slate-900 p-2">
                    <div className="text-base">{key.toUpperCase()}</div>
                    <div className="text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl my-5 text-blue-800">
                Drawing Compliant Data
              </h2>
              <div className="w-full grid grid-cols-4 gap-4 border border-slate-900 p-2">
                {Object.entries(processedData).map(([key, value], index) => (
                  <div key={index} className="border border-slate-900 p-2">
                    <div className="text-base">{key.toUpperCase()}</div>
                    <div className="text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
