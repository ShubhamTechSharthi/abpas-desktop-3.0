export default function ECSParkingRequired() {
  const ecsParkingData = [
    {
      rulesTable: 'Rule 1',
      buildingUse: 'Residential',
      buildupArea: '1200 sqm',
      subCategoryECS: 'High-Density',
      requiredECS: '10',
    },
    {
      rulesTable: 'Rule 2',
      buildingUse: 'Commercial',
      buildupArea: '2500 sqm',
      subCategoryECS: 'Low-Density',
      requiredECS: '15',
    },
    {
      rulesTable: 'Rule 3',
      buildingUse: 'Mixed Use',
      buildupArea: '1800 sqm',
      subCategoryECS: 'Medium-Density',
      requiredECS: '12',
    },
    {
      rulesTable: 'Rule 4',
      buildingUse: 'Institutional',
      buildupArea: '3000 sqm',
      subCategoryECS: 'High-Density',
      requiredECS: '20',
    },
  ];

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
          <th className="border text-gray-700 border-slate-300 p-2">Rules/Table</th>
          <th className="border text-gray-700 border-slate-300 p-2">Building Use</th>
          <th className="border text-gray-700 border-slate-300 p-2">Buildup (FAR) Area</th>
          <th className="border text-gray-700 border-slate-300 p-2">Sub Category ECS</th>
          <th className="border text-gray-700 border-slate-300 p-2">Required ECS</th>
        </tr>
      </thead>
      <tbody>
        {ecsParkingData.map((item, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-2">{item.rulesTable}</td>
            <td className="border border-slate-300 p-2">{item.buildingUse}</td>
            <td className="border border-slate-300 p-2">{item.buildupArea}</td>
            <td className="border border-slate-300 p-2">{item.subCategoryECS}</td>
            <td className="border border-slate-300 p-2">{item.requiredECS}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
