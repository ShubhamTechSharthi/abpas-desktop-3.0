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
                rowSpan={block["Floors"].length + 2}
              >
                {block["Block Name"]}
              </td>
            </tr>
            {block["Floors"].map((floor, floorIndex) => (
              <tr key={floorIndex}>
                <td className="border border-slate-300 p-1">
                  {floor["Floor Name"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor["Total Area"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor["Deduction"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor["Not Counted in FAR Area"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor["Residential"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor["Commercial"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor["Industrial"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor["Institutional"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {floor["Educational"]}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border border-slate-300 p-1">Total</td>
              {Object.keys(block["Floors"][0])
                .map((item) => grandTotal(item, block["Floors"]))
                .map((item, idx) => {
                  if (item === "Floor Name") return null;
                  return (
                    <td key={idx} className="border border-slate-300 p-1">
                      {item}
                    </td>
                  );
                })}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default FloorwiseBreakupTable;
