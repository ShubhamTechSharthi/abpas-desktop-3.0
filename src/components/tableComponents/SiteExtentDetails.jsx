// export default function SiteExtentDetails() {
//   return (
//     <table className="w-full text-center mt-3">
//       <thead>
//         <tr>
//           <th
//             colSpan={7}
//             className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
//           >
//             Site Extent
//           </th>
//         </tr>
//         <tr>
//           <th className="border text-gray-700 border-slate-300 p-2">Plot Number</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Rules from BVN / Master Plan</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Required Values As per Colony Rules</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
//           <th className="border text-gray-700 border-slate-300 p-2">Result</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">30</td>
//           <td className="font-normal border border-slate-300 p-1">Master Plan</td>
//           <td className="font-normal border border-slate-300 p-1">225.00</td>
//           <td className="font-normal border border-slate-300 p-1">N.A.</td>
//           <td className="font-normal border border-slate-300 p-1">110.03</td>
//           <td className="font-normal border border-slate-300 p-1">111.61</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">31</td>
//           <td className="font-normal border border-slate-300 p-1">Master Plan</td>
//           <td className="font-normal border border-slate-300 p-1">225.00</td>
//           <td className="font-normal border border-slate-300 p-1">N.A.</td>
//           <td className="font-normal border border-slate-300 p-1">107.20</td>
//           <td className="font-normal border border-slate-300 p-1">111.69</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">31</td>
//           <td className="font-normal border border-slate-300 p-1">Master Plan</td>
//           <td className="font-normal border border-slate-300 p-1">225.00</td>
//           <td className="font-normal border border-slate-300 p-1">N.A.</td>
//           <td className="font-normal border border-slate-300 p-1">107.20</td>
//           <td className="font-normal border border-slate-300 p-1">111.69</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">31</td>
//           <td className="font-normal border border-slate-300 p-1">Master Plan</td>
//           <td className="font-normal border border-slate-300 p-1">225.00</td>
//           <td className="font-normal border border-slate-300 p-1">N.A.</td>
//           <td className="font-normal border border-slate-300 p-1">107.20</td>
//           <td className="font-normal border border-slate-300 p-1">111.69</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">31</td>
//           <td className="font-normal border border-slate-300 p-1">Master Plan</td>
//           <td className="font-normal border border-slate-300 p-1">225.00</td>
//           <td className="font-normal border border-slate-300 p-1">N.A.</td>
//           <td className="font-normal border border-slate-300 p-1">107.20</td>
//           <td className="font-normal border border-slate-300 p-1">111.69</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">31</td>
//           <td className="font-normal border border-slate-300 p-1">Master Plan</td>
//           <td className="font-normal border border-slate-300 p-1">225.00</td>
//           <td className="font-normal border border-slate-300 p-1">N.A.</td>
//           <td className="font-normal border border-slate-300 p-1">107.20</td>
//           <td className="font-normal border border-slate-300 p-1">111.69</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         <tr>
//           <td className="font-normal border border-slate-300 p-1">31</td>
//           <td className="font-normal border border-slate-300 p-1">Master Plan</td>
//           <td className="font-normal border border-slate-300 p-1">225.00</td>
//           <td className="font-normal border border-slate-300 p-1">N.A.</td>
//           <td className="font-normal border border-slate-300 p-1">107.20</td>
//           <td className="font-normal border border-slate-300 p-1">111.69</td>
//           <td className="font-normal border border-slate-300 p-1">Compliant</td>
//         </tr>
//         {/* Add other rows here */}
//       </tbody>
//     </table>
//   );
// }


export default function SiteExtentDetails() {
  const siteExtentData = [
    { plotNumber: 30, rules: 'Master Plan', minReq: 225.00, maxPerm: 'N.A.', colonyRules: 110.03, provided: 111.61, result: 'Compliant' },
    { plotNumber: 31, rules: 'Master Plan', minReq: 225.00, maxPerm: 'N.A.', colonyRules: 107.20, provided: 111.69, result: 'Compliant' },
    // Add more plot data here
  ];

  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th colSpan={7} className="border bg-gray-400 text-gray-800 border-slate-300 p-2">
            Site Extent
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">Plot Number</th>
          <th className="border text-gray-700 border-slate-300 p-2">Rules from BVN / Master Plan</th>
          <th className="border text-gray-700 border-slate-300 p-2">Minimum Required</th>
          <th className="border text-gray-700 border-slate-300 p-2">Maximum Permissible</th>
          <th className="border text-gray-700 border-slate-300 p-2">Required Values As per Colony Rules</th>
          <th className="border text-gray-700 border-slate-300 p-2">Provided</th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {siteExtentData.map((site, index) => (
          <tr key={index}>
            <td className="font-normal border border-slate-300 p-1">{site.plotNumber}</td>
            <td className="font-normal border border-slate-300 p-1">{site.rules}</td>
            <td className="font-normal border border-slate-300 p-1">{site.minReq}</td>
            <td className="font-normal border border-slate-300 p-1">{site.maxPerm}</td>
            <td className="font-normal border border-slate-300 p-1">{site.colonyRules}</td>
            <td className="font-normal border border-slate-300 p-1">{site.provided}</td>
            <td className="font-normal border border-slate-300 p-1">{site.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
