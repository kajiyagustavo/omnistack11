
/**para realizar o login usamos o useState */
import React, {useState} from 'react';
/* podemos usar o useHistory para redirecionar a página para outra rota */
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn}from 'react-icons/fi';
/**para importar a api, para conexão com o backend */
import api from '../../services/api';

import './style.css';
import '../globalstyle.css';
import logoImg from'../../assets/logo.svg';
import hereosImg from'../../assets/heroes.png';

/**trabalhos com estado para importar o valor da id */
export default function Logon(){

  const [id, setId]=useState('');
  const history = useHistory();
  
  /*criamos uma função para lidar om o Login, handleLogin */
   async function handleLogin(e){
    e.preventDefault();

    try{
      const response = await api.post('/session' ,{id});
      localStorage.setItem('ongId',id);
      localStorage.setItem('ongName',response.data.name);
      /*manda para a rota profile*/
      history.push('profile');

    }   catch(err){
        alert('Falha no login, tente novamente.');

        }
    
  }

  return(
   <div className="logon-container">
     <section className="form">
       
       <img src={logoImg} alt="Be The Hero"/>
       
       <form onSubmit={handleLogin}>
        <h1>Faça seu Logon</h1>

        <input 
        type="text" 
        placeholder="Sua ID"
        value={id}
        onChange={e=> setId(e.target.value)}
        />
        <button className="buttons" type="submit">Entrar</button>


        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#E02041"/>
          Não tenho cadastro
        </Link>
       </form>

     </section>
     <img src={hereosImg} alt="Hereos"/>
   </div>
   
    );
}