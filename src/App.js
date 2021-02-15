import React from 'react';
import { Routes, Route } from 'react-router';
import Ordenes from './components/paginas/Ordenes';
import Menu from './components/paginas/Menu';
import NuevaBebida from './components/paginas/NuevaBebida';
import SideBar from './components/ui/Sidebar';
import BebidasState from './context/bebidas/BebidasState';
import CortesState from './context/cortes/CortesState';
import Cortes from './components/paginas/Cortes';
import CorteOrdenes from './components/paginas/CorteOrdenes';
import OrdenesState from './context/ordenes/OrdenesState';

function App() {
  return (
    <CortesState>
      <OrdenesState>
        <BebidasState>
          <div className="md:flex min-h-screen">
            <SideBar />

            <div className="md:w-3/5 xl:w-4/5 p-6">
              <Routes>
                <Route path="/" element={<Ordenes />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/nueva-bebida" element={<NuevaBebida />} />
                <Route path="/cortes" element={<Cortes />} />
                <Route path="/ver-corte" element={<CorteOrdenes />} />
              </Routes>
            </div>
          </div>
        </BebidasState>
      </OrdenesState>
    </CortesState>
  );
}

export default App;
