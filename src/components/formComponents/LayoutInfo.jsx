import Button from "../Button";
import MuiInput from "../MuiInput";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, nextPage, prevPage } from "../../store/formSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import typeOfConst from "../../formData/typeOfConstruction";
import buildingActivity from "../../formData/buildingActivity";
import buildingUse from "../../formData/buildingUse";
import layoutApprovalType from "../../formData/layoutApprovalType";
import typeOfBuilding from "../../formData/typeOfBuilding";
import landUseName from "../../formData/landUseName";
import landSubUse from "../../formData/landSubUse";
import districts from "../../formData/districts";
import divisions from "../../formData/divisions";
import ulbies from "../../formData/ulbies";
import { useEffect, useState } from "react";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  applicationId: zod.string().regex(/^\d+$/, { message: "Must be a number." }),
  typeOfPlot: zod.string().refine((value) => value !== "", {
    message: "TYPE OF PLOT/LAYOUT is required.",
  }),
  layoutApproval: zod.string().refine((value) => value !== "", {
    message: "LAYOUT APPROVAL TYPE is required.",
  }),
  division: zod
    .string()
    .refine((value) => value !== "", { message: "DIVISION is required." }),
  district: zod
    .string()
    .refine((value) => value !== "", { message: "DISTRICT is required." }),
  ulb: zod
    .string()
    .refine((value) => value !== "", { message: "ULB is required." }),
  zone: zod.string().min(2, { message: "Zone is required." }),
  ward: zod.string().min(2, { message: "Ward is required." }),
  colonyName: zod.string().min(2, { message: "Colony Name is required." }),
  landUse: zod.string().refine((value) => value !== "", {
    message: "LAND USE is required.",
  }),
  buildingUse: zod.string().refine((value) => value !== "", {
    message: "BUILDING USE is required.",
  }),
  landSubUse: zod
    .string()
    .refine((value) => value !== "", { message: "LAND SUB USE is required." }),
  buildingActivity: zod.string().refine((value) => value !== "", {
    message: "BUILDING ACTIVITY is required.",
  }),
  typeOfBuilding: zod.string().refine((value) => value !== "", {
    message: "TYPE OF BUILDING is required.",
  }),
  typeOfConstruction: zod.string().refine((value) => value !== "", {
    message: "TYPE OF CONSTRUCTION is required.",
  }),
  plotNo: zod.string().regex(/^\d+$/, { message: "Must be a number." }),
});

export default function LayoutInfo() {
  const defaultData = useSelector((state) => state.form.formData);

  const dispatch = useDispatch();

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

  const [selectDivision, setSelectDivision] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [selectUlb, setSelectUlb] = useState("");

  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ulb, setUlb] = useState([]);

  useEffect(() => {
    setDivision(divisions);
  }, []);

  const handleDivision = (event) => {
    setSelectDivision(event.target.value);
    const filteredDistricts = districts.filter(
      (district) => district.divisionId === event.target.value
    );
    setDistrict(filteredDistricts);
    setSelectDistrict("");
    setSelectUlb("");
  };

  const handleDistrict = (event) => {
    setSelectDistrict(event.target.value);
    const filteredUlbies = ulbies.filter(
      (ulb) => ulb.districtId === event.target.value
    );
    setUlb(filteredUlbies);
    setSelectUlb("");
  };

  const handleUlb = (event) => {
    setSelectUlb(event.target.value);
  };

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
    <div className="">
      <form
        onSubmit={handleSubmit(sendFormData)}
        className="m-5 p-2 flex flex-col gap-3"
      >
        <div className="grid grid-cols-3 gap-3 bg-white border border-gray-200 rounded-lg shadow p-3">
          <MuiInput
            {...register("applicationId")}
            label="T&CP Permission No/Application Id"
            error={errors.applicationId ? true : false}
            helperText={errors.applicationId && errors.applicationId.message}
          />

          <Controller
            control={control}
            name="typeOfPlot"
            render={({ field }) => (
              <TextField
                select
                label="Type of Plot /Layout"
                id="typeofplot-select"
                {...field}
                value={field.value || ""}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.typeOfPlot ? true : false}
                helperText={errors.typeOfPlot && errors.typeOfPlot.message}
              >
                {layoutApprovalType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="layoutApproval"
            render={({ field }) => (
              <TextField
                select
                label="Layout Approval Type"
                id="layoutapproval-select"
                {...field}
                value={field.value || ""}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.layoutApproval ? true : false}
                helperText={
                  errors.layoutApproval && errors.layoutApproval.message
                }
              >
                {layoutApprovalType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            select
            {...register("division")}
            id="division-select-standard"
            onChange={handleDivision}
            value={selectDivision}
            label="Division"
            size="small"
            InputLabelProps={{
              style: {
                fontSize: "11pt",
                color: "black",
              },
            }}
            error={errors.division ? true : false}
            helperText={errors.division && errors.division.message}
          >
            {division && division !== undefined
              ? division.map((x, index) => {
                  return (
                    <MenuItem key={index} value={x.id}>
                      {x.name}
                    </MenuItem>
                  );
                })
              : ""}
          </TextField>

          <TextField
            select
            {...register("district")}
            id="district-select-standard"
            label="District"
            value={selectDistrict}
            onChange={handleDistrict}
            size="small"
            InputLabelProps={{
              style: {
                fontSize: "11pt",
                color: "black",
              },
            }}
            error={errors.district ? true : false}
            helperText={errors.district && errors.district.message}
          >
            {district && district !== undefined
              ? district.map((x, index) => {
                  return (
                    <MenuItem key={index} value={x.id}>
                      {x.name}
                    </MenuItem>
                  );
                })
              : ""}
          </TextField>

          <TextField
            select
            {...register("ulb")}
            id="ulb-select-standard"
            label="ULB"
            value={selectUlb}
            onChange={handleUlb}
            size="small"
            InputLabelProps={{
              style: {
                fontSize: "11pt",
                color: "black",
              },
            }}
            error={errors.ulb ? true : false}
            helperText={errors.ulb && errors.ulb.message}
          >
            {ulb && ulb !== undefined
              ? ulb.map((x, index) => {
                  return (
                    <MenuItem key={index} value={x.id}>
                      {x.name}
                    </MenuItem>
                  );
                })
              : ""}
          </TextField>

          <MuiInput
            label="Zone"
            {...register("zone")}
            error={errors.zone ? true : false}
            helperText={errors.zone && errors.zone.message}
          />

          <MuiInput
            label="Ward"
            {...register("ward")}
            error={errors.ward ? true : false}
            helperText={errors.ward && errors.ward.message}
          />
          <MuiInput
            label="Colony Name"
            {...register("colonyName")}
            error={errors.colonyName ? true : false}
            helperText={errors.colonyName && errors.colonyName.message}
          />
          <Controller
            control={control}
            name="landUse"
            render={({ field }) => (
              <TextField
                select
                label="Land Use"
                id="landuse-select"
                {...field}
                value={field.value || ""}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.landUse ? true : false}
                helperText={errors.landUse && errors.landUse.message}
              >
                {landUseName.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="buildingUse"
            render={({ field }) => (
              <TextField
                select
                label="Building Use"
                id="building-select"
                {...field}
                value={field.value || ""}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.buildingUse ? true : false}
                helperText={errors.buildingUse && errors.buildingUse.message}
              >
                {buildingUse.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="landSubUse"
            render={({ field }) => (
              <TextField
                select
                label="Land Sub Use"
                id="landsubuse-select"
                {...field}
                value={field.value || ""}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.landSubUse ? true : false}
                helperText={errors.landSubUse && errors.landSubUse.message}
              >
                {landSubUse.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="buildingActivity"
            render={({ field }) => (
              <TextField
                select
                label="Building Activity"
                id="buildingactivity-select"
                {...field}
                value={field.value || ""}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.buildingActivity ? true : false}
                helperText={
                  errors.buildingActivity && errors.buildingActivity.message
                }
              >
                {buildingActivity.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="typeOfBuilding"
            render={({ field }) => (
              <TextField
                select
                label="Type of Building"
                id="typeofbuilding-select"
                {...field}
                value={field.value || ""}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.typeOfBuilding ? true : false}
                helperText={
                  errors.typeOfBuilding && errors.typeOfBuilding.message
                }
              >
                {typeOfBuilding.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="typeOfConstruction"
            render={({ field }) => (
              <TextField
                select
                label="Type of Construction"
                id="typeofconstruction-select"
                {...field}
                value={field.value || ""}
                size="small"
                InputLabelProps={{
                  style: {
                    fontSize: "11pt",
                    color: "black",
                  },
                }}
                error={errors.typeOfConstruction ? true : false}
                helperText={
                  errors.typeOfConstruction && errors.typeOfConstruction.message
                }
              >
                {typeOfConst.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <MuiInput
            label="Plot No."
            {...register("plotNo")}
            error={errors.plotNo ? true : false}
            helperText={errors.plotNo && errors.plotNo.message}
          />
          <FormControl className="flex">
            <FormLabel
              sx={{ color: "black" }}
              className="text-sm"
              id="demo-radio-buttons-group-label"
            >
              Is Plot Irregular
            </FormLabel>
            <Controller
              control={control}
              name="isPlotIrregular"
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="block"
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={field.value}
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              )}
            />
          </FormControl>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button type="button" onClick={() => handlePageChange()}>
            Back
          </Button>
          <Button type="submit">Save & Next</Button>
        </div>
      </form>
    </div>
  );
}
