// src/app/page.js
'use client';

import Pagina from '@/components/Pagina';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [torneios, setTorneios] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [jogadores, setJogadores] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    setTorneios(JSON.parse(localStorage.getItem('torneios')) || []);
    setJogos(JSON.parse(localStorage.getItem('jogos')) || []);
    setEquipes(JSON.parse(localStorage.getItem('equipes')) || []);
    setJogadores(JSON.parse(localStorage.getItem('jogadores')) || []);
    setResultados(JSON.parse(localStorage.getItem('resultados')) || []);
  }, []);

  const lista = [
    { nome: 'Jogos', imagem: 'https://i.pinimg.com/564x/ad/ee/60/adee604e01e4321e8773c8243cafef73.jpg', quantidade: jogos.length, link: '/jogos' },
    { nome: 'Jogadores', imagem: 'https://i.pinimg.com/736x/76/70/af/7670af66a95d161799a6cf3a9b8c4098.jpg', quantidade: jogadores.length, link: '/jogadores' },
    { nome: 'Equipes', imagem: 'https://i.pinimg.com/564x/00/d9/e4/00d9e462d19a12e9190952312990d851.jpg', quantidade: equipes.length, link: '/equipes' },
    { nome: 'Torneios', imagem: 'https://i.pinimg.com/564x/c7/35/c2/c735c2d0367b961c5c1f619a75cdb253.jpg', quantidade: torneios.length, link: '/torneios' },
    { nome: 'Resultados', imagem: 'https://i.pinimg.com/564x/67/a3/89/67a38906d170e5ee261d4ef8f131bdeb.jpg', quantidade: resultados.length, link: '/resultados' },
  ];

  return (
    <Pagina titulo="Gerenciamento de Torneios de Jogos">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {lista.map((item, index) => (
          <Col key={index}>
            <Card
              className="text-center"
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                background: 'rgba(30, 34, 46, 0.9)', 
                border: '1px solid rgba(0, 193, 255, 0.5)',
                boxShadow: '0px 0px 15px rgba(0, 193, 255, 0.8)',
              }}
            >
              {item.imagem && (
                <Card.Img
                  src={item.imagem}
                  alt={`Imagem de ${item.nome}`}
                  style={{
                    height: '250px',
                    objectFit: 'cover',
                    filter: 'brightness(0.7)',
                  }}
                />
              )}
              <Card.Body>
                <Card.Title style={{ color: '#00c1ff', fontWeight: 'bold', fontSize: '1.3rem' }}>
                  {item.nome}
                </Card.Title>
                <Card.Text style={{ color: '#c0c0c0' }}>
                  Cadastrados: {item.quantidade}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ background: 'transparent', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Button
                  href={item.link}
                  variant="outline-light"
                  style={{
                    borderRadius: '5px',
                    borderColor: '#00c1ff',
                    color: '#00c1ff',
                    textShadow: '0 0 5px #00c1ff',
                  }}
                >
                  Ver Lista
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
