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
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
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
                className="font-normal border border-slate-300 p-1"
                rowSpan={block["Floors"].length + 2}
              >
                {block["Block Name"]}
              </td>
            </tr>
            {block["Floors"].map((floor, floorIndex) => (
              <tr key={floorIndex}>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Floor Name"]}
                </td>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Total Area"] !== 0
                    ? floor["Total Area"].toFixed(2)
                    : "-"}
                </td>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Deduction"] !== 0
                    ? floor["Deduction"].toFixed(2)
                    : "-"}
                </td>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Not Counted in FAR Area"] !== 0
                    ? floor["Not Counted in FAR Area"].toFixed(2)
                    : "-"}
                </td>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Residential"] !== 0
                    ? floor["Residential"].toFixed(2)
                    : "-"}
                </td>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Commercial"] !== 0
                    ? floor["Commercial"].toFixed(2)
                    : "-"}
                </td>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Industrial"] !== 0
                    ? floor["Industrial"].toFixed(2)
                    : "-"}
                </td>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Institutional"] !== 0
                    ? floor["Institutional"].toFixed(2)
                    : "-"}
                </td>
                <td className="font-normal border border-slate-300 p-1">
                  {floor["Educational"] !== 0
                    ? floor["Educational"].toFixed(2)
                    : "-"}
                </td>
              </tr>
            ))}
            <tr>
              <td className="font-normal border border-slate-300 p-1">Total</td>
              {Object.keys(block["Floors"][0])
                .map((item) => grandTotal(item, block["Floors"]))
                .map((item, idx) => {
                  if (item === "Floor Name") return null;
                  return (
                    <td
                      key={idx}
                      className="font-normal border border-slate-300 p-1"
                    >
                      {item !== 0 ? item.toFixed(2) : "-"}
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
