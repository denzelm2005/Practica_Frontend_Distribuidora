// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaVentas from '../components/ventas/TablaVentas'; // Importa el componente de tabla
import ModalDetallesVenta from '../components/detalles_ventas/ModalDetallesVentas';
import { Container } from "react-bootstrap";

// Declaración del componente Ventas
const Ventas = () => {
  // Estados para manejar los datos, carga y errores
  const [listaVentas, setListaVentas] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);     // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null); // Maneja errores de la petición

  const [mostrarModal, setMostrarModal] = useState(false); // Estado para el modal
  const [detallesVenta, setDetallesVenta] = useState([]); // Estado para los detalles
  const [cargandoDetalles, setCargandoDetalles] = useState(false); // Estado de carga de detalles
  const [errorDetalles, setErrorDetalles] = useState(null); // Estado de error de detalles

  // Función para obtener detalles de una venta
  const obtenerDetalles = async (id_venta) => {
    setCargandoDetalles(true);
    setErrorDetalles(null);
    try {
      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallesventa/${id_venta}`);
      if (!respuesta.ok) {
        throw new Error('Error al cargar los detalles de la venta');
      }
      const datos = await respuesta.json();
      setDetallesVenta(datos);
      setCargandoDetalles(false);
      setMostrarModal(true); // Abre el modal
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };
  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/obtenerventas'); // Ruta ajustada al controlador
        if (!respuesta.ok) {
          throw new Error('Error al cargar las ventas');
        }
        const datos = await respuesta.json();
        setListaVentas(datos);    // Actualiza el estado con los datos
        setCargando(false);       // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);       // Termina la carga aunque haya error
      }
    };
    obtenerVentas();            // Ejecuta la función al montar el componente
  }, []);                       // Array vacío para que solo se ejecute una vez

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Ventas con Detalles</h4>

        {/* Pasa los estados como props al componente TablaVentas */}
        <TablaVentas
          ventas={listaVentas}
          cargando={cargando}
          error={errorCarga}
          obtenerDetalles={obtenerDetalles} // Pasar la función
        />

        <ModalDetallesVenta
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          detalles={detallesVenta}
          cargandoDetalles={cargandoDetalles}
          errorDetalles={errorDetalles}
        />


      </Container>
    </>
  );
};

// Exportación del componente
export default Ventas;