export default function ECSParkingReuired() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={5}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            ECS Parking Required
          </th>
        </tr>
        <tr>
          <th>Rules/Table</th>
          <th>Building Use</th>
          <th>Buildup (FAR) Area</th>
          <th>Sub Category ECS</th>
          <th>Required ECS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="5"></td>
        </tr>
      </tbody>
    </table>
  );
}
