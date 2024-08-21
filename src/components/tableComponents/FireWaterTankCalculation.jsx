export default function BasementHeightDetails() {
  return (
    <table className="w-full text-center mt-3">
      <tr>
        <th
          className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          colSpan={7}
        >
          Fire Water Tank Calculation
        </th>
      </tr>
      <tr>
        <th className="border text-gray-700 border-slate-300 p-2">
          Building Type
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Ground Water Tank Required
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Ground Water Tank Provided
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Ground Water Tank Result
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Terrace Water Tank Required
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Terrace Water Tank Provided
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Terrace Water Tank Result
        </th>
      </tr>
      <tr>
        <td className="font-normal border border-slate-300 p-1">RESIDENTIAL</td>
        <td className="font-normal border border-slate-300 p-1">-</td>
        <td className="font-normal border border-slate-300 p-1">-</td>
        <td className="font-normal border border-slate-300 p-1">-</td>
        <td className="font-normal border border-slate-300 p-1">-</td>
        <td className="font-normal border border-slate-300 p-1">103,308.50</td>
        <td className="font-normal border border-slate-300 p-1">Compliant</td>
      </tr>
      <tr>
        <td className="font-normal border border-slate-300 p-1">Total:</td>
        <td className="font-normal border border-slate-300 p-1">-</td>
        <td className="font-normal border border-slate-300 p-1">-</td>
        <td className="font-normal border border-slate-300 p-1">N.A.</td>
        <td className="font-normal border border-slate-300 p-1">-</td>
        <td className="font-normal border border-slate-300 p-1">103,308.50</td>
        <td className="font-normal border border-slate-300 p-1">Compliant</td>
      </tr>
    </table>
  );
}
