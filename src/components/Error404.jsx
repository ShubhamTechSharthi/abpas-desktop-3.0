import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="h-auto">
      <div className="flex justify-start items-center flex-col gap-10 my-20">
        {/* Page is in progress<span className="animate-ping">...</span> */}
        <p className="text-8xl font-extrabold text">
          <span className="text-cyan-500">4</span>
          <span className="text-[#3498db]">0</span>
          <span className="text-blue-500">4</span> Error
        </p>
        <p className="text-2xl">
          Page not found
          <span className="animate-pulse ml-3 text-5xl">...</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-cyan-500 via-[#3498db] to-blue-500 text-white text-center px-5 py-2 rounded-xl hover:bg-slate-500 hover:duration-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
