const message = '🐱‍🚀  hello inventario celloo 🐱‍🚀';

const recibo = {};

recibo.cotizacion = {
    usuario_id: 1,
    cliente_id: 1,
    linea: [
        {
            item_id: 1,
            qty: 30,
        },
        {
            item_id: 2,
            qty: 20
        }
    ]

}

console.log(recibo.cotizacion);
module.exports = { message, recibo }