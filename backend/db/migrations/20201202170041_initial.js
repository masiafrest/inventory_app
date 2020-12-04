//add, remove table lugar, item, item_inventario, empleado, rol, compañia, telefono
//import { tableName, role } from '../../src/constants/String';
const { tableNames, role } = require('../../src/constants/string');
const {
    addDefaultColumns,
    addEmail,
    addUrl,
    createTableOneStringColumn,
    createTableIncrementsStringNotNullable,
    references
} = require('../../src/lib/tableUtils')
/**
 * @param {import('knex')} knex
 */
exports.up = async function (knex) {
    await knex.schema.createTable(tableNames.telefono, table => {
        table.increments();
        table.string('telefono_1').notNullable();
        table.string('telefono_2')
        addDefaultColumns(table);
    })
    await knex.schema.createTable(tableNames.compañia, table => {
        table.increments().notNullable();
        references(table, tableNames.telefono);
        table.string('nombre').notNullable();
        addEmail(table)
        addUrl(table, 'website_url');
        addUrl(table, 'logo_url')
        addDefaultColumns(table);
    })
    await knex.schema.createTable(tableNames.empleado, table => {
        createTableIncrementsStringNotNullable(table, 'nombre');
        references(table, tableNames.telefono);
        references(table, tableNames.compañia);
        addEmail(table);
        addUrl(table, 'image_url');
        table.string('password', 127).notNullable();
        table.enum('rol', Object.values(role))
        addDefaultColumns(table);
    });
    await knex.schema.createTable(tableNames.lugar, table => {
        createTableIncrementsStringNotNullable(table, 'nombre');
        addDefaultColumns(table);
    })
    await knex.schema.createTable(tableNames.item, table => {
        createTableIncrementsStringNotNullable(table, 'nombre');
        table.string('descripcion');
        table.string('barcode');
        table.string('codigo_item').notNullable();
        addUrl(table, 'image_url');
        table.float('precio').notNullable();
    })
    await knex.schema.createTable(tableNames.item_inventario, table => {
        references(table, tableNames.item, true, '', true);
        /*table.integer(tableNames.item + '_id')
                    .unsigned()
                    .primary()
                    .references('id')
                    .inTable(tableNames.item)
                    .onDelete('cascade'); */
        table.string('qyt').notNullable().unsigned();
        references(table, tableNames.lugar);
        table.string('basura').unsigned();
        table.string('color');
    })

};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists(tableNames.item_inventario);
    await knex.schema.dropTableIfExists(tableNames.item);
    await knex.schema.dropTableIfExists(tableNames.lugar);
    await knex.schema.dropTableIfExists(tableNames.empleado);
    await knex.schema.dropTableIfExists(tableNames.compañia);
    await knex.schema.dropTableIfExists(tableNames.telefono);
    /*     await Promise.all(
            [
                tableNames.item_inventario,
                tableNames.item,
                tableNames.lugar,
                tableNames.empleado,
                tableNames.compañia,
                tableNames.telefono,
            ].map(tableName => {
                console.log('dropping table ', tableName);
                knex.schema.dropTableIfExists(tableName)
            })
        ); */
};
