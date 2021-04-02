
export const paths = [
  "/item",
  "/inventario",
  "/usuario",
  "/categoria",
  "/lugar",
  "/cliente",
  "/proveedor",
  "/rol",
  "/defectuoso",
  '/venta',
  '/transferencia'
];
export const pluralPaths = [
  "/items",
  "/inventarios",
  "/usuarios",
  "/categorias",
  "/lugares",
  "/clientes",
  "/proveedores",
  "/roles",
  "/defectuosos",
];

export const addPaths = paths.map((path) => "/add" + path);
export const showPaths = pluralPaths.map((path) => "/show" + path);
export const reciboPaths = [
  "/venta",
  "/transferencia",
  "/devolucion",
  "/garantia",
  "/nota_credito",
  "/cotizacion",
].map((e) => "/recibo" + e);