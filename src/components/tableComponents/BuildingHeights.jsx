export default function BuildingHeights() {
  return (
    <table className="w-full text-center mt-3">
      <tr>
        <th
          colSpan="7"
          className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
        >
          Building Height
        </th>
      </tr>
      <tr>
        <th className="border text-gray-700 border-slate-300 p-2">
          Plot Number
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Rules from BVN / Master Plan
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Minimum Required
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Maximum Permissible
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">
          Required Values As per Colony Rules
        </th>
        <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
        <th className="border text-gray-700 border-slate-300 p-2">Result</th>
      </tr>
      <tr>
        <td className="border border-slate-300 p-1">1</td>
        <td className="border border-slate-300 p-1">Master Plan</td>
        <td className="border border-slate-300 p-1">N.A.</td>
        <td className="border border-slate-300 p-1">N.A.</td>
        <td className="border border-slate-300 p-1">12.00</td>
        <td className="border border-slate-300 p-1">9</td>
        <td className="border border-slate-300 p-1">Compliant</td>
      </tr>
    </table>
  );
}
