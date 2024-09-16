// export default function ContinuousBalcony() {
//   return (
//     <table className="w-full text-center mt-3">
//       <thead>
//         <tr>
//           <th
//             colSpan={5}
//             className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
//           >
//             Continuous Balcony
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
//             Building Length
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">
//             Balcony Length
//           </th>
//           <th className="border text-gray-700 border-slate-300 p-2">Result</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR03</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR03</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.08</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR03</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">Single</td>
//           <td className="font-normal border border-slate-300 p-1">FLOOR03</td>
//           <td className="font-normal border border-slate-300 p-1">32.72</td>
//           <td className="font-normal border border-slate-300 p-1">6.00</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }
export default function ContinuousBalcony() {
  const balconyData = [
    { blockName: "Single", floorName: "FLOOR01", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR01", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR01", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR01", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR02", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR02", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR02", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR02", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR03", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR03", buildingLength: "32.72", balconyLength: "6.08", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR03", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" },
    { blockName: "Single", floorName: "FLOOR03", buildingLength: "32.72", balconyLength: "6.00", result: "Compliant" }
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th colSpan={5} className="border bg-gray-400 text-gray-800 border-slate-300 p-2">
            Continuous Balcony
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Block Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">Floor Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">Building Length</th>
          <th className="border text-gray-700 border-slate-300 p-2">Balcony Length</th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {balconyData.map((item, index) => (
          <tr key={index}>
            <td className="font-normal border border-slate-300 p-1">{item.blockName}</td>
            <td className="font-normal border border-slate-300 p-1">{item.floorName}</td>
            <td className="font-normal border border-slate-300 p-1">{item.buildingLength}</td>
            <td className="font-normal border border-slate-300 p-1">{item.balconyLength}</td>
            <td className="font-normal border border-slate-300 p-1">{item.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
