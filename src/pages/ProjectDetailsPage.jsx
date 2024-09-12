import LayoutInfo from "../components/formComponents/LayoutInfo";
import ApplicantOwnerInfo from "../components/formComponents/ApplicantOwnerInfo";
import ProposalDetails from "../components/formComponents/ProposalDetails";
import RulesApplicable from "../components/formComponents/RulesApplicable";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import OwnerInfo from "../components/formComponents/OwnerInfo";

export default function ProjectDetailsPage() {
  const page = useSelector((state) => state.form.page);

  const formHeading = [
    "APPLICANT & OWNER INFORMATION",
    "LAYOUT INFORMATION",
    "PROPOSAL DETAILS",
    "RULES APPLICABLE",
  ];

  const renderForms = () => {
    if (page === 0) {
      return <ApplicantOwnerInfo />;
    } else if (page === 1) {
      return <OwnerInfo />;
    } else if (page === 2) {
      return <LayoutInfo />;
    } else if (page === 3) {
      return <ProposalDetails />;
    } else if (page === 4) {
      return <RulesApplicable />;
    }
  };

  const navigate = useNavigate();

  return (
    <div className="h-full flex justify-center">
      <div className="flex flex-col items-start h-auto w-full my-auto rounded-md ">
        <div className="flex justify-between items-center w-full rounded-t-md bg-gray-900 px-4 pt-2">
          <div className="flex justify-center items-center text-white text-base">
            <h1
              className={`${page === 0 ? "bg-slate-50 text-black" : ""} rounded-t-md px-2`}
            >
              Applicant Information
            </h1>
            <h1
              className={`${page === 1 ? "bg-slate-50 text-black" : ""} rounded-t-md px-2`}
            >
              owner Information
            </h1>
            <h1
              className={`${page === 2 ? "bg-slate-50 text-black" : ""} rounded-t-md px-2`}
            >
              Layout Information
            </h1>
            <h1
              className={`${page === 3 ? "bg-slate-50 text-black" : ""} rounded-t-md px-2`}
            >
              Proposal Details
            </h1>
            <h1
              className={`${page === 4 ? "bg-slate-50 text-black" : ""} rounded-t-md px-2`}
            >
              Rules Applicable
            </h1>
          </div>
          <button onClick={() => navigate("/home")} className="">
            <HiOutlineArrowLeftCircle className="bg-red-500 mr-2 p-[3px] rounded-md text-white text-xl" />
          </button>
        </div>
        <div className="w-full rounded-md bg-white tab-sty">
          {renderForms()}
        </div>
      </div>
    </div>
  );
}
