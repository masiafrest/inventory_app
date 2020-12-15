const router = require("express").Router();
const Item = require("./items.model");
const Item_inventario = require("./item_inventarios/item_inventarios.model");

router.get("/", async (req, res, next) => {
  try {
    console.log("items, route, req.userData: ", req.userData);
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
      .withGraphFetched("[inventarios.[item_logs], categoria]")
      .where("nombre", req.params.nombre);
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
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
    if (existingItem) {
      await Item_inventario.transaction(async (trx) => {
        console.log("existing item");
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
            precio_logs: [
              {
                usuario_id: req.userData.id,
                proveedor: [{ id: proveedor_id }],
              },
            ],
            item_logs: [
              {
                usuario_id: req.userData.id,
                ajuste: qty,
                evento: "crear",
                proveedor: [
                  {
                    id: proveedor_id,
                  },
                ],
              },
            ],
          },
          {
            relate: true,
          }
        );
        console.log(insertedItem);
        res.json(insertedItem);
      });
    }

    console.log("Item insert: ", req.userData.id);
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
                item_logs: [
                  {
                    usuario_id: req.userData.id,
                    ajuste: qty,
                    evento: "crear",
                    proveedor: [
                      {
                        id: proveedor_id,
                      },
                    ],
                  },
                ],
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
                precio_logs: [
                  {
                    usuario_id: req.userData.id,
                    proveedor: [{ id: proveedor_id }],
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
// TODO add a update qty
router.patch("/", async (req, res, next) => {
  const { qty, item_id } = req.body;
  await Item.transaction((trx) => {
    const itemUpdated = Item.query(trx).upsertGraph(
      {},
      {
        noDelete: true,
      }
    );
  });
});
module.exports = router;
