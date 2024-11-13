'use client';

import React, { useState, useEffect } from 'react';
import Pagina from '@/components/Pagina';
import { Form, Button, Container, Alert, InputGroup } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';

export default function FormResultados() {
  const [torneiosConcluidos, setTorneiosConcluidos] = useState([]);
  const [torneioSelecionado, setTorneioSelecionado] = useState('');
  const [data, setData] = useState('');
  const [jogo, setJogo] = useState('');
  const [equipeVencedora, setEquipeVencedora] = useState('');
  const [placarFinal, setPlacarFinal] = useState('');
  const [equipes, setEquipes] = useState([]);
  const [jogadoresEquipeVencedora, setJogadoresEquipeVencedora] = useState([]);
  const [mvp, setMvp] = useState('');
  const [premiacao, setPremiacao] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const torneiosSalvos = JSON.parse(localStorage.getItem('torneios')) || [];
    const equipesSalvas = JSON.parse(localStorage.getItem('equipes')) || [];
    const torneiosConcluidos = torneiosSalvos
      .map((torneio, index) => ({ ...torneio, id: index }))
      .filter(t => t.status === 'Concluído' && t.campeao);
    setTorneiosConcluidos(torneiosConcluidos);
    setEquipes(equipesSalvas);

    if (id) {
      const resultadosSalvos = JSON.parse(localStorage.getItem('resultados')) || [];
      const resultado = resultadosSalvos[id];
      if (resultado) {
        setTorneioSelecionado(resultado.torneio);
        setData(resultado.data);
        setJogo(resultado.jogo);
        setEquipeVencedora(resultado.equipeVencedora);
        setPlacarFinal(resultado.placarFinal);
        setMvp(resultado.mvp);
        setPremiacao(resultado.premiacao);
        setComentarios(resultado.comentarios);
        const equipe = equipesSalvas.find(e => e.nomeEquipe === resultado.equipeVencedora);
        setJogadoresEquipeVencedora(equipe ? equipe.jogadores : []);
      }
    }
  }, [id]);

  const handleTorneioChange = (torneioNome) => {
    const torneio = torneiosConcluidos.find(t => t.nome === torneioNome);
    if (torneio) {
      setTorneioSelecionado(torneioNome);
      setData(torneio.dataCriacao || '');
      setJogo(torneio.jogo || '');
      setEquipeVencedora(torneio.campeao || '');
      setPlacarFinal(`${torneio.fases[torneio.fases.length - 1]?.jogos[0]?.placar1 || 0} - ${torneio.fases[torneio.fases.length - 1]?.jogos[0]?.placar2 || 0}`);
      const equipe = equipes.find(e => e.nomeEquipe === torneio.campeao);
      setJogadoresEquipeVencedora(equipe ? equipe.jogadores : []);
    } else {
      setTorneioSelecionado('');
      setData('');
      setJogo('');
      setEquipeVencedora('');
      setPlacarFinal('');
      setJogadoresEquipeVencedora([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!torneioSelecionado || !mvp || !premiacao) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }

    const novoResultado = {
      torneio: torneioSelecionado,
      data,
      jogo,
      equipeVencedora,
      placarFinal,
      mvp,
      premiacao,
      comentarios,
    };

    let resultadosSalvos = JSON.parse(localStorage.getItem('resultados')) || [];
    if (id) {
      resultadosSalvos[id] = novoResultado;
    } else {
      const resultadoExistente = resultadosSalvos.find(r => r.torneio === torneioSelecionado);
      if (resultadoExistente) {
        setErrorMessage('Um resultado para este torneio já foi cadastrado.');
        return;
      }
      resultadosSalvos.push(novoResultado);
    }

    localStorage.setItem('resultados', JSON.stringify(resultadosSalvos));
    router.push('/resultados');
  };

  return (
    <Pagina titulo={id ? 'Editar Resultado' : 'Cadastro de Resultado'}>
      <div className="d-flex mb-3">
        <Button variant="secondary" onClick={() => router.back()} className="me-2">
          <FaArrowLeft className="me-1" /> Voltar
        </Button>
      </div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Container className="p-4 shadow rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="torneio" className="mb-3" style={{ position: 'relative' }}>
            <Form.Label>Torneio</Form.Label>
            <Form.Control
              as="select"
              value={torneioSelecionado}
              onChange={(e) => handleTorneioChange(e.target.value)}
              required
              style={{ paddingRight: '30px' }}
            >
              <option value="">Selecione um torneio</option>
              {torneiosConcluidos.map((torneio) => (
                <option key={torneio.id} value={torneio.nome}>
                  {torneio.nome}
                </option>
              ))}
            </Form.Control>
            <FaChevronDown style={{ position: 'absolute', right: '10px', top: '70%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </Form.Group>

          <Form.Group controlId="jogo" className="mb-3">
            <Form.Label>Jogo</Form.Label>
            <Form.Control type="text" value={jogo} readOnly />
          </Form.Group>

          <Form.Group controlId="data" className="mb-3">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="text"
              value={data ? new Date(data).toLocaleDateString('pt-BR') : ''}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="equipeVencedora" className="mb-3">
            <Form.Label>Equipe Vencedora</Form.Label>
            <Form.Control type="text" value={equipeVencedora} readOnly />
          </Form.Group>

          <Form.Group controlId="placarFinal" className="mb-3">
            <Form.Label>Placar Final</Form.Label>
            <Form.Control type="text" value={placarFinal} readOnly />
          </Form.Group>

          <Form.Group controlId="mvp" className="mb-3">
            <Form.Label>MVP</Form.Label>
            <Form.Control
              as="select"
              value={mvp}
              onChange={(e) => setMvp(e.target.value)}
              required
            >
              <option value="">Selecione o MVP</option>
              {jogadoresEquipeVencedora.map((jogador, index) => (
                <option key={index} value={jogador}>
                  {jogador}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="premiacao" className="mb-3">
            <Form.Label>Premiação (R$)</Form.Label>
            <InputGroup>
              <InputGroup.Text>R$</InputGroup.Text>
              <Form.Control
                type="text"
                value={premiacao}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  value = (parseFloat(value) / 100).toFixed(2).replace('.', ',');
                  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  setPremiacao(value);
                }}
                placeholder="0,00"
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="comentarios" className="mb-3">
            <Form.Label>Comentários</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Adicione comentários sobre o resultado"
            />
          </Form.Group>

          <Button variant="success" type="submit">
            {id ? 'Atualizar' : 'Salvar'}
          </Button>
        </Form>
      </Container>
    </Pagina>
  );
}
