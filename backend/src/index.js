const express = require ('express');
/**modulo de segurança */
const cors = require('cors');

/**importa a variável routes. deve ser usado o ./ para identificar que ele é um arquivo e não um pacote */
const routes = require('./routes');

const app = express();

app.use(cors());
/**informa que os dados vindos no app serão do tipo json() */
app.use(express.json());
/**informa que a aplicação usa a variável routes */
app.use(routes);
/**Rota / Recurso */
/**
 * Método HTTP:
 * GET: buscar/listar uma informação do back-end -> vem do endenreço 
 * POST: criar uma informação no back-end
 * PUT: alterar uma informação no back-end
 * DELETE: deletar uma infromação no back-end
 */

 /**Tipos de Parâmetros:
  * Query Params: Paramêtros nomeados enviados na rota após "?" (filtros, paginação). Eles podem ser encadeados com "&"
  * Route Params: "/:id" Parâmetros utilizados para identificar recursos
  * Request Body: corpo da requisição utilizado para criar ou alterar recursos
  * Request guarda todos os dados que vem da url, e o response é a resposta a essa solicitação. 
  */

  /**SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
   * NoSQL:MongoDB, CouchDB, etc
   */

   /**Driver: SELECT * FROM users
    * Query Builder: table('users').select('*').where()
    * knexjs
    */

routes.get('./ongs');

app.listen(3333);