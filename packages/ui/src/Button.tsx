import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, style, ...props }: ButtonProps) => {
  return (
    <button
      style={{
        padding: "10px 20px",
        backgroundColor: "blue",
        color: "white",
        borderRadius: "5px",
        cursor: "pointer",
        border: "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
