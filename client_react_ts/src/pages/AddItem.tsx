import React, { useState } from "react";
import axios from "axios";
import CategoriasSelect from "../components/CategoriasSelect";
import ProveedoresSelect from "../components/ProveedoresSelect";
import LugaresSelect from "../components/LugaresSelect";
import UploadAndPreviewImages from "../components/UploadAndPreviewImages";

//MUI
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { RootState } from "../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";

interface Item {
  marca: string;
  descripcion: string;
  modelo: string;
  sku: string;
  color: string;
  precio: number;
  categoria_id: number;
  qty: number;
  lugar_id: number;
  proveedor: number;
  costo: number;
  images?: string;
}

export default function AddItem(props: any) {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.user);

  const [item, setItem] = useState<Item>({
    marca: "",
    descripcion: "",
    modelo: "",
    sku: "",
    color: "",
    precio: 0,
    categoria_id: 0,
    qty: 0,
    lugar_id: 0,
    proveedor: 0,
    costo: 0,
  });
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      //multiple files
      // let fileObj: any = [];
      // let fileArray: any = [];
      // fileObj.push(e.target.files);
      // for (let i = 0; i < fileObj[0].length; i++) {
      //   fileArray.push(URL.createObjectURL(fileObj[0][i]));
      // }
      // setItem((value) => ({ ...value, images: fileArray }));

      //single file
      const file = URL.createObjectURL(e.target.files[0]);
      setItem((value) => ({ ...value, [e.target.name]: file }));
      console.log(e.target.files)
      console.log(file)
      console.log(item)
    } else {
      setItem((value) => ({ ...value, [e.target.name]: e.target.value }));
    }
    console.log(item);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(item);
    try {
      let formData = new FormData();
      Object.keys(item).forEach((key) => {
        formData.append(key, item[key]);
      });
      const res = await axios.post("/items", formData);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const itemDetails = [
    "marca",
    "descripcion",
    "modelo",
    "sku",
    "color",
    "precio",
    "categoria_id",
    "qty",
    "lugar_id",
    "proveedor",
    "costo",
  ];

  const renderTextField = itemDetails.map((detail) => (
    <TextField
      key={detail}
      id={detail}
      name={detail}
      label={detail}
      value={item[detail]}
      onChange={handleChange}
      fullWidth
      // helperText={errors[detail]}
      // error={errors[detail] ? true : false}
    />
  ));

  return (
    <Container maxWidth="sm" fixed>
      <Typography variant="h2">Agregar Item</Typography>
      <form noValidate onSubmit={handleSubmit}>
        {renderTextField}
        <CategoriasSelect onChange={handleChange} />
        <LugaresSelect onChange={handleChange} />
        <ProveedoresSelect onChange={handleChange} />
        <UploadAndPreviewImages item={item} onChange={handleChange} />
        {/* {errors.general && (
          <Typography variant="body2">{errors.general}</Typography>
        )} */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Agregar
          {loading && <CircularProgress size={30} />}
        </Button>
        <br></br>
      </form>
    </Container>
  );
}
