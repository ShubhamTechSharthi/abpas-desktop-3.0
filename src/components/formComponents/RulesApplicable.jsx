import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";

export default function RulesApplicable() {
  const { register, handleSubmit } = useForm();

  const sendFormData = (data) => {
    console.log(data);
    //dispatch(addFormData(data));
  };
  return (
    <form onSubmit={handleSubmit(sendFormData)}>
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-400">
        <h3 class=" text-sm font-medium text-left p-2 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-400 dark:text-white dark:bg-gray-600">
          Max. Permissible Parameters
        </h3>
        <div>
          <div class="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3  dark:bg-gray-200">
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
      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-400">
        <h3 class=" text-sm font-medium text-left p-2 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-400 dark:text-white dark:bg-gray-600">
          Min. Required Parameters
        </h3>
        <div>
          <div class="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3  dark:bg-gray-200">
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
          <div class="bg-white rounded-b-lg p-3 grid grid-cols-1 gap-3  dark:bg-gray-200">
            <FormControl className="flex">
              <FormLabel
                className="text-sm"
                id="demo-radio-buttons-group-label"
              >
                Min. Required Parking
              </FormLabel>
              <RadioGroup
                className="block"
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="No. of Bed"
                name="radio-buttons-group"
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
            </FormControl>
          </div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
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
    </form>
  );
}
