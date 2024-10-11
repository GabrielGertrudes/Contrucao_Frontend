'use client'

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"


export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="Formulários" id="basic-nav-dropdown">
              <NavDropdown.Item href="/formularios/nome">Nome</NavDropdown.Item>
              <NavDropdown.Item href="/formularios/imc">Calculadora de IMC</NavDropdown.Item>
              <NavDropdown.Item href="/formularios/imcformik">Calculadora de IMC - Formik</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className="bg-secondary text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteudo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}