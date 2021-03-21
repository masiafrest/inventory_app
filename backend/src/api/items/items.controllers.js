const Item = require("./items.model");
const { hardDeleteById, patchById, delImg } = require("../../lib/helpers");
const Image = require("../images.model");

const getItemGraph = `[
        precio(defaultSelects),
          lugar(defaultSelects)
        , categoria(defaultSelects), images(defaultSelects)]`;

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
    console.log("no existe item");
    await Item.transaction(async (trx) => {
      const existingItem = await Item.query().where({ marca }).first();
      let insertedItem;
      console.log(existingItem);
      //check if item exist then incoming data is item of diferent color
      if (existingItem) {
        //if item exist, check if have image or not
        return res.send("existe item, id: " + existingItem.id);
      }
      console.log("inserting item");
      insertedItem = await Item.query(trx)
        .insertGraph(
          {
            "#id": "item",
            marca,
            descripcion,
            barcode,
            modelo,
            color,
            sku,
            qty,
            lugar_id,
            categoria: [
              {
                id: categoria_id,
              },
            ],
            precio: [
              {
                precio,
                precio_min,
                costo,
                proveedor: [{ id: proveedor_id }],
                logs: [
                  {
                    item_id: "#ref{item.id}",
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
          },
          {
            relate: true,
            allowRefs: true,
          }
        )
        .returning("*");
      const item_id = insertedItem.id;
      console.log("done insert item");
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

exports.delete = async (req, res, next) => {
  const imgs = await Image.query().where("item_id", req.params.id);
  delImg(imgs);
  hardDeleteById(req, res, next, Item);
};
