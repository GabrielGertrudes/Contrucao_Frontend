'use client';

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; 
import axios from 'axios';
import Pagina from '../../components/Pagina'; 


export default function UsuarioDetalhes({ params }) {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        axios.get(`https://dummyjson.com/users/${params.id}`)
            .then(response => {
                setUsuario(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar o usuário: ", error);
            });
    }, [params.id]);

    if (!usuario) return <p>Carregando...</p>;

    return (
        <Pagina titulo={`${usuario.firstName} ${usuario.lastName}`}>
            <Container>
                <Row>
                    {/* Imagem do Usuário */}
                    <Col md={3}>
                        <Card.Img src={usuario.image} alt={`${usuario.firstName} ${usuario.lastName}`} />
                    </Col>

                    {/* Detalhes do Usuário */}
                    <Col md={9}>
                        <p><b>Email:</b> {usuario.email}</p>
                        <p><b>Telefone:</b> {usuario.phone}</p>
                        <p><b>Gênero:</b> {usuario.gender}</p>
                        <p><b>Idade:</b> {usuario.age}</p>
                        <p><b>Data de Nascimento:</b> {usuario.birthDate}</p>
                        <p><b>Universidade:</b> {usuario.university}</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <Card.Footer >
                        <Button Link href="/usuarios" passHref>Voltar</Button>
                    </Card.Footer>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
