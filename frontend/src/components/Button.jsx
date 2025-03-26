import React from "react";

const Button = ({ 
  variant = "primary", 
  children, 
  className = "", 
  startIcon, 
  endIcon, 
  onClick, 
  ...props 
}) => {

  const defaultStyle = "px-3 py-2 min-w-40 rounded-md hover:opacity-95 font-semibold";
  
  const variantStyles = {
    primary: "bg-white text-black border border-black",
    secondary: "bg-black text-white border border-white",
  };

  return (
    <button
      className={`${defaultStyle} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
