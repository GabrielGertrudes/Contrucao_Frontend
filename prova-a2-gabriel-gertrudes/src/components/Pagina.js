// src/components/Pagina.js
'use client';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaGamepad, FaTrophy, FaUsers, FaRegChartBar, FaUser } from 'react-icons/fa';

export default function Pagina({ titulo, children }) {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        background: 'radial-gradient(circle, #0a0c1d, #000000)',
      }}
    >
      {}
      <Navbar
        style={{
          backgroundColor: 'rgba(30, 34, 46, 0.9)',
          borderBottom: '2px solid #007bff',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.8)',
        }}
        variant="dark"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand
            href="/"
            className="d-flex align-items-center"
            style={{
              fontSize: '1.8rem',
              color: '#00c1ff',
              fontWeight: 'bold',
              textShadow: '0 0 8px #00c1ff',
              fontFamily: 'Press Start 2P, sans-serif',
            }}
          >
            GamesTournaments+
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3" style={{ fontSize: '1.2rem' }}>
              {[
                { href: "/jogos", label: "Jogos", icon: <FaGamepad /> },
                { href: "/jogadores", label: "Jogadores", icon: <FaUser /> },
                { href: "/equipes", label: "Equipes", icon: <FaUsers /> },
                { href: "/torneios", label: "Torneios", icon: <FaTrophy /> },
                { href: "/resultados", label: "Resultados", icon: <FaRegChartBar /> },
              ].map((item, index) => (
                <Nav.Link
                  key={index}
                  href={item.href}
                  className="text-light fw-bold d-flex align-items-center"
                  style={{
                    color: '#c0c0c0',
                    textShadow: '0 0 5px #00c1ff',
                  }}
                >
                  {item.icon} <span className="ms-2">{item.label}</span>
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Título */}
      <div
        className="text-center text-light py-4"
        style={{
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
          marginBottom: '1.5rem',
          fontFamily: 'Press Start 2P, sans-serif',
          fontSize: '2.4rem',
          color: '#00c1ff',
        }}
      >
        {titulo}
      </div>

      {/* Conteúdo principal */}
      <Container className="flex-grow-1 mt-4 mb-5">
        {children}
      </Container>

      {/* Rodapé */}
      <footer className="text-center py-3" style={{ backgroundColor: '#1a1c2b', color: '#c0c0c0' }}>
        <small>&copy; {new Date().getFullYear()} GamesTournaments+. Todos os direitos reservados.</small>
      </footer>
    </div>
  );
}
