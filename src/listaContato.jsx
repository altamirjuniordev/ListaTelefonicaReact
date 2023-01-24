import React from "react";
import './listaContato.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'



export default function Listas (props) {
    return (
        <div className="container  justify-content-center">
            <div className= "agenda d-flex align-items-center">
                <p className="col-9"> {props.nome} - {props.telefone} </p> 
                <button className="remover col-3" onClick={() => {props.remover({nome: props.nome, contato: props.telefone })}} >Remover</button>
             </div>
        </div>
        
    )
}