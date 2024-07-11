import MuiInput from "../MuiInput";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ReactTableComponent from "../ReactTableComponent";
const menuItem = [
  {
    value: "Owner",
    label: "Owner",
  },
];
const tabledata = [
  {
    client_name: "1",
    postal_address: "Demo Project",
    contact_no: "22-6-2024",
    email_id: "xyz@gmail.com",
    site_address: "Demo",
    plot_number: "Demo",
  },
  {
    client_name: "1",
    postal_address: "Demo Project",
    contact_no: "22-6-2024",
    email_id: "xyz@gmail.com",
    site_address: "Demo",
    plot_number: "Demo",
  },
  {
    client_name: "1",
    postal_address: "Demo Project",
    contact_no: "22-6-2024",
    email_id: "xyz@gmail.com",
    site_address: "Demo",
    plot_number: "Demo",
  },
  {
    client_name: "1",
    postal_address: "Demo Project",
    contact_no: "22-6-2024",
    email_id: "xyz@gmail.com",
    site_address: "Demo",
    plot_number: "Demo",
  },
  {
    client_name: "1",
    postal_address: "Demo Project",
    contact_no: "22-6-2024",
    email_id: "xyz@gmail.com",
    site_address: "Demo",
    plot_number: "Demo",
  },
  {
    client_name: "1",
    postal_address: "Demo Project",
    contact_no: "22-6-2024",
    email_id: "xyz@gmail.com",
    site_address: "Demo",
    plot_number: "Demo",
  },
  {
    client_name: "1",
    postal_address: "Demo Project",
    contact_no: "22-6-2024",
    email_id: "xyz@gmail.com",
    site_address: "Demo",
    plot_number: "Demo",
  },
  {
    client_name: "1",
    postal_address: "Demo Project",
    contact_no: "22-6-2024",
    email_id: "xyz@gmail.com",
    site_address: "Demo",
    plot_number: "Demo",
  },
];

const tablecolumns = [
  { Header: "Client Name", accessor: "client_name" },
  { Header: "Postal Address", accessor: "postal_address" },
  { Header: "Contact No.", accessor: "contact_no" },
  { Header: "Email Id", accessor: "email_id" },
  { Header: "Site Address", accessor: "site_address" },
  { Header: "Plot Number", accessor: "plot_number" },
];

export default function ClientSiteForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const sendFormData = (data) => {
    // console.log(data);
    dispatch(addFormData(data));
  };
  return (
    <form onSubmit={handleSubmit(sendFormData)}>
      <div className="border border-slate-50 grid grid-cols-4 gap-3 m-5 p-2">
        <TextField
          id="outlined-select-currency"
          select
          label="Owner"
          size="small"
          defaultValue="Owner"
          InputLabelProps={{
            style: {
              fontSize: "8pt",
            },
          }}
        >
          {menuItem.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <MuiInput
          {...register("ClientEmail")}
          id="clientEmail"
          label="Client Email"
        />
        <MuiInput
          {...register("ClientName")}
          id="clientName"
          label="Client Name"
        />
        <MuiInput
          {...register("ContactNumber")}
          id="ContactNumber"
          label="Contact Number"
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Proposed Site Address"
          multiline
          size="small"
          maxRows={4}
          InputLabelProps={{
            style: {
              fontSize: "8pt",
            },
          }}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Postal Address"
          multiline
          size="small"
          maxRows={4}
          InputLabelProps={{
            style: {
              fontSize: "8pt",
            },
          }}
        />
        <MuiInput
          {...register("consultantType")}
          id="consultantType"
          label="Consultant Type"
        />
        <MuiInput
          {...register("consultantName")}
          id="consultantName"
          label="Consultant Name"
        />
        <MuiInput
          {...register("consultantName")}
          id="consultantName"
          label="Consultant Name"
        />
        <MuiInput
          {...register("consultantNumber")}
          id="consultantNumber"
          label="Consultant Number"
        />
        <MuiInput
          {...register("consultantEmail")}
          id="consultantEmail"
          label="Consultant Email"
        />
        <div className="flex gap-2">
          <div
            className={`p-3 rounded-md hover:bg-slate-500 hover:duration-700 bg-blue-500 text-white cursor-pointer`}
          >
            Add New
          </div>
          <div
            className={`p-3 rounded-md hover:bg-slate-500 hover:duration-700 bg-green-500 text-white cursor-pointer`}
          >
            Save
          </div>
        </div>
      </div>
      <div className="border border-slate-50 grid grid-cols-1 m-3 p-2">
        <ReactTableComponent
          tableData={tabledata}
          tableColumns={tablecolumns}
        />
      </div>
    </form>
  );
}
