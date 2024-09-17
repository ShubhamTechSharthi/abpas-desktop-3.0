export default function LiftEscalatorandMovingWalkCount() {
  const liftEscalatorData = [
    {
      parameter: "No.of.Lift",
      minRequired: "Not Required",
      maxPermissible: "N.A.",
      provided: "Not Provided",
      result: "N.A.",
    },
    {
      parameter: "No.of.Escalator",
      minRequired: "Not Required",
      maxPermissible: "N.A.",
      provided: "Not Provided",
      result: "N.A.",
    },
    {
      parameter: "No.of.Moving Walk",
      minRequired: "Not Required",
      maxPermissible: "N.A.",
      provided: "Not Provided",
      result: "N.A.",
    },
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={9}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Lift, Escalator and Moving Walk Count
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Parameter</th>
          <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
          <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {liftEscalatorData.map((row, index) => (
          <tr key={index}>
            <td className="font-normal border border-slate-300 p-1">{row.parameter}</td>
            <td className="font-normal border border-slate-300 p-1">{row.minRequired}</td>
            <td className="font-normal border border-slate-300 p-1">{row.maxPermissible}</td>
            <td className="font-normal border border-slate-300 p-1">{row.provided}</td>
            <td className="font-normal border border-slate-300 p-1">{row.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
