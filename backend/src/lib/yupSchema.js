const yup = require("yup");

const yupSchema = yup.object().shape({
  nombre: yup.string().trim().min(2).required(),
  email: yup.string().trim().email(),
  image_url: yup.string().url(),
  logo_url: yup.string().url(),
  website_url: yup.string().url(),
  password: yup
    .string()
    .min(6, "contraseña debe tener minimo 6 caracteres")
    .max(500)
    .matches(/[^A-Za-z0-9]/, "contraseña debe tener un caracter especial")
    .matches(/[A-Z]/, "contraseña debe tener una Mayuscula")
    .matches(/[a-z]/, "contraseña debe tener minuscula")
    .matches(/[0-9]/, "contraseña debe tener numeros"),
});
module.exports = yupSchema;
