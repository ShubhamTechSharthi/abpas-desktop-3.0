export default function LedgeLoftHeightTable() {
  const ledgeLoftHeightData = [
    {
      plotNumber: "1",
      floorName: "-",
      parameter: "Ledge Head Room",
      minRequired: "2.20",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "1",
      floorName: "-",
      parameter: "Ledge Height",
      minRequired: "1.50",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "1",
      floorName: "-",
      parameter: "Loft Head Room",
      minRequired: "1.50",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "1",
      floorName: "-",
      parameter: "Loft Height",
      minRequired: "2.20",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "13",
      floorName: "-",
      parameter: "Ledge Head Room",
      minRequired: "2.20",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "13",
      floorName: "-",
      parameter: "Ledge Height",
      minRequired: "1.50",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "13",
      floorName: "-",
      parameter: "Loft Head Room",
      minRequired: "1.50",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "13",
      floorName: "-",
      parameter: "Loft Height",
      minRequired: "2.20",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "14 TO 20-TYPICAL",
      floorName: "-",
      parameter: "Ledge Head Room",
      minRequired: "2.20",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
    {
      plotNumber: "14 TO 20-TYPICAL",
      floorName: "-",
      parameter: "Ledge Height",
      minRequired: "1.50",
      maxPermissible: "N.A.",
      minProvided: "Not Provided",
      result: "N.A.",
    },
  ];

  return (
    <table className="w-full text-center mt-3 border-collapse border border-slate-400">
      <thead>
        <tr>
          <th
            colSpan={7}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Ledge, Loft Height Details
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Plot Number
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
            Minimum Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {ledgeLoftHeightData.map((data, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{data.plotNumber}</td>
            <td className="border border-slate-300 p-1">{data.floorName}</td>
            <td className="border border-slate-300 p-1">{data.parameter}</td>
            <td className="border border-slate-300 p-1">{data.minRequired}</td>
            <td className="border border-slate-300 p-1">
              {data.maxPermissible}
            </td>
            <td className="border border-slate-300 p-1">{data.minProvided}</td>
            <td className="border border-slate-300 p-1">{data.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
