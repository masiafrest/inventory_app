const router = require("express").Router();

const Item = require("./items.model");
const Item_inventario = require("./inventarios/inventarios.model");

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.query()
      .withGraphFetched(
        `[inventarios(defaultSelects).[
          item_logs(defaultSelects), precio(defaultSelects), precio_logs(defaultSelects),
          lugares(defaultSelects)
        ], categoria(defaultSelects)]`
      )
      .modify("defaultSelects");
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:nombre", async (req, res, next) => {
  try {
    const items = await Item.query()
      .withGraphFetched(
        `[inventarios(defaultSelects).[
          item_logs(defaultSelects), precio(defaultSelects), precio_logs(defaultSelects),
          lugares(defaultSelects)
        ], categoria(defaultSelects)]`
      )
      .where("nombre", req.params.nombre)
      .modify("defaultSelects");
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// TODO logs si pueden ser automatico al insert or update precio y inventario, tal vez tenga q ver con beforeInsert y beforeUpdate
router.post("/", async (req, res, next) => {
  console.log(req.userData);
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
    const itemInventarioObj = {
      "#id": "item_inventory_id",
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
          precio_logs: [
            {
              item_inventario_id: "#ref{item_inventory_id.id}",
              usuario_id: req.userData.id,
              proveedor: [{ id: proveedor_id }],
            },
          ],
        },
      ],
      //TODO FIX precio_log no se inserta ahora, pueda q precio_log vaya dentro de precio
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
    };
    const existingItem = await Item.query().where({ nombre }).first();
    if (existingItem) {
      await Item_inventario.transaction(async (trx) => {
        console.log("existing item");
        itemInventarioObj.item_id = existingItem.id;
        const insertedItem = await Item_inventario.query(trx).insertGraph(
          itemInventarioObj,
          {
            relate: true,
            allowRefs: true,
          }
        );
        console.log(insertedItem);
        res.json(insertedItem);
      });
    }
    console.log("no existe item");
    await Item.transaction(async (trx) => {
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
            inventarios: [itemInventarioObj],
          },
          {
            relate: true,
            allowRefs: true,
          }
        )
        .returning("*");
      res.json(insertedItem);
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  if (req.body.hasOwnProperty("nombre") || req.body.hasOwnProperty("modelo")) {
    //patch itemInvnetory sku, sku generate on client side, so if nombre or modelo if change should generate a new
  }
  await Item.transaction(async (trx) => {
    const itemUpdated = await Item.query(trx).patchAndFetchById(
      req.params.id,
      req.body
    );
    res.send(itemUpdated);
  });
});
module.exports = router;
