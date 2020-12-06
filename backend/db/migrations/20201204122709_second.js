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
    await knex.schema.createTable(tableNames.cliente_empleado, table => {
        table.increments().notNullable();
        references(table, tableNames.empresa_cliente);
        references(table, tableNames.empleado);
        addDefaultColumns(table);
    })
    await knex.schema.createTable(tableNames.cotizacion, table => {
        table.increments().notNullable();
        references(table, tableNames.cliente_empleado);
        table.float('total');
        table.float('sub_total');
        table.float('tax');
    })
    await knex.schema.createTable(tableNames.garantia, table => {
        table.increments().notNullable();
        references(table, tableNames.cliente_empleado);
        table.boolean('resuelto');
    })

    await knex.schema.createTable(tableNames.nota_credito, table => {
        table.increments().notNullable();
        references(table, tableNames.cliente_empleado);
        table.float('total');
    })
    await knex.schema.createTable(tableNames.devolucion, table => {
        table.increments().notNullable();
        references(table, tableNames.cliente_empleado);
        table.float('total');
    })
    await knex.schema.createTable(tableNames.pago, table => {
        table.increments().notNullable();
        table.float('nequi').unsigned();
        table.float('transferencia').unsigned();
        table.float('efectivo').unsigned();
        table.float('yappi').unsigned();
        references(table, tableNames.nota_credito);
        references(table, tableNames.nota_credito, true, tableNames.nota_credito + '_2');
    })
    await knex.schema.createTable(tableNames.venta, table => {
        table.increments().notNullable();
        references(table, tableNames.cliente_empleado);
        table.float('total');
        table.float('sub_total');
        table.float('tax');
        table.boolean('pagado');
        table.boolean('entregado');
        references(table, tableNames.pago);
    })
    await knex.schema.createTable(tableNames.linea_venta_cotizacion, table => {
        table.increments().unsigned();
        references(table, tableNames.venta, false);
        references(table, tableNames.cotizacion, false);
        table.integer('qty').unsigned();
        table.float('total');
        table.float('tax');
    })
    await knex.schema.createTable(tableNames.linea_garantia, table => {
        table.increments().unsigned();
        references(table, tableNames.garantia);
        references(table, tableNames.item);
        references(table, tableNames.venta, false);
        table.integer('qty');
        table.string('descripcion', 500);
    })
    await knex.schema.createTable(tableNames.linea_nota_credito, table => {
        table.increments().unsigned();
        references(table, tableNames.garantia);
        references(table, tableNames.nota_credito);
        references(table, tableNames.venta, false);
        table.boolean('valido');
        table.string('descripcion', 500);
    })
    await knex.schema.createTable(tableNames.linea_devolucion, table => {
        table.increments().unsigned();
        references(table, tableNames.garantia);
        references(table, tableNames.item, false, 'item_salida');
        references(table, tableNames.item, false, 'item_entrada');
        references(table, tableNames.devolucion);
        table.integer('qty');
        table.string('descripcion', 500);
        table.integer('total');
    })
    await knex.schema.createTable(tableNames.item_inventario_log, table => {
        references(table, tableNames.item, true, '', true);
        references(table, tableNames.proveedor, false)
        references(table, tableNames.empleado);
        table.enum('evento', ['transferencia', 'venta', 'garantia', 'devolucion', 'nota credito']).notNullable();
        table.integer('ajuste').notNullable();
    })
    await knex.schema.createTable(tableNames.precio_log, table => {
        table.increments().notNullable();
        references(table, tableNames.precio);
        references(table, tableNames.empleado);
        references(table, tableNames.proveedor, false)
        table.float('precio_viejo');
        table.float('costo_viejo');
        table.float('precio_min_viejo');
    })
};

exports.down = async function (knex) {
    await Promise.all(
        [
            tableNames.precio_log,
            tableNames.item_inventario_log,
            tableNames.linea_devolucion,
            tableNames.linea_nota_credito,
            tableNames.linea_garantia,
            tableNames.linea_venta_cotizacion,
            tableNames.venta,
            tableNames.pago,
            tableNames.devolucion,
            tableNames.nota_credito,
            tableNames.garantia,
            tableNames.cotizacion,
            tableNames.cliente_empleado,
        ].map(tableName => knex.schema.dropTableIfExists(tableName))
    );
};
