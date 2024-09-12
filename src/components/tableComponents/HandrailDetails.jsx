export default function HandrailDetails() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr style="background-color: lightgrey;">
          <th
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
            colSpan="7"
          >
            Handrail Details [NBC/VOL-1/Part-4/Clause-4.4.2.4.3.4 (H)]
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
            Staircase Reference
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Minimum Handrail Height Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Maximum Handrail Height Allowable
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Handrail Height Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="3" className="font-normal border border-slate-300 p-1">
            Single
          </td>
          <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
          <td className="font-normal border border-slate-300 p-1">STAIR-01</td>
          <td className="font-normal border border-slate-300 p-1">1.00</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.00</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
          <td className="font-normal border border-slate-300 p-1">STAIR-01</td>
          <td className="font-normal border border-slate-300 p-1">1.00</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.00</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">
            FLOOR-GROUND
          </td>
          <td className="font-normal border border-slate-300 p-1">STAIR-01</td>
          <td className="font-normal border border-slate-300 p-1">1.00</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.00</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
      </tbody>
    </table>
  );
}
