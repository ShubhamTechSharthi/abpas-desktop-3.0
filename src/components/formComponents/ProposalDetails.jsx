import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function ProposalDetails() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const sendFormData = (data) => {
    // console.log(data);
    dispatch(addFormData(data));
  };
  return (
    <form onSubmit={handleSubmit(sendFormData)}>
      <div className="border border-slate-50 grid grid-cols-4 gap-3 m-5 p-2">
        <MuiInput label="Plot Width(M)" {...register("plotWidth")} />
        <MuiInput
          label="Proposed Built-up Area"
          {...register("propBuildUpArea")}
        />
        <MuiInput label="Plot Depth(M)" {...register("plotDepth")} />
        <MuiInput
          label="Proposed Ground Covrage Area"
          {...register("groundCovrageAera")}
        />

        <MuiInput label="Gross Plot Area" {...register("grossPlotArea")} />
        <MuiInput
          label="Proposed Building Height"
          {...register("bulidingHeight")}
        />
        <MuiInput
          label="Area under road Widending"
          {...register("roadWidending")}
        />
        <MuiInput label="Proposed No. of Floors" {...register("noOfFloor")} />

        <MuiInput
          label="Other Deduction in Plot"
          {...register("deductionInPlot")}
        />
        <MuiInput
          label=" Existing Build Up Area "
          {...register("ExistBuildUpArea")}
        />
        <MuiInput label="Net Plot Area(SQM)" {...register("netPlotArea")} />
        <MuiInput
          label="Existing Ground Covrage Area"
          {...register("existGroundCovrage")}
        />
        <MuiInput label="Road / Street Width" {...register("streetWidth")} />
        <MuiInput
          label="Existing Building Height"
          {...register("existBuidlingHeight")}
        />
        <MuiInput label="Actual Frontage" {...register("actualFrontage")} />
        <MuiInput
          label="Existing No. of Floors"
          {...register("existingNoOfFloor")}
        />
        {/* <MuiInput label="Side2 M.O.S" />
        <MuiInput label="Max. Permissible Ground Covraget" />
        <MuiInput label="Max. Permissible Building Height" />
        <MuiInput label="Max. Permissible Build Up Area(SQM)" />
        <MuiInput label="Road Width(M)" />
        <MuiInput label="Net Plot Area (SQM)" />
        <MuiInput label=" Plot Frontage (M)" />

        <MuiInput label=" Is EWS/LIG sanctioned on this plot" />
        <MuiInput label=" Is plot irregular" />
        <MuiInput label=" Is plot Mortgage" /> */}
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
    </form>
  );
}
