export default function BasementHeightDetails() {
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
        <tr>
          <td className="border border-slate-300 p-1">BVR 76 (4)(A)</td>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">FLOOR-BF1</td>
          <td className="border border-slate-300 p-1">Basement Clear Height</td>
          <td className="border border-slate-300 p-1">2.40</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">2.50</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
      </tbody>
    </table>
  );
}
