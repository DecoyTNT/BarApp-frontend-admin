import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
            <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">BarApp Admin</p>
                <p className="mt-3 text-gray-400">Administra tu bar en las siguienes opciones</p>

                <nav>
                    <NavLink end className="p-1 text-gray-300 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/">Ordenes</NavLink>
                    <NavLink end className="p-1 text-gray-300 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/menu">Menú</NavLink>
                    <NavLink end className="p-1 text-gray-300 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500" to="/cortes">Cortes</NavLink>
                </nav>
            </div>
        </div>
    );
}

export default SideBar;