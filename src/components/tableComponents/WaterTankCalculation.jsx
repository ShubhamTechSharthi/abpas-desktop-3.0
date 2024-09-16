// export default function WaterTankCalculation() {
//   return (
//     <table className="w-full text-center mt-3">
//       <tr>
//         <th
//           className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
//           colSpan={7}
//         >
//           Water Tank Calculation
//         </th>
//       </tr>
//       <tr>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Rules/Table
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Building Usage
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Occupant Load
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">
//           Minimum LPHD
//         </th>
//         <th className="border text-gray-700 border-slate-300 p-2">Required</th>
//         <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
//         <th className="border text-gray-700 border-slate-300 p-2">Result</th>
//       </tr>
//       <tr>
//         <td className="border border-slate-300 p-1">
//           NBC VOL-2 Part-9 Section-1 Clause 4.1
//         </td>
//         <td className="border border-slate-300 p-1">RESIDENTIAL</td>
//         <td className="border border-slate-300 p-1">117</td>
//         <td className="border border-slate-300 p-1">100.00</td>
//         <td className="border border-slate-300 p-1">11,700.00</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">-</td>
//       </tr>
//       <tr>
//         <td className="border border-slate-300 p-1">Total:</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">-</td>
//         <td className="border border-slate-300 p-1">11,700.00</td>
//         <td className="border border-slate-300 p-1">103,308.00</td>
//         <td className="border border-slate-300 p-1">Compliant</td>
//       </tr>
//     </table>
//   );
// }
export default function WaterTankCalculation() {
  const waterTankData = [
    {
      rules: 'NBC VOL-2 Part-9 Section-1 Clause 4.1',
      buildingUsage: 'RESIDENTIAL',
      occupantLoad: 117,
      minLPHD: 100.00,
      required: '11,700.00',
      provided: '-',
      result: '-',
    },
    {
      rules: 'Total:',
      buildingUsage: '-',
      occupantLoad: '-',
      minLPHD: '-',
      required: '11,700.00',
      provided: '103,308.00',
      result: 'Compliant',
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
            Water Tank Calculation
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Rules/Table</th>
          <th className="border text-gray-700 border-slate-300 p-2">Building Usage</th>
          <th className="border text-gray-700 border-slate-300 p-2">Occupant Load</th>
          <th className="border text-gray-700 border-slate-300 p-2">Minimum LPHD</th>
          <th className="border text-gray-700 border-slate-300 p-2">Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {waterTankData.map((item, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{item.rules}</td>
            <td className="border border-slate-300 p-1">{item.buildingUsage}</td>
            <td className="border border-slate-300 p-1">{item.occupantLoad}</td>
            <td className="border border-slate-300 p-1">{item.minLPHD}</td>
            <td className="border border-slate-300 p-1">{item.required}</td>
            <td className="border border-slate-300 p-1">{item.provided}</td>
            <td className="border border-slate-300 p-1">{item.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
