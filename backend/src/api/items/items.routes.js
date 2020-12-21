const router = require("express").Router();

const inventarios = require("./inventarios/inventarios.routes");

const Item = require("./items.model");
const Inventario = require("./inventarios/inventarios.model");
const Precio = require("../precio/precios.model");
const getItemGraph = `[inventarios(defaultSelects).[
        precio(defaultSelects),
          lugares(defaultSelects)
        ], categoria(defaultSelects)]`;

router.use("/inventarios", inventarios);

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.query()
      .withGraphFetched(getItemGraph)
      .modify("defaultSelects");
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:nombre", async (req, res, next) => {
  try {
    const items = await Item.query()
      .withGraphFetched(getItemGraph)
      .where("nombre", req.params.nombre)
      .modify("defaultSelects")
      .first();
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
              inventario_id: "#ref{item_inventory_id.id}",
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
      await Inventario.transaction(async (trx) => {
        console.log("existing item");
        itemInventarioObj.item_id = existingItem.id;
        const insertedItem = await Inventario.query(trx).insertGraph(
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

router.patch("/", async (req, res, next) => {
  console.log("patch 😀 req.body: ", req.body);
  if (req.body.hasOwnProperty("inventarios")) {
    console.log("has property inventarios");
    //check if has precio mod
    // TODO add inventory log
    const updatedInventario = req.body.inventarios[0];
    const inventario = await Inventario.query().findById(updatedInventario.id);
    await Inventario.transaction(async (trx) => {
      await Inventario.relatedQuery("logs")
        .for(inventario.id)
        .insert({
          usuario_id: req.userData.id,
          inventario_id: inventario.id,
          ajuste: updatedInventario.qty - inventario.qty,
          evento: "modificar",
        });
    });
    if (req.body.inventarios[0].hasOwnProperty("precio")) {
      //make a precio history
      console.log("has property precio 😁", req.userData);
      const updatedPrecio = req.body.inventarios[0].precio;
      const precio = await Precio.query().findById(updatedPrecio.id);
      console.log(precio);
      // TODO before insert check if the same
      const newPrecioLog = await Precio.relatedQuery("logs")
        .for(precio.id)
        .insert({
          inventario_id: req.body.inventarios[0].id,
          usuario_id: req.userData.id,
          precio_viejo: precio.precio,
          costo_viejo: precio.costo,
          precio_min_viejo: precio.precio_min,
          proveedor_id: precio.proveedor_id,
        });
      console.log("new precio log", newPrecioLog);
    }
  }
  await Item.transaction(async (trx) => {
    const itemUpdated = await Item.query(trx).upsertGraph(
      { ...req.body },
      {
        noDelete: true,
      }
    );
    console.log("item Updated: ", itemUpdated);
    res.send(itemUpdated);
  });
});
module.exports = router;
