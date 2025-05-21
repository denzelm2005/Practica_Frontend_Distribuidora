import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Tarjeta from '../components/catalogo/Tarjeta';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import Paginacion from '../components/ordenamiento/Paginacion';

const CatalogoProductos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 3;

  const obtenerProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    setPaginaActual(1);

    const filtrados = listaProductos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        (producto.descripcion_producto && producto.descripcion_producto.toLowerCase().includes(texto)) ||
        (producto.precio_unitario && producto.precio_unitario.toString().includes(texto))
    );
    setProductosFiltrados(filtrados);
  };

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  if (cargando) return <div>Cargando...</div>;
  if (errorCarga) return <div>Error: {errorCarga}</div>;

  return (
    <Container className="mt-5">
      <br />
      <h4>Catálogo de Productos</h4>
      <Row>
        <Col lg={2} md={4} sm={4} xs={5}></Col>
        <Col lg={6} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>
      <br /><br />
      <Row>
        {productosPaginados.map((producto, indice) => (
          <Tarjeta
            key={producto.id_producto}
            indice={indice}
            nombre_producto={producto.nombre_producto}
            descripcion_producto={producto.descripcion_producto}
            precio_unitario={producto.precio_unitario}
            stock={producto.stock}
            id_categoria={producto.id_categoria}
            imagen={producto.imagen}
          />
        ))}
      </Row>
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={productosFiltrados.length}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />
    </Container>
  );
};

export default CatalogoProductos;