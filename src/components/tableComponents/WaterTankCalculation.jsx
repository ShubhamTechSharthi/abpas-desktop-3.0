const WaterTankCalculation = ({ data }) => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
            colSpan={7}
          >
            Water Tank Calculation
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Rules/Table
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Building Usage
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Occupant Load
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Minimum LPHD
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Required
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{item.rulesTable}</td>
            <td className="border border-slate-300 p-1">
              {item.buildingUsage}
            </td>
            <td className="border border-slate-300 p-1">{item.occupantLoad}</td>
            <td className="border border-slate-300 p-1">{item.minimumLPHD}</td>
            <td className="border border-slate-300 p-1">{item.provided}</td>
            <td className="border border-slate-300 p-1">{item.required}</td>
            <td className="border border-slate-300 p-1">{item.result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default WaterTankCalculation;
