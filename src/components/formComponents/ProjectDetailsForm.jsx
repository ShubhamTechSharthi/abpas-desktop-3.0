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
        <div className="border border-slate-50 grid grid-cols-4 gap-3 m-5 p-5 w-auto">
          <MuiInput label="DIVISION" />
          <MuiInput label="DISTRICT" />

          <MuiInput label="URBAN LOCAL BODY" />
          <MuiInput label="ZONE" />

          <MuiInput label="WARD" />
          <MuiInput label="COLONY NAME" />
          <>
            <MuiInput label="APPROVAL NAME" />
            <MuiInput label="LAYOUT" />
            <MuiInput label="LAYOUT NUMBER" />
            <MuiInput label="LAYOUT APPROVAL TYPE" />
            <MuiInput label="LAND USE" />
            <MuiInput label="LAND SUB USE" />
            <MuiInput label="BUILDING ACTIVITY" />
            <MuiInput label="BUILDING USE" />
            <MuiInput label="TYPE OF BUILDING" />
            <MuiInput label="TYPE OF CONSTRUCTION" />
            <MuiInput label="PROPOSED BUILT UP AREA (SQM)" />
            <MuiInput label="PROPOSED GROUND COVERAGE(%)" />
            <MuiInput label="PROPOSED NO OF FLOORS (no's)" />
            <MuiInput label="PROPOSED BUILDING HEIGHT (m)" />
            <MuiInput label="TOTAL ESTIMATED COST" />
            <MuiInput label="PROPOSED ROAD WIDTH" />
            <MuiInput label="DESIGN TYPE" />
          </>
        </div>
        <div className="flex m-5 gap-2">
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
        </div>
        <div className="flex justify-center">
          <Button className="w-1/4" type="submit">
            submit
          </Button>
        </div>
      </form>
    </div>
  );
}
