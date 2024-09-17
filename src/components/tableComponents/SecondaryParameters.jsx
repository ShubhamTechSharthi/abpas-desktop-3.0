export default function SecondaryParameters() {
  const secondaryParameterData = [
    {
      rule: "BVR 2(9)",
      parameter: "1/3 of the area of roof (Service)",
      minRequired: "N.A.",
      maxPermissible: "119.78",
      provided: "41.32",
      result: "Compliant",
    },
    {
      rule: "-",
      parameter: "Drainage Connection",
      minRequired: "-",
      maxPermissible: "-",
      provided: "Provided",
      result: "-",
    },
    {
      rule: "BVR 79(1)",
      parameter: "Septic Tank Location",
      minRequired: "N.A.",
      maxPermissible: "N.A.",
      provided: "Not Provided",
      result: "N.A.",
    },
    {
      rule: "BVR 79(2)",
      parameter: "Septic Tank Volume",
      minRequired: "N.A.",
      maxPermissible: "N.A.",
      provided: "Not Provided",
      result: "N.A.",
    },
    // Add more rows as necessary
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th colSpan={8} className="border bg-gray-300 text-gray-800 border-slate-300 p-2">
            Secondary Parameters
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Rules/Table</th>
          <th className="border text-gray-700 border-slate-300 p-2">Parameter</th>
          <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
          <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {secondaryParameterData.map((parameterRow, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{parameterRow.rule}</td>
            <td className="border border-slate-300 p-1">{parameterRow.parameter}</td>
            <td className="border border-slate-300 p-1">{parameterRow.minRequired}</td>
            <td className="border border-slate-300 p-1">{parameterRow.maxPermissible}</td>
            <td className="border border-slate-300 p-1">{parameterRow.provided}</td>
            <td className="border border-slate-300 p-1">{parameterRow.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
