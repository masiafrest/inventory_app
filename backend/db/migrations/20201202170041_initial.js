const tableNames = require('../../src/constants/tableNames');
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
exports.up = async function(knex) {
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
	await knex.schema.createTable(tableNames.rol, table => {
		createTableIncrementsStringNotNullable(table, 'tipo');
	})
	await knex.schema.createTable(tableNames.empleado, table => {
		createTableIncrementsStringNotNullable(table, 'nombre');
		references(table, tableNames.telefono);
		references(table, tableNames.compañia);
		addEmail(table);
		addUrl(table, 'image_url');
		table.string('password', 127).notNullable();
		references(table, tableNames.rol);
	})
	
};

exports.down = async function(knex) {
  await Promise.all(
	[
	  tableNames.empleado,
	  tableNames.rol,
	  tableNames.compañia,
	  tableNames.telefono,
 	].map(tableName => knex.schema.dropTableIfExists(tableName))
  );
};
