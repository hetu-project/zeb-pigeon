import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      <div className=" h-20">
        <NavBar />
      </div>
    </div>
  );
}
