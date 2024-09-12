export default function KitchenHeightDetails() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
            colSpan="8"
          >
            Kitchen Height Details
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
          <td className="border border-slate-300 p-1">BVR 70(1)</td>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">FLOOR-GROUND</td>
          <td className="border border-slate-300 p-1">Kitchen Height</td>
          <td className="border border-slate-300 p-1">2.60</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">3.00</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
      </tbody>
    </table>
  );
}
