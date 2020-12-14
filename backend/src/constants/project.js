const message = "🐱‍🚀  hello inventario celloo 🐱‍🚀";

const recibo = {};

recibo.cotizacion = {
  usuario_id: 1,
  cliente_id: 1,
  linea: [
    {
      item_id: 1,
      qty: 30,
      color: "negro",
    },
    {
      item_id: 2,
      qty: 20,
      color: "rojo",
    },
  ],
  total: 450.0,
};

module.exports = { message, recibo };
