const connection = require('../database/connection');

module.exports= {
  
  async index (request, response) {
    /**paginação | request.query são as requisições vindas da url com ? */
    const {page=1}=request.query;
    //**conta o número de incidents */
    const [count]= await connection ('incidents')
    .count();

    const incidents = await connection('incidents')

    //**juntar os dados da ong responsável pelo incident */
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    /**limita a 5 itens por página */
    .offset((page-1)*5)
    .select(['incidents.*',
     'ongs.name',
     'ongs.email',
     'ongs.whatsapp',
     'ongs.city',
     'ongs.uf']);
   
    //**enviando a resposta de quantos itens há no cabeçalho de resposta */
      response.header('X-Total-Count',count[ 'count(*)']);

    return response.json(incidents);
  },
  
  async create (request, response) {
    /**recebe os dados da url pelo método post, body tipo json */
    const {title, description, value} = request.body;

    /**cabeçalho da requisição, geralmente contém autenticação,dados sobre o idioma
     * 
     */
   const ong_id = request.headers.authorization;

   /**inserir dados da tabela incidents. [id] o resultado da da função, inserir dados na tabela
    * é um array, e ele vai retornar o primeiro campo da array, id. Outra forma seria
    * nomear a função " results", e no return dar o results[0]
    * Dentro da função utilizamos , para separar as variáveis. ; é utilizado para
    * finalizar termos da função ou funções.
    */
   const [id] = await connection ('incidents').insert({
     title,
     description,
     value,
     ong_id,
     
   });

   //**ele vai dar como resposta do tipo json do campo id */
   return response.json({ id });
   
},
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;
/**verifica se o id da ong é igual ao id da ong que criou o incident */
    const incident = await connection('incidents')
    .where('id',id)
    /**seleciona o campo ong_id do incident, traz o somente o campo ong_id */
    .select('ong_id')
    /**como será apenas um campo retornado, podemos utilizar o .first para selecionar o array desejado */
    .first();

    if(incident.ong_id !== ong_id ) {
     
      /**compara o campo ong_id que veio do headers.autorization (que esta logado)
       * e compara com o ong_id recuperado da tabela.
       * troca o status do navegador para 401, operation not permitted */
      return response.status(401).json({error: 'Operation not permitted.'});
    }
     
      /**caso o if seja falso, realiza a operação de delete */
      await connection('incidents').where('id',id).delete();
     
      /**retorna uma resposta sem conteúdo */
      return response.status(204).send();
    }
  
  };

    