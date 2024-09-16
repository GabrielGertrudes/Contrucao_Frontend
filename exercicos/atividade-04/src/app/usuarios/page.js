'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import Pagina from '../components/Pagina';
import Link from 'next/link';

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(response => {
                setUsuarios(response.data.users);
            })
            .catch(error => {
                console.error("Erro ao buscar os usuários: ", error);
            });
    }, []);

    return (
        <Pagina titulo="Lista de Usuários">
            <Row md={4}>
                {usuarios.map(usuario => (
                    <Col key={usuario.id} className='py-2'>
                        <Card style={{ height: '100%' }}>
                            <Card.Img src={usuario.image} alt={`${usuario.firstName} ${usuario.lastName}`} />
                            <Card.Body>
                                <Card.Title>{usuario.firstName} {usuario.lastName}</Card.Title>
                                <Card.Text>Idade: {usuario.age}</Card.Text>
                            </Card.Body>
                            <Card.Footer className='text-end'>
                                <Link href={`/usuarios/${usuario.id}`} passHref>
                                    <Button>Ver Detalhes</Button>
                                </Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Pagina>
    );
}
