import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  const shouldHeaderRender = location.pathname !== "/";

  return (
    <>
      <div className="innerbg h-screen text-xs font-semibold">
        {shouldHeaderRender && <Header />}
        <div className="">
          <main>
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
