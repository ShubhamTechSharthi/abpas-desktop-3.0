const StaircaseDetails = ({ data }) => {
  const staircaseData = [
    {
      blockName: "Single",
      floors: [
        {
          floorName: "FLOOR01-EX",
          staircases: [
            {
              name: "STAIRCASE 01",
              minWidthRequired: 1.5,
              widthProvided: 2.0,
              widthResult: "Compliant",
              minLandingWidthRequired: 0.85,
              landingWidthProvided: 4.1,
              landingWidthResult: "Compliant",
            },
            {
              name: "STAIRCASE 02",
              minWidthRequired: 1.5,
              widthProvided: 2.06,
              widthResult: "Compliant",
              minLandingWidthRequired: 0.85,
              landingWidthProvided: 2.06,
              landingWidthResult: "Compliant",
            },
            {
              name: "STAIRCASE 03",
              minWidthRequired: 1.5,
              widthProvided: 2.0,
              widthResult: "Compliant",
              minLandingWidthRequired: 0.85,
              landingWidthProvided: 4.1,
              landingWidthResult: "Compliant",
            },
            {
              name: "STAIRCASE 06",
              minWidthRequired: 1.5,
              widthProvided: 1.6,
              widthResult: "Compliant",
              minLandingWidthRequired: 0.85,
              landingWidthProvided: 3.6,
              landingWidthResult: "Compliant",
            },
            {
              name: "STAIRCASE 07",
              minWidthRequired: 1.5,
              widthProvided: 2.0,
              widthResult: "Compliant",
              minLandingWidthRequired: 0.85,
              landingWidthProvided: 2.0,
              landingWidthResult: "Compliant",
            },
          ],
        },
        {
          blockName: "Single",
          floorName: "FLOOR02-EX",
          staircases: [
            {
              name: "STAIRCASE 01",
              minWidthRequired: 1.5,
              widthProvided: 2.0,
              widthResult: "Compliant",
              minLandingWidthRequired: 0.85,
              landingWidthProvided: 4.1,
              landingWidthResult: "Compliant",
            },
            {
              name: "STAIRCASE 02",
              minWidthRequired: 1.5,
              widthProvided: 2.06,
              widthResult: "Compliant",
              minLandingWidthRequired: 0.85,
              landingWidthProvided: 2.06,
              landingWidthResult: "Compliant",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <table className="w-full text-center mt-3">
        <thead>
          <tr>
            <th
              colSpan="9"
              className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
            >
              Staircase Details [BVR 80]
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
              Staircase Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Minimum Staircase Width Required
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Width Provided
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Width Result
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Minimum Staircase Landing Width Required
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Landing Width Provided
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Landing Width Result
            </th>
          </tr>
        </thead>
        <tbody>
          {staircaseData.map((block, index) => (
            <>
              <tr key={index}>
                <td
                  rowSpan={
                    1 +
                    block["floors"].reduce(
                      (acc, item) => acc + item["staircases"].length + 1,
                      0
                    )
                  }
                  className="border border-slate-300 p-1"
                >
                  {block["blockName"]}
                </td>
              </tr>
              {block["floors"].map((floor) => (
                <>
                  <tr>
                    <td
                      rowSpan={floor["staircases"].length + 1}
                      className="border border-slate-300 p-1"
                    >
                      {floor["floorName"]}
                    </td>
                  </tr>
                  {floor["staircases"].map((Object, index) => (
                    <tr key={index}>
                      <td className="border border-slate-300 p-1">
                        {Object["name"]}
                      </td>
                      <td className="border border-slate-300 p-1">
                        {Object["minWidthRequired"]}
                      </td>
                      <td className="border border-slate-300 p-1">
                        {Object["widthProvided"]}
                      </td>
                      <td className="border border-slate-300 p-1">
                        {Object["widthResult"]}
                      </td>
                      <td className="border border-slate-300 p-1">
                        {Object["minLandingWidthRequired"]}
                      </td>
                      <td className="border border-slate-300 p-1">
                        {Object["landingWidthProvided"]}
                      </td>
                      <td className="border border-slate-300 p-1">
                        {Object["landingWidthResult"]}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default StaircaseDetails;
