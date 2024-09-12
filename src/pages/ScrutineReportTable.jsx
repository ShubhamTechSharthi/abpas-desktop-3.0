import React, { useState, useMemo } from "react";
import { GiCyberEye } from "react-icons/gi";
import Modal from "../components/Modal"; // Import the Modal component
import { BsEyeFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { BiDownload, BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Reports = [
  {
    id: 1,
    FileName: "Electronics",
    Date: "12/03/2024",
  },
  {
    id: 2,
    FileName: "Clothing",
    Date: "Nike",
  },
  {
    id: 3,
    FileName: "Books",
    Date: "Penguin Books",
  },
  {
    id: 4,
    FileName: "Home Appliances",
    Date: "Samsung",
  },
  {
    id: 5,
    FileName: "Electronics",
    Date: "Sony",
  },
  {
    id: 6,
    FileName: "Clothing",
    Date: "Adidas",
  },
  {
    id: 7,
    FileName: "Electronics",
    Date: "Samsung",
  },
  {
    id: 8,
    FileName: "Home Appliances",
    Date: "LG",
  },
  {
    id: 9,
    FileName: "Books",
    Date: "HarperCollins",
  },
];
const ScrutineReportsTable = () => {
  const [reportList] = useState(Reports);
  const [rowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(reportList.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage] = useState(Math.ceil(reportList?.length / rowsLimit));
  const [currentPage, setCurrentPage] = useState(0);

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    const newArray = Reports.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = Reports.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    const newArray = Reports.slice(startIndex, endIndex);
    setRowsToShow(newArray);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(reportList?.length / rowsLimit)).fill(null)
    );
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="h-full flex justify-center">
      <div className="flex flex-col P-4 items-start h-auto w-full bg-white my-auto rounded-md">
        <div className="flex bg-gray-600 justify-between items-center p-3 w-full rounded-t-md">
          <h1 className="text-white">Scrutine Reports</h1>
        </div>
        <div className="card-body w-full p-2 overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
            <thead className="rounded-lg text-base text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  ID
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  FileName
                </th>
                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                  Date
                </th>
                <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1">
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
                    className={`py-1 px-2 font-normal text-base border-t whitespace-nowrap`}
                  >
                    {data?.id}
                  </td>
                  <td
                    className={`py-1 px-2 text-base font-normal border-t whitespace-nowrap`}
                  >
                    {data?.FileName}
                  </td>
                  <td
                    className={`py-1 px-2 text-base font-normal border-t whitespace-nowrap`}
                  >
                    {data?.Date}
                  </td>
                  <td className={`py-3 px-3 text-base font-normal border-t`}>
                    <button
                      title="Preview"
                      onClick={() => handleOpenModal(data)}
                      className="bg-blue-500 p-1 rounded"
                    >
                      <FaEye className="text-white" />
                    </button>
                    <button
                      title="Export to excel"
                      className="ml-1 bg-green-500 p-1 rounded"
                    >
                      <BiDownload className="text-white" />
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
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
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
        report={selectedProduct}
      />
    </div>
  );
};

export default ScrutineReportsTable;
