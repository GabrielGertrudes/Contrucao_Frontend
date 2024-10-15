'use client'

import { Container, Nav, Navbar,} from "react-bootstrap"


export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img
              alt=""
              src="https://img.freepik.com/vetores-premium/conversor-de-moedas-de-dinheiro-icone-contorno-conversor-de-moedas-de-dinheiro-icone-vetor-cor-plana-isolada_96318-73780.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Conversor De Moedas</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/conversor">Clique Aqui!</Nav.Link>
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