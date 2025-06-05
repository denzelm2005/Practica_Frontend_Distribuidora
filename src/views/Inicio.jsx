import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import Portada from "../assets/portada.jpg";
import Proposito from "../components/inicio/Proposito";

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  return (
    <Container>
      <h1 className="text-center m-4">¡Bienvenido, {nombreUsuario}!</h1>
      <Image style={{ width: "100%" }} src={Portada} fluid rounded/>
      <Proposito />
      <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar Sesión</button>
    </Container>
  );
};

export default Inicio;