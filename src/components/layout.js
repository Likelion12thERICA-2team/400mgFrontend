import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex items-center flex-row justify-center ">
      {children}
    </div>
  );
};

export default Layout;