'use client'

import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Pagina from '../components/Pagina'

export default function page() {

    const [contador, setContador] = useState(0)

    function clicouNoBotao() {
        setContador(contador + 1)
        console.log("clicou")
    }



    return (
        <Pagina titulo="Controle de Estados">
            <h2>Contador {contador}</h2>
            <Button onClick={clicouNoBotao} >Incrementar</Button>
        </Pagina>
    )
}