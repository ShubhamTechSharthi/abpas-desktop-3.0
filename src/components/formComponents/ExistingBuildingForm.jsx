import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import MuiInput from "../MuiInput";
export default function ExistingBuildingForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const sendFormData = (data) => {
    // console.log(data);
    dispatch(addFormData(data));
  };
  return (
    <form onSubmit={handleSubmit(sendFormData)}>
      <div className="border border-slate-50 grid grid-cols-4 gap-3 m-5 p-2">
        <MuiInput
          {...register("buildUpArea")}
          id="buildUpArea"
          label="Existing Build  Up Area (FAR)"
        />
        <MuiInput
          {...register("groundCovrage")}
          id="groundCovrage"
          label="Existing Ground Covrage "
        />

        <MuiInput
          {...register("bulidingHeight")}
          id="bulidingHeight"
          label="Existing Buliding Height"
        />
        <MuiInput
          {...register("floorNo")}
          id="floorNo"
          label="Existing No. of Floor"
        />
      </div>
    </form>
  );
}
