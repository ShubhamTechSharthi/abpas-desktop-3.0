export default function StaircaseDetails() {
  return (
    <>
      <table className="w-full text-center mt-3">
        <thead>
          <tr>
            <th
              colSpan={9}
              className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
            >
              Staircase Details [BVR 80]
            </th>
          </tr>
          <tr>
            <th className="border text-gray-700 border-slate-300 p-2">
              Block Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Floor Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Minimum Staircase Width Required
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Width Provided
            </th>

            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Width Result
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Minimum Staircase Landing Width Required
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Landing Width Provided
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Landing Width Result
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="5" className="font-normal border border-slate-300 p-1">
              Single
            </td>
            <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.85</td>
            <td className="font-normal border border-slate-300 p-1">1.80</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.75</td>
            <td className="font-normal border border-slate-300 p-1">1.36</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.85</td>
            <td className="font-normal border border-slate-300 p-1">1.80</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.75</td>
            <td className="font-normal border border-slate-300 p-1">1.36</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">FLOOR03</td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.85</td>
            <td className="font-normal border border-slate-300 p-1">1.80</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.75</td>
            <td className="font-normal border border-slate-300 p-1">1.36</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">
              FLOOR-BF1
            </td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.85</td>
            <td className="font-normal border border-slate-300 p-1">1.80</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.85</td>
            <td className="font-normal border border-slate-300 p-1">1.36</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">GROUND</td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.85</td>
            <td className="font-normal border border-slate-300 p-1">1.80</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.75</td>
            <td className="font-normal border border-slate-300 p-1">1.36</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-full text-center mt-3">
        <thead>
          <tr>
            <th
              colSpan={9}
              className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
            >
              Staircase Details [BVR 80]
            </th>
          </tr>
          <tr>
            <th className="border text-gray-700 border-slate-300 p-2">
              Block Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Floor Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Staircase Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Minimum Tread Required
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Tread Provided
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Result
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Maximum Riser Allowable
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Riser Provided
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="5" className="font-normal border border-slate-300 p-1">
              Single
            </td>
            <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.25</td>
            <td className="font-normal border border-slate-300 p-1">0.25</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.17</td>
            <td className="font-normal border border-slate-300 p-1">0.17</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.25</td>
            <td className="font-normal border border-slate-300 p-1">0.25</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.17</td>
            <td className="font-normal border border-slate-300 p-1">0.17</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">FLOOR03</td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.25</td>
            <td className="font-normal border border-slate-300 p-1">0.25</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.17</td>
            <td className="font-normal border border-slate-300 p-1">0.17</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">
              FLOOR-BF1
            </td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.30</td>
            <td className="font-normal border border-slate-300 p-1">0.30</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.15</td>
            <td className="font-normal border border-slate-300 p-1">0.15</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">GROUND</td>
            <td className="font-normal border border-slate-300 p-1">STAIR-1</td>
            <td className="font-normal border border-slate-300 p-1">0.25</td>
            <td className="font-normal border border-slate-300 p-1">0.25</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
            <td className="font-normal border border-slate-300 p-1">0.17</td>
            <td className="font-normal border border-slate-300 p-1">0.17</td>
            <td className="font-normal border border-slate-300 p-1">
              Compliant
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
