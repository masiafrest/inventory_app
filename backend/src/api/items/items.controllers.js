const Item = require("./items.model");
const { hardDeleteById, patchById, delImg } = require("../../lib/helpers");
const Image = require("../images.model");
const { raw } = require("objection");
const knexConfig = require("../../../knexfile");
const { orWhere } = require("../../db");
const { chain } = require("lodash");
const knex = require("knex")(knexConfig.development);

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

exports.searchQuery = async (req, res, next) => {
  console.log(req.params);
  let { search } = req.params;
  const searchArr = search.split(" ").map((e) => `%${e}%`.replace("'", ""));

  try {
    const items = await Item.query()
      .withGraphFetched(getItemGraph)
      .where((builder) =>
        builder.where(
          raw(`search_vector @@ to_tsquery('spanish', ?)`, searchArr.join("|"))
        )
      );

    // .where(raw(`search_vector @@ to_tsquery('spanish', ?)`, [search]));
    res.send(items);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.post = async (req, res, next) => {
  const {
    marca,
    descripcion,
    modelo,
    barcode,
    sku,
    categoria_id,
    stock,
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
  const usuario_id = req.userData.id;
  const proveedor = [
    {
      id: proveedor_id,
    },
  ];
  const search_item = [marca, modelo, descripcion, barcode, sku].join(" ");
  console.log("searchitem: ", search_item);
  const insertObj = {
    marca,
    modelo,
    descripcion,
    sku,
    barcode,
    stock,
    lugar_id,
    categoria_id,
    color,
    search_item,
  };
  let itemArrId;
  try {
    const existingItem = await Item.query()
      .where({ marca, modelo, lugar_id })
      .first();
    console.log(existingItem);
    //check if item exist then incoming data is item of diferent color
    if (existingItem) {
      //if item exist, check if have image or not
      return res.send("existe item, id: " + existingItem.id);
    }

    await knex.transaction(async function (trx) {
      itemArrId = await knex("item")
        .transacting(trx)
        .insert(
          knex.raw(`
     (${Object.keys(insertObj)
       .map((e) => e)
       .join(",")})
values (${Object.values(insertObj)
            .map((e) => `'${e}'`)
            .join(",")})
    `)
        )
        .returning("id");
    });
    await Item.transaction(async (trx) => {
      let insertedItem = await Item.query(trx)
        .upsertGraph(
          {
            "#id": "item",
            id: itemArrId[0],
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
                    usuario_id,
                    proveedor,
                  },
                ],
              },
            ],
            logs: [
              {
                usuario_id,
                ajuste: stock,
                evento: "crear",
                proveedor,
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
