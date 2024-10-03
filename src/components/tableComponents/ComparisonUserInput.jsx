import React from "react";
import {
  findKeyValue,
  camelCaseToHumanReadable,
  formatDate,
} from "../../utils/utils";
const ComparisonUserInput = ({ data }) => {
  return (
    <div className="bg-white border-gray-200 shadow my-5">
      <h3 className="font-bold text-center bg-gray-400 border text-gray-700 border-slate-300 p-2">
        Comparison User Input and Information from Drawing and Database
      </h3>
      <table className="text-left w-full">
        <thead>
          <tr>
            <th
              colSpan={5}
              className="font-medium border text-gray-700 border-slate-300 p-2"
            >
              User Inputs (Parameters of Approved Layout)
            </th>
          </tr>
          <tr>
            <th className="border text-gray-700 border-slate-300 p-2">
              User Input Parameter
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Given As Input
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Extracted From Drawing
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Difference In Number
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-slate-300 p-1">
                {findKeyValue(item, "userInputParameter")}
              </td>
              <td className="border border-slate-300 p-1">
                {findKeyValue(item, "givenAsInput")}
              </td>
              <td className="border border-slate-300 p-1">
                {findKeyValue(item, "extractedFromDrawing")}
              </td>
              <td className="border border-slate-300 p-1">
                {findKeyValue(item, "differenceInNumber")}
              </td>
              <td
                className={`border border-slate-300 p-1 ${
                  item.result === "Compliant"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {findKeyValue(item, "result")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ComparisonUserInput;
