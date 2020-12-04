//initial added table lugar, item, item_inventario, empleado, rol, compañia, telefono
//this second add table cliente, recibo, detalle_venta, linea_venta
const { tableNames, tipo_recibo, tipo_pago } = require('../../src/constants/string');
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
    await knex.schema.createTable(tableNames.cliente, table => {
        createTableIncrementsStringNotNullable(table, 'nombre');
        references(table, tableNames.telefono);
        addEmail(table);
        addUrl(table, 'image_url');
    });
    await knex.schema.createTable(tableNames.recibo, table => {
        createTableIncrementsStringNotNullable(table);
        references(table, tableNames.cliente);
        references(table, tableNames.empleado);
        table.enum('tipo', (Object.values(tipo_recibo)))
    })
    await knex.schema.createTable(tableNames.detalle_venta, table => {
        references(table, tableNames.recibo, true, '', true);
        table.enum('tipo_pago', Object.values(tipo_pago));
        table.float('subtotal').unsigned().notNullable();
        table.float('total').unsigned().notNullable();
        table.boolean('pagado').notNullable();
    })
    await knex.schema.createTable(tableNames.linea_venta, table => {
        table.increments().notNullable();
        references(table, tableNames.recibo);
        references(table, tableNames.item);
        table.string('qty').unsigned().notNullable();
        table.float('total').unsigned().notNullable();
    })
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists(tableNames.linea_venta);
    await knex.schema.dropTableIfExists(tableNames.detalle_venta);
    await knex.schema.dropTableIfExists(tableNames.recibo);
    await knex.schema.dropTableIfExists(tableNames.cliente);
    /*     await Promise.all(
            [
                tableNames.detalle_venta,
                tableNames.recibo,
                tableNames.cliente,
                tableNames.linea_venta
            ].map(tableName => {
                console.log('dropping table ', tableName);
                knex.schema.dropTableIfExists(tableName);
            })
        ) */
};
