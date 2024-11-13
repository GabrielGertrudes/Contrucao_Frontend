'use client'; // Marcar como Client Component

import React, { useState, useEffect } from 'react';
import Pagina from '@/components/Pagina';
import { Form, Button, Alert } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';

export default function FormEquipes() {

  const [nomeEquipe, setNomeEquipe] = useState('');
  const [slogan, setSlogan] = useState('');
  const [imagem, setImagem] = useState('');
  const [jogadores, setJogadores] = useState([]);
  const [jogadoresFiltrados, setJogadoresFiltrados] = useState([]);
  const [jogadoresSelecionados, setJogadoresSelecionados] = useState([]);
  const [jogoSelecionado, setJogoSelecionado] = useState('');
  const [capitao, setCapitao] = useState('');
  const [subCapitao, setSubCapitao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [jogos, setJogos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // dados da equipe e listas de jogos/jogadores
  useEffect(() => {
    const jogadoresSalvos = JSON.parse(localStorage.getItem('jogadores')) || [];
    setJogadores(jogadoresSalvos);

    const jogosSalvos = JSON.parse(localStorage.getItem('jogos')) || [];
    setJogos(jogosSalvos);

    if (id) {
      const equipesSalvas = JSON.parse(localStorage.getItem('equipes')) || [];
      const equipe = equipesSalvas[id];
      if (equipe) {
        setNomeEquipe(equipe.nomeEquipe);
        setSlogan(equipe.slogan);
        setImagem(equipe.imagem);
        setJogadoresSelecionados(equipe.jogadores);
        setJogoSelecionado(equipe.jogo);
        setCapitao(equipe.capitao);
        setSubCapitao(equipe.subCapitao);
        setDescricao(equipe.descricao);
        setJogadoresFiltrados(jogadoresSalvos.filter(jogador => jogador.jogos.includes(equipe.jogo)));
      }
    }
  }, [id]);

  // Filtro jogador
  const handleJogoChange = (jogo) => {
    setJogoSelecionado(jogo);
    setJogadoresFiltrados(jogadores.filter(jogador => jogador.jogos.includes(jogo)));
    setJogadoresSelecionados([]);
    setCapitao('');
    setSubCapitao('');
  };

  // formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const novaEquipe = {
      nomeEquipe,
      slogan,
      imagem: imagem || '',
      jogadores: jogadoresSelecionados,
      jogo: jogoSelecionado,
      capitao,
      subCapitao,
      descricao,
    };

    let equipesSalvas = JSON.parse(localStorage.getItem('equipes')) || [];

    // Verifica equipe
    const equipeExistente = equipesSalvas.find(e => e.nomeEquipe.toLowerCase() === nomeEquipe.toLowerCase());
    if (!id && equipeExistente) {
      setErrorMessage('Esta equipe já foi cadastrada.');
      return;
    } else {
      setErrorMessage('');
    }

    if (id) {
      equipesSalvas[id] = novaEquipe; // Atualiza 
    } else {
      equipesSalvas.push(novaEquipe); // Adiciona 
    }

    localStorage.setItem('equipes', JSON.stringify(equipesSalvas));
    router.push('/equipes');
  };

  return (
    <Pagina titulo={id ? 'Editar Equipe' : 'Cadastro de Equipe'}>
      <div className="d-flex mb-3">
        <Button variant="secondary" onClick={() => router.back()} className="me-2">
          <FaArrowLeft className="me-1" /> Voltar
        </Button>
      </div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit} className="p-4 shadow rounded" style={{ backgroundColor: '#f8f9fa' }}>
        {/* Nome da equipe */}
        <Form.Group controlId="nomeEquipe" className="mb-3">
          <Form.Label>Nome da Equipe</Form.Label>
          <Form.Control
            type="text"
            value={nomeEquipe}
            onChange={(e) => setNomeEquipe(e.target.value)}
            placeholder="Digite o nome da equipe"
            required
          />
        </Form.Group>

        {/* Slogan da equipe */}
        <Form.Group controlId="slogan" className="mb-3">
          <Form.Label>Slogan da Equipe</Form.Label>
          <Form.Control
            type="text"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            placeholder="Digite o slogan da equipe"
          />
        </Form.Group>

        {/* URL da imagem da equipe */}
        <Form.Group controlId="imagem" className="mb-3">
          <Form.Label>Imagem da Equipe</Form.Label>
          <Form.Control
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="Digite a URL da imagem da equipe"
          />
        </Form.Group>

        {/* Seleção do jogo */}
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

        {/* Seleção de jogadores */}
        <Form.Group controlId="jogadores" className="mb-3">
          <Form.Label>Jogadores</Form.Label>
          {jogadoresFiltrados.length > 0 ? jogadoresFiltrados.map((jogador, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={jogador.nome}
              value={jogador.nome}
              checked={jogadoresSelecionados.includes(jogador.nome)}
              onChange={(e) => {
                const selectedJogadores = [...jogadoresSelecionados];
                if (e.target.checked) {
                  selectedJogadores.push(jogador.nome);
                } else {
                  const indexToRemove = selectedJogadores.indexOf(jogador.nome);
                  if (indexToRemove > -1) {
                    selectedJogadores.splice(indexToRemove, 1);
                  }
                }
                setJogadoresSelecionados(selectedJogadores);
              }}
            />
          )) : (
            <p>Nenhum jogador disponível para este jogo</p>
          )}
        </Form.Group>

        {/* Seleção de capitão */}
        <Form.Group controlId="capitao" className="mb-3">
          <Form.Label>Capitão</Form.Label>
          <div style={{ position: 'relative' }}>
            <Form.Control
              as="select"
              value={capitao}
              onChange={(e) => setCapitao(e.target.value)}
              required
              style={{ paddingRight: '30px' }}
            >
              <option value="">Selecione o capitão</option>
              {jogadoresSelecionados.map((jogador, index) => (
                <option key={index} value={jogador}>{jogador}</option>
              ))}
            </Form.Control>
            <FaChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </Form.Group>

        {/* Seleção de sub-capitão */}
        <Form.Group controlId="subCapitao" className="mb-3">
          <Form.Label>Sub-capitão</Form.Label>
          <div style={{ position: 'relative' }}>
            <Form.Control
              as="select"
              value={subCapitao}
              onChange={(e) => setSubCapitao(e.target.value)}
              style={{ paddingRight: '30px' }}
            >
              <option value="">Selecione o sub-capitão</option>
              {jogadoresSelecionados.filter(jogador => jogador !== capitao).map((jogador, index) => (
                <option key={index} value={jogador}>{jogador}</option>
              ))}
            </Form.Control>
            <FaChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </Form.Group>

        {/* Descrição da equipe */}
        <Form.Group controlId="descricao" className="mb-3">
          <Form.Label>Descrição da Equipe</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva a equipe"
          />
        </Form.Group>

        <Button variant="success" type="submit">
          {id ? 'Atualizar' : 'Salvar'}
        </Button>
      </Form>
    </Pagina>
  );
}
