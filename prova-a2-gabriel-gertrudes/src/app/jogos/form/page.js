'use client'; // Marcar como Client Component

import React, { useState, useEffect } from 'react'; 
import Pagina from '@/components/Pagina';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap'; 
import { useRouter, useSearchParams } from 'next/navigation'; 
import { buscarJogoDetalhes } from '@/services/igdbService'; 
import { FaPlus, FaChevronDown, FaArrowLeft } from 'react-icons/fa';

export default function FormJogos() {
  const [nome, setNome] = useState(''); 
  const [sugestoes, setSugestoes] = useState([]);
  const [genero, setGenero] = useState(''); 
  const [plataformas, setPlataformas] = useState([]); 
  const [dataLancamento, setDataLancamento] = useState(''); 
  const [classificacao, setClassificacao] = useState('');
  const [descricao, setDescricao] = useState(''); 
  const [imagem, setImagem] = useState(''); 
  const [avaliacao, setAvaliacao] = useState(0); 
  const [showSugestoes, setShowSugestoes] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const router = useRouter(); 
  const searchParams = useSearchParams(); 
  const id = searchParams.get('id'); 


  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  useEffect(() => {
    if (id) {
      const jogosExistentes = JSON.parse(localStorage.getItem('jogos')) || [];
      const jogo = jogosExistentes[id];
      if (jogo) {
        setNome(jogo.nome);
        setGenero(jogo.genero);
        setPlataformas(jogo.plataforma); 
        setDataLancamento(jogo.dataLancamento);
        setClassificacao(jogo.classificacao);
        setDescricao(jogo.descricao);
        setImagem(jogo.imagem);
        setAvaliacao(jogo.avaliacao || 0); 
      }
    }
  }, [id]);

  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setNome(value); 
    setShowSugestoes(value.length > 2);
    if (value.length > 2) {
      debounceSearch(value); 
    } else {
      setSugestoes([]); 
    }
  };

  // debounce
  const debounceSearch = debounce(async (value) => {
    try {
      const resultados = await buscarJogoDetalhes(value);
      setSugestoes(resultados);
    } catch (error) {
      console.error('Erro ao buscar sugestões de jogos:', error);
      setSugestoes([]); 
    }
  }, 300); 


  const handleSugestaoClick = (jogo) => {
    setNome(jogo.name); 
    setGenero(jogo.genres ? jogo.genres.map(genre => genre.name).join(', ') : ''); 
    setDescricao(jogo.summary || 'Descrição indisponível'); 
    setDataLancamento(jogo.release_dates ? jogo.release_dates[0].y : '');
    setImagem(jogo.cover ? jogo.cover.url : ''); 
    setClassificacao(jogo.age_rating || ''); 
    setSugestoes([]); 
    setShowSugestoes(false); 
  };


  const handleStarClick = (value) => {
    setAvaliacao(value); 
  };


  const handleClassificacaoClick = (value) => {
    setClassificacao(value); 
  };

  const handlePlataformaChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPlataformas([...plataformas, value]); 
    } else {
      setPlataformas(plataformas.filter(plataforma => plataforma !== value));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const novoJogo = { nome, genero, plataforma: plataformas, dataLancamento, classificacao, descricao, imagem, avaliacao };

    let jogosExistentes = JSON.parse(localStorage.getItem('jogos')) || [];


    const jogoExistente = jogosExistentes.find(jogo => jogo.nome.toLowerCase() === nome.toLowerCase());
    
    if (!id && jogoExistente) { 
      setErrorMessage('Este jogo já foi adicionado.'); 
      return;
    } else {
      setErrorMessage('');
    }

    if (id) {
      jogosExistentes[id] = novoJogo; 
    } else {
      jogosExistentes.push(novoJogo);
    }

    localStorage.setItem('jogos', JSON.stringify(jogosExistentes));
    router.push('/jogos');
  };

  return (
    <Pagina titulo={id ? "Editar Jogo" : "Cadastro de Jogos"}>
      <div className="d-flex mb-3">
        <Button variant="secondary" onClick={() => router.back()} className="me-2">
          <FaArrowLeft className="me-1" /> Voltar
        </Button>
      </div>
      <Form onSubmit={handleSubmit} className="p-4 shadow rounded" style={{ backgroundColor: '#f8f9fa' }}>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {}

        <Form.Group controlId="nome" className="position-relative mb-3">
          <Form.Label>Nome do Jogo</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={handleInputChange} 
            placeholder="Digite o nome do jogo"
            required
            onFocus={() => setShowSugestoes(true)} 
          />
          {showSugestoes && sugestoes.length > 0 && (
            <ListGroup className="position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
              {sugestoes.map((jogo, index) => (
                <ListGroup.Item key={index} action onClick={() => handleSugestaoClick(jogo)}>
                  {jogo.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form.Group>

        <Form.Group controlId="genero" className="mb-3">
          <Form.Label>Gênero</Form.Label>
          <Form.Control
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Digite o gênero"
            required
          />
        </Form.Group>

        <Form.Group controlId="imagem" className="mb-3">
          <Form.Label>URL da Imagem</Form.Label>
          <Form.Control
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="Digite a URL da imagem"
          />
        </Form.Group>

        <Form.Group controlId="dataLancamento" className="mb-3">
          <Form.Label>Data de Lançamento</Form.Label>
          <Form.Control
            type="text"
            value={dataLancamento}
            onChange={(e) => setDataLancamento(e.target.value)}
            placeholder="DD/MM/AAAA"
            required
          />
        </Form.Group>

        <Form.Group controlId="descricao" className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="plataforma" className="mb-3">
          <Form.Label>Plataforma</Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              label="PC"
              value="PC"
              checked={plataformas.includes('PC')}
              onChange={handlePlataformaChange}
            />
            <Form.Check
              type="checkbox"
              label="Console"
              value="Console"
              checked={plataformas.includes('Console')}
              onChange={handlePlataformaChange}
            />
            <Form.Check
              type="checkbox"
              label="Mobile"
              value="Mobile"
              checked={plataformas.includes('Mobile')}
              onChange={handlePlataformaChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId="classificacao" className="mb-3">
          <Form.Label>Classificação</Form.Label>
          <div className="d-flex">
            {['L', '10', '12', '14', '16', '18'].map((classificacaoValue) => (
              <Button
                key={classificacaoValue}
                variant={classificacao === classificacaoValue ? 'primary' : 'outline-primary'}
                onClick={() => handleClassificacaoClick(classificacaoValue)}
                style={{ margin: '0 5px', display: 'flex', alignItems: 'center' }}
              >
                {classificacaoValue}
                {classificacaoValue === '18' && <FaPlus style={{ marginLeft: '2px'}} />} {}
              </Button>
            ))}
          </div>
        </Form.Group>

        <Form.Group controlId="avaliacao" className="mb-3">
          <Form.Label>Avaliação</Form.Label>
          <div className="d-flex align-items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= avaliacao ? 'filled' : ''}`}
                onClick={() => handleStarClick(star)}
                style={{ cursor: 'pointer', fontSize: '24px', color: star <= avaliacao ? 'orange' : 'lightgray' }}
              >
                ★
              </span>
            ))}
          </div>
        </Form.Group>

        <Button variant="success" type="submit" className="mt-3">
          {id ? "Atualizar" : "Salvar"}
        </Button>
      </Form>
    </Pagina>
  );
}
