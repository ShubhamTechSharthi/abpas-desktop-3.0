const RiserCountPerFlight = ({ data }) => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={6}
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Riser Count Per Flight [BVR 80(5)]
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
            Maximum Riser Allowed
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {data.map((riserRow, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">
              {riserRow.blockName}
            </td>
            <td className="border border-slate-300 p-1">
              {riserRow.floorName}
            </td>
            <td className="border border-slate-300 p-1">
              {riserRow.staircaseName}
            </td>
            <td className="border border-slate-300 p-1">
              {riserRow.maximumRequired}
            </td>
            <td className="border border-slate-300 p-1">{riserRow.provided}</td>
            <td className="border border-slate-300 p-1">{riserRow.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default RiserCountPerFlight;
