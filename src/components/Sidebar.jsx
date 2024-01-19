"use client";

import Image from "next/image";
import React, { useState } from "react";
import imagencita from "../../public/dashboard-preview.jpg";
import Link from "next/link";

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={` bg-gray-800 text-white w-64 flex-shrink-0 ${isSidebarOpen ? "fixed" : "hidden"} md:block`}
        style={{ height: '100%', top: 50 }}
      >
        {/* Contenido del Sidebar */}
        <div className="p-4">
          <nav>
            <div className="flex items-center mb-2 gap-3">
              <Link href="/dashboard">
                <Image
                  src={imagencita}
                  alt="Home Icon"
                  width={20}
                  height={20}
                />
                <span className="max-w-prose text-white sm:text-lg text-center font-bold">
                  Home
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 ">
        {/* Barra de navegación */}
        <header className="bg-white shadow-md">
          {/* Botón para mostrar/ocultar el sidebar en dispositivos pequeños */}
          <div className="md:hidden">
            <button
              className="p-3 focus:outline-none focus:ring"
              onClick={toggleSidebar}
            >
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
