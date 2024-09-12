export default function NonFARList() {
  return (
    <>
      <table className="w-full text-center mt-3">
        <thead>
          <tr>
            <th
              className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
              colSpan="4"
            >
              Non FAR List (25%)
            </th>
          </tr>
          <tr>
            <th className="border text-gray-700 border-slate-300 p-2">
              Block Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Typical Floor Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Non FAR Name
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Non FAR Area
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="6" className="font-normal border border-slate-300 p-1">
              Single
            </td>
            <td className="font-normal border border-slate-300 p-1">FLOOR01</td>
            <td className="font-normal border border-slate-300 p-1">BALCONY</td>
            <td className="font-normal border border-slate-300 p-1">3.87</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">Total</td>
            <td className="font-normal border border-slate-300 p-1"></td>
            <td className="font-normal border border-slate-300 p-1">3.87</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">FLOOR02</td>
            <td className="font-normal border border-slate-300 p-1">BALCONY</td>
            <td className="font-normal border border-slate-300 p-1">3.87</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">Total</td>
            <td className="font-normal border border-slate-300 p-1"></td>
            <td className="font-normal border border-slate-300 p-1">3.87</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1"></td>
            <td className="font-normal border border-slate-300 p-1"></td>
            <td className="font-normal border border-slate-300 p-1"></td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">Total</td>
            <td className="font-normal border border-slate-300 p-1"></td>
            <td className="font-normal border border-slate-300 p-1">7.74</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
