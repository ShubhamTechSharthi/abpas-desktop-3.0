import React from "react";
import FinalReport from "./FinalReportsComponents/FinalReport";

const Modal = ({ show, onClose, data }) => {
  if (!show) return null; // Only render the modal if 'show' is true

  // Function to download the report as a JSON file
  const downloadReport = () => {
    const finalData = JSON.parse(data?.FormData);
    const processedData = JSON.parse(data?.ProcessedData);
    const reportContent = {
      finalData,
      processedData,
    };

    const blob = new Blob([JSON.stringify(reportContent, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "final_report.json";
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black z-[1050] bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg max-w-[90%] w-full">
        {/* Pass the selected report data (data) to FinalReport */}
        <FinalReport
          finalData={JSON.parse(data?.FormData)}
          processedData={JSON.parse(data?.ProcessedData)}
        />

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={downloadReport}
          >
            Download Report
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
