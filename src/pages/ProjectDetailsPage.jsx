import { useState } from "react";
import ProjectDetailsForm from "../components/formComponents/ProjectDetailsForm";
import ProjectTitleForm from "../components/formComponents/ProjectTitleForm";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";

export default function ProjectDetailsPage() {
  const [titlePageOpen, setTitlePageOpen] = useState(true);

  const navigate = useNavigate();

  return (
    <div className="h-full flex justify-center">
      <div className="flex flex-col items-start h-auto w-auto my-auto rounded-md bg-gray-900">
        <div className="flex justify-between items-center w-full  rounded-t-md">
          <div>
            <button
              onClick={() => setTitlePageOpen(true)}
              className={`${titlePageOpen ? "pt-1 bg-white text-black" : "pt-0 text-white"} mt-1 active:bg-slate-400 rounded-t-md duration-400 px-2 pb-1 text-xs font-semibold`}
            >
              Project Title
            </button>
            <button
              onClick={() => setTitlePageOpen(false)}
              className={`${!titlePageOpen ? "pt-1 bg-white text-black" : "pt-0 text-white"} mt-1 active:bg-slate-400 rounded-t-md duration-400 px-2 pb-1 text-xs font-semibold`}
            >
              Project Description
            </button>
          </div>
          <button onClick={() => navigate("/home")} className="">
            <HiOutlineArrowLeftCircle className="bg-red-500 mr-2 p-[3px] rounded-md text-white text-xl" />
          </button>
        </div>
        <div className=" rounded-b-md bg-white">
          {titlePageOpen ? (
            <ProjectTitleForm next={() => setTitlePageOpen(false)} />
          ) : (
            <ProjectDetailsForm />
          )}
        </div>
      </div>
    </div>
  );
}
