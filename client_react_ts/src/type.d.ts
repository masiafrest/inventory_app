interface IpostItem {
  [key: string]: string | number;
}

interface Iusuario {
  id: number;
  nombre: string;
}

interface IResToken {
  usuario: {
    [key: string]: Iusuario;
  };
  token: string;
}

interface ISignIn {
  nombre: string;
  password: string;
}
