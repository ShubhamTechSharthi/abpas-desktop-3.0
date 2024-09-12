import React, { useState, useEffect } from "react";
import MuiInput from "../MuiInput";
import { useForm, Controller } from "react-hook-form";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, nextPage } from "../../store/formSlice";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
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
  email: zod.string().email({ message: "Invalid email address." }),
});
export default function ApplicantOwnerInfo() {
  const defaultData = useSelector((state) => state.form.formData);
  const [selectedCaseType, setSelectedCaseType] = useState("");

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
      <div className="  border-gray-200 rounded-lg">
        <div className="h-[63vh]">
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
                        errors.typeOfConsultant &&
                        errors.typeOfConsultant.message
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
                  {...register("name")}
                  error={errors.name ? true : false}
                  helperText={errors.name && errors.name.message}
                />
                <MuiInput
                  label="Mobile No."
                  {...register("mobileNo")}
                  error={errors.mobileNo ? true : false}
                  helperText={errors.mobileNo && errors.mobileNo.message}
                />

                <MuiInput
                  label="Email Id"
                  {...register("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email && errors.email.message}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center  items-center">
        <Button type="submit">Save & Next</Button>
      </div>
    </form>
  );
}
