import { useEffect, useRef } from "react";
const Buscador = ({ busqueda, setBusqueda }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="buscador">
      <label htmlFor="busquedaUsuario" className="visually-hidden">
        Buscar usuario
      </label>

      <input
        id="busquedaUsuario"
        type="text"
        ref={inputRef}
        className="form-control"
        placeholder="Buscar usuario..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
};

export default Buscador;
