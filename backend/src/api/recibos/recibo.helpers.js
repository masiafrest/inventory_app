function checkPrice(linea, precioDB, res) {
  if (linea.precio < precioDB.oferta_precio) {
    res.status(406);
    error = new Error(
      `precio: ${linea.precio}, de item ${linea.item_id} debajo a la oferta: ${precioDB.oferta_precio}`
    );
    throw error;
  }
  if (linea.precio < precioDB.precio_min && precioDB.oferta_precio == null) {
    res.status(406);
    error = new Error(
      `precio: ${linea.precio}, de item ${linea.item_id} debajo al precio minimo: ${precioDB.precio_min}`
    );
    throw error;
  }
}

function ItemLogFactory(headers, linea, evento, id, inv_b_id) {
  return {
    item_id: inv_b_id || linea.item_id,
    usuario_id: headers.usuario_id || headers.id,
    empresa_cliente_id: headers.empresa_cliente_id,
    evento,
    ajuste: inv_b_id ? linea.qty : -linea.qty,
    recibo_evento_id: id,
  };
}
module.exports = {
  ItemLogFactory,
  checkPrice,
};
