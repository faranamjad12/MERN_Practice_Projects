import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white">{children}</div>
    </div>
  );
};

export default AuthLayout;
