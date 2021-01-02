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

//TODO: add almost all req.body data from server type and use ts Omit or Pick helpers
