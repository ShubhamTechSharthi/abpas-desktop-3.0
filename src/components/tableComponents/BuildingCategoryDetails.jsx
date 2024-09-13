export default function BuildingCategoryDetails() {
    return (
      <table className="w-full text-center mt-3">
        <thead>
          <tr>
            <th
              colSpan={6}
              className="border bg-gray-400 text-gray-800 border-slate-300 p-2"
            >
              Building Category Details
            </th>
          </tr>
          <tr>
            <th className="border text-gray-700 border-slate-300 p-2">
              Plot Number
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Total Number of Floors
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Block Height
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Total Area
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Non FAR Area
            </th>
            <th className="border text-gray-700 border-slate-300 p-2">
              Builtup (FAR) Area
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Row Data */}
          <tr>
            <td className="font-normal border border-slate-300 p-1">1</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 2 Floors</td>
            <td className="font-normal border border-slate-300 p-1">9.00</td>
            <td className="font-normal border border-slate-300 p-1">241.18</td>
            <td className="font-normal border border-slate-300 p-1">62.44</td>
            <td className="font-normal border border-slate-300 p-1">178.74</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">13</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 1 Floor</td>
            <td className="font-normal border border-slate-300 p-1">6.00</td>
            <td className="font-normal border border-slate-300 p-1">125.77</td>
            <td className="font-normal border border-slate-300 p-1">25.13</td>
            <td className="font-normal border border-slate-300 p-1">100.64</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">14 to 20 - TYPICAL</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 1 Floor</td>
            <td className="font-normal border border-slate-300 p-1">6.00</td>
            <td className="font-normal border border-slate-300 p-1">744.89</td>
            <td className="font-normal border border-slate-300 p-1">164.17</td>
            <td className="font-normal border border-slate-300 p-1">580.72</td>
          </tr>
          {/* Continue adding rows */}
          <tr>
            <td className="font-normal border border-slate-300 p-1">2</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 1 Floor</td>
            <td className="font-normal border border-slate-300 p-1">6.00</td>
            <td className="font-normal border border-slate-300 p-1">138.13</td>
            <td className="font-normal border border-slate-300 p-1">16.61</td>
            <td className="font-normal border border-slate-300 p-1">121.52</td>
          </tr>
          {/* ... Include additional rows for the rest of the data */}
          <tr>
            <td className="font-normal border border-slate-300 p-1">9 to 12 - TYPICAL</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 1 Floor</td>
            <td className="font-normal border border-slate-300 p-1">6.00</td>
            <td className="font-normal border border-slate-300 p-1">498.29</td>
            <td className="font-normal border border-slate-300 p-1">66.45</td>
            <td className="font-normal border border-slate-300 p-1">431.84</td>
          </tr>
          {/* Totals */}
          <tr>
            <td className="font-normal border border-slate-300 p-1">1</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 2 Floors</td>
            <td className="font-normal border border-slate-300 p-1">9.00</td>
            <td className="font-normal border border-slate-300 p-1">241.18</td>
            <td className="font-normal border border-slate-300 p-1">62.44</td>
            <td className="font-normal border border-slate-300 p-1">178.74</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">13</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 1 Floor</td>
            <td className="font-normal border border-slate-300 p-1">6.00</td>
            <td className="font-normal border border-slate-300 p-1">125.77</td>
            <td className="font-normal border border-slate-300 p-1">25.13</td>
            <td className="font-normal border border-slate-300 p-1">100.64</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">14 to 20 - TYPICAL</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 1 Floor</td>
            <td className="font-normal border border-slate-300 p-1">6.00</td>
            <td className="font-normal border border-slate-300 p-1">744.89</td>
            <td className="font-normal border border-slate-300 p-1">164.17</td>
            <td className="font-normal border border-slate-300 p-1">580.72</td>
          </tr>
          {/* Continue adding rows */}
          <tr>
            <td className="font-normal border border-slate-300 p-1">2</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 1 Floor</td>
            <td className="font-normal border border-slate-300 p-1">6.00</td>
            <td className="font-normal border border-slate-300 p-1">138.13</td>
            <td className="font-normal border border-slate-300 p-1">16.61</td>
            <td className="font-normal border border-slate-300 p-1">121.52</td>
          </tr>
          {/* ... Include additional rows for the rest of the data */}
          <tr>
            <td className="font-normal border border-slate-300 p-1">9 to 12 - TYPICAL</td>
            <td className="font-normal border border-slate-300 p-1">Ground + 1 Floor</td>
            <td className="font-normal border border-slate-300 p-1">6.00</td>
            <td className="font-normal border border-slate-300 p-1">498.29</td>
            <td className="font-normal border border-slate-300 p-1">66.45</td>
            <td className="font-normal border border-slate-300 p-1">431.84</td>
          </tr>
          <tr>
            <td className="font-normal border border-slate-300 p-1">Total</td>
            <td className="font-normal border border-slate-300 p-1"></td>
            <td className="font-normal border border-slate-300 p-1"></td>
            <td className="font-normal border border-slate-300 p-1">4,424.20</td>
            <td className="font-normal border border-slate-300 p-1">871.96</td>
            <td className="font-normal border border-slate-300 p-1">3,552.31</td>
          </tr>
        </tbody>
      </table>
    );
  }
  