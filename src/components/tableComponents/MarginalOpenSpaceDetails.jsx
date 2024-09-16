// export default function MarginalOpenSpaceDetails() {
//     return (
//       <table className="w-full text-center mt-3">
//         <thead>
//           <tr>
//             <th
//               colSpan={13}
//               className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
//             >
//               Marginal Open Space Details
//             </th>
//           </tr>
//           <tr>
//             <th className="border text-gray-700 border-slate-300 p-2">Plot Number</th>
//             <th className="border text-gray-700 border-slate-300 p-2">F MOS Required</th>
//             <th className="border text-gray-700 border-slate-300 p-2">F MOS Provided</th>
//             <th className="border text-gray-700 border-slate-300 p-2">F MOS Result</th>
//             <th className="border text-gray-700 border-slate-300 p-2">S1 MOS Required</th>
//             <th className="border text-gray-700 border-slate-300 p-2">S1 MOS Provided</th>
//             <th className="border text-gray-700 border-slate-300 p-2">S1 MOS Result</th>
//             <th className="border text-gray-700 border-slate-300 p-2">S2 MOS Required</th>
//             <th className="border text-gray-700 border-slate-300 p-2">S2 MOS Provided</th>
//             <th className="border text-gray-700 border-slate-300 p-2">S2 MOS Result</th>
//             <th className="border text-gray-700 border-slate-300 p-2">R MOS Required</th>
//             <th className="border text-gray-700 border-slate-300 p-2">R MOS Provided</th>
//             <th className="border text-gray-700 border-slate-300 p-2">R MOS Result</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Example Row 1 */}
//           <tr>
//             <td className="font-normal border border-slate-300 p-1">1</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">2.50</td>
//             <td className="font-normal border border-slate-300 p-1">Not Provided</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//           </tr>
  
//           {/* Example Row 2 */}
//           <tr>
//             <td className="font-normal border border-slate-300 p-1">10</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">Not Provided</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//           </tr>
  
//           {/* Example Row 3 */}
//           <tr>
//             <td className="font-normal border border-slate-300 p-1">11</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">Not Provided</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//           </tr>
//           <tr>
//             <td className="font-normal border border-slate-300 p-1">11</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">Not Provided</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//           </tr>
//           <tr>
//             <td className="font-normal border border-slate-300 p-1">11</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">Not Provided</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//           </tr>
//           <tr>
//             <td className="font-normal border border-slate-300 p-1">11</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">Not Provided</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//           </tr>
//           <tr>
//             <td className="font-normal border border-slate-300 p-1">11</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">Not Provided</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//           </tr>
//           <tr>
//             <td className="font-normal border border-slate-300 p-1">11</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">3.00</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">Not Provided</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">0.00</td>
//             <td className="font-normal border border-slate-300 p-1">N.A.</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">1.50</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//             <td className="font-normal border border-slate-300 p-1">Compliant</td>
//           </tr>
  
  
//           {/* Add other rows here as necessary */}
//         </tbody>
//       </table>
//     );
//   }
  

  import React from "react";

  export default function MarginalOpenSpaceDetails() {
    const rowData = [
      {
        plotNumber: 1,
        fMosReq: "3.00",
        fMosProv: "3.00",
        fMosResult: "Compliant",
        s1MosReq: "2.50",
        s1MosProv: "Not Provided",
        s1MosResult: "N.A.",
        s2MosReq: "0.00",
        s2MosProv: "N.A.",
        s2MosResult: "N.A.",
        rMosReq: "1.50",
        rMosProv: "1.50",
        rMosResult: "Compliant",
      },
      {
        plotNumber: 10,
        fMosReq: "3.00",
        fMosProv: "3.00",
        fMosResult: "Compliant",
        s1MosReq: "0.00",
        s1MosProv: "Not Provided",
        s1MosResult: "N.A.",
        s2MosReq: "0.00",
        s2MosProv: "N.A.",
        s2MosResult: "N.A.",
        rMosReq: "1.50",
        rMosProv: "1.50",
        rMosResult: "Compliant",
      },
      // Additional data can go here
    ];
  
    return (
      <table className="w-full text-center mt-3">
        <thead>
          <tr>
            <th
              colSpan={13}
              className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
            >
              Marginal Open Space Details
            </th>
          </tr>
          <tr>
            <th className="border text-gray-700 border-slate-300 p-2">Plot Number</th>
            <th className="border text-gray-700 border-slate-300 p-2">F MOS Required</th>
            <th className="border text-gray-700 border-slate-300 p-2">F MOS Provided</th>
            <th className="border text-gray-700 border-slate-300 p-2">F MOS Result</th>
            <th className="border text-gray-700 border-slate-300 p-2">S1 MOS Required</th>
            <th className="border text-gray-700 border-slate-300 p-2">S1 MOS Provided</th>
            <th className="border text-gray-700 border-slate-300 p-2">S1 MOS Result</th>
            <th className="border text-gray-700 border-slate-300 p-2">S2 MOS Required</th>
            <th className="border text-gray-700 border-slate-300 p-2">S2 MOS Provided</th>
            <th className="border text-gray-700 border-slate-300 p-2">S2 MOS Result</th>
            <th className="border text-gray-700 border-slate-300 p-2">R MOS Required</th>
            <th className="border text-gray-700 border-slate-300 p-2">R MOS Provided</th>
            <th className="border text-gray-700 border-slate-300 p-2">R MOS Result</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, index) => (
            <tr key={index}>
              <td className="font-normal border border-slate-300 p-1">{row.plotNumber}</td>
              <td className="font-normal border border-slate-300 p-1">{row.fMosReq}</td>
              <td className="font-normal border border-slate-300 p-1">{row.fMosProv}</td>
              <td className="font-normal border border-slate-300 p-1">{row.fMosResult}</td>
              <td className="font-normal border border-slate-300 p-1">{row.s1MosReq}</td>
              <td className="font-normal border border-slate-300 p-1">{row.s1MosProv}</td>
              <td className="font-normal border border-slate-300 p-1">{row.s1MosResult}</td>
              <td className="font-normal border border-slate-300 p-1">{row.s2MosReq}</td>
              <td className="font-normal border border-slate-300 p-1">{row.s2MosProv}</td>
              <td className="font-normal border border-slate-300 p-1">{row.s2MosResult}</td>
              <td className="font-normal border border-slate-300 p-1">{row.rMosReq}</td>
              <td className="font-normal border border-slate-300 p-1">{row.rMosProv}</td>
              <td className="font-normal border border-slate-300 p-1">{row.rMosResult}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  