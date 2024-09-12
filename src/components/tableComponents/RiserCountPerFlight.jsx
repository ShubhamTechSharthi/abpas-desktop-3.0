export default function RiserCountPerFlight() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={7}
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
        <tr>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">FLOOR-BF1</td>
          <td className="border border-slate-300 p-1">STAIR-1</td>
          <td className="border border-slate-300 p-1">15</td>
          <td className="border border-slate-300 p-1">11</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">FLOOR01</td>
          <td className="border border-slate-300 p-1">STAIR-1</td>
          <td className="border border-slate-300 p-1">15</td>
          <td className="border border-slate-300 p-1">11</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">FLOOR02</td>
          <td className="border border-slate-300 p-1">STAIR-1</td>
          <td className="border border-slate-300 p-1">15</td>
          <td className="border border-slate-300 p-1">11</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">GROUND</td>
          <td className="border border-slate-300 p-1">STAIR-1</td>
          <td className="border border-slate-300 p-1">15</td>
          <td className="border border-slate-300 p-1">11</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
      </tbody>
    </table>
  );
}
