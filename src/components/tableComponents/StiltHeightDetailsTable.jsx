// export default function StiltHeightDetailsTable() {
//     // Example data array
//     const tableData = [
//       {
//         rule: "-",
//         blockName: "Block A",
//         floorName: "Ground Floor",
//         parameter: "Stilt Height",
//         minRequired: "N.A.",
//         maxPermissible: "4.5 m",
//         minProvided: "4.0 m",
//         result: "Compliant",
//       },
//       // Add more data objects here if needed
//     ];
  
//     return (
//       <table className="w-full text-center mt-3 border-collapse border border-slate-400">
//         <thead>
//           <tr>
//             <th
//               colSpan={8}
//               className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
//             >
//               Stilt Height Details
//             </th>
//           </tr>
//           <tr>
//             <th className="border text-gray-700 border-slate-300 p-2">Rules/Table</th>
//             <th className="border text-gray-700 border-slate-300 p-2">Block Name</th>
//             <th className="border text-gray-700 border-slate-300 p-2">Floor Name</th>
//             <th className="border text-gray-700 border-slate-300 p-2">Parameter</th>
//             <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
//             <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
//             <th className="border text-gray-700 border-slate-300 p-2">Minimum Provided</th>
//             <th className="border text-gray-700 border-slate-300 p-2">Result</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, index) => (
//             <tr key={index}>
//               <td className="border border-slate-300 p-1">{row.rule}</td>
//               <td className="border border-slate-300 p-1">{row.blockName}</td>
//               <td className="border border-slate-300 p-1">{row.floorName}</td>
//               <td className="border border-slate-300 p-1">{row.parameter}</td>
//               <td className="border border-slate-300 p-1">{row.minRequired}</td>
//               <td className="border border-slate-300 p-1">{row.maxPermissible}</td>
//               <td className="border border-slate-300 p-1">{row.minProvided}</td>
//               <td className="border border-slate-300 p-1">{row.result}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   }
  
  







  export default function StiltHeightDetailsTable() {
    // Data array for Stilt Height Details
    const StiltHeightData = [
      {
        rule: "-",
        blockName: "Block A",
        floorName: "Ground Floor",
        parameter: "Stilt Height",
        minRequired: "N.A.",
        maxPermissible: "4.5 m",
        minProvided: "4.0 m",
        result: "Compliant",
      },
      // Add more data objects here if needed
    ];
  
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
          {StiltHeightData.map((row, index) => (
            <tr key={index}>
              <td className="border border-slate-300 p-1">{row.rule}</td>
              <td className="border border-slate-300 p-1">{row.blockName}</td>
              <td className="border border-slate-300 p-1">{row.floorName}</td>
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
  