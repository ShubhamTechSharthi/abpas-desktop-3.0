// export default function EscalatorDetails() {
//   return (
//     <table className="w-full text-center mt-3">
//       <thead>
//         <tr>
//           <th
//             colspan="8"
//             className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
//           >
//             Escalator Details
//           </th>
//         </tr>
//         <tr>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Block Name
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Block Height
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Block No. of Floors
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Unique Id
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">Name</th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Location
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Dimension
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Capacity
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">12.65</td>
//           <td className="border border-slate-300 p-1">
//             BF-1 + Parking-1 + Ground + 2 Floors
//           </td>
//           <td className="border border-slate-300 p-1">Single_1</td>
//           <td className="border border-slate-300 p-1">1</td>
//           <td className="border border-slate-300 p-1">BF2 to FLOOR01</td>
//           <td className="border border-slate-300 p-1">13.71X3.05</td>
//           <td className="border border-slate-300 p-1">1000.3 Person</td>
//         </tr>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">12.65</td>
//           <td className="border border-slate-300 p-1">
//             BF-1 + Parking-1 + Ground + 2 Floors
//           </td>
//           <td className="border border-slate-300 p-1">Single_2</td>
//           <td className="border border-slate-300 p-1">2</td>
//           <td className="border border-slate-300 p-1">BF1 to FLOOR01</td>
//           <td className="border border-slate-300 p-1">11.20X3.57</td>
//           <td className="border border-slate-300 p-1">1000.3 Person</td>
//         </tr>
//         <tr>
//           <td className="border border-slate-300 p-1">Single</td>
//           <td className="border border-slate-300 p-1">12.65</td>
//           <td className="border border-slate-300 p-1">
//             BF-1 + Parking-1 + Ground + 2 Floors
//           </td>
//           <td className="border border-slate-300 p-1">Single_3</td>
//           <td className="border border-slate-300 p-1">3</td>
//           <td className="border border-slate-300 p-1">BF1 to FLOOR01</td>
//           <td className="border border-slate-300 p-1">13.82X3.05</td>
//           <td className="border border-slate-300 p-1">1000.3 Person</td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }


export default function EscalatorDetails() {
  const escalatorData = [
    { blockName: 'Single', blockHeight: 12.65, floors: 'BF-1 + Parking-1 + Ground + 2 Floors', uniqueId: 'Single_1', name: '1', location: 'BF2 to FLOOR01', dimension: '13.71X3.05', capacity: '1000.3 Person' },
    { blockName: 'Single', blockHeight: 12.65, floors: 'BF-1 + Parking-1 + Ground + 2 Floors', uniqueId: 'Single_2', name: '2', location: 'BF1 to FLOOR01', dimension: '11.20X3.57', capacity: '1000.3 Person' },
    { blockName: 'Single', blockHeight: 12.65, floors: 'BF-1 + Parking-1 + Ground + 2 Floors', uniqueId: 'Single_3', name: '3', location: 'BF1 to FLOOR01', dimension: '13.82X3.05', capacity: '1000.3 Person' },
    // Add additional rows here
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan="8"
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Escalator Details
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Block Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">Block Height</th>
          <th className="border text-gray-700 border-slate-300 p-2">Block No. of Floors</th>
          <th className="border text-gray-700 border-slate-300 p-2">Unique Id</th>
          <th className="border text-gray-700 border-slate-300 p-2">Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">Location</th>
          <th className="border text-gray-700 border-slate-300 p-2">Dimension</th>
          <th className="border text-gray-700 border-slate-300 p-2">Capacity</th>
        </tr>
      </thead>
      <tbody>
        {escalatorData.map((escalator, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{escalator.blockName}</td>
            <td className="border border-slate-300 p-1">{escalator.blockHeight}</td>
            <td className="border border-slate-300 p-1">{escalator.floors}</td>
            <td className="border border-slate-300 p-1">{escalator.uniqueId}</td>
            <td className="border border-slate-300 p-1">{escalator.name}</td>
            <td className="border border-slate-300 p-1">{escalator.location}</td>
            <td className="border border-slate-300 p-1">{escalator.dimension}</td>
            <td className="border border-slate-300 p-1">{escalator.capacity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
