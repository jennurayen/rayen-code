import React from "react";

const Button = ({ title, backgroundColor, onClick }) => {
  return (
    <button
      className="tabBtn"
      style={{
        backgroundColor: backgroundColor,
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
