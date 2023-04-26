export function firstName(name) {
  if (!name) {
    return '';
  }
  const apelido = name.split(' ');
  return apelido[0];
};
