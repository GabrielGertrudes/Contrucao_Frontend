'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import apiCopa from '../apis/apiCopa'
import Pagina from '../components/Pagina'

export default function page() {

    const [selecoes, setSelecoes] = useState([])

    useEffect(() => {
        buscarSelecoes()
    }, [])


    async function buscarSelecoes() {
        const resultado = await apiCopa.get('/selecoes')
        console.log(resultado.data)
        setSelecoes(resultado.data)
    }


    return (
        <Pagina titulo="Seleções">
            <Row md={4}>

                {selecoes.map(
                    selecao => (
                        <Col className='py-2'>
                            <Card style={{ height: '100%' }}>
                                <Card.Img src={selecao.imagem}></Card.Img>
                                <Card.Body className='text-center'>
                                    <Card.Title>{selecao.nome}</Card.Title>
                                </Card.Body>
                                <Card.Footer className='text-center'>
                                    <Button href={"/selecoes/" + selecao.id}>Detalhes</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                )}


            </Row>
        </Pagina>
    )
}
