
export const paths = [
  "/item",
  "/usuario",
  "/cliente",
  "/proveedor",
  "/defectuoso",
  '/venta',
  '/transferencia',
  '/devolucion',
];
export const pluralPaths = [
  "/items",
  "/usuarios",
  "/categorias",
  "/lugares",
  "/clientes",
  "/proveedores",
  "/roles",
  "/defectuosos",
  '/ventas',
  '/transferencias',
  '/devoluciones',
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