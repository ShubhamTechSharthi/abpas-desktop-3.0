export default function LiftDetails() {
  const liftData = [
    {
      blockName: "Single",
      blockHeight: 30,
      blockFloors:
        "BF-1 + Podium-1 + Partly Stilt & Ground floor + 7 Floors + MZ-1",
      lifts: [
        {
          uniqueId: "Single_01",
          name: "01",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_02",
          name: "02",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_03",
          name: "03",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_04",
          name: "04",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_01",
          name: "01",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_02",
          name: "02",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_03",
          name: "03",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_04",
          name: "04",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_01",
          name: "01",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_02",
          name: "02",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_03",
          name: "03",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_04",
          name: "04",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
      ],
    },
    {
      blockName: "Double",
      blockHeight: 30,
      blockFloors:
        "BF-1 + Podium-1 + Partly Stilt & Ground floor + 7 Floors + MZ-1",
      lifts: [
        {
          uniqueId: "Single_01",
          name: "01",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_02",
          name: "02",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_03",
          name: "03",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_04",
          name: "04",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
      ],
    },
    {
      blockName: "triplex",
      blockHeight: 30,
      blockFloors:
        "BF-1 + Podium-1 + Partly Stilt & Ground floor + 7 Floors + MZ-1",
      lifts: [
        {
          uniqueId: "Single_01",
          name: "01",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_02",
          name: "02",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_03",
          name: "03",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
        {
          uniqueId: "Single_04",
          name: "04",
          location: "BF1 to FLOOR07",
          dimension: "2.25x2.25",
          capacity: "12 Person",
        },
      ],
    },
  ];

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
        {liftData.map((block) => (
          <>
            <tr>
              <td
                rowSpan={block["lifts"].length + 1}
                className="border border-slate-300 p-1"
              >
                {block["blockName"]}
              </td>
              <td
                rowSpan={block["lifts"].length + 1}
                className="border border-slate-300 p-1"
              >
                {block["blockHeight"]}
              </td>
              <td
                rowSpan={block["lifts"].length + 1}
                className="border border-slate-300 p-1"
              >
                {block["blockFloors"]}
              </td>
            </tr>
            {block["lifts"].map((lift, index) => (
              <tr key={index}>
                <td className="border border-slate-300 p-1">
                  {lift["uniqueId"]}
                </td>
                <td className="border border-slate-300 p-1">{lift["name"]}</td>
                <td className="border border-slate-300 p-1">
                  {lift["location"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {lift["dimension"]}
                </td>
                <td className="border border-slate-300 p-1">
                  {lift["capacity"]}
                </td>
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
}
