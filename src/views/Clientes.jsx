// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/clientes/TablaClientes';
import ModalRegistroCliente from '../components/clientes/ModalRegistroCliente';
import CuadroBusquedas from '../components/busquedas/Cuadrobusquedas';
import { Container, Button, Row, Col } from "react-bootstrap";

// Declaración del componente Clientes
const Clientes = () => {
  // Estados para manejar los datos, carga y errores
  const [listaClientes, setListaClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    celular: '',
    direccion: '',
    cedula: ''
  });
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerClientes = async () => {
    try {
      setCargando(true); // Aseguramos que el estado de carga se active
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) {
        throw new Error('Error al cargar los clientes');
      }
      const datos = await respuesta.json();
      setListaClientes(datos);
      setClientesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerClientes();
  }, []);

  // Maneja los cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejo la inserción de un nuevo cliente
  const agregarCliente = async () => {
    // Validación de campos obligatorios
    if (!nuevoCliente.primer_nombre || !nuevoCliente.primer_apellido || 
        !nuevoCliente.celular || !nuevoCliente.cedula) {
      setErrorCarga("Por favor, completa todos los campos obligatorios antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarcliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el cliente');
      }

      await obtenerClientes(); // Refresca toda la lista desde el servidor
      setNuevoCliente({
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        celular: '',
        direccion: '',
        cedula: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    
    const filtrados = listaClientes.filter(
      (cliente) =>
        cliente.primer_nombre.toLowerCase().includes(texto) ||
        (cliente.segundo_nombre && cliente.segundo_nombre.toLowerCase().includes(texto)) ||
        cliente.primer_apellido.toLowerCase().includes(texto) ||
        (cliente.segundo_apellido && cliente.segundo_apellido.toLowerCase().includes(texto)) ||
        cliente.celular.toLowerCase().includes(texto) ||
        (cliente.direccion && cliente.direccion.toLowerCase().includes(texto)) ||
        cliente.cedula.toLowerCase().includes(texto)
    );
    setClientesFiltrados(filtrados);
  };

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Clientes</h4>

        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nuevo Cliente
            </Button>
          </Col>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <br/><br/>

        {/* Pasa los estados como props al componente TablaClientes */}
        <TablaClientes 
          clientes={clientesFiltrados} 
          cargando={cargando} 
          error={errorCarga} 
        />

        <ModalRegistroCliente
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoCliente={nuevoCliente}
          manejarCambioInput={manejarCambioInput}
          agregarCliente={agregarCliente}
          errorCarga={errorCarga}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Clientes;