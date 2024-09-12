const PodiumHeightDetails = () => {
  const podiumData = [
    {
      rule: "BVR 62[1(B)]",
      blockName: "Single",
      floorName: "FLOOR-PODIUM",
      parameter: "Podium Floor Height",
      minRequired: "N.A.",
      maxPermissible: 2.4,
      provided: 2.4,
      result: "Compliant",
    },
    {
      rule: "BVR 62[1(B)]",
      blockName: "Single",
      floorName: "FLOOR-PODIUM02",
      parameter: "Podium Floor Height",
      minRequired: "N.A.",
      maxPermissible: 2.4,
      provided: 2.4,
      result: "Compliant",
    },
    {
      rule: "BVR 62[1(B)]",
      blockName: "Single",
      floorName: "FLOOR-PODIUM02",
      parameter: "Podium Floor Height",
      minRequired: "N.A.",
      maxPermissible: 2.4,
      provided: 2.4,
      result: "Compliant",
    },
    {
      rule: "BVR 62[1(B)]",
      blockName: "Single",
      floorName: "FLOOR-PODIUM02",
      parameter: "Podium Floor Height",
      minRequired: "N.A.",
      maxPermissible: 2.4,
      provided: 2.4,
      result: "Compliant",
    },
    // Add more datas as needed
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={8}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Podium Height Details
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Rules/Table
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Block Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Floor Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Parameter
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Minimum Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Maximum Permissible
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {podiumData.map((data, index) => (
          <tr key={index}>
            <td className="font-normal border border-slate-300 p-1">
              {data.rule}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {data.blockName}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {data.floorName}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {data.parameter}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {data.minRequired}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {data.maxPermissible}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {data.provided}
            </td>
            <td className="font-normal border border-slate-300 p-1">
              {data.result}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PodiumHeightDetails;
