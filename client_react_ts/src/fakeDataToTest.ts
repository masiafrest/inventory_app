export const itemData: any = {
  id: 35,
  marca: "dos",
  descripcion:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  modelo: "world",
  barcode: null,
  image_url:
    '["https://compuusa.com.pe/4327-large_default/audifonos-iblue-live-hb351l.jpg"]',
  categoria_id: 1,
  categoria_2_id: null,
  categoria: {
    id: 1,
    nombre: "audifono",
  },
  inventarios: [
    {
      id: 66,
      item_id: 35,
      qty: 10,
      lugar_id: 1,
      basura: null,
      color: "red",
      precio_id: 65,
      sku: "dos-red",
      lugares: {
        id: 1,
        tipo: "tienda",
        direccion: "dorado",
      },
      precio: {
        id: 65,
        precio: 2.99,
        oferta: null,
        oferta_precio: null,
        costo: 0.99,
        precio_min: 1.99,
        proveedor_id: 1,
      },
    },
    {
      id: 68,
      item_id: 35,
      qty: 10,
      lugar_id: 1,
      basura: null,
      color: "bl",
      precio_id: 67,
      sku: "dos-bl",
      lugares: {
        id: 1,
        tipo: "tienda",
        direccion: "dorado",
      },
      precio: {
        id: 67,
        precio: 2.99,
        oferta: null,
        oferta_precio: null,
        costo: 0.99,
        precio_min: 1.99,
        proveedor_id: 1,
      },
    },
  ],
};

export const fakeReduxStore = {
  user: {
    credentials: {
      id: 5,
      nombre: "julio1",
      rol: "jefe",
    },
    authenticated: true,
    loading: false,
  },
  UI: {
    loading: false,
    errors: null,
  },
  lugares: [
    {
      id: 1,
      tipo: "tienda",
      direccion: "dorado",
      created_at: "2020-12-30T20:52:44.212Z",
      updated_at: "2020-12-30T20:52:44.212Z",
      deleted_at: null,
    },
    {
      id: 2,
      tipo: "bodega",
      direccion: "condado",
      created_at: "2020-12-30T20:52:44.212Z",
      updated_at: "2020-12-30T20:52:44.212Z",
      deleted_at: null,
    },
  ],
  categoria: [
    {
      id: 1,
      nombre: "audifono",
      created_at: "2020-12-30T20:52:44.224Z",
      updated_at: "2020-12-30T20:52:44.224Z",
      deleted_at: null,
    },
    {
      id: 2,
      nombre: "bocina",
      created_at: "2020-12-30T20:52:44.224Z",
      updated_at: "2020-12-30T20:52:44.224Z",
      deleted_at: null,
    },
  ],
};

export const image =
  "https://compuusa.com.pe/4327-large_default/audifonos-iblue-live-hb351l.jpg";

export const BearerToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoic29uaWEiLCJyb2wiOiJqZWZlIiwiaWF0IjoxNjA4NTA2NjU4fQ.X5QjjMuxbdLwwnagONmLlD6q9WL4l007yN2EUukx_8w";
