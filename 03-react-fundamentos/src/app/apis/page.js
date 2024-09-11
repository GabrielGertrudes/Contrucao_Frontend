'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import Pagina from '../components/Pagina'
import Usuario from './Usuario'
import { Col, Row } from 'react-bootstrap'

export default function page() {

    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(response => {
                setUsuarios(response.data.users)
            })
    },[])


    return (
        <Pagina titulo="Consumo de API's">
            <Row xs={1} sm={1} md={2} lg={4} className="mt-2">

                {usuarios.map(usuario => {
                    return (
                        <Col className='py-2'>
                            <Usuario usuario={usuario} />
                        </Col>
                    )
                })}

            </Row>
        </Pagina>
    )
}