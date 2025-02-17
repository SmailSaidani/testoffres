import React from 'react';
import '@/app/globals.css';  // Global styles
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import OffersPage from './offres/page';

const RootLayout = ({ children }) => {
  return (
    <div>

    <div className="flex h-screen"> 
      <div className="flex-1 flex flex-col">
        <main className="flex-grow p-4">
          {children}</main>
      </div>
    </div>
    </div>
  );
};

export default RootLayout;
