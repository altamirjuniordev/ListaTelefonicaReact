import React, { useState, useRef, useEffect } from "react";
import Listas from "./listaContato";
import { v4 as chave } from 'uuid';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './App.css'

export default function App() {
  //states
  const [contato, setContato] = useState({ nome: "", telefone: "" });
  const [listaContato, setListaContato] = useState([]);
  const nomeRef = useRef();
  const telefoneRef = useRef();


  //metodos
  function definirNome(evento) {
    setContato({ ...contato, nome: evento.target.value });
  }
  function definirTelefone(evento) {
    setContato({ ...contato, telefone: evento.target.value });
  }
  function adicionarContato() {
    if (contato.nome === "" || contato.telefone === "") return;

    // contato duplicado
    let duplicado = listaContato.find(
      (ct) => ct.nome === contato.nome && ct.telefone === contato.telefone
    );
    if (typeof duplicado !== "undefined") {
      telefoneRef.current.focus();
      alert('Este contato já foi adicionado à sua lista.');
      return;
    }
    setListaContato([...listaContato, contato]);

    //limpar contato
    setContato({ nome: "", telefone: "" });

    //focus no input nome
    nomeRef.current.focus();
  }

  // Utilizado o enter
  function adicionarEnter(evento) {
    if (evento.code === "Enter" || evento.code === "NumpadEnter") {
      adicionarContato();
    }
  }

  // carregar lista de contato localstorage
  useEffect(() => {
    if (localStorage.getItem("meus_contatos") !== null) {
      setListaContato(JSON.parse(localStorage.getItem("meus_contatos")));
    }
  }, []);
  // persistencia do state
  useEffect(() => {
    localStorage.setItem("meus_contatos", JSON.stringify(listaContato));
  }, [listaContato]);
  // limpar contatos
  function limparContatos() {
    setListaContato([])
  }

  // remover contato por objeto
  function removerContato(ctRemover) {
    let tmp = listaContato.filter(ct => ct.nome !== ctRemover.nome && ct.telefone !== ctRemover.telefone)
    setListaContato(tmp)
  }

  return (
    <>
      <header className="text-center p-4">
        <h1>Lista de contatos</h1>
      </header>
      <div className="container-fluid p-3 adicionar">
        <div className="my-2">
          <label htmlFor="">Nome: </label> <br />
          <input
          className="form-control "
            ref={nomeRef}
            type="text"
            onChange={definirNome}
            value={contato.nome}
          />
        </div>
        <div className="my-2">
          <label htmlFor="">Telefone: </label> <br />
          <input
          className="form-control "
            ref={telefoneRef}
            type="text"
            onChange={definirTelefone}
            value={contato.telefone}
            onKeyUp={adicionarEnter}
          />
        </div>
        <button onClick={adicionarContato}>Adicionar contato</button>
        <button onClick={limparContatos}>Limpar contatos</button>

        {/* {listaContato.map(ct => {
            return <componenteLista nome={ct.nome} telefone={ct.telefone}/>
        })} */}
      </div>
      {listaContato.map((ct) => {
        return (
          <Listas
            key={chave()}
            nome={ct.nome}
            telefone={ct.telefone}
            remover={removerContato}
            className='col-6'
          />
        );
      })}
    </>
  );
}
