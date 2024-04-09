import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Home() {
  return (
    <div className="h-full w-full flex">
      <div className="h-full">
        <NavBar />
      </div>
      <div className="flex-grow h-full">
        <Outlet />
      </div>
    </div>
  );
}
