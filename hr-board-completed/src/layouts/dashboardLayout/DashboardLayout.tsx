import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './components/Header';
import { SideBar } from './components/SideBar';

export const DashboardLayout = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const handleToggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const [matches, setMatches] = useState(
    window.matchMedia('(max-width: 640px)').matches,
  );

  useEffect(() => {
    window.matchMedia('(max-width: 640px)').addEventListener('change', (e) => {
      setMatches(e.matches);
    });
  }, []);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <Header
        matches={matches}
        openNavigation={openNavigation}
        onToggleNavigation={handleToggleNavigation}
      />
      <div className="relative flex h-full">
        <SideBar matches={matches} open={openNavigation} />
        <Outlet />
      </div>
      <ToastContainer autoClose={3000} position="top-center" />
    </div>
  );
};
