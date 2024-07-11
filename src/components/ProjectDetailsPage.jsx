import { useState } from "react";
import ProjectTitleForm from "./ProjectTitleForm";
import ProjectDetailsForm from "./ProjectDetailsForm";
import MuiModal from "./Modal";
export default function ProjectDetailsPage({ back }) {
  const [titlePageOpen, setTitlePageOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="mt-20 ml-20 h-2/3 w-2/3 bg-slate-300 rounded-md">
      <MuiModal
        open={openModal}
        onClose={handleCloseModal}
        className={"mt-36 ml-52 w-2/3 h-2/3"}
      >
        <MuiModal />
        <h1>abpas 3.O</h1>
        <ProjectDetailsForm />
      </MuiModal>

      <div className="flex justify-between bg-slate-300 rounded-t-md ml-2 mr-3">
        <div>
          <button
            onClick={() => setTitlePageOpen(true)}
            className={`${titlePageOpen ? "pt-1 bg-slate-50" : "pt-0"}  active:bg-slate-400 rounded-t-md duration-400 px-2 pb-1`}
          >
            project title
          </button>
          <button
            onClick={() => setTitlePageOpen(false)}
            className={`${!titlePageOpen ? "pt-1 bg-slate-50" : "pt-0"} bg-slate-300 active:bg-slate-400 rounded-t-md duration-400 px-2 pb-1`}
          >
            project description
          </button>
          <button onClick={() => handleOpenModal()}>open modal</button>
        </div>
        <button onClick={back}>❌</button>
      </div>
      <div className="bg-slate-50 h-full rounded-md">
        {titlePageOpen ? <ProjectTitleForm /> : <ProjectDetailsForm />}
      </div>
    </div>
  );
}
