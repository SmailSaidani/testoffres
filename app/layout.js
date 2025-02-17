import React from 'react';
import '@/app/globals.css';  
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

const RootLayout = ({ children }) => {
  return (
   <html lang="en">
      <body className="h-screen">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-grow p-4">
              {children} {/* This dynamically updates based on the route */}
            </main>
          </div>
        </div>
      </body>
    </html>

  );
};

export default RootLayout;
