import React from "react";

const GroundCoverageBreakup = ({ groundCoverageBreakup }) => {
  const {
    data,
    totals,
    "Coverage Area": coverageArea,
    "Existing Coverage": existingCoverage,
    "Coverage Percentage": coveragePercentage,
  } = groundCoverageBreakup;

  return (
    <div className="bg-white border-gray-200 shadow my-5">
      <h3 className="font-bold text-center bg-gray-400 border text-gray-700 border-slate-300 p-2">
        Ground Coverage Breakup
      </h3>
      <table className="text-left w-full">
        <thead>
          <tr>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Floor Name
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Plinth
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Object in Plinth
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Object outside Plinth
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Plinth Area
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Plinth Deduction Area
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Outer Allowable Area
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Outer Non Allowable Area
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {item.floorName || "-"}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {item.plinth || "-"}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {item.objectInPlinth || "-"}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {item.objectOutsidePlinth || "-"}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {item.plinthArea || "-"}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {item.plinthDeductibleArea || "-"}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {item.outerAllowableArea || "-"}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {item.outerNonAllowableArea || "-"}
              </td>
            </tr>
          ))}
          <tr>
            <td className="font-medium border text-gray-700 border-slate-300 p-2">
              Total
            </td>
            <td className="font-medium border text-gray-700 border-slate-300 p-2">
              -
            </td>
            <td className="font-medium border text-gray-700 border-slate-300 p-2">
              -
            </td>
            <td className="font-medium border text-gray-700 border-slate-300 p-2">
              -
            </td>
            <td className="font-medium border text-gray-700 border-slate-300 p-2">
              {totals.plinthArea || "-"}
            </td>
            <td className="font-medium border text-gray-700 border-slate-300 p-2">
              {totals.plinthDeductibleArea || "-"}
            </td>
            <td className="font-medium border text-gray-700 border-slate-300 p-2">
              {totals.outerAllowableArea || "-"}
            </td>
            <td className="font-medium border text-gray-700 border-slate-300 p-2">
              {totals.outerNonAllowableArea || "-"}
            </td>
          </tr>
          {coverageArea && (
            <tr>
              <td
                colSpan={5}
                className="font-medium border text-gray-700 border-slate-300 p-2"
              >
                Coverage Area = {coverageArea}
              </td>
              <td
                colSpan={3}
                className="font-medium border text-gray-700 border-slate-300 p-2"
              >
                {coverageArea}
              </td>
            </tr>
          )}
          {existingCoverage && (
            <tr>
              <td
                colSpan={5}
                className="font-medium border text-gray-700 border-slate-300 p-2"
              >
                Existing Coverage Area
              </td>
              <td
                colSpan={3}
                className="font-medium border text-gray-700 border-slate-300 p-2"
              >
                {existingCoverage}
              </td>
            </tr>
          )}
          {coveragePercentage && (
            <tr>
              <td
                colSpan={5}
                className="font-medium border text-gray-700 border-slate-300 p-2"
              >
                Coverage Percentage
              </td>
              <td
                colSpan={3}
                className="font-medium border text-gray-700 border-slate-300 p-2"
              >
                {coveragePercentage}%
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroundCoverageBreakup;
