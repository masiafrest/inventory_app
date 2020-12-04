const { tableNames } = require('../constants/string');

function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.datetime('deleted_at');
}

function references(table, tableName, notNullable = true, columnName = '', isPrimary = false) {
    const definition = table
        .integer(`${columnName || tableName}_id`)
        .unsigned()
        .references('id')
        .inTable(tableName)
        .onDelete('cascade');

    if (notNullable) {
        definition.notNullable();
    }
    if (isPrimary) {
        definition.primary();
    }
    return definition;
}

function addEmail(table) {
    table.string('email', 254)
}

function addUrl(table, columnName) {
    table.string(columnName, 2000);
}

function createTableOneStringColumn(knex, table_name, string) {
    return knex.schema.createTable(table_name, table => {
        table.increments().notNullable();
        const string2 = string ? string : table_name;
        table.string(string).notNullable().unique();
        addDefaultColumns(table);
    })
}

function createTableIncrementsStringNotNullable(table, string) {
    table.increments().notNullable();
    if (string) table.string(string).notNullable();
}

module.exports = {
    createTableOneStringColumn,
    addUrl,
    addEmail,
    addDefaultColumns,
    references,
    createTableIncrementsStringNotNullable
}