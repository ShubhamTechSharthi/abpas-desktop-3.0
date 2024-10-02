const DimensionsAndVentilationDetails = ({ data }) => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={9}
            className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
          >
            Area, Dimensions and Ventilation Details
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
            Dwell Reference
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Section</th>
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
        {data.map((block, index) => (
          <>
            <tr>
              <td
                rowSpan={
                  1 +
                  block["floorDetails"].reduce(
                    (acc, item) => acc + item["details"].length + 1,
                    0
                  )
                }
                className="border border-slate-300 p-1"
              >
                {block["blockName"]}
              </td>
            </tr>
            {block["floorDetails"].map((floor) => (
              <>
                <tr>
                  <td
                    rowSpan={floor["details"].length + 1}
                    className="border border-slate-300 p-1"
                  >
                    {floor["floorName"]}
                  </td>
                  <td
                    rowSpan={floor["details"].length + 1}
                    className="border border-slate-300 p-1"
                  >
                    {floor["dwellReference"]}
                  </td>
                </tr>
                {floor["details"].map((details, index) => (
                  <tr key={index}>
                    <td className="border border-slate-300 p-1">
                      {details["section"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {details["parameter"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {details["minRequired"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {details["maxPermissible"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {details["provided"]}
                    </td>
                    <td className="border border-slate-300 p-1">
                      {details["Compliant"]}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
};
export default DimensionsAndVentilationDetails;
