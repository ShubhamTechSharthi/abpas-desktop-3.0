export default function BathroomRelatedHeightDetails() {
  const bathroomHeightData = [
    {
      rule: "BVR 71(1)",
      blockName: "Single",
      floorName: "FLOOR-GROUND",
      parameter: "Bathroom and WC Height",
      minRequired: "2.20",
      maxPermissible: "N.A.",
      provided: "3.00",
      result: "Compliant",
    },
    {
      rule: "BVR 71(1)",
      blockName: "Single",
      floorName: "FLOOR01",
      parameter: "Bathroom and WC Height",
      minRequired: "2.20",
      maxPermissible: "N.A.",
      provided: "3.00",
      result: "Compliant",
    },
    {
      rule: "BVR 71(1)",
      blockName: "Single",
      floorName: "FLOOR02",
      parameter: "Bathroom and WC Height",
      minRequired: "2.20",
      maxPermissible: "N.A.",
      provided: "3.00",
      result: "Compliant",
    },
    {
      rule: "BVR 71(1)",
      blockName: "Single",
      floorName: "FLOOR03",
      parameter: "Bathroom and WC Height",
      minRequired: "2.20",
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
            Bathroom Related Height Details
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Rules/Table</th>
          <th className="border text-gray-700 border-slate-300 p-2">Block Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">Floor Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">Parameter</th>
          <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
          <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {bathroomHeightData.map((row, index) => (
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
