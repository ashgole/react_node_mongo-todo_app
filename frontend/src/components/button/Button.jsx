import React from "react";

const Button = ({ label, handler }) => {
  return (
    <>
      <button
        onClick={handler}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {label}
      </button>
    </>
  );
};

export default Button;
