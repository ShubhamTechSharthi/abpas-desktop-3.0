export default function LiftDetails() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={8}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Lift Details
          </th>
        </tr>
        <tr>
          <th rowspan="2" className="border text-gray-700 border-slate-300 p-2">
            Block Name
          </th>
          <th rowspan="2" className="border text-gray-700 border-slate-300 p-2">
            Block Height
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Block Noof Floors
          </th>

          <th className="border text-gray-700 border-slate-300 p-2">
            Unique Id
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Name</th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Location
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Dimension
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Capacity
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan={4} className="font-normal border border-slate-300 p-1">
            Single
          </td>
          <td rowSpan={4} className="font-normal border border-slate-300 p-1">
            30
          </td>
          <td rowSpan={4} className="font-normal border border-slate-300 p-1">
            BF-1 + Podium-1 + Partly Stilt & Ground floor + 7 Floors + MZ-1
          </td>
          <td className="font-normal border border-slate-300 p-1">Single_01</td>
          <td className="font-normal border border-slate-300 p-1">01</td>
          <td className="font-normal border border-slate-300 p-1">
            BF1 to FLOOR07
          </td>
          <td className="font-normal border border-slate-300 p-1">2.25x2.25</td>
          <td className="font-normal border border-slate-300 p-1">12 Person</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single_02</td>
          <td className="font-normal border border-slate-300 p-1">02</td>
          <td className="font-normal border border-slate-300 p-1">
            BF1 to FLOOR07
          </td>
          <td className="font-normal border border-slate-300 p-1">2.25x2.25</td>
          <td className="font-normal border border-slate-300 p-1">12 Person</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single_03</td>
          <td className="font-normal border border-slate-300 p-1">03</td>
          <td className="font-normal border border-slate-300 p-1">
            BF1 to FLOOR07
          </td>
          <td className="font-normal border border-slate-300 p-1">2.25x2.25</td>
          <td className="font-normal border border-slate-300 p-1">12 Person</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single_04</td>
          <td className="font-normal border border-slate-300 p-1">04</td>
          <td className="font-normal border border-slate-300 p-1">
            BF1 to FLOOR07
          </td>
          <td className="font-normal border border-slate-300 p-1">2.25x2.25</td>
          <td className="font-normal border border-slate-300 p-1">12 Person</td>
        </tr>
      </tbody>
    </table>
  );
}
