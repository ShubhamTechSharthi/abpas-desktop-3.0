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

export default function RulesApplicable() {
  const defaultData = useSelector((state) => state.form.formData);
  const { register, handleSubmit, getValues, control } = useForm({
    defaultValues: defaultData,
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
      <div class="bg-white border border-gray-200 rounded-lg shadow">
        <h3 class=" text-sm font-medium text-left p-2 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">
          Max. Permissible Parameters
        </h3>
        <div>
          <div class="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3">
            <MuiInput
              label=" Max. Permissible Floor Area Ration"
              {...register("floorAreaRation")}
            />
            <MuiInput
              {...register("maxGroundCovrage")}
              label="Max. Permissible Ground Coverage(%)"
            />

            <MuiInput
              {...register("maxBuildingHeight")}
              label="Max. Permissible Building Height"
            />
          </div>
        </div>
      </div>
      <br />
      <div class="bg-white border border-gray-200 rounded-lg shadow">
        <h3 class=" text-sm font-medium text-left p-2 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50">
          Min. Required Parameters
        </h3>
        <div>
          <div class="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3">
            <MuiInput
              {...register("minFrontage")}
              label="  Min. Required Frontage"
            />
            <MuiInput
              {...register("minFrontMOS")}
              label=" Min. Required Front MOS"
            />

            <MuiInput
              {...register("minSide1MOS")}
              label=" Min. Required Side 1 MOS"
            />
            <MuiInput
              {...register("minRoadWidth")}
              label="  Min. Required Road Width"
            />
            <MuiInput
              {...register("minRearMOS")}
              label=" Min. Required Rear MOS"
            />

            <MuiInput
              {...register("minSide2MOS")}
              label=" Min. Required Side 2 MOS"
            />
          </div>
          <div class="bg-white rounded-b-lg p-3 grid grid-cols-1 gap-3">
            <FormControl className="flex">
              <FormLabel
                className="text-sm"
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
                    value={field.value || "No. of Bed"}
                  >
                    <FormControlLabel
                      value="No. of Bed"
                      control={<Radio />}
                      label="No. of Bed"
                    />
                    <FormControlLabel
                      value="No of Seat"
                      control={<Radio />}
                      label="No of Seat"
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
