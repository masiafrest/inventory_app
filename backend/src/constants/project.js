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

const BearerToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoic29uaWEiLCJyb2wiOiJqZWZlIiwiaWF0IjoxNjA4NTA2NjU4fQ.X5QjjMuxbdLwwnagONmLlD6q9WL4l007yN2EUukx_8w";
module.exports = { message, recibo, BearerToken };
