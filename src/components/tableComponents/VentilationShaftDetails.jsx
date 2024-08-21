export default function VentilationShaftCalculation() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={7}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Ventilation Shaft Details [BVR 56 (6b)]
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
            Shaft Side Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Width Result
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Shaft Area Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Shaft Area Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Area Result
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single</td>
          <td className="font-normal border border-slate-300 p-1">FLOOR-BF1</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.22</td>
          <td className="font-normal border border-slate-300 p-1">2.80</td>
          <td className="font-normal border border-slate-300 p-1">3.70</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single</td>
          <td className="font-normal border border-slate-300 p-1">FLOOR03</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.22</td>
          <td className="font-normal border border-slate-300 p-1">3.79</td>
          <td className="font-normal border border-slate-300 p-1">4.18</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single</td>
          <td className="font-normal border border-slate-300 p-1">FLOOR03</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.22</td>
          <td className="font-normal border border-slate-300 p-1">2.80</td>
          <td className="font-normal border border-slate-300 p-1">3.70</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single</td>
          <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.22</td>
          <td className="font-normal border border-slate-300 p-1">2.80</td>
          <td className="font-normal border border-slate-300 p-1">3.70</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single</td>
          <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.22</td>
          <td className="font-normal border border-slate-300 p-1">2.80</td>
          <td className="font-normal border border-slate-300 p-1">3.70</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">Single</td>
          <td className="font-normal border border-slate-300 p-1">GROUND</td>
          <td className="font-normal border border-slate-300 p-1">1.20</td>
          <td className="font-normal border border-slate-300 p-1">1.22</td>
          <td className="font-normal border border-slate-300 p-1">2.80</td>
          <td className="font-normal border border-slate-300 p-1">3.70</td>
          <td className="font-normal border border-slate-300 p-1">Compliant</td>
        </tr>
      </tbody>
    </table>
  );
}
