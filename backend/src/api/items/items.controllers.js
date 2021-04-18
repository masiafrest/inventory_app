const Item = require("./items.model");
const { hardDeleteById, patchById, delImg } = require("../../lib/helpers");
const Image = require("../images.model");
const { raw } = require("objection");
const pool = require("../../../dbpg");
const Item_log = require("./logs/item_logs.model");
const Precio = require("../precio/precios.model");
const knexConfig = require("../../../knexfile");
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
  const { search } = req.params;
  console.log(search);
  try {
    const items = await Item.query()
      .select("*")
      .where(raw(`search_vector @@ to_tsquery(?)`, [search]));

    // const items = knex("item").where(
    //   knex.raw(`search_vector @@ to_tsquery(?)`, [search])
    // );

    res.send(items);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.post = async (req, res, next) => {
//   // const parseBody
//   try {
//     const {
//       marca,
//       descripcion,
//       modelo,
//       barcode,
//       sku,
//       categoria_id,
//       stock,
//       lugar_id,
//       color,
//       precio,
//       precio_min,
//       proveedor_id,
//       costo,
//     } = req.body;

//     const search_array = [
//       String(marca),
//       String(modelo),
//       String(descripcion),
//       String(barcode),
//       String(sku),
//     ];
//     let image_url = req.files.map((file) => {
//       return file.filename;
//     });

//     // image_url = JSON.stringify(image_url);
//     console.log("no existe item");
//     await Item.transaction(async (trx) => {
//       const existingItem = await Item.query()
//         .where({ marca, modelo, lugar_id })
//         .first();
//       console.log(existingItem);
//       //check if item exist then incoming data is item of diferent color
//       if (existingItem) {
//         //if item exist, check if have image or not
//         return res.send("existe item, id: " + existingItem.id);
//       }
//       console.log("inserting item");
//       let insertedItem = await Item.query(trx)
//         .insertGraph(
//           {
//             "#id": "item",
//             marca,
//             descripcion,
//             barcode,
//             modelo,
//             color,
//             sku,
//             stock,
//             lugar_id,
//             categoria: [
//               {
//                 id: categoria_id,
//               },
//             ],
//             precio: [
//               {
//                 precio,
//                 precio_min,
//                 costo,
//                 proveedor: [{ id: proveedor_id }],
//                 logs: [
//                   {
//                     item_id: "#ref{item.id}",
//                     usuario_id: req.userData.id,
//                     proveedor: [{ id: proveedor_id }],
//                   },
//                 ],
//               },
//             ],
//             logs: [
//               {
//                 usuario_id: req.userData.id,
//                 ajuste: stock,
//                 evento: "crear",
//                 proveedor: [
//                   {
//                     id: proveedor_id,
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             relate: true,
//             allowRefs: true,
//           }
//         )
//         .returning("*");
//       // .insert({
//       //   marca,
//       //   descripcion,
//       //   barcode,
//       //   modelo,
//       //   color,
//       //   sku,
//       //   stock,
//       //   lugar_id,
//       //   precio_id: 1,
//       //   categoria_id: 1,
//       // });
//       const item_id = insertedItem.id;
//       console.log("done insert item");
//       await Promise.all(
//         image_url.map(async (e) => {
//           await insertedItem.$relatedQuery("images", trx).insert({
//             url_path: e,
//             item_id,
//           });
//         })
//       );
//       res.json(insertedItem);
//     });
//   } catch (err) {
//     next(err);
//   }
// };

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

    const existingItem = await Item.query()
      .where({ marca, modelo, lugar_id })
      .first();
    console.log(existingItem);
    //check if item exist then incoming data is item of diferent color
    if (existingItem) {
      //if item exist, check if have image or not
      return res.send("existe item, id: " + existingItem.id);
    }

    const usuario_id = req.userData.id;
    const proveedor = [
      {
        id: proveedor_id,
      },
    ];
    const insertObj = {
      marca,
      modelo,
      descripcion,
      sku,
      barcode,
      stock,
      lugar_id,
      color,
    };
    let itemArrId;
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
