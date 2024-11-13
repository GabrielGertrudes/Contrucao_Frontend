'use client';

import React, { useState, useEffect } from 'react';
import Pagina from '@/components/Pagina';
import { Container, Row, Col, Form, Button, Alert, Badge, Card } from 'react-bootstrap';
import { useRouter, useParams } from 'next/navigation';

export default function DetalhesTorneio() {

  const [torneio, setTorneio] = useState(null);
  const [fases, setFases] = useState([]);
  const [jogoInfo, setJogoInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [camposInvalidos, setCamposInvalidos] = useState([]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {

    const torneiosSalvos = JSON.parse(localStorage.getItem('torneios')) || [];
    const jogosSalvos = JSON.parse(localStorage.getItem('jogos')) || [];
    const torneioSelecionado = torneiosSalvos[id];
    
    if (torneioSelecionado) {
      setTorneio(torneioSelecionado);
      setFases(torneioSelecionado.fases || criarFasesIniciais(torneioSelecionado.selecoes));
      const jogo = jogosSalvos.find(j => j.nome === torneioSelecionado.jogo) || {};
      setJogoInfo(jogo);
    }
  }, [id]);


  const criarFasesIniciais = (equipes) => {
    const numeroDeJogos = equipes.length / 2;
    const faseInicial = numeroDeJogos === 4 ? 'Quartas de Final' : 'Oitavas de Final';
    const jogos = [];
    for (let i = 0; i < numeroDeJogos; i++) {
      jogos.push({
        equipe1: equipes[i * 2],
        equipe2: equipes[i * 2 + 1],
        placar1: '',
        placar2: '',
        vencedor: null,
      });
    }
    return [{ nome: faseInicial, jogos }];
  };


  const getProximaFaseNome = (faseAtual) => {
    switch (faseAtual) {
      case 'Oitavas de Final':
        return 'Quartas de Final';
      case 'Quartas de Final':
        return 'Semifinal';
      case 'Semifinal':
        return 'Final';
      default:
        return '';
    }
  };


  const handleInputChange = (e, faseIndex, jogoIndex, isPlacar1) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '').slice(0, 2);

    if (isPlacar1) {
      handlePlacarChange(faseIndex, jogoIndex, value, fases[faseIndex].jogos[jogoIndex].placar2);
    } else {
      handlePlacarChange(faseIndex, jogoIndex, fases[faseIndex].jogos[jogoIndex].placar1, value);
    }
  };

  const handlePlacarChange = (faseIndex, jogoIndex, placar1, placar2) => {
    setErrorMessage(''); 
    const novasFases = [...fases];
    const jogo = novasFases[faseIndex].jogos[jogoIndex];
    jogo.placar1 = placar1;
    jogo.placar2 = placar2;

 
    if (placar1 !== '' && placar2 !== '' && placar1 !== placar2) {
      jogo.vencedor = placar1 > placar2 ? jogo.equipe1 : jogo.equipe2;
    } else if (placar1 === placar2) {
      setErrorMessage('Os placares não podem ser iguais. Deve haver um vencedor.');
      jogo.vencedor = null;
    }


    for (let i = faseIndex + 1; i < novasFases.length; i++) {
      novasFases[i].jogos = novasFases[i].jogos.map(jogo => ({
        ...jogo,
        placar1: '',
        placar2: '',
        vencedor: null,
      }));
    }

    setFases(novasFases.slice(0, faseIndex + 1)); 
  };

  const avancarFase = () => {
    const ultimaFase = fases[fases.length - 1];
    const camposInvalidosTemp = [];

    ultimaFase.jogos.forEach((jogo, jogoIndex) => {
      if ((jogo.placar1 === '' && jogo.placar2 !== '') || (jogo.placar2 === '' && jogo.placar1 !== '') || jogo.placar1 === jogo.placar2) {
        camposInvalidosTemp.push({ faseIndex: fases.length - 1, jogoIndex });
      }
    });

    if (camposInvalidosTemp.length > 0) {
      setCamposInvalidos(camposInvalidosTemp);
      setErrorMessage('Existem campos inválidos ou empatados. Por favor, corrija-os antes de avançar.');
      return;
    }

    setCamposInvalidos([]); 

    const novaFase = [];
    for (let i = 0; i < ultimaFase.jogos.length; i += 2) {
      if (ultimaFase.jogos[i].vencedor && ultimaFase.jogos[i + 1] && ultimaFase.jogos[i + 1].vencedor) {
        novaFase.push({
          equipe1: ultimaFase.jogos[i].vencedor,
          equipe2: ultimaFase.jogos[i + 1].vencedor,
          placar1: '',
          placar2: '',
          vencedor: null,
        });
      }
    }

    if (novaFase.length > 0) {
      const novaEtapa = { nome: getProximaFaseNome(ultimaFase.nome), jogos: novaFase };
      setFases([...fases, novaEtapa]);
    }
  };


  const handleSalvarTorneio = () => {
    const camposInvalidosTemp = [];
    fases.forEach((fase, faseIndex) => {
      fase.jogos.forEach((jogo, jogoIndex) => {
        if (
          (jogo.placar1 !== '' && jogo.placar2 === '') ||
          (jogo.placar2 !== '' && jogo.placar1 === '') ||
          (jogo.placar1 === jogo.placar2)
        ) {
          camposInvalidosTemp.push({ faseIndex, jogoIndex });
        }
      });
    });

    if (camposInvalidosTemp.length > 0) {
      setCamposInvalidos(camposInvalidosTemp);
      setErrorMessage('Existem jogos com apenas um placar preenchido ou empatados. Por favor, corrija-os antes de salvar.');
      return;
    }

    setCamposInvalidos([]);
    const torneiosSalvos = JSON.parse(localStorage.getItem('torneios')) || [];
    torneiosSalvos[id] = {
      ...torneio,
      fases,
      status: fases[fases.length - 1].nome === 'Final' && fases[fases.length - 1].jogos[0].vencedor ? 'Concluído' : 'Em andamento',
      campeao: fases[fases.length - 1].nome === 'Final' ? fases[fases.length - 1].jogos[0].vencedor : null,
    };
    localStorage.setItem('torneios', JSON.stringify(torneiosSalvos));
    router.push('/torneios');
  };

  if (!torneio) {
    return <Pagina titulo="Torneio não encontrado"><p>Carregando...</p></Pagina>;
  }

  return (
    <Pagina titulo={`Detalhes do Torneio: ${torneio.nome}`}>
      <Container className="mb-4">
        <Row className="border-bottom pb-3 mb-4 align-items-center">
          <Col xs={3} className="text-center">
            {jogoInfo.imagem && (
              <img
                src={jogoInfo.imagem}
                alt={torneio.jogo}
                style={{ maxWidth: '100px', height: 'auto', borderRadius: '5px' }}
              />
            )}
          </Col>
          <Col>
            <h5 style={{ color: '#ffffff' }}>{torneio.jogo}</h5>
            <p className="text-data-branco mb-1">Data de Criação: {torneio.dataCriacao || 'N/A'}</p>
            <Badge bg={torneio.status === 'Concluído' ? 'success' : 'warning'}>
              {torneio.status || 'Não Iniciado'}
            </Badge>
          </Col>
        </Row>
        <Button variant="secondary" onClick={() => router.push('/torneios')} className="mt-3">
          Voltar para Lista de Torneios
        </Button>
      </Container>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {fases.map((fase, faseIndex) => (
        <Card key={faseIndex} className="mb-4 shadow">
          <Card.Header className="text-center bg-dark text-white">{fase.nome}</Card.Header>
          <Card.Body>
            {fase.jogos.map((jogo, jogoIndex) => {
              const isCampoInvalido = camposInvalidos.some(
                campo => campo.faseIndex === faseIndex && campo.jogoIndex === jogoIndex
              );
              return (
                <div key={jogoIndex} className="mb-2" style={{ borderBottom: '2px solid #ddd' }}>
                  <Row className="align-items-center">
                    <Col className="text-center fw-bold">{jogo.equipe1}</Col>
                    <Col>
                      <Form.Control
                        type="text"
                        value={jogo.placar1}
                        onChange={(e) => handleInputChange(e, faseIndex, jogoIndex, true)}
                        placeholder="Placar"
                        className={isCampoInvalido ? 'border-danger' : ''}
                        style={{ marginBottom: '10px' }}
                      />
                    </Col>
                    <Col className="text-center">vs</Col>
                    <Col>
                      <Form.Control
                        type="text"
                        value={jogo.placar2}
                        onChange={(e) => handleInputChange(e, faseIndex, jogoIndex, false)}
                        placeholder="Placar"
                        className={isCampoInvalido ? 'border-danger' : ''}
                        style={{ marginBottom: '10px' }}
                      />
                    </Col>
                    <Col className="text-center fw-bold">{jogo.equipe2}</Col>
                  </Row>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      ))}

      <div className="d-flex justify-content-end mt-4">
        {fases[fases.length - 1].nome !== 'Final' && (
          <Button variant="primary" onClick={avancarFase} className="me-3">
            Avançar para a Próxima Fase
          </Button>
        )}
        <Button variant="success" onClick={handleSalvarTorneio}>
          Salvar Torneio
        </Button>
      </div>
    </Pagina>
  );
}
