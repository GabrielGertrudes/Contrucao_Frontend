'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import apiFilmes from '../apis/apiFilmes'
import Pagina from '../components/Pagina'

export default function page() {

    const [atores, setAtores] = useState([])

    useEffect(() => {
        buscarAtores()
    }, [])

    async function buscarAtores() {
        const resultado = await apiFilmes.get('/person/popular?language=pt-BR')
        console.log(resultado.data.results)
        setAtores(resultado.data.results)
    }


    return (
        <Pagina titulo="Atores Populares">

            <Row md={4}>

                {atores.map(ator => {
                    return (
                        <Col className='py-2'>
                            <Card style={{ height: "100%" }}>
                                <Card.Img src={"https://image.tmdb.org/t/p/w500/" + ator.profile_path} />
                                <Card.Body>
                                    <Card.Title>{ator.name}</Card.Title>
                                </Card.Body>
                                <Card.Footer className='text-end'>
                                    <Button href={"/atores/" + ator.id} >Detalhes</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                })
                }


            </Row>

        </Pagina>

    )
}
