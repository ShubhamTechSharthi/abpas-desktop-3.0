import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import ClientSiteForm from "./ClientSiteForm";
import PlotAreaForm from "./PlotAreaForm";
import ExistingBuildingForm from "./ExistingBuildingForm";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import TypeOfConst from "../../formData/typeOfConstruction";
import buildingActivity from "../../formData/buildingActivity";
import buildingUse from "../../formData/buildingUse";
import layoutApprovalType from "../../formData/layoutApprovalType";
import typeOfBuilding from "../../formData/typeOfBuilding";
import landUseName from "../../formData/landUseName";
import landSubUse from "../../formData/landSubUse";
import districts from "../../formData/districts";
import divisions from "../../formData/divisions";
import ulbies from "../../formData/ulbies";

export default function LayoutInfo() {
  const [openModal, setOpenModal] = useState(false);
  const [plotModal, setPlotModal] = useState(false);
  const [bulidingdetails, setBuildingModal] = useState(false);
  const finalData = useSelector((state) => state.form.formData);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePlotCloseModal = () => {
    setPlotModal(false);
  };
  const handleBuildingCloseModal = () => {
    setBuildingModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handlePlotAreaModal = () => {
    setPlotModal(true);
  };

  const handleExistingBuildingModal = () => {
    setBuildingModal(true);
  };

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const sendFormData = (data) => {
    console.log(data);
    // dispatch(addFormData(data));
    // navigate("/home");
    // console.log(finalData);
  };

  return (
    <div className="">
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={"mt-44 ml-60 w-2/3 h-2/3"}
        heading={"Client and Site Details"}
      >
        <ClientSiteForm />
      </Modal>

      <Modal
        open={plotModal}
        onClose={handlePlotCloseModal}
        className={"mt-44 ml-60 w-2/3 h-2/3"}
        heading={"Plot Area Details"}
      >
        <PlotAreaForm />
      </Modal>
      <Modal
        open={bulidingdetails}
        onClose={handleBuildingCloseModal}
        className={"mt-44 ml-60 w-2/3 h-2/3"}
        heading={"Existing Building Details"}
      >
        <ExistingBuildingForm />
      </Modal>

      <form onSubmit={handleSubmit(sendFormData)}>
        <div className="border border-slate-50 grid grid-cols-4 gap-3 w-auto">
          <MuiInput
            {...register("applicationId")}
            label="T&CP Permission No/Application Id"
          />
          <TextField
            {...register("typeOfPlot")}
            id="outlined-select-currency"
            select
            label="TYPE OF PLOT/LAYOUT"
            size="small"
            defaultvalue="Select"
            InputLabelProps={{
              style: {
                fontSize: "8pt",
              },
            }}
          >
            {layoutApprovalType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            {...register("layoutApproval")}
            label="LAYOUT APPROVAL TYPE"
            size="small"
            defaultvalue="Select"
            InputLabelProps={{
              style: {
                fontSize: "8pt",
              },
            }}
          >
            {layoutApprovalType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            {...register("division")}
            label="DIVISION"
            size="small"
            defaultvalue="Select Division"
            InputLabelProps={{
              style: {
                fontSize: "8pt",
              },
            }}
          >
            {divisions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            {...register("district")}
            label="DISTRICT"
            size="small"
            defaultvalue="Select"
            InputLabelProps={{
              style: {
                fontSize: "8pt",
              },
            }}
          >
            {districts.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="outlined-select-currency"
            select
            {...register("ulbName")}
            label="ULB NAME"
            size="small"
            defaultvalue="Select"
            InputLabelProps={{
              style: {
                fontSize: "8pt",
              },
            }}
          >
            {ulbies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <MuiInput label="ZONE" {...register("zone")} />

          <MuiInput label="WARD" {...register("ward")} />
          <MuiInput label="COLONY NAME" {...register("colonyName")} />
          <>
            <TextField
              id="outlined-select-currency"
              select
              {...register("landUse")}
              label="LAND USE"
              size="small"
              defaultvalue="Select"
              InputLabelProps={{
                style: {
                  fontSize: "8pt",
                },
              }}
            >
              {landUseName.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              {...register("buildingUse")}
              label="BUILDING USE"
              size="small"
              defaultvalue=""
              InputLabelProps={{
                style: {
                  fontSize: "8pt",
                },
              }}
            >
              {buildingUse.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              {...register("landSubUse")}
              label="LAND SUB USE"
              size="small"
              defaultvalue="Select"
              InputLabelProps={{
                style: {
                  fontSize: "8pt",
                },
              }}
            >
              {landSubUse.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* <MuiInput label="APPROVAL NAME" />
            <MuiInput label="LAYOUT" />
            <MuiInput label="LAYOUT NUMBER" /> */}
            <TextField
              id="outlined-select-currency"
              select
              {...register("buildingActivity")}
              label="BUILDING ACTIVITY"
              size="small"
              defaultvalue="SELECT BUILDING ACTIVITY"
              InputLabelProps={{
                style: {
                  fontSize: "8pt",
                },
              }}
            >
              {buildingActivity.map((option) => (
                <MenuItem
                  tool
                  className="cust"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              {...register("typeOfBuilding")}
              label="TYPE OF BUILDING"
              size="small"
              defaultvalue="Select"
              InputLabelProps={{
                style: {
                  fontSize: "8pt",
                },
              }}
            >
              {typeOfBuilding.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-select-currency"
              select
              {...register("typeOfConstruction")}
              label="TYPE OF CONSTRUCTION"
              size="small"
              defaultvalue=""
              InputLabelProps={{
                style: {
                  fontSize: "8pt",
                },
              }}
            >
              {TypeOfConst.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <MuiInput label="PLOT NO" {...register("plotNo")} />
            <FormControl className="flex">
              <FormLabel
                className="text-sm"
                id="demo-radio-buttons-group-label"
              >
                Is Plot Irregular
              </FormLabel>
              <RadioGroup
                className="block"
                aria-labelledby="  demo-radio-buttons-group-label"
                defaultValue="Yes"
                name="radio-buttons-group"
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="NO" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* <MuiInput label="PROPOSED BUILT UP AREA (SQM)" />
            <MuiInput label="PROPOSED GROUND COVERAGE(%)" />
            <MuiInput label="PROPOSED NO OF FLOORS (no's)" />
            <MuiInput label="PROPOSED BUILDING HEIGHT (m)" />
            <MuiInput label="TOTAL ESTIMATED COST" />
            <MuiInput label="PROPOSED ROAD WIDTH" />
            <MuiInput label="DESIGN TYPE" /> */}
          </>
        </div>
        {/* <div className="flex m-5 gap-2">
          <div
            className={`py-2 px-2 rounded-md hover:bg-slate-500 hover:duration-700 bg-blue-500 text-white cursor-pointer`}
            onClick={() => handleOpenModal()}
          >
            Client And Site Details
          </div>
          <div
            className={`py-2 px-2 rounded-md hover:bg-slate-500 hover:duration-700 bg-blue-500 text-white cursor-pointer`}
            onClick={() => handlePlotAreaModal()}
          >
            Plot Area Details
          </div>
          <div
            className={`py-2 px-2 rounded-md hover:bg-slate-500 hover:duration-700 bg-blue-500 text-white cursor-pointer`}
            onClick={() => handleExistingBuildingModal()}
          >
            Existing Details
          </div>
        </div> */}
        <div className="flex justify-center">
          <Button className="w-1/4" type="submit">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
}
