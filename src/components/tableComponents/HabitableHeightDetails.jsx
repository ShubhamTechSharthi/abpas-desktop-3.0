export default function HabitableHeightDeatils() {
  const habitableHeightData = [
    {
      rules: "BVR 69(1)",
      blockName: "Single",
      floorName: "FLOOR-GROUND",
      parameter: "Habitable Room Height",
      minRequired: "2.60",
      maxPermissible: "N.A.",
      provided: "3.00",
      result: "Compliant",
    },
    {
      rules: "BVR 69(1)",
      blockName: "Single",
      floorName: "FLOOR01",
      parameter: "Habitable Room Height",
      minRequired: "2.60",
      maxPermissible: "N.A.",
      provided: "3.00",
      result: "Compliant",
    },
    {
      rules: "BVR 69(1)",
      blockName: "Single",
      floorName: "FLOOR02",
      parameter: "Habitable Room Height",
      minRequired: "2.60",
      maxPermissible: "N.A.",
      provided: "3.00",
      result: "Compliant",
    },
    {
      rules: "BVR 69(1)",
      blockName: "Single",
      floorName: "FLOOR03",
      parameter: "Habitable Room Height",
      minRequired: "2.60",
      maxPermissible: "N.A.",
      provided: "3.00",
      result: "Compliant",
    },
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
            colSpan="8"
          >
            Habitable Height Details
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
        {habitableHeightData.map((data, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{data.rules}</td>
            <td className="border border-slate-300 p-1">{data.blockName}</td>
            <td className="border border-slate-300 p-1">{data.floorName}</td>
            <td className="border border-slate-300 p-1">{data.parameter}</td>
            <td className="border border-slate-300 p-1">{data.minRequired}</td>
            <td className="border border-slate-300 p-1">
              {data.maxPermissible}
            </td>
            <td className="border border-slate-300 p-1">{data.provided}</td>
            <td className="border border-slate-300 p-1">{data.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
