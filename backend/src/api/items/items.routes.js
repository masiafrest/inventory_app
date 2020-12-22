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

router.post("/", async (req, res, next) => {
  console.log("POST items: ", req.userData);
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
      "#id": "inventory_id",
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
          logs: [
            {
              inventario_id: "#ref{inventory_id.id}",
              usuario_id: req.userData.id,
              proveedor: [{ id: proveedor_id }],
            },
          ],
        },
      ],
      logs: [
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

    //check if item exist then incoming data is item inventory of diferent color
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
  console.log("patch 😀 req.body: ", req.body.inventarios);
  for (let inventario of req.body.inventarios) {
    const { id, qty, basura, lugar_id, precio } = inventario;
    const defaultData = {
      inventario_id: id,
      usuario_id: req.userData.id,
      proveedor_id: precio.proveedor_id,
    };
    if ("precio" in inventario) {
      inventario.precio.logs = [{ ...defaultData }];
    }
    if ("qty" in inventario) {
      inventario.logs = [
        {
          ...defaultData,
          ajuste: qty,
          evento: "modificar",
        },
      ];
    }
  }
  /*   if (req.body.hasOwnProperty("inventarios")) {
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
      const updatedPrecio = req.body.inventarios[0].precio;
      const precio = await Precio.query().findById(updatedPrecio.id);
      await Precio.relatedQuery("logs").for(precio.id).insert({
        inventario_id: req.body.inventarios[0].id,
        usuario_id: req.userData.id,
        precio_viejo: precio.precio,
        costo_viejo: precio.costo,
        precio_min_viejo: precio.precio_min,
        proveedor_id: precio.proveedor_id,
      });
    }
  } */

  await Item.transaction(async (trx) => {
    const itemUpdated = await Item.query(trx).upsertGraph(
      { ...req.body },
      {
        noDelete: true,
      }
    );
    res.send(itemUpdated);
  });
});
module.exports = router;
