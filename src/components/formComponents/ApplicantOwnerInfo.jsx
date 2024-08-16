import React, { useState, useEffect } from "react";
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
import typeOfConsultant from "../../formData/typeOfConsultant";

const schema = zod.object({
  caseType: zod
    .string()
    .refine((value) => value !== "", { message: "Case type is required." }),
  prevSanctionNo: zod
    .string()
    .regex(/^\d+$/, { message: "Must be a number." })
    .optional(),
  typeOfConsultant: zod
    .string()
    .refine((value) => value !== "", { message: "Case type is required." }),
  applicantName: zod.string().min(2, { message: "Name is required." }),
  applicantMobileNo: zod
    .string()
    .regex(/^[0-9]{10}$/, { message: "Invalid mobile number." }),
  applicantEmail: zod.string().email({ message: "Invalid email address." }),
  ownerName: zod.string().min(2, { message: "Owner name is required." }),
  ownerMobileNo: zod
    .string()
    .regex(/^[0-9]{10}$/, { message: "Invalid owner mobile number." }),
  ownerEmail: zod.string().email({ message: "Invalid owner email address." }),
  postalAddress: zod
    .string()
    .min(10, { message: "Postal address is required." }),
  siteAddress: zod.string().min(10, { message: "Site address is required." }),
  developerName: zod
    .string()
    .min(2, { message: "Name is required." })
    .optional(),
  developerLicenseNo: zod
    .string()
    .regex(/^[0-9]{10}$/, { message: "License number is required." })
    .optional(),
});
export default function ApplicantOwnerInfo() {
  const defaultData = useSelector((state) => state.form.formData);
  const [selectedCaseType, setSelectedCaseType] = useState("");
  const [selectedBuildingFor, setSelectedBuildingFor] = useState("Self Use");

  useEffect(() => {
    if (defaultData && defaultData.buildingIsFor) {
      setSelectedBuildingFor(defaultData.buildingIsFor);
    }
  }, [defaultData]);
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
    dispatch(addFormData(data));
    dispatch(nextPage());
  };

  return (
    <form onSubmit={handleSubmit(sendFormData)} className="p-5">
      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-lg font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          Case Type
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
                  onChange={(e) => {
                    field.onChange(e);
                    setSelectedCaseType(e.target.value);
                  }}
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
            {selectedCaseType !== "ERECT" && (
              <MuiInput
                //{...register("prevSanctionNo")}
                label="PREVIOUS SANCTION NO."
                error={errors.prevSanctionNo ? true : false}
                helperText={
                  errors.prevSanctionNo && errors.prevSanctionNo.message
                }
              />
            )}
            {selectedCaseType !== "ERECT" && (
              <TextField
                id="date"
                // {...register("prevSanctionDate")}
                label="PREVIOUS SANCTION DATE"
                size="small"
                type="date"
                defaultValue="2024-07-16"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
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
          Application Information
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3 grid grid-cols-4 gap-3">
            <Controller
              control={control}
              name="typeOfConsultant"
              render={({ field }) => (
                <TextField
                  select
                  label="Type of Consultant"
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
                  {typeOfConsultant.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <MuiInput
              label="Name"
              {...register("applicantName")}
              error={errors.applicantName ? true : false}
              helperText={errors.applicantName && errors.applicantName.message}
            />
            <MuiInput
              label="Mobile No."
              {...register("applicantMobileNo")}
              error={errors.applicantMobileNo ? true : false}
              helperText={
                errors.applicantMobileNo && errors.applicantMobileNo.message
              }
            />

            <MuiInput
              label="Email Id"
              {...register("applicantEmail")}
              error={errors.applicantEmail ? true : false}
              helperText={
                errors.applicantEmail && errors.applicantEmail.message
              }
            />
          </div>
        </div>
      </div>

      <br />

      <div className="bg-white border border-gray-200 rounded-lg shadow">
        <h3 className=" text-lg font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
          Owner Information
        </h3>
        <div>
          <div className="bg-white rounded-b-lg p-3">
            <div className=" grid grid-cols-3 gap-3">
              <MuiInput
                label="Name"
                {...register("ownerName")}
                error={errors.ownerName ? true : false}
                helperText={errors.ownerName && errors.ownerName.message}
              />
              <MuiInput
                label="Mobile No."
                {...register("ownerMobileNo")}
                error={errors.ownerMobileNo ? true : false}
                helperText={
                  errors.ownerMobileNo && errors.ownerMobileNo.message
                }
              />

              <MuiInput
                label="Email Id"
                {...register("ownerEmail")}
                error={errors.ownerEmail ? true : false}
                helperText={errors.ownerEmail && errors.ownerEmail.message}
              />
            </div>

            <div className="grid mt-4 grid-cols-3 gap-3 ">
              <TextField
                id="standard-multiline-flexible"
                label="Postal Address"
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
                label="Site Address"
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
                      value={selectedBuildingFor || field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        setSelectedBuildingFor(e.target.value);
                      }}
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

      {selectedBuildingFor !== "Self Use" && (
        <div className="bg-white border mt-3 border-gray-200 rounded-lg shadow">
          <h3 className=" text-lg font-medium text-left p-2 border-b border-gray-200 rounded-t-lg bg-gray-50">
            Developer Information
          </h3>
          <div>
            <div className="bg-white rounded-b-lg p-3">
              <div className=" grid grid-cols-3 gap-3">
                <MuiInput
                  label="Developer Name"
                  {...register("developerName")}
                  error={errors.developerName ? true : false}
                  helperText={
                    errors.developerName && errors.developerName.message
                  }
                />
                <MuiInput
                  label="License No."
                  {...register("developerLicenseNo")}
                  error={errors.developerLicenseNo ? true : false}
                  helperText={
                    errors.developerLicenseNo &&
                    errors.developerLicenseNo.message
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-center items-center">
        <Button type="submit">Save & Next</Button>
      </div>
    </form>
  );
}
