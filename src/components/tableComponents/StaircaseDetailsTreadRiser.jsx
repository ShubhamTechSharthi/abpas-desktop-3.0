const StaircaseDetailsTreadRiser = ({ data }) => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={9}
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Staircase Details Tread Riser
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
            Maximum Riser Allowable
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Minimum Tread Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Riser Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Riser Result
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Staircase Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Tread Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Tread Result
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{item.blockName}</td>
            <td className="border border-slate-300 p-1">{item.floorName}</td>
            <td className="border border-slate-300 p-1">
              {item.maximumRiserAllowable}
            </td>
            <td className="border border-slate-300 p-1">
              {item.minimumTreadRequired}
            </td>
            <td className="border border-slate-300 p-1">
              {item.riserProvided}
            </td>
            <td className="border border-slate-300 p-1">{item.riserResult}</td>
            <td className="border border-slate-300 p-1">
              {item.staircaseName}
            </td>
            <td className="border border-slate-300 p-1">
              {item.treadProvided}
            </td>
            <td className="border border-slate-300 p-1">{item.treadResult}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default StaircaseDetailsTreadRiser;
