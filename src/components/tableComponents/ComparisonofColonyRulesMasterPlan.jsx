export default function ComparisonofColonyRulesMasterPlan() {
  return (
    <table className="w-full text-center mt-3">
      <thead>
        <tr>
          <th
            colSpan={9}
            className="border bg-gray-300 text-gray-800 border-slate-300 p-2"
          >
            Comparison of Colony Rules with Master Plan / BVN
          </th>
        </tr>
        <tr>
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
            Required Values As per Colony Rules
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">
            Provided
          </th>
          <th className="border text-gray-700 border-slate-300 p-2">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-slate-300 p-1">-</td>
          <td className="border border-slate-300 p-1">Building Height</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">9.00</td>
          <td className="border border-slate-300 p-1">9.00</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">MP-BHO-4-T-2</td>
          <td className="border border-slate-300 p-1">Net Plot Area</td>
          <td className="border border-slate-300 p-1">75.00</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">89.06</td>
          <td className="border border-slate-300 p-1">89.06</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">MP-BHO-4-T-2</td>
          <td className="border border-slate-300 p-1">FAR</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">1.25</td>
          <td className="border border-slate-300 p-1">1.25</td>
          <td className="border border-slate-300 p-1">1.2127</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">MP-BHO-4-T-2</td>
          <td className="border border-slate-300 p-1">
            Ground Coverage (In Percentage)
          </td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">50.00</td>
          <td className="border border-slate-300 p-1">60.00</td>
          <td className="border border-slate-300 p-1">55.09</td>
          <td className="border border-slate-300 p-1">
            Compliant as per Colony Cell but violated BVN/MasterPlan
          </td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">-</td>
          <td className="border border-slate-300 p-1">Road Width</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">7.50</td>
          <td className="border border-slate-300 p-1">7.50</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">BVR 53(1)</td>
          <td className="border border-slate-300 p-1">Frontage of Plot</td>
          <td className="border border-slate-300 p-1">7.00</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">7.30</td>
          <td className="border border-slate-300 p-1">7.30</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">MP-BHO-4-T-2</td>
          <td className="border border-slate-300 p-1">Front Open Space</td>
          <td className="border border-slate-300 p-1">3</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">3.00</td>
          <td className="border border-slate-300 p-1">3.00</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">MP-BHO-4-T-2</td>
          <td className="border border-slate-300 p-1">Side1 Open Space</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">0.00</td>
          <td className="border border-slate-300 p-1">Not Provided</td>
          <td className="border border-slate-300 p-1">N.A.</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">MP-BHO-4-T-2</td>
          <td className="border border-slate-300 p-1">Side2 Open Space</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">0.00</td>
          <td className="border border-slate-300 p-1">Not Provided</td>
          <td className="border border-slate-300 p-1">N.A.</td>
        </tr>
        <tr>
          <td className="border border-slate-300 p-1">MP-BHO-4-T-2</td>
          <td className="border border-slate-300 p-1">Rear Open Space</td>
          <td className="border border-slate-300 p-1">1.5</td>
          <td className="border border-slate-300 p-1">N.A.</td>
          <td className="border border-slate-300 p-1">1.50</td>
          <td className="border border-slate-300 p-1">1.50</td>
          <td className="border border-slate-300 p-1">Compliant</td>
        </tr>
      </tbody>
    </table>
  );
}
