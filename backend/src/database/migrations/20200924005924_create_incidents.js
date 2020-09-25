
exports.up = function(knex) {
  return knex.schema.createTable('incidents',function(table){
    /**increment gera automaticamente a numeração dos incidentes */
    table.increments(); /**primary key */
    
    table.string('title').notNullable();
    table.string('description').notNullable();
    /**decimal identifica o campo como valor float, com casas decimais */
    table.decimal('value').notNullable();
    table.string('ong_id').notNullable();

    /**criando o relacionamento entre ong_id e id */
    table.foreign('ong_id').references('id').inTable('ongs')

      });
};

exports.down = function(knex) {
  knex.schema.dropTable('incidents');
};
