'use client';

import React, { useState, useEffect } from 'react';
import Pagina from '@/components/Pagina';
import { Container, Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { FaTrophy, FaMedal, FaRegCalendarAlt, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function ResultadosPage() {
  const [resultados, setResultados] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [torneios, setTorneios] = useState([]); 
  const router = useRouter();

  useEffect(() => {
    const resultadosSalvos = JSON.parse(localStorage.getItem('resultados')) || [];
    const jogosSalvos = JSON.parse(localStorage.getItem('jogos')) || [];
    const torneiosSalvos = JSON.parse(localStorage.getItem('torneios')) || []; 

    setResultados(resultadosSalvos);
    setJogos(jogosSalvos);
    setTorneios(torneiosSalvos);
  }, []);


  const getJogoInfo = (nomeJogo) => {
    return jogos.find(jogo => jogo.nome === nomeJogo) || {};
  };

  const handleEdit = (index) => {
    router.push(`/resultados/form?id=${index}`);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este resultado?');
    if (confirmDelete) {
      const resultadosAtualizados = [...resultados];
      resultadosAtualizados.splice(index, 1);
      localStorage.setItem('resultados', JSON.stringify(resultadosAtualizados));
      setResultados(resultadosAtualizados);
    }
  };

  const isTorneioExistente = (nomeTorneio) => {
    return torneios.some(torneio => torneio.nome === nomeTorneio);
  };

  const resultadosPorJogo = resultados.reduce((acc, resultado) => {
    acc[resultado.jogo] = acc[resultado.jogo] || [];
    acc[resultado.jogo].push(resultado);
    return acc;
  }, {});

  return (
    <Pagina titulo="Resultados dos Torneios">
      <Container className="mb-4">
        {}
        <Button
          variant="outline-light"
          onClick={() => router.push('/resultados/form')}
          className="mb-3 d-flex align-items-center"
          style={{
            backgroundColor: '#1E90FF',
            color: '#FFFFFF',
            fontWeight: 'bold',
            borderRadius: '8px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <FaPlus className="me-2" /> Criar Novo Resultado
        </Button>

        {}
        {Object.keys(resultadosPorJogo).length > 0 ? (
          Object.keys(resultadosPorJogo).map((jogo, jogoIndex) => (
            <div key={jogoIndex}>
              <h4 className="mb-3" style={{ color: '#FFFFFF' }}>{jogo}</h4>
              {resultadosPorJogo[jogo].map((resultado, index) => {
                const jogoInfo = getJogoInfo(resultado.jogo);
                const torneioExiste = isTorneioExistente(resultado.torneio);

                return (
                  <Card key={index} className="mb-4 shadow" style={{ backgroundColor: '#1e1e1e', color: '#FFFFFF' }}>
                    <Card.Header className="d-flex justify-content-between align-items-center bg-dark text-white">
                      <div className="d-flex align-items-center">
                        <FaTrophy className="me-2" />
                        <h5 className="mb-0">Torneio: {resultado.torneio || 'Nome do Torneio'}</h5>
                      </div>
                      <div>
                        {}
                        {torneioExiste ? (
                          <Button
                            variant="warning"
                            onClick={() => handleEdit(index)}
                            className="me-2"
                            style={{
                              backgroundColor: '#ffc107',
                              color: '#000',
                              borderRadius: '8px',
                              fontWeight: 'bold'
                            }}
                          >
                            <FaEdit className="me-1" /> Editar
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            disabled
                            className="me-2"
                            style={{
                              backgroundColor: '#6c757d',
                              color: '#FFFFFF',
                              borderRadius: '8px',
                              fontWeight: 'bold'
                            }}
                          >
                            <FaEdit className="me-1" /> Editar (Desativado)
                          </Button>
                        )}
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(index)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: '#FFFFFF',
                            borderRadius: '8px',
                            fontWeight: 'bold'
                          }}
                        >
                          <FaTrash className="me-1" /> Excluir
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        {}
                        <Col md={4} className="text-center">
                          {jogoInfo.imagem ? (
                            <img
                              src={jogoInfo.imagem}
                              alt={resultado.jogo}
                              style={{ maxWidth: '100%', height: '300px', borderRadius: '8px', objectFit: 'cover' }}
                            />
                          ) : (
                            <p style={{ color: '#ccc' }}>Imagem do jogo não disponível</p>
                          )}
                        </Col>
                        {}
                        <Col md={8}>
                          <h5 className="mb-2">
                            <FaRegCalendarAlt className="me-2" />
                            Data: {new Date(resultado.data).toLocaleDateString('pt-BR')}
                          </h5>
                          <p><strong>Jogo:</strong> {resultado.jogo}</p>
                          <p><strong>Equipe Vencedora:</strong> <Badge bg="success">{resultado.equipeVencedora}</Badge></p>
                          <p><strong>Placar Final:</strong> {resultado.placarFinal}</p>
                          <p><strong>MVP:</strong> <FaMedal className="me-1" /> {resultado.mvp}</p>
                          <p><strong>Premiação:</strong> R$ {resultado.premiacao || '0,00'}</p>
                          <p><strong>Comentários:</strong> {resultado.comentarios}</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          ))
        ) : (
          <p style={{ color: '#FFFFFF' }}>Nenhum resultado disponível.</p>
        )}
      </Container>
    </Pagina>
  );
}
