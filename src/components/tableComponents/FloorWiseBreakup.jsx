import React from "react";
const grandTotal = (keyname, floorsArray) => {
  if (keyname === "Floor Name") return "Floor Name";
  return floorsArray.reduce((acc, currVal) => {
    return acc + currVal[keyname];
  }, 0);
};

const FloorwiseBreakupTable = ({ data }) => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={10}
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Floorwise Breakup
          </th>
        </tr>
        <tr>
          <th
            className="border  text-gray-700 border-slate-300 p-2"
            rowSpan="2"
          >
            Block Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2" rowSpan="2">
            Floor Name
          </th>
          <th
            className="border  text-gray-700 border-slate-300 p-2"
            rowSpan="2"
          >
            Total Area
          </th>
          <th className="border text-gray-700 border-slate-300 p-2" rowSpan="2">
            Deduction
          </th>
          <th className="border text-gray-700 border-slate-300 p-2" rowSpan="2">
            Not Counted in FAR Area
          </th>
          <th className="border text-gray-700 border-slate-300 p-2" colSpan="5">
            Builtup (FAR) Area
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Residential
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Commercial
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Industrial
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Institutional
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Educational
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((block) => (
          <>
            <tr>
              <td
                className="border border-slate-300 p-1"
                rowSpan={block?.floors.length + 2}
              >
                {block?.blockName}
              </td>
            </tr>
            {block?.floors.map((floor, floorIndex) => (
              <tr key={floorIndex}>
                <td className="border border-slate-300 p-1">
                  {floor?.floorName}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor?.totalArea}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor?.deduction}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor?.notCountedInFARArea}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor?.residential}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor?.commercial}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor?.industrial}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor?.institutional}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor?.educational}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border border-slate-300 p-1">Total</td>
              {Object.keys(block?.floors[0])
                .filter((item) => item !== "floorName") // Skip floorName
                .map((item) => grandTotal(item, block?.floors))
                .map((item, idx) => (
                  <td key={idx} className="border border-slate-300 p-1">
                    {item}
                  </td>
                ))}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default FloorwiseBreakupTable;
