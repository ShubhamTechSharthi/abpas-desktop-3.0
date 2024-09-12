export default function LiftEscalatorandMovingWalkCount() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={9}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Lift, Escalator and Moving Walk Count
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Parameter
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Minimum Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Maximum Permissible
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="5">Presence of Lift from Web Input : No</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">
            No.of.Lift
          </td>
          <td className="font-normal border border-slate-300 p-1">
            {" "}
            Not Required
          </td>
          <td className="font-normal border border-slate-300 p-1"> N.A.</td>
          <td className="font-normal border border-slate-300 p-1">
            Not Provided
          </td>
          <td className="font-normal border border-slate-300 p-1">N.A.</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">
            No.of.Escalator
          </td>
          <td className="font-normal border border-slate-300 p-1">
            {" "}
            Not Required
          </td>
          <td className="font-normal border border-slate-300 p-1"> N.A.</td>
          <td className="font-normal border border-slate-300 p-1">
            Not Provided
          </td>
          <td className="font-normal border border-slate-300 p-1">N.A.</td>
        </tr>
        <tr>
          <td className="font-normal border border-slate-300 p-1">
            No.of.Moving Walk
          </td>
          <td className="font-normal border border-slate-300 p-1">
            {" "}
            Not Required
          </td>
          <td className="font-normal border border-slate-300 p-1"> N.A.</td>
          <td className="font-normal border border-slate-300 p-1">
            Not Provided
          </td>
          <td className="font-normal border border-slate-300 p-1">N.A.</td>
        </tr>
      </tbody>
    </table>
  );
}
