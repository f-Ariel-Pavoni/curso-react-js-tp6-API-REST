import "./UsuarioCard.css";

const UsuarioCard = ({ usuario }) => {
  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const obtenerIcono = (key) => {
    if (key.toLowerCase() === "nombre") return "👤";
    if (key.toLowerCase() === "email") return "✉️";
    return "ℹ️";
  };

  const campos = Object.keys(usuario).map((key) => {
    return (
      <div key={key} className="d-flex flex-wrap align-items-center gap-2 mb-2">
        <span>{obtenerIcono(key)}</span>
        <strong>{capitalize(key)}:</strong>
        <span className="valor-truncado">{usuario[key]}</span>
      </div>
    );
  });

  return <div className="tarjeta card shadow p-3 mb-3">{campos}</div>;
};

export default UsuarioCard;
