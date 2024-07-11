import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="flex items-start gap-3 w-full">
      {label && (
        <label className="mb-1 pl-1 w-1/3" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
