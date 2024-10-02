'use client'

import { useEffect, useState } from 'react'
import { CardImg, Carousel, Col, Row } from 'react-bootstrap'
import apiCopa from '../apis/apiCopa'
import Pagina from '../components/Pagina'

export default function CopaPage() {

    const [copa, setCopa] = useState({})

    useEffect(() => {
        buscarCopa()
    }, [])

    async function buscarCopa() {
        const resultado = await apiCopa.get('/copa_mundo')
        console.log(resultado.data)
        setCopa(resultado.data)
    }


    return (
        <Pagina titulo="Copa do Mundo 2022">
            {/* Detalhes */}
            <div className='text-center'>
                <h2>Detalhes</h2>
                <hr />
            </div>
            <Row>
                {/* Imagem */}
                <Col md={3}>
                    <CardImg src={copa.imagem} />
                </Col>
                {/* Detalhes */}
                <Col>
                    <p><b>Ano:</b> {copa.ano}</p>
                    <p><b>País Sede:</b> {copa.pais_sede}</p>
                    <p><b>Inicio:</b> {copa.data_inicio}</p>
                    <p><b>Fim:</b> {copa.data_fim}</p>
                    <p><b>Participantes:</b> {copa.participantes}</p>
                    <p><b>Vencedor:</b> {copa?.vencedor?.pais}</p>
                    <p><b>Artilheiro:</b> {copa?.artilheiro?.jogador}</p>
                    <p><b>Melhor Jogador:</b> {copa?.melhor_jogador?.jogador}</p>
                    <p><b>Descricao:</b> {copa.descricao}</p>

                </Col>
            </Row>

            {/* Estadios */}
            <div className='text-center'>
                <h2>Estádios</h2>
                <hr />
            </div>

            <Row className='mb-2'>
                <Carousel>

                    {copa.estadios && copa.estadios.map(
                        estadio => (
                            <Carousel.Item>
                                <CardImg height={400} src={estadio.imagem} />
                                <Carousel.Caption>{estadio.nome}</Carousel.Caption>
                            </Carousel.Item>
                        )
                    )}


                </Carousel>
            </Row>

        </Pagina>
    )
}
