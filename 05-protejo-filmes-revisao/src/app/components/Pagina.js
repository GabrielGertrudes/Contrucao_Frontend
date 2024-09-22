'use client'

import {Container, Nav, Navbar} from 'react-bootstrap'


export default function Pagina(props) {
    

    return (
        <>

            {/* Barra de Navegação */}
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/filmes">Movies</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/filmes">Filmes</Nav.Link>
                        <Nav.Link href="/atores">Atores</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Barra de Titulo */}
            <div className='text-center text-white py-2 bg-secondary'>
                <h1>{props.titulo}</h1>
            </div>

            {/* Filhos -> Código da Página */}
            <Container className='mt-2'>
                {props.children}
            </Container>


        </>

    )

}
