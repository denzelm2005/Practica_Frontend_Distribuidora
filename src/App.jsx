import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Encabezado from "./components/login/encabezado/Encabezado";
import Clientes from "./views/Clientes";
import Productos from "./views/Productos";
import './App.css';


const App = () => {
  return (
    <Router>
      <Encabezado/>
      <main className="margen-superior-main">

      <Routes>
 
<Route path="/" element={<Login />} />
<Route path="/inicio" element={<Inicio />} />
<Route path="/clientes" element={<Clientes />} />
<Route path="/productos" element={<Productos />} />

</Routes>
      </main>
    </Router>
  );
};

export default App;