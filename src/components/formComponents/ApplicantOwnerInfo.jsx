import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addFormData } from "../../store/formSlice";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ApplicantOwnerInfo({ next }) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const sendFormData = (data) => {
    console.log(data);
    dispatch(addFormData(data));
    // next();
  };
  const caseType = [
    {
      value: 1,
      label: "ERECT",
    },
    {
      value: 2,
      label: "ADDITION/ALTERATION IN BUILT UP AREA",
    },
    {
      value: 3,
      label: "ALTERATION & ADDITION IN SANCTIONED or PROPOSED PLAN",
    },
    {
      value: 4,
      label: "DEMOLITION",
    },
    {
      value: 5,
      label: "CONSTRUCTION OF BOUNDARY WALL",
    },
    {
      value: 6,
      label: "REVALIDATION OF THE BUILDINGPERMISSION",
    },
    {
      value: 7,
      label:
        "COMPOUND OF CONTRARY/MORE CONSTRUCTION FROM APPROVED BUILDING PERMISSION",
    },
    {
      value: 8,
      label: "COMPOUND THE BUILDING IN THE ABSENCE OF A BUILDING PERMISSION",
    },
  ];

  return (
    <form onSubmit={handleSubmit(sendFormData)}>
      {/* <div className="grid grid-cols-4 gap-3">
        <MuiInput {...register("ulb")} id="ulb" label="ULB" />
        <MuiInput {...register("case_type")} id="case-type" label="CASE TYPE" />
        <MuiInput
          {...register("project_name")}
          id="project-name"
          label="PROJECT NAME"
        />
        <MuiInput
          {...register("previous_sanction_number")}
          id="previous-sanction-number"
          label="PREVIOUS SANCTION NUMBER"
        />
        <MuiInput
          {...register("previous_sanction_date")}
          id="previous-sanction-date"
          label="PREVIOUS SANCTION DATE"
        />
      </div> */}

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-400">
        <h3 class=" text-sm font-medium text-left p-2 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-400 dark:text-white dark:bg-gray-600">
          Case Type
        </h3>
        <div>
          <div class="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3  dark:bg-gray-200">
            <TextField
              id="outlined-select-currency"
              select
              label="CASE TYPE"
              size="small"
              defaultvalue="SELECT CASE TYPE"
              {...register("caseType")}
              InputLabelProps={{
                style: {
                  fontSize: "8pt",
                },
              }}
            >
              {caseType.map((option) => (
                <MenuItem
                  tool
                  className=""
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <MuiInput
              {...register("prevSectionNo")}
              label="PREVIOUS SECTION NO."
            />
            <TextField
              id="date"
              {...register("preSectionDate")}
              label="PREVIOUS SECTION DATE"
              size="small"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      </div>
      <br />

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-400">
        <h3 class=" text-sm font-medium text-left p-2 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-400 dark:text-white dark:bg-gray-600">
          Applicant Information
        </h3>
        <div>
          <div class="bg-white rounded-b-lg p-3 grid grid-cols-4 gap-3  dark:bg-gray-200">
            <TextField
              id="outlined-select-currency"
              select
              label="TYPE OF CONSULTANT"
              {...register("typeOfConsultant")}
              size="small"
              defaultvalue="SELECT CASE TYPE"
              InputLabelProps={{
                style: {
                  fontSize: "8pt",
                },
              }}
            >
              {caseType.map((option) => (
                <MenuItem
                  tool
                  className=""
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <MuiInput label="NAME" {...register("name")} />
            <MuiInput
              label="MOBILE NO."
              type="number"
              {...register("mobileNo")}
            />

            <MuiInput label="EMAIL ID" {...register("email")} type="email" />
          </div>
        </div>
      </div>

      <br />

      <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-400">
        <h3 class=" text-sm font-medium text-left p-2 text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-400 dark:text-white dark:bg-gray-600">
          Owner Information
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3  dark:bg-gray-200">
            <div className=" grid grid-cols-3 gap-3">
              <MuiInput label="NAME" {...register("ownerName")} />
              <MuiInput
                label="MOBILE NO."
                type="number"
                {...register("ownerMobileNo")}
              />

              <MuiInput
                label="EMAIL ID"
                {...register("ownerEmail")}
                type="email"
              />
            </div>

            <div class="grid mt-4 grid-cols-3 gap-3 ">
              <TextField
                id="standard-multiline-flexible"
                label="POSTAL ADDRESS"
                multiline
                {...register("postalAddress")}
                size="small"
                maxRows={4}
              />
              <TextField
                id="standard-multiline-flexible"
                label="SITE ADDRESS"
                {...register("siteAddress")}
                multiline
                size="small"
                maxRows={4}
              />
              <FormControl className="flex">
                <FormLabel
                  className="text-sm"
                  id="demo-radio-buttons-group-label"
                >
                  Building Is For
                </FormLabel>
                <RadioGroup
                  className="block"
                  aria-labelledby="  demo-radio-buttons-group-label"
                  defaultValue="Selling"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="SelfUse"
                    {...register("selfUse")}
                    control={<Radio />}
                    label="Self Use"
                  />
                  <FormControlLabel
                    value="Selling"
                    {...register("selling")}
                    control={<Radio />}
                    label="Selling"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 right-auto">
        <Button type="submit">Save & Next</Button>
      </div>
    </form>
  );
}
