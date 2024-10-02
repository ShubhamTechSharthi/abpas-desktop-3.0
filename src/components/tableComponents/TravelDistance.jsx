import React from "react";

export default function TravelDistance() {
  // Simplified data structure
  const data = [
    {
      blockName: "Single",
      floors: [
        {
          floorName: "Floor1",
          measr: [
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
          ],
        },
      ],
    },
    {
      blockName: "Double",
      floors: [
        {
          floorName: "Floor1",
          measr: [
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
            {
              max: 30,
              actual: 9.42,
              result: "Compliant",
            },
          ],
        },
      ],
    },
  ];

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
        {data.map((block, blockIndex) => (
          <React.Fragment key={blockIndex}>
            <tr>
              <td
                rowSpan={
                  1 +
                  block["floors"].reduce(
                    (acc, item) => acc + item["measr"].length + 1,
                    0
                  )
                }
                className="border border-slate-300 p-1"
              >
                {block["blockName"]}
              </td>
            </tr>
            {block["floors"].map((floor, floorIndex) => (
              <React.Fragment key={floorIndex}>
                <tr>
                  <td
                    rowSpan={floor["measr"].length + 1}
                    className="border border-slate-300 p-1"
                  >
                    {floor["floorName"]}
                  </td>
                </tr>
                {floor["measr"].map((FARObject, FARIndex) => (
                  <tr key={FARIndex}>
                    <td className="border border-slate-300 p-1">
                      {FARObject["max"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {FARObject["actual"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {FARObject["result"]}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
