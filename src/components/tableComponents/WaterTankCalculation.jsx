export default function WaterTankCalculation() {
  return (
    <table className="w-full text-center mt-3">
      <tr>
        <th
          className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          colSpan={7}
        >
          Water Tank Calculation
        </th>
      </tr>
      <tr>
        <th className="border text-gray-700 border-slate-300 p-2">
          Rules/Table
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Building Usage
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Occupant Load
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Minimum LPHD
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">Required</th>
        <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
        <th className="border text-gray-700 border-slate-300 p-2">Result</th>
      </tr>
      <tr>
        <td className="border border-slate-300 p-1">
          NBC VOL-2 Part-9 Section-1 Clause 4.1
        </td>
        <td className="border border-slate-300 p-1">RESIDENTIAL</td>
        <td className="border border-slate-300 p-1">117</td>
        <td className="border border-slate-300 p-1">100.00</td>
        <td className="border border-slate-300 p-1">11,700.00</td>
        <td className="border border-slate-300 p-1">-</td>
        <td className="border border-slate-300 p-1">-</td>
      </tr>
      <tr>
        <td className="border border-slate-300 p-1">Total:</td>
        <td className="border border-slate-300 p-1">-</td>
        <td className="border border-slate-300 p-1">-</td>
        <td className="border border-slate-300 p-1">-</td>
        <td className="border border-slate-300 p-1">11,700.00</td>
        <td className="border border-slate-300 p-1">103,308.00</td>
        <td className="border border-slate-300 p-1">Compliant</td>
      </tr>
    </table>
  );
}
