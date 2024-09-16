export default function BasementHeightDetails() {
  // Example data array
  const tableData = [
    {
      rule: "BVR 76 (4)(A)",
      blockName: "Single",
      floorName: "FLOOR-BF1",
      parameter: "Basement Clear Height",
      minRequired: "2.40",
      maxPermissible: "N.A.",
      provided: "2.50",
      result: "Compliant",
    },
    // Add more data objects here as needed
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={8}
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Basement Height Details
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
        {tableData.map((row, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{row.rule}</td>
            <td className="border border-slate-300 p-1">{row.blockName}</td>
            <td className="border border-slate-300 p-1">{row.floorName}</td>
            <td className="border border-slate-300 p-1">{row.parameter}</td>
            <td className="border border-slate-300 p-1">{row.minRequired}</td>
            <td className="border border-slate-300 p-1">{row.maxPermissible}</td>
            <td className="border border-slate-300 p-1">{row.provided}</td>
            <td className="border border-slate-300 p-1">{row.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
