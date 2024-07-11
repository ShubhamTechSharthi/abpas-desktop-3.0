import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../../store/formSlice";
import ClientSiteForm from "./ClientSiteForm";
import PlotAreaForm from "./PlotAreaForm";
import ExistingBuildingForm from "./ExistingBuildingForm";
import { useNavigate } from "react-router-dom";

export default function ProjectDetailsForm() {
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
    // console.log(data);
    dispatch(addFormData(data));
    navigate("/home");
    // console.log(finalData);
  };

  return (
    <div className="my-5">
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
        <div className="border border-slate-400 grid grid-cols-4 gap-3 m-5 p-5 w-auto">
          <MuiInput {...register("division")} id="division" label="DIVISION" />
          <MuiInput {...register("zone")} id="zone" label="ZONE" />
          <MuiInput {...register("ward")} id="ward" label="WARD" />
          <MuiInput
            {...register("urban_local_body")}
            id="urban-local-body"
            label="URBAN LOCAL BODY"
          />
          <MuiInput
            {...register("colony_name")}
            id="colony-name"
            label="COLONY NAME"
          />
          <MuiInput
            {...register("property_id")}
            id="property-id"
            label="PROPERTY ID"
          />
          <MuiInput
            {...register("design_type")}
            id="design-type"
            label="DESIGN TYPE"
          />
        </div>
        <div className="border border-slate-400 grid grid-cols-4 gap-3 m-5 p-5 w-auto">
          <MuiInput {...register("land_use")} id="land-use" label="LAND USE" />
          <MuiInput
            {...register("layout_approval_type")}
            id="layout-approval-type"
            label="LAYOUT APPROVAL TYPE"
          />
          <MuiInput
            {...register("proposed_floors")}
            id="proposed-floors"
            label="PROPOSED FLOORS (No's)"
          />
          <MuiInput
            {...register("land_sub_use")}
            id="land-sub-use"
            label="LAND SUB USE"
          />
          <MuiInput
            {...register("layout_number")}
            id="layout-number"
            label="LAYOUT NUMBER"
          />
          <MuiInput
            {...register("estimated_cost")}
            id="estimated-cost"
            label="ESTIMATED COST"
          />
          <MuiInput
            {...register("building_use")}
            id="building-use"
            label="BUILDING USE"
          />
          <MuiInput
            {...register("layout_approval_date")}
            id="layout-approval-date"
            label="LAYOUT APPROVAL DATE"
          />
          <MuiInput
            {...register("drainage_line")}
            id="drainage-line"
            label="DRAINAGE LINE"
          />
          <MuiInput
            {...register("building_activity")}
            id="building-activity"
            label="BUILDING ACTIVITY"
          />
          <MuiInput
            {...register("type_of_construction")}
            id="type-of-construction"
            label="TYPE OF CONSTRUCTION"
          />
          <MuiInput
            {...register("type_of_building")}
            id="type-of-building"
            label="TYPE OF BUILDING"
          />
          <MuiInput
            {...register("building_use_for")}
            id="building-use-for"
            label="BUILDING USE FOR"
          />
          <MuiInput
            {...register("proposed_built_up_area")}
            id="proposed-built-up-area"
            label="PROPOSED BUILT UP AREA (SQM)"
          />
          <MuiInput
            {...register("proposed_building_height")}
            id="proposed-building-height"
            label="PROPOSED BUILDING HEIGHT (m)"
          />
          <MuiInput
            {...register("proposed_ground_coverage")}
            id="proposed-ground-coverage"
            label="PROPOSED GROUND COVERAGE(%)"
          />
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
