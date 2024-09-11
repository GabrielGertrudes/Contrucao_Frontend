'use client'

import { useEffect } from "react"
import { Card, ListGroup } from "react-bootstrap"

export default function Usuario(props) {

    useEffect(() => {
        console.log(props.usuario)
    })

    const { firstName, lastName, age, image } = props.usuario

    return (
        <Card>
            <Card.Img src={image} ></Card.Img>
            <ListGroup variant="flush">
                <ListGroup.Item>Nome: {firstName} {lastName}</ListGroup.Item>
                <ListGroup.Item>Idade: {age} anos</ListGroup.Item>
            </ListGroup>
        </Card>
    )
}