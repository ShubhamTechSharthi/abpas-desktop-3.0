import React from "react";

const parkingData = [
  {
    rules: "BVR 84 APPENDIX I-2 (2)",
    blockName: "Single",
    parking: "Equivalent Car Space (Parking Floor) @30 For FLOOR01",
    providedArea: "6,392.00",
    ecs: "213.07",
  },
  {
    rules: "BVR 84 APPENDIX I-2 (2)",
    blockName: "Single",
    parking: "Equivalent Car Space (Basement Parking) @35 for FLOOR-BF2-EX",
    providedArea: "50,810.00",
    ecs: "1,451.71",
  },
  {
    rules: "BVR 84 APPENDIX I-2 (2)",
    blockName: "Single",
    parking: "Equivalent Car Space (Parking Floor) @30 For FLOOR-PARKING",
    providedArea: "6,020.00",
    ecs: "200.67",
  },
  {
    rules: "BVR 84 APPENDIX I-2 (2)",
    blockName: "Single",
    parking: "Equivalent Car Space (Basement Parking) @35 for FLOOR-BF1",
    providedArea: "12,894.00",
    ecs: "368.40",
  },
  {
    rules: "BVR 84 APPENDIX I-2 (2)",
    blockName: "Single",
    parking: "Equivalent Car Space (Open Space) @25 For FLOOR-GROUND",
    providedArea: "5,120.25",
    ecs: "204.81",
  },
  {
    rules: "BVR 84 APPENDIX I-2 (2)",
    blockName: "Total",
    parking: "",
    providedArea: "81,236.25",
    ecs: "2,438.66",
  },
  {
    rules: "BVR 84 APPENDIX I-2 (2)",
    blockName: "Summary",
    parking: "Required ECS = 2,414.57",
    providedArea: "Provided ECS= 2,438.66",
    ecs: "Result=Compliant",
  },
];

const ECSParkingProvided = () => {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan="5"
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            ECS Parking Provided
          </th>
        </tr>
        <tr>
          <th className="border text-gray-700 border-slate-300 p-2">
            Rules/Table
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Block Name
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Parking</th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Provided Area
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">ECS</th>
        </tr>
      </thead>
      <tbody>
        {parkingData.map((data, index) => (
          <tr key={index}>
            <td className="border border-slate-300 p-1">{data.rules}</td>
            <td className="border border-slate-300 p-1">{data.blockName}</td>
            <td className="border border-slate-300 p-1">{data.parking}</td>
            <td className="border border-slate-300 p-1">{data.providedArea}</td>
            <td className="border border-slate-300 p-1">{data.ecs}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ECSParkingProvided;
