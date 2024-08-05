import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MuiInput from "../MuiInput";
import Button from "../Button";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, prevPage } from "../../store/formSlice";
import { useNavigate } from "react-router-dom";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  floorAreaRation: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  maxGroundCovrage: zod
    .string()
    .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  // maxBuildingHeight: zod
  //   .string()
  //   .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  // minFrontage: zod
  //   .string()
  //   .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  // minFrontMOS: zod
  //   .string()
  //   .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  // minSide1MOS: zod
  //   .string()
  //   .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  // minRoadWidth: zod
  //   .string()
  //   .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  // minRearMOS: zod
  //   .string()
  //   .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
  // minSide2MOS: zod
  //   .string()
  //   .regex(/^\d*\.?\d+$/, { message: "Must be a valid number." }),
});

export default function RulesApplicable() {
  const defaultData = useSelector((state) => state.form.formData);
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultData,
    resolver: zodResolver(schema),
  });
  const page = useSelector((state) => state.form.page);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlePageChange = () => {
    const values = getValues();
    dispatch(addFormData(values));
    dispatch(prevPage());
  };

  const sendFormData = (data) => {
    console.log(data);
    dispatch(addFormData(data));
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit(sendFormData)} className="m-5 p-2">
      <div className="  border-gray-200 rounded-lg">
        <div className="h-[61vh]">
          <div className="bg-white border border-gray-200 rounded-lg shadow">
            <h3 className=" text-lg font-medium text-left p-2 text-black border-b border-gray-200 rounded-t-lg bg-gray-50">
              Max. Permissible Paramenters
            </h3>
            <div>
              <div className="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3">
                <MuiInput
                  label=" Max. Permissible Floor Area Ration"
                  {...register("floorAreaRation")}
                  // error={errors.floorAreaRation ? true : false}
                  // helperText={
                  //   errors.floorAreaRation && errors.floorAreaRation.message
                  // }
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <MuiInput
                  {...register("maxGroundCovrage")}
                  label="Max. Permissible Ground Coverage(%)"
                  // error={errors.maxGroundCovrage ? true : false}
                  // helperText={
                  //   errors.maxGroundCovrage && errors.maxGroundCovrage.message
                  // }
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <MuiInput
                  {...register("maxBuildingHeight")}
                  label="Max. Permissible Building Height"
                  InputProps={{
                    readOnly: true,
                  }}
                  // error={errors.maxBuildingHeight ? true : false}
                  // helperText={
                  //   errors.maxBuildingHeight && errors.maxBuildingHeight.message
                  // }
                />
              </div>
            </div>
          </div>
          <br />
          <div className="bg-white border border-gray-200 rounded-lg shadow">
            <h3 className=" text-lg font-medium text-left p-2 text-black border-b border-gray-200 rounded-t-lg bg-gray-50">
              Min. Required Parameters
            </h3>
            <div>
              <div className="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3">
                <MuiInput
                  {...register("minFrontage")}
                  label="  Min. Required Frontage"
                  InputProps={{
                    readOnly: true,
                  }}
                  // error={errors.minFrontage ? true : false}
                  // helperText={errors.minFrontage && errors.minFrontage.message}
                />
                <MuiInput
                  {...register("minFrontMOS")}
                  label=" Min. Required Front MOS"
                  InputProps={{
                    readOnly: true,
                  }}
                  // error={errors.minFrontMOS ? true : false}
                  // helperText={errors.minFrontMOS && errors.minFrontMOS.message}
                />

                <MuiInput
                  {...register("minSide1MOS")}
                  label=" Min. Required Side 1 MOS"
                  InputProps={{
                    readOnly: true,
                  }}
                  // error={errors.minSide1MOS ? true : false}
                  // helperText={errors.minSide1MOS && errors.minSide1MOS.message}
                />
                <MuiInput
                  {...register("minRoadWidth")}
                  label="  Min. Required Road Width"
                  InputProps={{
                    readOnly: true,
                  }}
                  // error={errors.minRoadWidth ? true : false}
                  // helperText={errors.minRoadWidth && errors.minRoadWidth.message}
                />
                <MuiInput
                  {...register("minRearMOS")}
                  label="Min. Required Rear MOS"
                  InputProps={{
                    readOnly: true,
                  }}
                  // error={errors.minRearMOS ? true : false}
                  // helperText={errors.minRearMOS && errors.minRearMOS.message}
                />

                <MuiInput
                  {...register("minSide2MOS")}
                  label="Min. Required Side 2 MOS"
                  InputProps={{
                    readOnly: true,
                  }}
                  // error={errors.minSide2MOS ? true : false}
                  // helperText={errors.minSide2MOS && errors.minSide2MOS.message}
                />
              </div>
              <div className="bg-white rounded-b-lg p-3 grid grid-cols-1 gap-3">
                <FormControl className="flex">
                  <FormLabel
                    sx={{ color: "black" }}
                    id="demo-radio-buttons-group-label"
                  >
                    Min. Required Parking
                  </FormLabel>
                  <Controller
                    control={control}
                    name="minRequiredParking"
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        className="block"
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={field.value}
                      >
                        <FormControlLabel
                          value="On No. of Bed"
                          control={<Radio />}
                          label="On No. of Bed"
                        />
                        <FormControlLabel
                          value="On No of Seat"
                          control={<Radio />}
                          label="On No of Seat"
                        />
                        <FormControlLabel
                          value="On Per Build Up Area"
                          control={<Radio />}
                          label="On Per Build Up Area"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center items-center gap-2">
        <Button
          type="button"
          disabled={page === 0}
          onClick={() => handlePageChange()}
        >
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
