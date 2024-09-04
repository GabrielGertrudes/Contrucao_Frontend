'use client'

import { Carousel, Col, Row, Table } from 'react-bootstrap'
import Pagina from '../components/Pagina'

export default function page() {

    const carros = ["HB20", "Palio", "Civic", "Argo", "Onix"]

    const imagens = [
        'https://picsum.photos/700?random=1',
        'https://picsum.photos/700?random=2',
        'https://picsum.photos/700?random=3'
    ]


    return (
        <Pagina titulo="Listas">

            <Row>
                <Col>
                    {carros.map(carro => {
                        return <p>{carro}</p>
                    })}
                </Col>
                <Col>
                    <ul>
                        {carros.map(carro => {
                            return <li>{carro}</li>
                        })}
                    </ul>
                </Col>
            </Row>

            <Row>
                <Table striped bordered hover>
                    <thead className="table-primary">
                        <tr>
                            <th>Carro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carros.map(carro => {
                            return (
                                <tr>
                                    <td>{carro}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

            </Row>

            {/* Carousel do Bootstrap */}
            <Row>

                <Carousel>
                    {imagens.map(imagem => {
                        return (
                            <Carousel.Item>
                                <img src={imagem} width={700} height={700} />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>


            </Row>




        </Pagina>
    )
}