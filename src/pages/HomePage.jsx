import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import MuiInput from "../components/MuiInput";
import Button from "../components/Button";
import ReactTableComponent from "../components/ReactTableComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeneratePdf from "../components/GeneratePdf";
import { removeFormData } from "../store/formSlice";

const tabledata = [
  {
    s_no: "1",
    project_name: "Demo Project",
    project_date: "22-6-2024",
  },
  {
    s_no: "",
    project_name: "",
    project_date: "",
  },
  {
    s_no: "",
    project_name: "",
    project_date: "",
  },
  {
    s_no: "",
    project_name: "",
    project_date: "",
  },
  {
    s_no: "",
    project_name: "",
    project_date: "",
  },
  {
    s_no: "",
    project_name: "",
    project_date: "",
  },
  {
    s_no: "",
    project_name: "",
    project_date: "",
  },
  {
    s_no: "",
    project_name: "",
    project_date: "",
  },
  {
    s_no: "",
    project_name: "",
    project_date: "",
  },
];

const tablecolumns = [
  { Header: "S.No", accessor: "s_no" },
  { Header: "Project Name", accessor: "project_name" },
  { Header: "Project Date", accessor: "project_date" },
];

export default function HomePage() {
  const [filePath, setFilePath] = useState();

  const finalData = useSelector((state) => state.form.formData);
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
              className="bg-blue-600"
              onClick={() => {
                dispatch(removeFormData());
                navigate("/projectdetails");
              }}
            >
              new
            </Button>
            {finalData > 0 && (
              <Button onClick={handleFileSelect} className="bg-green-600">
                save
              </Button>
            )}
            <Button onClick={() => showFinalData()} className="bg-red-600">
              Final Data
            </Button>
            {finalData > 0 && (
              <input
                type="file"
                onChange={(e) => {
                  setFilePath(e.target.files[0].path);
                }}
              />
            )}
            {processedData && <GeneratePdf scrutinyData={processedData} />}
            {/* <GeneratePdf scrutinyData={processedData} /> */}
          </div>
        </div>
        <div>
          {processedData && <pre>{JSON.stringify(processedData, null, 2)}</pre>}
        </div>
        <ReactTableComponent
          tableData={tabledata}
          tableColumns={tablecolumns}
        />
      </div>
    </div>
  );
}
