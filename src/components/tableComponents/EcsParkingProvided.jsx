export default function ECSParkingProvided() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan="7"
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
        <tr>
          <td className="border border-slate-300 p-1">
            BVR 84 APPENDIX I-2 (2)
          </td>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">
            Equivalent Car Space (Parking Floor) @30 For FLOOR01
          </td>
          <td className="border border-slate-300 p-1">6,392.00</td>
          <td className="border border-slate-300 p-1">213.07</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">
            BVR 84 APPENDIX I-2 (2)
          </td>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">
            Equivalent Car Space (Basement Parking) @35 for FLOOR-BF2-EX
          </td>
          <td className="border border-slate-300 p-1">50,810.00</td>
          <td className="border border-slate-300 p-1">1,451.71</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">
            BVR 84 APPENDIX I-2 (2)
          </td>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">
            Equivalent Car Space (Parking Floor) @30 For FLOOR-PARKING
          </td>
          <td className="border border-slate-300 p-1">6,020.00</td>
          <td className="border border-slate-300 p-1">200.67</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">
            BVR 84 APPENDIX I-2 (2)
          </td>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">
            Equivalent Car Space (Basement Parking) @35 for FLOOR-BF1
          </td>
          <td className="border border-slate-300 p-1">12,894.00</td>
          <td className="border border-slate-300 p-1">368.40</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">
            BVR 84 APPENDIX I-2 (2)
          </td>
          <td className="border border-slate-300 p-1">Single</td>
          <td className="border border-slate-300 p-1">
            Equivalent Car Space (Open Space) @25 For FLOOR-GROUND
          </td>
          <td className="border border-slate-300 p-1">5,120.25</td>
          <td className="border border-slate-300 p-1">204.81</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">
            BVR 84 APPENDIX I-2 (2)
          </td>
          <td className="border border-slate-300 p-1">Total</td>
          <td className="border border-slate-300 p-1"></td>

          <td className="border border-slate-300 p-1">81,236.25</td>
          <td className="border border-slate-300 p-1">2,438.66</td>
        </tr>

        <tr>
          <td className="border border-slate-300 p-1">
            BVR 84 APPENDIX I-2 (2)
          </td>
          <td className="border border-slate-300 p-1">Summary</td>
          <td className="border border-slate-300 p-1">
            Required ECS = 2,414.57
          </td>

          <td className="border border-slate-300 p-1">
            Provided ECS= 2,438.66
          </td>
          <td className="border border-slate-300 p-1">Result=Compliant</td>
        </tr>
      </tbody>
    </table>
  );
}
