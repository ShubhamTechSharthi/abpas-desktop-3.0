import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, nextPage, prevPage } from "../../store/formSlice";
import Button from "../Button";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  plotWidth: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  propBuildUpArea: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  plotDepth: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  groundCoverageAera: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  grossPlotArea: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  bulidingHeight: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  roadWidending: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  noOfFloor: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  deductionInPlot: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  existBuildUpArea: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  netPlotArea: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  existGroundCovrage: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  streetWidth: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  existBuidlingHeight: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  actualFrontage: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  existingNoOfFloor: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
});

export default function ProposalDetails() {
  const defaultData = useSelector((state) => state.form.formData);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: defaultData,
    resolver: zodResolver(schema),
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
      <div className="grid grid-cols-3 gap-3 bg-white border border-gray-200 rounded-lg shadow p-3">
        <MuiInput
          label="Plot Width(M)"
          {...register("plotWidth")}
          error={errors.plotWidth ? true : false}
          helperText={errors.plotWidth && errors.plotWidth.message}
        />
        <MuiInput
          label="Plot Depth(M)"
          {...register("plotDepth")}
          error={errors.plotDepth ? true : false}
          helperText={errors.plotDepth && errors.plotDepth.message}
        />
        <MuiInput
          label="Gross Plot Area"
          {...register("grossPlotArea")}
          error={errors.grossPlotArea ? true : false}
          helperText={errors.grossPlotArea && errors.grossPlotArea.message}
        />
        <MuiInput
          label="Area under road Widending"
          {...register("roadWidending")}
          error={errors.roadWidending ? true : false}
          helperText={errors.roadWidending && errors.roadWidending.message}
        />
        <MuiInput
          label="Other Deduction in Plot"
          {...register("deductionInPlot")}
          error={errors.deductionInPlot ? true : false}
          helperText={errors.deductionInPlot && errors.deductionInPlot.message}
        />
        <MuiInput
          label="Net Plot Area(SQM)"
          {...register("netPlotArea")}
          error={errors.netPlotArea ? true : false}
          helperText={errors.netPlotArea && errors.netPlotArea.message}
        />
        <MuiInput
          label="Proposed Built-up Area"
          {...register("propBuildUpArea")}
          error={errors.propBuildUpArea ? true : false}
          helperText={errors.propBuildUpArea && errors.propBuildUpArea.message}
        />

        <MuiInput
          label="Proposed Ground Covrage (In%)"
          {...register("groundCoverageAera")}
          error={errors.groundCoverageAera ? true : false}
          helperText={
            errors.groundCoverageAera && errors.groundCoverageAera.message
          }
        />

        <MuiInput
          label="Proposed Building Height"
          {...register("bulidingHeight")}
          error={errors.bulidingHeight ? true : false}
          helperText={errors.bulidingHeight && errors.bulidingHeight.message}
        />

        <MuiInput
          label="No. of Floors"
          {...register("noOfFloor")}
          error={errors.noOfFloor ? true : false}
          helperText={errors.noOfFloor && errors.noOfFloor.message}
        />
        <MuiInput
          label="Road / Street Width"
          {...register("streetWidth")}
          error={errors.streetWidth ? true : false}
          helperText={errors.streetWidth && errors.streetWidth.message}
        />

        <MuiInput
          label="Actual Frontage"
          {...register("actualFrontage")}
          error={errors.actualFrontage ? true : false}
          helperText={errors.actualFrontage && errors.actualFrontage.message}
        />
        <MuiInput
          label=" Existing Build Up Area "
          {...register("existBuildUpArea")}
          error={errors.existBuildUpArea ? true : false}
          helperText={
            errors.existBuildUpArea && errors.existBuildUpArea.message
          }
        />

        <MuiInput
          label="Existing Ground Covrage (In%)"
          {...register("existGroundCovrage")}
          error={errors.existGroundCovrage ? true : false}
          helperText={
            errors.existGroundCovrage && errors.existGroundCovrage.message
          }
        />

        <MuiInput
          label="Existing Building Height"
          {...register("existBuidlingHeight")}
          error={errors.existBuidlingHeight ? true : false}
          helperText={
            errors.existBuidlingHeight && errors.existBuidlingHeight.message
          }
        />

        <MuiInput
          label="Existing No. of Floors"
          {...register("existingNoOfFloor")}
          error={errors.existingNoOfFloor ? true : false}
          helperText={
            errors.existingNoOfFloor && errors.existingNoOfFloor.message
          }
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
