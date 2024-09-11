'use client'

import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Pagina from '../components/Pagina'

export default function page() {

    const [contador, setContador] = useState(0)

    const [pokemon, setPokemon] = useState('????????')

    function alterarPokemon(){
        setPokemon('Pikachu')
    }

    function alterarPokemon2() {
        setPokemon('Charlizard')
    }

    function incrementar() {
        if (contador < 100) {
            setContador(contador + 1)
        }
    }

    function decrementar() {
        if(contador > 0){
            setContador(contador - 1)
        }
    }

    return (
        <Pagina titulo="Controle de Estados">
            <Row className='mt-2'>
                <Col>
                    <Button onClick={incrementar} >aumentar</Button>
                    <h2>Volume: {contador}</h2>
                    <Button onClick={decrementar} >diminuir</Button>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <h2>O pokemon é {pokemon}</h2>
                <Button onClick={alterarPokemon}>Mostrar</Button>
                <Button onClick={alterarPokemon2}>Mostrar 2</Button>
            </Row>
        </Pagina>
    )
}