/**importação do pacote crypto => vai gerar um id randômico */
const crypto = require('crypto');

/**cria a variável connection tendo como recurso o arquivo connections */
const connection = require('../database/connection');


/** o segundo parâmetro da função, async => assincrona, significa que a função irá esperar 
 * a respota da await para dar o retorno */

/**exporta uma função  */
module.exports={

  async index(request, response){
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  /**cria o método de criação de ongs, insere os dados no bd */
  async create(request, response){
    const {name, email, whatsapp, city, uf} = request.body;

     /**criar o id usando o pacote crypto com 4 bytes, converte em uma string hexadecimal */
     const id = crypto.randomBytes(4).toString('HEX');

     /**realiza a conexão com o banco de dados e realiza o método insert, inserindo
      * dados dentro do banco de dados. 
      * Tem o await, que significa que a função routes.post irá aguardar completar essa
      * operação para gerar o return da função routes.post
      */
       await connection('ongs').insert({
       id,
       name,
       email,
       whatsapp,
       city,
       uf,
     });
     
 
   return response.json({id});
  }
};