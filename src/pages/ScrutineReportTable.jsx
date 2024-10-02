import React, { useState, useEffect, useMemo } from "react";
import Modal from "../components/Modal"; // Import the Modal component
import { FaEye } from "react-icons/fa";
import { BiDownload, BiLeftArrow, BiRightArrow, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";

const ScrutineReportsTable = () => {
  const [rowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Reports will be fetched from the database via Electron
  const [reportList, setReportList] = useState([]);

  // Fetch report list from the database
  // Define handleSqlDataReceived outside of fetchReports
  const handleSqlDataReceived = (result) => {
    // Sort the report list by ProjectDate (latest date first)
    const sortedReports = result.sort((a, b) => {
      const dateA = new Date(JSON.parse(a.ProjectDate));
      const dateB = new Date(JSON.parse(b.ProjectDate));
      return dateB - dateA; // Descending order
    });

    // Set the sorted report list
    setReportList(sortedReports);

    // Setup pagination
    setTotalPage(Math.ceil(sortedReports.length / rowsLimit));
    setRowsToShow(sortedReports.slice(0, rowsLimit));
  };

  const fetchReports = () => {
    window.Electron.ipcRenderer.send("database-call");

    // Attach the event listener
    window.Electron.ipcRenderer.on("sql-data-received", handleSqlDataReceived);
  };

  // Initial load
  useEffect(() => {
    fetchReports();

    // Cleanup: remove the event listener when the component unmounts or updates
    return () => {
      window.Electron.ipcRenderer.removeListener(
        "sql-data-received",
        handleSqlDataReceived
      );
    };
  }, []); // Dependency array (empty for component mount/unmount behavior)

  // Refresh table whenever reportList changes
  useEffect(() => {
    const startIndex = currentPage * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(reportList.slice(startIndex, endIndex));

    // Update pagination
    setCustomPagination(
      Array(Math.ceil(reportList.length / rowsLimit)).fill(null)
    );
  }, [reportList, rowsLimit, currentPage]);

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(reportList.slice(startIndex, endIndex));
    setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(reportList.slice(startIndex, endIndex));
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(reportList.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  const handleOpenModal = (Id) => {
    const report = reportList.find((report) => report.Id === Id);
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const deleteData = (Id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDataFromDatabase(Id);
      }
    });
  };

  const deleteDataFromDatabase = (Id) => {
    window.Electron.ipcRenderer.send("database-delete", Id);

    window.Electron.ipcRenderer.once("data-delete-response", (success) => {
      if (success) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        // Remove the deleted report from the state
        const updatedReportList = reportList.filter(
          (report) => report.Id !== Id
        );
        setReportList(updatedReportList); // This will trigger the useEffect to refresh the table
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Failed to delete data.",
          icon: "error",
        });
      }
    });
  };

  //console.log("anamika", rowsToShow);
  return (
    <div className="h-full flex justify-center">
      <div className="flex flex-col P-4 items-start h-auto w-full bg-white my-auto rounded-md">
        <div className="flex bg-gray-600 justify-between items-center p-3 w-full rounded-t-md">
          <h1 className="text-white">Scrutine Reports</h1>
        </div>
        <div className="card-body w-full p-2 tab-sty-report md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                <th className="py-1 px-2 text-[#212B36] sm:text-md font-bold whitespace-nowrap">
                  S.No
                </th>
                <th className="py-1 px-2 text-[#212B36] sm:text-md font-bold whitespace-nowrap">
                  FileName
                </th>
                <th className="py-1 px-2 text-[#212B36] sm:text-md font-bold whitespace-nowrap">
                  Date
                </th>
                <th className="flex items-center py-1 px-3 text-[#212B36] sm:text-md font-bold whitespace-nowrap gap-1">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rowsToShow?.map((data, index) => (
                <tr
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                  }`}
                  key={index}
                >
                  <td
                    className={`py-1 px-2 font-normal text-sm border-t whitespace-nowrap`}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={`py-1 px-2 text-sm font-normal border-t whitespace-nowrap`}
                  >
                    {JSON.parse(data?.ProjectName)}
                  </td>
                  <td
                    className={`py-1 px-2 text-sm font-normal border-t whitespace-nowrap`}
                  >
                    {JSON.parse(data?.ProjectDate)}
                  </td>
                  <td className={`py-2 px-1 text-base font-normal border-t`}>
                    <button
                      title="Preview"
                      onClick={() => handleOpenModal(data?.Id)}
                      className="bg-blue-500 p-1 rounded"
                    >
                      <FaEye className="text-white" />
                    </button>
                    {/* <button
                      title="Export to excel"
                      className="ml-1 bg-green-500 p-1 rounded"
                    >
                      <BiDownload className="text-white" />
                    </button> */}
                    <button
                      onClick={() => deleteData(data?.Id)}
                      className="ml-1 bg-red-700 p-1 rounded"
                    >
                      <BiTrash className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full p-2 flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
          <div className="text-lg">
            Showing {currentPage === 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
            {currentPage === totalPage - 1
              ? reportList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {reportList?.length} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage === 0
                    ? "bg-[#cccccc] pointer-events-none"
                    : "cursor-pointer"
                }`}
                onClick={previousPage}
              >
                <BiLeftArrow />
              </li>
              {customPagination?.map((_, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid bg-[#FFFFFF] cursor-pointer ${
                    currentPage === index
                      ? "text-blue-600 border-sky-500"
                      : "border-[#E4E4EB]"
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage === totalPage - 1
                    ? "bg-[#cccccc] pointer-events-none"
                    : "cursor-pointer"
                }`}
                onClick={nextPage}
              >
                <BiRightArrow />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        data={selectedReport}
      />
    </div>
  );
};

export default ScrutineReportsTable;
