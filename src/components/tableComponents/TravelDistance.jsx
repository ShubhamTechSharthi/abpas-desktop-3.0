import React from "react";

export default function TravelDistance() {
  // Simplified data structure
  const travelDistanceData = {
    blockName: "Single",
    floors: [
      { floorName: "FLOOR01", maximum: 30, actual: 27.79, result: "Compliant" },
      { floorName: "FLOOR02", maximum: 30, actual: 27.79, result: "Compliant" },
      { floorName: "FLOOR03", maximum: 30, actual: 27.79, result: "Compliant" },
      { floorName: "FLOOR04", maximum: 30, actual: 27.79, result: "Compliant" },
      { floorName: "FLOOR05", maximum: 30, actual: 27.79, result: "Compliant" },
      { floorName: "FLOOR06", maximum: 30, actual: 27.79, result: "Compliant" },
      { floorName: "FLOOR07", maximum: 30, actual: 27.79, result: "Compliant" },
      {
        floorName: "FLOOR-GROUND",
        maximum: 30,
        actual: 27.5,
        result: "Compliant",
      },
      {
        floorName: "FLOOR-MFGROUNDTO01",
        maximum: 30,
        actual: 20.39,
        result: "Compliant",
      },
    ],
  };

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan="5"
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Travel Distance [NBC/VOL-1/PART-4/ CLAUSE-4.4.2.1 & 4.4.2.2/
            TABLE-5]
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Block Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Floor Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Maximum</th>
          <th className="border text-gray-700 border-slate-300 p-2">Actual</th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {travelDistanceData.floors.map((floor, index) => (
          <tr key={index}>
            {/* Only display the block name on the first row */}
            {index === 0 && (
              <td
                className="font-normal border border-slate-300 p-1"
                rowSpan={travelDistanceData.floors.length}
              >
                {travelDistanceData.blockName}
              </td>
            )}
            <td className="font-normal border border-slate-300 p-1">
              {floor.floorName}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {floor.maximum}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {floor.actual}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {floor.result}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
