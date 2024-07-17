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
import caseType from "../../formData/caseType";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  caseType: zod
    .string()
    .refine((value) => value !== "", { message: "Case type is required." }),
  prevSanctionNo: zod.string().regex(/^\d+$/, { message: "Must be a number." }),
  typeOfConsultant: zod
    .string()
    .refine((value) => value !== "", { message: "Case type is required." }),
  name: zod.string().min(2, { message: "Name is required." }),
  mobileNo: zod
    .string()
    .regex(/^[0-9]{10}$/, { message: "Invalid mobile number." }),
  email: zod.string().email({ message: "Invalid email address." }),
  ownerName: zod.string().min(2, { message: "Owner name is required." }),
  ownerMobileNo: zod
    .string()
    .regex(/^[0-9]{10}$/, { message: "Invalid owner mobile number." }),
  ownerEmail: zod.string().email({ message: "Invalid owner email address." }),
  postalAddress: zod
    .string()
    .min(10, { message: "Postal address is required." }),
  siteAddress: zod.string().min(10, { message: "Site address is required." }),
  developerName: zod.string().min(2, { message: "Name is required." }),
  developerLicenseNo: zod
    .string()
    .regex(/^[0-9]{10}$/, { message: "License number is required." }),
});
export default function ApplicantOwnerInfo() {
  const defaultData = useSelector((state) => state.form.formData);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultData,
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const sendFormData = (data) => {
    console.log(data);
    dispatch(addFormData(data));
    dispatch(nextPage());
  };

  return (
    <form onSubmit={handleSubmit(sendFormData)} className="p-5">
      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-lg font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          CASE TYPE
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3 grid grid-cols-3 gap-3">
            <Controller
              control={control}
              name="caseType"
              render={({ field }) => (
                <TextField
                  select
                  label="CASE TYPE"
                  id="casetype-select"
                  {...field}
                  value={field.value || ""}
                  size="small"
                  InputLabelProps={{
                    style: {
                      fontSize: "11pt",
                      color: "black",
                    },
                  }}
                  error={errors.caseType ? true : false}
                  helperText={errors.caseType && errors.caseType.message}
                >
                  {caseType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <MuiInput
              {...register("prevSanctionNo")}
              label="PREVIOUS SANCTION NO."
              error={errors.prevSanctionNo ? true : false}
              helperText={
                errors.prevSanctionNo && errors.prevSanctionNo.message
              }
            />
            <TextField
              id="date"
              {...register("prevSanctionDate")}
              label="PREVIOUS SANCTION DATE"
              size="small"
              type="date"
              defaultValue="2024-07-16"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <MuiInput
              label="PREVIOUS SECTION DATE"
              {...register("preSectionDate")}
            /> */}
          </div>
        </div>
      </div>
      <br />

      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-lg font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          APPLICANT INFORMATION
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3 grid grid-cols-4 gap-3">
            <Controller
              control={control}
              name="typeOfConsultant"
              render={({ field }) => (
                <TextField
                  select
                  label="TYPE OF CONSULTANT"
                  id="typeofconsultant-select"
                  {...field}
                  value={field.value || ""}
                  size="small"
                  InputLabelProps={{
                    style: {
                      fontSize: "11pt",
                      color: "black",
                    },
                  }}
                  error={errors.typeOfConsultant ? true : false}
                  helperText={
                    errors.typeOfConsultant && errors.typeOfConsultant.message
                  }
                >
                  {caseType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <MuiInput
              label="NAME"
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name && errors.name.message}
            />
            <MuiInput
              label="MOBILE NO."
              {...register("mobileNo")}
              error={errors.mobileNo ? true : false}
              helperText={errors.mobileNo && errors.mobileNo.message}
            />

            <MuiInput
              label="EMAIL ID"
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message}
            />
          </div>
        </div>
      </div>

      <br />

      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-lg font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          OWNER INFORMATION
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3">
            <div className=" grid grid-cols-3 gap-3">
              <MuiInput
                label="NAME"
                {...register("ownerName")}
                error={errors.ownerName ? true : false}
                helperText={errors.ownerName && errors.ownerName.message}
              />
              <MuiInput
                label="MOBILE NO."
                {...register("ownerMobileNo")}
                error={errors.ownerMobileNo ? true : false}
                helperText={
                  errors.ownerMobileNo && errors.ownerMobileNo.message
                }
              />

              <MuiInput
                label="EMAIL ID"
                {...register("ownerEmail")}
                error={errors.ownerEmail ? true : false}
                helperText={errors.ownerEmail && errors.ownerEmail.message}
              />
            </div>

            <div className="grid mt-4 grid-cols-3 gap-3 ">
              <TextField
                id="standard-multiline-flexible"
                label="POSTAL ADDRESS"
                multiline
                {...register("postalAddress")}
                size="small"
                maxRows={4}
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.postalAddress ? true : false}
                helperText={
                  errors.postalAddress && errors.postalAddress.message
                }
              />
              <TextField
                id="standard-multiline-flexible"
                label="SITE ADDRESS"
                {...register("siteAddress")}
                multiline
                size="small"
                maxRows={4}
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.siteAddress ? true : false}
                helperText={errors.siteAddress && errors.siteAddress.message}
              />

              <FormControl className="flex">
                <FormLabel
                  sx={{ color: "black" }}
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
                      value={field.value}
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

      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-lg font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          DEVELOPER INFORMATION
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3">
            <div className=" grid grid-cols-3 gap-3">
              <MuiInput
                label="DEVELOPER NAME"
                {...register("developerName")}
                error={errors.developerName ? true : false}
                helperText={
                  errors.developerName && errors.developerName.message
                }
              />
              <MuiInput
                label="LICENSE NO."
                {...register("developerLicenseNo")}
                error={errors.developerLicenseNo ? true : false}
                helperText={
                  errors.developerLicenseNo && errors.developerLicenseNo.message
                }
              />
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
