import React from "react";
import './listaContato.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'



export default function Listas (props) {
    return (
        <div className="row">
            <div className=" col-10 agenda">
                {props.nome} - {props.telefone} <button onClick={() => {props.remover({nome: props.nome, contato: props.telefone })}} >Remover</button>
             </div>
        </div>
        
    )
}