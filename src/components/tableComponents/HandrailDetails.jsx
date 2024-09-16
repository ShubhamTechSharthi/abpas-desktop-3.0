export default function HandrailDetails() {
  const handrailData = [
    {
      block: "Single",
      floors: [
        {
          floorName: "Floor1",
          measr: [
            {
              staircaseRef: "STAIR-01",
              minHeightRequired: "1.00",
              maxHeightAllowable: "1.20",
              heightProvided: "1.00",
              result: "Compliant",
            },
            {
              staircaseRef: "STAIR-01",
              minHeightRequired: "1.00",
              maxHeightAllowable: "1.20",
              heightProvided: "1.00",
              result: "Compliant",
            },
            {
              staircaseRef: "STAIR-01",
              minHeightRequired: "1.00",
              maxHeightAllowable: "1.20",
              heightProvided: "1.00",
              result: "Compliant",
            },
          ],
        },
      ],
    },
    {
      block: "Double",
      floors: [
        {
          floorName: "Floor2",
          measr: [
            {
              staircaseRef: "STAIR-01",
              minHeightRequired: "1.00",
              maxHeightAllowable: "1.20",
              heightProvided: "1.00",
              result: "Compliant",
            },
            {
              staircaseRef: "STAIR-01",
              minHeightRequired: "1.00",
              maxHeightAllowable: "1.20",
              heightProvided: "1.00",
              result: "Compliant",
            },
            {
              staircaseRef: "STAIR-01",
              minHeightRequired: "1.00",
              maxHeightAllowable: "1.20",
              heightProvided: "1.00",
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
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
            colSpan="7"
          >
            Handrail Details [NBC/VOL-1/Part-4/Clause-4.4.2.4.3.4 (H)]
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Block Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Floor Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Staircase Reference
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Minimum Handrail Height Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Maximum Handrail Height Allowable
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Handrail Height Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {handrailData.map((block) => (
          <>
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
                {block["block"]}
              </td>
            </tr>
            {block["floors"].map((floor) => (
              <>
                <tr>
                  <td
                    rowSpan={floor["measr"].length + 1}
                    className="border border-slate-300 p-1"
                  >
                    {floor["floorName"]}
                  </td>
                </tr>
                {floor["measr"].map((Object, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 p-1">
                      {Object["staircaseRef"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {Object["minHeightRequired"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {Object["maxHeightAllowable"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {Object["heightProvided"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {Object["result"]}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}
