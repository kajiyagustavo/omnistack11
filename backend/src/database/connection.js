/**importa o knex */
const knex = require('knex');
/**importa o arquivo de knexfile para a variavel configuration */
const configuration = require('../../knexfile');

/**cria a variável connection com a configuração do configuration.development */
const connection = knex(configuration.development);
/**exporta a variável connection, conexão com o banco de dados */
module.exports = connection;
