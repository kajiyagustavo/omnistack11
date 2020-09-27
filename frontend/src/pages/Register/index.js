/**uso o useState para armazenar a variável de cada campo input */
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft}from 'react-icons/fi';
import api from '../../services/api';

import './style.css';
import '../globalstyle.css';

import logoImg from'../../assets/logo.svg';
//**é criado uma constante com duas variáveis, a primeira que irá guardar o nome da varialvel e a segunda o estado */
export default function Register(){
 
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [whatsapp, setWhatsapp]= useState('');
  const [city, setCity]= useState('');
  const [uf, setUf]= useState('');
 
  const history = useHistory();
  //*responsável por fazer o cadastro do usuário
  /*a variável e recebe o envio dos dados e previne o comportamento padrão de recarregar a página
  /* essa ação melhora o desempenho da página*/
  async function handleRegister(e){
    e.preventDefault();
  
  //**criar uma função que irá receber os dados do useState */
  const data={
    name,
    email,
    whatsapp,
    city,
    uf,
  };
  
  //*ele vai tentar executar essa ação, caso não consiga gera um catch*/  
  try{
  
    //**enviar cosntante data para api, rota, já envia por padrão em formato json */
    const response = await api.post('ongs',data);
    //**usamos entre crases para chamar uma templatestring ${} que vem do html */
    alert(`Seu ID de acesso: ${response.data.id}`);

    history.push('./');
  } 
  
  catch(err){
    alert('Erro no cadastro, tente novamente.');
    }
  }
 
  return (
    <div className="register-container">
      <div className="content">
        <section>

          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>

              <p>Faça seu cadastro, entre na 
              plataforma e ajude pessoas a 
              encontrarem os casos da sua ONG.</p>
             
                <Link classnName="back-link" to="/">
                  <FiArrowLeft size={16} color="#E02041"/>
                  Não tenho cadastro
                </Link>
        </section>
        {/* 
          do useState e após usamos o onChange, escutar mudança da variável
          que escutará as alterações da variável e passara para a varivável
          para cada um dos inputs colocamos o value como a primeira variável
        */}  
        <form onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="Nome da ONG"
              value={name}
              onChange = {e=>setName(e.target.value)}
            />
            <input 
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange = {e=>setEmail(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="whatsapp"
              value={whatsapp}
              onChange = {e=>setWhatsapp(e.target.value)}
            />
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Cidade"
                value={city}
                onChange = {e=>setCity(e.target.value)} 
              />
              <input 
              type="text" 
              placeholder="UF" style={{width: 80}}
              value={uf}
              onChange = {e=>setUf(e.target.value)}
              />
            </div>
            <button className="buttons" type="submit">Cadastrar</button>
          </form>
      </div>
    </div>
  );
}