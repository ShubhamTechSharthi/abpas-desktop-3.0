import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ReactTableComponent from "../ReactTableComponent";

const tabledata = [
  {
    plot_no: "1",
    plot_width: "Demo Project",
    plot_depth: "22-6-2024",
    plot_area: "xyz@gmail.com",
    building_use: "Demo",
    max_permissible_graound: "Demo",
    max_permissible_far: "Demo",
    front_MOS: "Demo",
    rear_mos: "Demo",
    side1_MOS: "Demo",
    side2_mos: "Demo",
    max_permissible_building_height: "Demo",
    road_width: "7.9",
  },
];

const tablecolumns = [
  { Header: "Plot No", accessor: "plot_no" },
  { Header: "Plot Width (M)", accessor: "plot_width" },
  { Header: "Plot Depth (M)", accessor: "plot_depth" },
  { Header: "Plot Area(SQM)", accessor: "plot_area" },
  { Header: "Building Use", accessor: "building_use" },
  {
    Header: "Max Permissible Ground Coverage(%)",
    accessor: "max_permissible_graound",
  },
  { Header: "Max Permissible FAR", accessor: "max_permissible_far" },
  { Header: "Front M.O.S", accessor: "front_MOS" },
  { Header: "Rear M.O.S", accessor: "rear_mos" },
  { Header: "Side1 M.O.S", accessor: "side1_mos" },
  { Header: "Side2 M.O.S", accessor: "side2_mos" },
  {
    Header: "Max Permissible Building Height",
    accessor: "max_permissible_building_height",
  },
  { Header: "Road Width(M)", accessor: "road_width" },
];

export default function PlotAreaForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const sendFormData = (data) => {
    // console.log(data);
    dispatch(addFormData(data));
  };
  return (
    <form onSubmit={handleSubmit(sendFormData)}>
      <div className="border border-slate-50 grid grid-cols-4 gap-3 m-5 p-2">
        <MuiInput label="No. of plot" />
        <MuiInput label="Plot Number" />
        <MuiInput label="Plot Width(M)" />
        <MuiInput label="Plot Width(M)" />
        <MuiInput label="Plot Depth(M)" />

        <MuiInput label="Plot Area(SQM)" />
        <MuiInput label="Type of Development" />
        <MuiInput label="Building Use" />
        <MuiInput label="Front M.O.S" />
        <MuiInput label="Rear M.O.S" />
        <MuiInput label="Side1 M.O.S" />
        <MuiInput label="Side2 M.O.S" />
        <MuiInput label="Max. Permissible Ground Covraget" />
        <MuiInput label="Max. Permissible Building Height" />
        <MuiInput label="Max. Permissible Build Up Area(SQM)" />
        <MuiInput label="Road Width(M)" />
        <MuiInput label="Area under road Widending" />
        <MuiInput label="Net Plot Area (SQM)" />
        <MuiInput label=" Plot Frontage (M)" />
        <MuiInput label=" Build Up Area of existing building" />
        <MuiInput label=" Is EWS/LIG sanctioned on this plot" />
        <MuiInput label=" Is plot irregular" />
        <MuiInput label=" Is plot Mortgage" />
        <div className="flex gap-2">
          <div
            className={`p-3 rounded-md hover:bg-slate-500 hover:duration-700 bg-blue-500 text-white cursor-pointer`}
          >
            Add New
          </div>
          <div
            className={`p-3 rounded-md hover:bg-slate-500 hover:duration-700 bg-green-500 text-white cursor-pointer`}
          >
            Save
          </div>
        </div>
      </div>
      <div className="border border-slate-50 grid grid-cols-1  m-3 p-2">
        <ReactTableComponent
          tableData={tabledata}
          tableColumns={tablecolumns}
        />
      </div>
    </form>
  );
}
