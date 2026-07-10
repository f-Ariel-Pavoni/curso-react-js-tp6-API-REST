const BotonRecargar = ({ recargar, loading }) => {
  return (
    <button
      className="btn btn-primary btn-recargar"
      onClick={recargar}
      disabled={loading}
    >
      Recargar
    </button>
  );
};

export default BotonRecargar;
