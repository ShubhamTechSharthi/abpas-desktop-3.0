import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addFormData } from "../../store/formSlice";

export default function ProjectTitleForm({ next }) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const sendFormData = (data) => {
    // console.log(data);
    dispatch(addFormData(data));
    next();
  };

  return (
    <form onSubmit={handleSubmit(sendFormData)}>
      <div className="border border-slate-400 grid grid-cols-4 gap-3 m-5 p-5">
        <MuiInput {...register("ulb")} id="ulb" label="ULB" />
        <MuiInput {...register("case_type")} id="case-type" label="CASE TYPE" />
        <MuiInput
          {...register("project_name")}
          id="project-name"
          label="PROJECT NAME"
        />
        <MuiInput
          {...register("previous_sanction_number")}
          id="previous-sanction-number"
          label="PREVIOUS SANCTION NUMBER"
        />
        <MuiInput
          {...register("previous_sanction_date")}
          id="previous-sanction-date"
          label="PREVIOUS SANCTION DATE"
        />
      </div>
      <div className="flex w-1/6 m-5 gap-2">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
