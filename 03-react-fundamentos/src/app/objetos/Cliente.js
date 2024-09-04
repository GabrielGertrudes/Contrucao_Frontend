'use client'

import { Card, ListGroup } from "react-bootstrap"

export default function Cliente(props) {

    const { nome, sobreNome, idade, imagem } = props.cliente

    return (
        <Card>
            <Card.Img src={imagem} ></Card.Img>
            <ListGroup variant="flush">
                <ListGroup.Item>Nome: {nome} {sobreNome}</ListGroup.Item>
                <ListGroup.Item>Idade: {idade} anos</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}