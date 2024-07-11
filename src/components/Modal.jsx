import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
export default function Modal({ open, onClose, className, children, heading }) {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  };

  return (
    // backdrop
    <div
      onClick={handleClick}
      className={`
        fixed inset-0 flex items-start transition-colors z-10
        ${open ? "visible bg-black/50" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white  border-t-4 border-cyan-500 rounded-md shadow  transition-all ${className}
          ${animate && "animate-shake"}
          ${open ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex justify-between items-center text-white w-full bg-slate-600 p-3">
          <h1 className="text-xs font-semibold">{heading}</h1>
          <button onClick={onClose} className="bg-red-500 mr-2 p-[2px]">
            <RxCross2 className="text-white" />
          </button>
        </div>
        <div className="modal">{children}</div>
      </div>
    </div>
  );
}
