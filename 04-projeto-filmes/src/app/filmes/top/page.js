'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Pagina from '@/app/components/Pagina'
import apiFilmes from '@/app/apis/apiFilmes'


export default function page() {

    const [filmes, setFilmes] = useState([])

    // Fazer algo quando iniciar o componente

    useEffect(() => {

        // Buscar os filmes
        buscarFilmes()

    }, [])


    async function buscarFilmes() {
        const resultado = await apiFilmes.get("/movie/top_rated?language=pt-BR")
        const filmesRecebidos = resultado.data.results
        console.log(filmesRecebidos)
        setFilmes(filmesRecebidos)
    }


    return (

        <Pagina titulo="Filmes Melhores Avaliados">

            <Row md={4}>

                {filmes.map(filme => {
                    return (
                        <Col className='py-2'>
                            <Card style={{ height: '100%' }}>
                                <Card.Img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path} />
                                <Card.Body>
                                    <Card.Title>{filme.original_title}</Card.Title>
                                    <p><b>Nota:</b> {filme.vote_average} ⭐</p>
                                </Card.Body>
                                <Card.Footer className='text-end'>
                                    <Button href={'/filmes/' + filme.id} >Detalhes</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )
                })}


            </Row>

        </Pagina>


    )
}
