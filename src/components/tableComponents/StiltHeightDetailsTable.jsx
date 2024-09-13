export default function StiltHeightDetailsTable() {
    return (
      <table className="w-full text-center mt-3 border-collapse border border-slate-400">
        <thead>
          <tr>
            <th
              colSpan={8}
              className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
            >
              Stilt Height Details
            </th>
          </tr>
          <tr>
            <th className="border text-gray-700 border-slate-300 p-2">Rules/Table</th>
            <th className="border text-gray-700 border-slate-300 p-2">Block Name</th>
            <th className="border text-gray-700 border-slate-300 p-2">Floor Name</th>
            <th className="border text-gray-700 border-slate-300 p-2">Parameter</th>
            <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
            <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
            <th className="border text-gray-700 border-slate-300 p-2">Minimum Provided</th>
            <th className="border text-gray-700 border-slate-300 p-2">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300 p-1">-</td>
            <td className="border border-slate-300 p-1">Block A</td>
            <td className="border border-slate-300 p-1">Ground Floor</td>
            <td className="border border-slate-300 p-1">Stilt Height</td>
            <td className="border border-slate-300 p-1">N.A.</td>
            <td className="border border-slate-300 p-1">4.5 m</td>
            <td className="border border-slate-300 p-1">4.0 m</td>
            <td className="border border-slate-300 p-1">Compliant</td>
          </tr>
        </tbody>
      </table>
    );
  }