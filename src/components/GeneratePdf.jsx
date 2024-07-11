import React from "react";
import PdfComponent from "./PdfComponent";
import { useSelector } from "react-redux";

const GeneratePdf = ({ scrutinyData }) => {
  const finalData = useSelector((state) => state.form.formData);
  // console.log(objectFormData);
  console.log(scrutinyData);
  const objectFormData = {
    ...finalData[finalData.length - 1],
    ...finalData[finalData.length - 2],
    ...scrutinyData,
  };

  return (
    <div>
      <PdfComponent data={objectFormData} />
    </div>
  );
};

export default GeneratePdf;
