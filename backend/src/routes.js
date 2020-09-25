/**passa para a variável express o método express, leitura da url como comunicação */
const express = require ('express');

/**importação do pacote crypto => vai gerar um id randômico */

/**importa o método controller */
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/**descoplando o método de rotas, express.Router(), em uma nova variável, routes */
const routes = express.Router();

routes.post('/session',  SessionController.create);

 /**a lógica da rota foi transferida para a ./controllers/OngControllers.js */
routes.get('/ongs',  OngController.index);
routes.post('/ongs',  OngController.create);


routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
/**para identificar qual incidente queremos deletar passamos o 
 * route params para identificá-lo, /:id
 */
routes.delete('/incidents/:id', IncidentController.delete);


routes.get('/profile', ProfileController.index);



/**exporta as rotas */
module.exports = routes;