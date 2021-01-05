const Item = require("./items.model");
const Inventario = require("./inventarios/inventarios.model");

const getItemGraph = `[inventarios(defaultSelects).[
        precio(defaultSelects),
          lugares(defaultSelects)
        ], categoria(defaultSelects)]`;

exports.get = async (req, res, next) => {
  try {
    const items = await Item.query()
      .withGraphFetched(getItemGraph)
      .modify("defaultSelects");
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.getByParams = async (req, res, next) => {
  try {
    let item;
    const x = req.params.x;
    async function itemGraphFetch(key, value) {
      return await Item.query()
        .withGraphFetched(getItemGraph)
        .where(key, value)
        .modify("defaultSelects")
        .first();
    }
    if (isNaN(x)) {
      item = await itemGraphFetch("nombre", x);
    } else {
      if (x.length < 4) {
        item = await itemGraphFetch("id", x);
      }
      item = await itemGraphFetch("barcode", x);
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.post = async (req, res, next) => {
  console.log("POST items: ", req.userData);
  // const parseBody
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
    let image_url = req.files.map((file) => {
      return file.filename;
    });
    image_url = JSON.stringify(image_url);
    const itemInventarioObj = {
      "#id": "inventory",
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
              inventario_id: "#ref{inventory.id}",
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
    console.log("no existe item");
    await Item.transaction(async (trx) => {
      const existingItem = await Item.query().where({ nombre }).first();
      let insertedItem;
      //check if item exist then incoming data is item inventory of diferent color
      if (existingItem) {
        if (image_url === "undefined" || image_url !== "[]") {
          await existingItem.$query(trx).patch({ image_url });
        }

        itemInventarioObj.item_id = existingItem.id;
        await Inventario.query(trx).insertGraph(itemInventarioObj, {
          relate: true,
          allowRefs: true,
        });

        console.log(existingItem);
        return res.json(existingItem);
      }

      insertedItem = await Item.query(trx)
        .insertGraph(
          {
            image_url,
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
};

exports.patch = async (req, res, next) => {
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
  await Item.transaction(async (trx) => {
    const itemUpdated = await Item.query(trx).upsertGraph(
      { ...req.body },
      {
        noDelete: true,
      }
    );
    res.send(itemUpdated);
  });
};
