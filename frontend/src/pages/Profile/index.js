/*o useEffect renderiza um componente em um determinado momento */
import React, { useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {FiTrash2} from 'react-icons/fi';
import './style.css';
import '../globalstyle.css';
import api from '../../services/api';

export default function Profile(){
  const history = useHistory();
  
  const ongId= localStorage.getItem('ongId');
  const ongName= localStorage.getItem('ongName');


  const [incidents, setIncidents] = useState([])

  /*a função useEffect tem dois parâmetros, o primeiro é qual função
  será executada, a segunda é um array que dirá quando. Por exemplo, caso seja colocado
  ongName no segundo parâmetro, a função será executado todas as vezes que a variável
  for alterada*/
  useEffect(() =>{
    /*estamos executando a rota profile e guardando do 
    headers a variável Authorizaton, ongId */
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
      
      /*usamos o .then para seguir com a função somente depois 
      que os dados forem armazenados. outra forma seria usar o asyn e await */
    }).then(response=>{
      setIncidents(response.data);
    })
  },[ongId])

  function hadleLogou(){
    localStorage.clear();
    history.push('/');

  }

  async function hadleDeleteIncident(id) {
    try{ 
      await api.delete(`incidents/${id}`,{

        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incident => incident.id!==id))
    } catch(err){
      alert('Erro ao deletar caso, tente novamente.');
    }
  } 

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="buttons" to="/incident/new">Cadastrar novo caso</Link>

        <button onClick ={hadleLogou} type="button"><FiPower size={18} color="#E02041"/></button>

      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        { /*incidents.map irá percorrer os incidents e irá gerar um jsx */
          incidents.map(incident =>(
            <li key={incident.id}>
          <strong> CASO: </strong>
            
          <p>{incident.title}</p>
          
          <strong> DESCRIÇÃO: </strong>
          <p>{incident.description}</p>                
          
          <strong> VALOR: </strong>
          <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}</p>
          {/*caso eu passe a função diretamente para o onClick ele executará a função e passará o retorno
          dela para o onClick. então colocamos uma arrow function ()=>, dessa forma o que passamos para o onClick
          será uma função e não o retorno de uma função */}
          <button onClick={()=>hadleDeleteIncident(incident.id)} type="button" >
            <FiTrash2 size={20} color="#a8a8b3"/>
            
          </button>
        </li>
          ))
        }
      </ul>
    </div>
  );
}