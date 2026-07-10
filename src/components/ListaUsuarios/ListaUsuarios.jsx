import UsuarioCard from "../UsuarioCard/UsuarioCard";
import "./ListaUsuarios.css";

const ListaUsuarios = ({ usuarios }) => {
  return (
    <div className="py-2 d-flex flex-column gap-1 contenedor-usuarios">
      {usuarios.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        usuarios.map((usuario) => {
          const { id, ...usr } = usuario;
          return <UsuarioCard key={id} usuario={usr} />;
        })
      )}
    </div>
  );
};

export default ListaUsuarios;
