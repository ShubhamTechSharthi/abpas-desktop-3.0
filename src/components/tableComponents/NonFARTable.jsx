// import React from "react";

// export default function NonFARTable() {
//   return (
//     <table className="w-full text-center mt-3 border-collapse border border-slate-400">
//       <thead>
//         <tr>
//           <th
//             colSpan={6}
//             className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
//           >
//             Non FAR (25%)
//           </th>
//         </tr>
//         <tr>
//           <th className="border text-gray-700 border-slate-300 p-2">Rules/Table</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Parameter</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Minimum Provided</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Result</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="border border-slate-300 p-1">-</td>
//           <td className="border border-slate-300 p-1">Permissible Non FAR (25%)</td>
//           <td className="border border-slate-300 p-1">N.A.</td>
//           <td className="border border-slate-300 p-1">888.08</td>
//           <td className="border border-slate-300 p-1">121.62 (3.42%)</td>
//           <td className="border border-slate-300 p-1">Compliant</td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }


import React from "react";

export default function NonFARTable() {
  // Data array for Non FAR details
  const nonFARData = [
    {
      rule: "-",
      parameter: "Permissible Non FAR (25%)",
      minRequired: "N.A.",
      maxPermissible: "888.08",
      minProvided: "121.62 (3.42%)",
      result: "Compliant",
    },
    // Add more entries here if needed
  ];

  return (
    <table className="w-full text-center mt-3 border-collapse border border-slate-400">
      <thead>
        <tr>
          <th
            colSpan={6}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Non FAR (25%)
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Rules/Table</th>
          <th className="border text-gray-700 border-slate-300 p-2">Parameter</th>
          <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
          <th className="border text-gray-700 border-slate-300 p-2">Minimum Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {nonFARData.map((row, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{row.rule}</td>
            <td className="border border-slate-300 p-1">{row.parameter}</td>
            <td className="border border-slate-300 p-1">{row.minRequired}</td>
            <td className="border border-slate-300 p-1">{row.maxPermissible}</td>
            <td className="border border-slate-300 p-1">{row.minProvided}</td>
            <td className="border border-slate-300 p-1">{row.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
