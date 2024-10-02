import React from "react";

const BuildingGeneralDetailsTable = ({ data }) => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={6}
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Building General Details
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Block Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Total Number of Floors
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Block Height (in meters)
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Total Builtup Area (in Sq. Meters)
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Non FAR Area (in Sq. Meters)
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Buildup (FAR) Area (in Sq. Meters)
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((building, index) => (
          <tr key={index}>
            <th className="border border-slate-300 p-1">
              {building.blockName}
            </th>
            <td className="border border-slate-300 p-1">
              {building?.totalNumberofFloors}
            </td>
            <td className="border border-slate-300 p-1">
              {building?.blockHeight}
            </td>
            <td className="border border-slate-300 p-1">
              {building.totalBuiltupArea}
            </td>
            <td className="border border-slate-300 p-1">
              {building.nonFARArea}
            </td>
            <td className="border border-slate-300 p-1">
              {building["builtup(FAR)Area"]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BuildingGeneralDetailsTable;
