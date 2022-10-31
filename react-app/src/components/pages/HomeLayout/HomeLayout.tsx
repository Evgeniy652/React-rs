import React from 'react';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      HOME LAYOUT
      <Outlet />
    </div>
  );
};

export default HomeLayout;
