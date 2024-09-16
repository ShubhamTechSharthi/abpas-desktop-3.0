// export default function VentilationShaftCalculation() {
//   return (
//     <table className="w-full text-center mt-3">
//       <thead>
//         <tr>
//           <th
//             colSpan={7}
//             className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
//           >
//             Ventilation Shaft Details [BVR 56 (6b)]
//           </th>
//         </tr>
//         <tr>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Block Name
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Floor Name
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Shaft Side Required
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Width Result
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Shaft Area Required
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Shaft Area Provided
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Area Result
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">FLOOR-BF1</td>
//           <td className="border border-slate-300 p-1">1.20</td>
//           <td className="border border-slate-300 p-1">1.22</td>
//           <td className="border border-slate-300 p-1">2.80</td>
//           <td className="border border-slate-300 p-1">3.70</td>
//           <td className="border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">FLOOR03</td>
//           <td className="border border-slate-300 p-1">1.20</td>
//           <td className="border border-slate-300 p-1">1.22</td>
//           <td className="border border-slate-300 p-1">3.79</td>
//           <td className="border border-slate-300 p-1">4.18</td>
//           <td className="border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">FLOOR03</td>
//           <td className="border border-slate-300 p-1">1.20</td>
//           <td className="border border-slate-300 p-1">1.22</td>
//           <td className="border border-slate-300 p-1">2.80</td>
//           <td className="border border-slate-300 p-1">3.70</td>
//           <td className="border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">FLOOR02</td>
//           <td className="border border-slate-300 p-1">1.20</td>
//           <td className="border border-slate-300 p-1">1.22</td>
//           <td className="border border-slate-300 p-1">2.80</td>
//           <td className="border border-slate-300 p-1">3.70</td>
//           <td className="border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">FLOOR01</td>
//           <td className="border border-slate-300 p-1">1.20</td>
//           <td className="border border-slate-300 p-1">1.22</td>
//           <td className="border border-slate-300 p-1">2.80</td>
//           <td className="border border-slate-300 p-1">3.70</td>
//           <td className="border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">GROUND</td>
//           <td className="border border-slate-300 p-1">1.20</td>
//           <td className="border border-slate-300 p-1">1.22</td>
//           <td className="border border-slate-300 p-1">2.80</td>
//           <td className="border border-slate-300 p-1">3.70</td>
//           <td className="border border-slate-300 p-1">Compliant</td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }
export default function VentilationShaftCalculation() {
  const ventilationShaftData = [
    {
      blockName: 'Single',
      floorName: 'FLOOR-BF1',
      shaftSideRequired: '1.20',
      widthResult: '1.22',
      shaftAreaRequired: '2.80',
      shaftAreaProvided: '3.70',
      areaResult: 'Compliant',
    },
    {
      blockName: 'Single',
      floorName: 'FLOOR03',
      shaftSideRequired: '1.20',
      widthResult: '1.22',
      shaftAreaRequired: '3.79',
      shaftAreaProvided: '4.18',
      areaResult: 'Compliant',
    },
    {
      blockName: 'Single',
      floorName: 'FLOOR03',
      shaftSideRequired: '1.20',
      widthResult: '1.22',
      shaftAreaRequired: '2.80',
      shaftAreaProvided: '3.70',
      areaResult: 'Compliant',
    },
    {
      blockName: 'Single',
      floorName: 'FLOOR02',
      shaftSideRequired: '1.20',
      widthResult: '1.22',
      shaftAreaRequired: '2.80',
      shaftAreaProvided: '3.70',
      areaResult: 'Compliant',
    },
    {
      blockName: 'Single',
      floorName: 'FLOOR01',
      shaftSideRequired: '1.20',
      widthResult: '1.22',
      shaftAreaRequired: '2.80',
      shaftAreaProvided: '3.70',
      areaResult: 'Compliant',
    },
    {
      blockName: 'Single',
      floorName: 'GROUND',
      shaftSideRequired: '1.20',
      widthResult: '1.22',
      shaftAreaRequired: '2.80',
      shaftAreaProvided: '3.70',
      areaResult: 'Compliant',
    },
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={7}
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Ventilation Shaft Details [BVR 56 (6b)]
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Block Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">Floor Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">Shaft Side Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Width Result</th>
          <th className="border text-gray-700 border-slate-300 p-2">Shaft Area Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Shaft Area Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Area Result</th>
        </tr>
      </thead>
      <tbody>
        {ventilationShaftData.map((item, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{item.blockName}</td>
            <td className="border border-slate-300 p-1">{item.floorName}</td>
            <td className="border border-slate-300 p-1">{item.shaftSideRequired}</td>
            <td className="border border-slate-300 p-1">{item.widthResult}</td>
            <td className="border border-slate-300 p-1">{item.shaftAreaRequired}</td>
            <td className="border border-slate-300 p-1">{item.shaftAreaProvided}</td>
            <td className="border border-slate-300 p-1">{item.areaResult}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
