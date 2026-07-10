import { useState, useEffect, useMemo } from "react";
import ListaUsuarios from "../ListaUsuarios/ListaUsuarios.jsx";
import Buscador from "../Buscador/Buscador.jsx";
import BotonRecargar from "../BotonRecargar/BotonRecargar";
import "./Usuarios.css";

const Usuarios = () => {
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const formatearUsuarios = (usuarios) => {
    return usuarios.map((usuario) => {
      return {
        id: usuario.id,
        nombre: usuario.name,
        email: usuario.email,
      };
    });
  };

  const cargarUsuarios = async () => {
    setLoading(true);
    setError("");
    //simular que la api demora
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      if (!respuesta.ok) {
        throw new Error("Error al obtener usuarios.");
      }
      const datos = await respuesta.json();

      setUsuarios(formatearUsuarios(datos));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecargar = () => {
    setBusqueda("");
    cargarUsuarios();
  };

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()),
    );
  }, [usuarios, busqueda]);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading && usuarios.length === 0) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="container py-4 usuarios-container">
      <div className="usuarios-header">
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
        <BotonRecargar recargar={handleRecargar} loading={loading} />
      </div>

      {loading && <p>Cargando usuarios...</p>}
      <ListaUsuarios usuarios={usuariosFiltrados} />
    </div>
  );
};

export default Usuarios;
