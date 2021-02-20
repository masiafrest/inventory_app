const Item = require("./items.model");
const Inventario = require("./inventarios/inventarios.model");
const { hardDeleteById, patchById } = require("../../lib/helpers");

const getItemGraph = `[inventarios(defaultSelects).[
        precio(defaultSelects),
          lugar(defaultSelects)
        ], categoria(defaultSelects), images]`;

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
      item = await itemGraphFetch("marca", x);
    } else {
      if (x.length > 5) {
        item = await itemGraphFetch("barcode", x);
      }
      item = await itemGraphFetch("id", x);
    }
    res.json([item]);
  } catch (err) {
    next(err);
  }
};

exports.post = async (req, res, next) => {
  console.log("POST items: ", req);
  // const parseBody
  try {
    const {
      marca,
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
    // image_url = JSON.stringify(image_url);
    const itemInventarioObj = {
      "#id": "inventory",
      qty,
      color,
      sku,
      lugar: [
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
      const existingItem = await Item.query().where({ marca }).first();
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
            marca,
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
      const item_id = insertedItem.id;
      await Promise.all(
        image_url.map(async (e) => {
          await insertedItem.$relatedQuery("images", trx).insert({
            url_path: e,
            item_id,
          });
        })
      );
      res.json(insertedItem);
    });
  } catch (err) {
    next(err);
  }
};

exports.patch = (req, res, next) => {
  patchById(req, res, next, Item);
};

exports.delete = (req, res, next) => {
  hardDeleteById(req, res, next, Item);
};
