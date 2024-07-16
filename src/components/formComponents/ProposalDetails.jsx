import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, nextPage, prevPage } from "../../store/formSlice";
import Button from "../Button";

export default function ProposalDetails() {
  const defaultData = useSelector((state) => state.form.formData);

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: defaultData,
  });
  const dispatch = useDispatch();

  const handlePageChange = () => {
    const values = getValues();
    dispatch(addFormData(values));
    dispatch(prevPage());
  };

  const sendFormData = (data) => {
    console.log(data);
    dispatch(addFormData(data));
    dispatch(nextPage());
  };
  return (
    <form onSubmit={handleSubmit(sendFormData)} className="m-5 p-2">
      <div className="grid grid-cols-4 gap-3 bg-white border border-gray-200 rounded-lg shadow p-3">
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
      </div>
      <div className="mt-5 flex justify-center items-center gap-2">
        <Button type="button" onClick={() => handlePageChange()}>
          Back
        </Button>
        <Button type="submit">Save & Next</Button>
      </div>
    </form>
  );
}
