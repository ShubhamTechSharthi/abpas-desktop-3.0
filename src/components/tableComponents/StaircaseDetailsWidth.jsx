const StaircaseDetailsWidth = ({ data }) => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={9}
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Staircase Details Width
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
            Minimum Staircase Landing Width Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Minimum Staircase Width Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Staircase Landing Width Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Staircase Landing Width Result
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Staircase Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            staircaseWidthProvided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            staircaseWidthResult
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{item.blockName}</td>
            <td className="border border-slate-300 p-1">{item.floorName}</td>
            <td className="border border-slate-300 p-1">
              {item.minimumStaircaseLandingWidthRequired}
            </td>
            <td className="border border-slate-300 p-1">
              {item.minimumStaircaseWidthRequired}
            </td>
            <td className="border border-slate-300 p-1">
              {item.staircaseLandingWidthProvided}
            </td>
            <td className="border border-slate-300 p-1">
              {item.staircaseLandingWidthResult}
            </td>
            <td className="border border-slate-300 p-1">
              {item.staircaseName}
            </td>
            <td className="border border-slate-300 p-1">
              {item.staircaseWidthProvided}
            </td>
            <td className="border border-slate-300 p-1">
              {item.staircaseWidthResult}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default StaircaseDetailsWidth;
