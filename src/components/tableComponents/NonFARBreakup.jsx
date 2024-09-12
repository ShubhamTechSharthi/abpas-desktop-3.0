import React from "react";

const NonFARBreakupTable = ({ data }) => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            className="border bg-gray-300 text-gray-700 border-slate-300 p-2"
            colSpan={4}
          >
            Not Counted in FAR Breakup
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Block Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Typical Floor Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Non FAR Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Non FAR Area
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((block, index) => (
          <>
            <tr>
              <td
                rowSpan={
                  1 +
                  block["Floors"].reduce(
                    (acc, item) => acc + item["Non FAR Objects"].length + 2,
                    0
                  )
                }
                className="border border-slate-300 p-1"
              >
                {block["Block Name"]}
              </td>
            </tr>
            {block["Floors"].map((floor, floorIndex) => (
              <>
                <tr>
                  <td
                    rowSpan={floor["Non FAR Objects"].length + 1}
                    className="border border-slate-300 p-1"
                  >
                    {floor["Typical Floor Name"]}
                  </td>
                </tr>
                {floor["Non FAR Objects"].map((FARObject, FARIndex) => (
                  <tr key={FARIndex}>
                    <td className="border border-slate-300 p-1">
                      {FARObject["Non FAR Name"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {FARObject["Non FAR Area"]}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th colSpan={2} className="border border-slate-300 p-1">
                    Total
                  </th>
                  <th className="border border-slate-300 p-1">
                    {floor["Total Non FAR Area"]}
                  </th>
                </tr>
              </>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default NonFARBreakupTable;
