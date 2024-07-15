import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ApplicantOwnerInfo from "../components/formComponents/ApplicantOwnerInfo";
import LayoutInfo from "../components/formComponents/LayoutInfo";
import ProposalDetails from "../components/formComponents/ProposalDetails";
import RulesApplicable from "../components/formComponents/RulesApplicable";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="h-full flex justify-center">
      <div className="flex flex-col items-start h-auto w-full my-auto rounded-md bg-white">
        <div className=" justify-between items-center w-full  rounded-t-md">
          <Tabs
            value={value}
            onChange={handleChange}
            className="bg-gray-300"
            aria-label="basic tabs example"
          >
            <Tab label="Applicant & Owner Information" {...a11yProps(0)} />
            <Tab label="Layout information I" {...a11yProps(1)} />
            <Tab label="Proposal Details" {...a11yProps(2)} />
            <Tab label="Rules Applicable" {...a11yProps(3)} />
          </Tabs>

          <CustomTabPanel className="tab-sty" value={value} index={0}>
            <ApplicantOwnerInfo></ApplicantOwnerInfo>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <LayoutInfo></LayoutInfo>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ProposalDetails></ProposalDetails>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <RulesApplicable></RulesApplicable>
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
}
