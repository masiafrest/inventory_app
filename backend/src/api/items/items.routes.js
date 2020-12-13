const router = require("express").Router();
const Item = require("./items.model");
const Item_inventario = require("./item_inventarios/item_inventarios.model");

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.query().withGraphFetched(
      "[inventarios, categoria]"
    );
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:nombre", async (req, res, next) => {
  try {
    const items = await Item.query()
      .withGraphFetched("[inventarios, categoria]")
      .where("nombre", req.params.nombre);
    res.json(items);
  } catch (err) {
    next(err);
  }
});
// TODO add log function 
router.post("/", async (req, res, next) => {
  try {
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
      await Item_inventario.transaction(async (trx) => {
        const insertedItem = await Item_inventario.query(trx).insertGraph(
          {
            item_id: existingItem.id,
            qty,
            color,
            sku,
            lugares: [
              {
                id: lugar_id,
              },
            ],
            precio: [
              {
                precio,
                precio_min,
                costo,
                proveedor: [
                  {
                    id: proveedor_id,
                  },
                ],
              },
            ],
            logs:[
              {
                item_id: existingItem.id,
                evento: 
              }
            ]
          },
          {
            relate: true,
          }
        );
        console.log(insertedItem);
        res.json(insertedItem);
      });
    }

    const insertedItem = await Item.transaction(async (trx) => {
      const insertedItem = await Item.query(trx)
        .insertGraph(
          {
            nombre,
            descripcion,
            barcode,
            modelo,
            categoria: [
              {
                id: categoria_id,
              },
            ],
            inventarios: [
              {
                qty,
                color,
                sku,
                lugares: [
                  {
                    id: lugar_id,
                  },
                ],
                precio: [
                  {
                    precio,
                    precio_min,
                    costo,
                    proveedor: [
                      {
                        id: proveedor_id,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            relate: true,
          }
        )
        .returning("*");
      console.log(insertedItem);
      res.json(insertedItem);
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;
