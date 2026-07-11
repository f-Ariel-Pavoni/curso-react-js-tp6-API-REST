import { useState, useEffect, useMemo } from "react";
import ListaUsuarios from "../ListaUsuarios/ListaUsuarios.jsx";
import Buscador from "../Buscador/Buscador.jsx";
import BotonRecargar from "../BotonRecargar/BotonRecargar";
import ModalEstado from "../ModalEstado/ModalEstado.jsx";
import "./Usuarios.css";
import { normalizarUsuarios } from "../../utils/normalizarUsuarios.js";

const Usuarios = () => {
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarUsuarios = async () => {
    setLoading(true);
    setError("");

    try {
      const respuesta = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      if (!respuesta.ok) {
        throw new Error("Error al obtener usuarios.");
      }
      const datos = await respuesta.json();

      setUsuarios(normalizarUsuarios(datos));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleRecargar = () => {
    setBusqueda("");
    cargarUsuarios();
  };

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()),
    );
  }, [usuarios, busqueda]);

  if (loading && usuarios.length === 0) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="container py-4 usuarios-container">
      {error && (
        <ModalEstado
          tipo="error"
          mensaje={error}
          accion={cargarUsuarios}
          textoAccion="Reintentar"
          onClose={() => setError("")}
        />
      )}

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
