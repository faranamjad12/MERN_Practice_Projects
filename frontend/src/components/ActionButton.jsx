import React from "react";

const ActionButton = (props) => {
  const { text, onClick, ...otherProps } = props;
  return (
    <button
      className="cursor-pointer bg-gray-900 text-white py-4 px-6 rounded-lg shadow font-bold"
      onClick={onClick}
      {...otherProps}
    >
      {text}
    </button>
  );
};

export default ActionButton;
