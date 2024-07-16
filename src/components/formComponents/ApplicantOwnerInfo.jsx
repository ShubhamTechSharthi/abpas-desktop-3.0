import MuiInput from "../MuiInput";
import { useForm, Controller } from "react-hook-form";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, nextPage, prevPage } from "../../store/formSlice";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ApplicantOwnerInfo() {
  const defaultData = useSelector((state) => state.form.formData);

  const { register, handleSubmit, control } = useForm({
    defaultValues: defaultData,
  });
  const dispatch = useDispatch();

  const sendFormData = (data) => {
    console.log(data);
    dispatch(addFormData(data));
    dispatch(nextPage());
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
    <form onSubmit={handleSubmit(sendFormData)} className="p-5">
      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-sm font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          Case Type
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3">
            <TextField
              id="outlined-select-currency"
              select
              label="CASE TYPE"
              size="small"
              defaultValue="SELECT CASE TYPE"
              {...register("caseType")}
              InputLabelProps={{
                style: {
                  fontSize: "11pt",
                },
              }}
            >
              {caseType.map((option) => (
                <MenuItem className="" key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <MuiInput
              {...register("prevSectionNo")}
              label="PREVIOUS SECTION NO."
            />
            <MuiInput
              label="PREVIOUS SECTION DATE"
              {...register("preSectionDate")}
            />
          </div>
        </div>
      </div>
      <br />

      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-sm font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          Applicant Information
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3 grid grid-cols-4 gap-3">
            <TextField
              id="outlined-select-currency"
              select
              label="TYPE OF CONSULTANT"
              {...register("typeOfConsultant")}
              size="small"
              defaultValue="SELECT CASE TYPE"
              InputLabelProps={{
                style: {
                  fontSize: "11pt",
                },
              }}
            >
              {caseType.map((option) => (
                <MenuItem className="" key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <MuiInput label="NAME" {...register("name")} />
            <MuiInput label="MOBILE NO." {...register("mobileNo")} />

            <MuiInput label="EMAIL ID" {...register("email")} />
          </div>
        </div>
      </div>

      <br />

      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-sm font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          Owner Information
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3">
            <div className=" grid grid-cols-3 gap-3">
              <MuiInput label="NAME" {...register("ownerName")} />
              <MuiInput label="MOBILE NO." {...register("ownerMobileNo")} />

              <MuiInput label="EMAIL ID" {...register("ownerEmail")} />
            </div>

            <div className="grid mt-4 grid-cols-3 gap-3 ">
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
                <Controller
                  control={control}
                  name="buildingIsFor"
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      className="block"
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={field.value || "Self Use"}
                    >
                      <FormControlLabel
                        value="Self Use"
                        control={<Radio />}
                        label="Self Use"
                      />
                      <FormControlLabel
                        value="Selling"
                        control={<Radio />}
                        label="Selling"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center items-center">
        <Button type="submit">Save & Next</Button>
      </div>
    </form>
  );
}
