'use client'

import apiCopa from '@/app/apis/apiCopa'
import Pagina from '@/app/components/Pagina'
import { useEffect, useState } from 'react'
import { Card, CardImg, Col, Row } from 'react-bootstrap'

export default function SelecaoPage(props) {

    const id = props.params.id
    const [selecao, setSelecao] = useState({})

    useEffect(() => {
        buscarSelecao()
    }, [])


    async function buscarSelecao() {
        const resultado = await apiCopa.get('/selecoes/' + id)
        console.log(resultado.data)
        setSelecao(resultado.data)
    }

    return (
        <Pagina titulo={selecao.nome}>

            {selecao.id && (
                <>
                    {/* Dados da Seleção */}
                    <Row>
                        {/* Imagem */}
                        <Col md={3}>
                            <CardImg src={selecao.imagem} />
                        </Col>
                        {/* Dados */}
                        <Col>
                            <p><b>Administrador: </b> {selecao.administrador}</p>
                            <p><b>Fundação: </b> {selecao.fundacao}</p>
                            <p><b>Participações em Copa: </b> {selecao.participacoes_copa_mundo}</p>
                            <p><b>Titulos: </b> {selecao.titulos_copa_mundo}</p>
                            <p><b>Descricao: </b> {selecao.descricao}</p>
                        </Col>
                        {/* Treinador */}
                        <Col md={3}>
                            <p><b>Treinador: </b> {selecao.treinador}</p>
                            <CardImg src={selecao.imagem_treinador} />
                        </Col>
                    </Row>

                    {/* Elenco */}
                    <div className='text-center'>
                        <h2>Elenco</h2>
                        <hr />
                    </div>
                    <Row md={4}>

                        {selecao.jogadores.map(
                            jogador => (
                                <Col className='py-2'>
                                    <Card style={{ height: "100%"}}>
                                        <Card.Img height={400} src={jogador.imagem} />
                                        <Card.Body>
                                            <Card.Text><b>Nome:</b> {jogador.nome}</Card.Text>
                                            <Card.Text><b>Número:</b> {jogador.numero}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        )}

                    </Row>

                </>
            )}

        </Pagina>
    )
}
