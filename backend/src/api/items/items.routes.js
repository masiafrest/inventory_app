const router = require("express").Router();
const Item = require("./items.model");
const Item_inventario = require("./item_inventarios/item_inventarios.model");

router.get("/", (req, res, next) => {
  try {
    res.send("item");
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    //TODO use Categoria MOdel here
    console.log(req.body);
    const {
      nombre,
      descripcion,
      modelo,
      barcode,
      sku,
      categoria_id,
      qty,
      lugar_id,
      color,
      precio,
      precio_min,
      proveedor_id,
      costo,
    } = req.body;
    const existingItem = await Item.query().where({ nombre }).first();
    console.log("this is auth existingItem", existingItem);
    if (existingItem) {
      const error = new Error("nombre en uso");
      res.status(403);
      throw error;
    }
    const insertedItemInventory = await Item_inventario.transaction(
      async (trx) => {
        const insertedItem = await Item_inventario.query(trx).insertGraph({
          qty,
          color,
          lugares: [
            {
              lugar_id,
            },
          ],
          item: [
            {
              nombre,
              descripcion,
              modelo,
              barcode,
              sku,
              categoria: [
                {
                  categoria_id,
                },
              ],
            },
          ],
          precio: [
            {
              precio,
              precio_min,
              costo,
              proveedor: [
                {
                  proveedor_id,
                },
              ],
            },
          ],
        });
      }
    );
    res.send(insertedItemInventory);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
