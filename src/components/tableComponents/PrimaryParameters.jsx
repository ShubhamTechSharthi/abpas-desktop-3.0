import React from "react";
import { findKeyValue } from "../../utils/utils";
const PrimaryParametersTable = ({ data }) => {
  return (
    <div className="bg-white border-gray-200 shadow my-5">
      <h3 className="font-bold text-center bg-gray-400 border text-gray-700 border-slate-300 p-2">
        Primary Parameters
      </h3>
      <table className="text-left w-full">
        <thead>
          <tr>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Rules/Table
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Parameter
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Minimum Required
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Maximum Permissible
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Provided
            </th>
            <th className="font-medium border text-gray-700 border-slate-300 p-2">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {findKeyValue(item, "section")}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {findKeyValue(item, "parameter")}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {findKeyValue(item, "minimumRequired")}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {findKeyValue(item, "maximumPermissible")}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {findKeyValue(item, "provided")}
              </td>
              <td className="font-normal border text-gray-700 border-slate-300 p-2">
                {findKeyValue(item, "result")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrimaryParametersTable;
