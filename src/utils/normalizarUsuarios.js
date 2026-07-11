export const normalizarUsuarios = (usuarios) => {
  return usuarios.map((usuario) => {
    return {
      id: usuario.id,
      nombre: usuario.name,
      email: usuario.email,
    };
  });
};
