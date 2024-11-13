'use client';

import React, { useState, useEffect } from 'react';
import Pagina from '@/components/Pagina';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';

export default function FormTorneio() {
  const [nome, setNome] = useState('');
  const [dataCriacao, setDataCriacao] = useState('');
  const [jogoSelecionado, setJogoSelecionado] = useState('');
  const [equipesDisponiveis, setEquipesDisponiveis] = useState([]);
  const [selecoes, setSelecoes] = useState(Array(16).fill(null));
  const [jogos, setJogos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [equipesDuplicadas, setEquipesDuplicadas] = useState([]);
  const [quantidadeEquipes, setQuantidadeEquipes] = useState(16);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const jogosExistentes = JSON.parse(localStorage.getItem('jogos')) || [];
    const equipesExistentes = JSON.parse(localStorage.getItem('equipes')) || [];
    setJogos(jogosExistentes);
    setEquipesDisponiveis(equipesExistentes);

    if (id) {
      const torneiosExistentes = JSON.parse(localStorage.getItem('torneios')) || [];
      const torneio = torneiosExistentes[id];
      if (torneio) {
        setNome(torneio.nome);
        setDataCriacao(torneio.dataCriacao);
        setJogoSelecionado(torneio.jogo);
        setSelecoes(torneio.selecoes || Array(16).fill(null));
        setQuantidadeEquipes(torneio.quantidadeEquipes || 16);
      }
    }
  }, [id]);

  const handleQuantidadeEquipesChange = (e) => {
    const quantidade = parseInt(e.target.value, 10);
    setQuantidadeEquipes(quantidade);
    setSelecoes(Array(quantidade).fill(null));
  };

  const handleJogoChange = (jogo) => {
    setJogoSelecionado(jogo);
    const equipesFiltradas = JSON.parse(localStorage.getItem('equipes')) || [];
    const equipesParaJogo = equipesFiltradas.filter(equipe => equipe.jogo === jogo);
    setEquipesDisponiveis(equipesParaJogo);
    setSelecoes(Array(quantidadeEquipes).fill(null));
  };

  const handleEquipeChange = (index, value) => {
    setErrorMessage('');
    const novasSelecoes = [...selecoes];
    novasSelecoes[index] = value;
    const duplicadas = novasSelecoes.filter((item, i) => item !== null && novasSelecoes.indexOf(item) !== i);
    setEquipesDuplicadas(duplicadas);
    setSelecoes(novasSelecoes);
  };

  const getEquipesDisponiveis = (index) => {
    const equipesSelecionadas = selecoes.filter((selecao, i) => selecao !== null && i !== index);
    return equipesDisponiveis.filter(equipe => !equipesSelecionadas.includes(equipe.nomeEquipe));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selecoes.some(selecao => selecao === null)) {
      setErrorMessage('Preencha todas as seleções de equipes.');
      return;
    }
    if (equipesDuplicadas.length > 0) {
      setErrorMessage('Não pode haver equipes duplicadas.');
      return;
    }

    const novoTorneio = { nome, dataCriacao, jogo: jogoSelecionado, selecoes, quantidadeEquipes };
    let torneiosExistentes = JSON.parse(localStorage.getItem('torneios')) || [];

    if (id) {
      torneiosExistentes[id] = novoTorneio;
    } else {
      torneiosExistentes.push(novoTorneio);
    }

    localStorage.setItem('torneios', JSON.stringify(torneiosExistentes));
    router.push('/torneios');
  };

  return (
    <Pagina titulo={id ? "Editar Torneio" : "Cadastro de Torneio"}>
      <div className="d-flex mb-3">
        <Button variant="secondary" onClick={() => router.back()} className="me-2">
          <FaArrowLeft className="me-1" /> Voltar
        </Button>
      </div>
      
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      
      <Container className="p-4 shadow rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nome" className="mb-3">
            <Form.Label>Nome do Torneio</Form.Label>
            <Form.Control
              type="text"
              value={nome || ''}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do torneio"
              required
            />
          </Form.Group>

          <Form.Group controlId="dataCriacao" className="mb-3">
            <Form.Label>Data de Criação</Form.Label>
            <Form.Control
              type="date"
              value={dataCriacao}
              onChange={(e) => setDataCriacao(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="quantidadeEquipes" className="mb-3">
            <Form.Label>Quantidade de Equipes</Form.Label>
            <Form.Control
              as="select"
              value={quantidadeEquipes}
              onChange={handleQuantidadeEquipesChange}
              required
            >
              <option value={16}>16 equipes</option>
              <option value={8}>8 equipes</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="jogo" className="mb-3">
            <Form.Label>Jogo</Form.Label>
            <div style={{ position: 'relative' }}>
              <Form.Control
                as="select"
                value={jogoSelecionado}
                onChange={(e) => handleJogoChange(e.target.value)}
                required
                style={{ paddingRight: '30px' }}
              >
                <option value="">Selecione o jogo</option>
                {jogos.map((jogo, index) => (
                  <option key={index} value={jogo.nome}>{jogo.nome}</option>
                ))}
              </Form.Control>
              <FaChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </Form.Group>

          {jogoSelecionado && (
            <>
              <Form.Label>Selecione as Equipes ({quantidadeEquipes} equipes)</Form.Label>
              {Array.from({ length: quantidadeEquipes / 2 }).map((_, i) => (
                <div key={i} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Form.Group controlId={`equipe-${i * 2}`} style={{ flex: 1 }}>
                      <Form.Control
                        as="select"
                        value={selecoes[i * 2] || ''}
                        onChange={(e) => handleEquipeChange(i * 2, e.target.value)}
                        style={{ borderColor: equipesDuplicadas.includes(selecoes[i * 2]) ? 'red' : '' }}
                        required
                      >
                        <option value="">Selecione uma equipe</option>
                        {getEquipesDisponiveis(i * 2).map((equipe, index) => (
                          <option key={index} value={equipe.nomeEquipe}>{equipe.nomeEquipe}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <span style={{ padding: '0 15px', fontWeight: 'bold' }}>Jogo {i + 1}</span>

                    <Form.Group controlId={`equipe-${i * 2 + 1}`} style={{ flex: 1 }}>
                      <Form.Control
                        as="select"
                        value={selecoes[i * 2 + 1] || ''}
                        onChange={(e) => handleEquipeChange(i * 2 + 1, e.target.value)}
                        style={{ borderColor: equipesDuplicadas.includes(selecoes[i * 2 + 1]) ? 'red' : '' }}
                        required
                      >
                        <option value="">Selecione uma equipe</option>
                        {getEquipesDisponiveis(i * 2 + 1).map((equipe, index) => (
                          <option key={index} value={equipe.nomeEquipe}>{equipe.nomeEquipe}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>
              ))}
            </>
          )}

          <Button variant="success" type="submit">
            {id ? "Atualizar" : "Salvar"}
          </Button>
        </Form>
      </Container>
    </Pagina>
  );
}
