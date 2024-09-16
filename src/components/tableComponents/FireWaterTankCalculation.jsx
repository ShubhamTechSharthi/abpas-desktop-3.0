// export default function BasementHeightDetails() {
//   return (
//     <table className="w-full text-center mt-3">
//       <tr>
//         <th
//           className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
//           colSpan={7}
//         >
//           Fire Water Tank Calculation
//         </th>
//       </tr>
//       <tr>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Building Type
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Ground Water Tank Required
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Ground Water Tank Provided
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Ground Water Tank Result
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Terrace Water Tank Required
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Terrace Water Tank Provided
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Terrace Water Tank Result
//         </th>
//       </tr>
//       <tr>
//         <td className="border border-slate-300 p-1">RESIDENTIAL</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">103,308.50</td>
//         <td className="border border-slate-300 p-1">Compliant</td>
//       </tr>
//       <tr>
//         <td className="border border-slate-300 p-1">Total:</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">N.A.</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">103,308.50</td>
//         <td className="border border-slate-300 p-1">Compliant</td>
//       </tr>
//     </table>
//   );
// }
export default function BasementHeightDetails() {
  const basementHeightData = [
    {
      buildingType: 'RESIDENTIAL',
      groundWaterTankRequired: '-',
      groundWaterTankProvided: '-',
      groundWaterTankResult: '-',
      terraceWaterTankRequired: '-',
      terraceWaterTankProvided: '103,308.50',
      terraceWaterTankResult: 'Compliant',
    },
    {
      buildingType: 'Total:',
      groundWaterTankRequired: '-',
      groundWaterTankProvided: '-',
      groundWaterTankResult: 'N.A.',
      terraceWaterTankRequired: '-',
      terraceWaterTankProvided: '103,308.50',
      terraceWaterTankResult: 'Compliant',
    },
    // You can add more rows here if needed
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
            colSpan={7}
          >
            Fire Water Tank Calculation
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Building Type</th>
          <th className="border text-gray-700 border-slate-300 p-2">Ground Water Tank Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Ground Water Tank Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Ground Water Tank Result</th>
          <th className="border text-gray-700 border-slate-300 p-2">Terrace Water Tank Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Terrace Water Tank Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Terrace Water Tank Result</th>
        </tr>
      </thead>
      <tbody>
        {basementHeightData.map((item, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{item.buildingType}</td>
            <td className="border border-slate-300 p-1">{item.groundWaterTankRequired}</td>
            <td className="border border-slate-300 p-1">{item.groundWaterTankProvided}</td>
            <td className="border border-slate-300 p-1">{item.groundWaterTankResult}</td>
            <td className="border border-slate-300 p-1">{item.terraceWaterTankRequired}</td>
            <td className="border border-slate-300 p-1">{item.terraceWaterTankProvided}</td>
            <td className="border border-slate-300 p-1">{item.terraceWaterTankResult}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
