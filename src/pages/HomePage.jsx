import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import MuiInput from "../components/MuiInput";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    });

    return () => {
      window.Electron.ipcRenderer.removeListener("file-processed");
    };
  }, []);

  const showFinalData = () => {
    console.log(finalData);
  };

  const camelCaseToHumanReadable = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert a space between lowercase and uppercase letters
      .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
  };

  return (
    <div className="h-full flex justify-center">
      <div className="flex flex-col P-4 items-start h-auto w-full bg-slate-300 my-auto rounded-md">
        <div className="flex bg-gray-600 justify-between items-center w-full px-2 py-1 rounded-t-md">
          <h1 className="text-white">Dashboard</h1>
        </div>

        <div className="w-full flex justify-between items-center px-5 my-3">
          {/* <div className="flex gap-3">
            <MuiInput id="project-code" label="Project Code" className="w-36" />
            <MuiInput id="search-text" label="Search Text" className="w-36" />
          </div> */}
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
            {finalDataLength > 12 && (
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
            {finalDataLength > 12 && (
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
          <div>
            <div className="bg-white border-gray-200 shadow tab-sty-report p-5">
              <div className="grid grid-cols-1 m-auto mb-3">
                <h1 className="text-3xl text-cyan-700 text-center">
                  Scrutiny Report
                </h1>
              </div>
              <h3 className=" text-lg font-medium text-left p-2 bg-gray-400">
                Proposal Information
              </h3>

              {/* <h2 className="text-xl mb-5 text-blue-800">Form Data</h2> */}
              <div className="w-full grid grid-cols-4 gap-4 border border-slate-900 p-2">
                {Object.entries(finalData).map(([key, value], index) => (
                  <table className="text-left">
                    <tbody className="bg-slate-200">
                      <td className="p-3"> {camelCaseToHumanReadable(key)}</td>
                      <td className="text-right p-3 text-cyan-700">{value}</td>
                    </tbody>
                  </table>
                ))}
              </div>

              <div className="bg-white border-gray-200 shadow mt-3">
                <h3 className=" text-lg font-medium text-left p-2 bg-gray-400">
                  Scrutiny Data
                </h3>
                <div className="w-full grid grid-cols-4 gap-4 border border-slate-900 p-2">
                  {Object.entries(processedData).map(([key, value], index) => (
                    <table className="text-left">
                      <tbody className="bg-slate-200">
                        <td className="p-3">{key}</td>
                        <td className="text-right p-3 text-cyan-700">
                          {value}
                        </td>
                      </tbody>
                    </table>

                    // <div key={index} className="p-2">
                    //   <div className="text-base text-cyan-600">

                    //   </div>
                    //   <div className="text-sm">{value}</div>
                    // </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
