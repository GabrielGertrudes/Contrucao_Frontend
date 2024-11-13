'use client'; 

import React, { useState, useEffect } from 'react'; 
import Pagina from '@/components/Pagina';
import { Form, Button, Alert } from 'react-bootstrap';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronDown, FaArrowLeft } from 'react-icons/fa';

export default function FormJogadores() {

  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [jogos, setJogos] = useState([]); 
  const [jogoSelecionado, setJogoSelecionado] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [tempoJogo, setTempoJogo] = useState('');
  const [idade, setIdade] = useState('');
  const [imagem, setImagem] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const router = useRouter(); 
  const searchParams = useSearchParams();
  const cpfParam = searchParams.get('cpf'); 

  useEffect(() => {

    const jogosSalvos = JSON.parse(localStorage.getItem('jogos')) || [];
    setJogos(jogosSalvos);

    if (cpfParam) {
      const jogadoresExistentes = JSON.parse(localStorage.getItem('jogadores')) || [];
      const jogador = jogadoresExistentes.find(j => j.cpf === cpfParam);
      if (jogador) {
        setNome(jogador.nome || '');
        setGenero(jogador.genero || '');
        setCpf(jogador.cpf || '');
        setTelefone(jogador.telefone || '');
        setJogoSelecionado(jogador.jogos[0] || '');
        setPlataforma(jogador.plataforma || '');
        setNacionalidade(jogador.nacionalidade || '');
        setTempoJogo(jogador.tempoJogo || '');
        setIdade(jogador.idade || '');
        setImagem(jogador.imagem || '');
      }
    }
  }, [cpfParam]);

  const formatarCpf = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .slice(0, 11) // Limita a 11 caracteres
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os primeiros três dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os seis primeiros dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona traço antes dos dois últimos dígitos
  };

  const formatarTelefone = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .slice(0, 11) // Limita a 11 caracteres
      .replace(/^(\d{2})(\d)/, '($1) $2') // Adiciona parênteses e espaço após o DDD
      .replace(/(\d)(\d{4})$/, '$1-$2'); // Adiciona traço antes dos quatro últimos dígitos
  };

  // Função para formatar o tempo de jogo em horas
  const formatarTempoJogo = (value) => {
    const num = value.replace(/\D/g, ''); 
    return num ? `${num}hr` : ''; 
  };

  // Filtra os jogos 
  const jogosFiltrados = plataforma 
    ? jogos.filter(jogo => jogo.plataforma.includes(plataforma))
    : jogos;

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const novoJogador = {
      nome,
      genero,
      cpf: cpf.replace(/\D/g, ''),
      telefone,
      jogos: [jogoSelecionado],
      plataforma,
      nacionalidade,
      tempoJogo,
      idade,
      imagem,
    };

    let jogadoresExistentes = JSON.parse(localStorage.getItem('jogadores')) || [];

    // Verifica o jogador
    const jogadorExistente = jogadoresExistentes.find(j => j.cpf === cpf.replace(/\D/g, ''));
    if (jogadorExistente && !cpfParam) {
      setErrorMessage('Este jogador já foi adicionado.');
      return;
    } else {
      setErrorMessage('');
    }

    if (cpfParam) {
      const index = jogadoresExistentes.findIndex(j => j.cpf === cpfParam);
      jogadoresExistentes[index] = novoJogador; 
    } else {
      jogadoresExistentes.push(novoJogador); 
    }

    localStorage.setItem('jogadores', JSON.stringify(jogadoresExistentes));
    router.push('/jogadores');
  };

  return (
    <Pagina titulo={cpfParam ? "Editar Jogador" : "Cadastro de Jogador"}>
      <div className="d-flex mb-3">
        <Button variant="secondary" onClick={() => router.back()} className="me-2">
          <FaArrowLeft className="me-1" /> Voltar
        </Button>
      </div>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit} className="p-4 shadow rounded" style={{ backgroundColor: '#f8f9fa' }}>
        <Form.Group controlId="nome" className="mb-3">
          <Form.Label>Nome do Jogador</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => {
              const onlyLetters = e.target.value.replace(/[^a-zA-Z\s]/g, '');
              setNome(onlyLetters);
            }}
            placeholder="Digite o nome do jogador"
            required
          />
        </Form.Group>

        <Form.Group controlId="genero" className="mb-3">
          <Form.Label>Gênero</Form.Label>
          <div className="d-flex">
            {}
            <Form.Check
              type="radio"
              label="Masculino"
              id="genero-masculino"
              value="Masculino"
              checked={genero === 'Masculino'}
              onChange={(e) => setGenero(e.target.value)}
              required
            />
            <Form.Check
              type="radio"
              label="Feminino"
              id="genero-feminino"
              value="Feminino"
              checked={genero === 'Feminino'}
              onChange={(e) => setGenero(e.target.value)}
              required
              className="ms-3"
            />
          </div>
        </Form.Group>

        <Form.Group controlId="idade" className="mb-3">
          <Form.Label>Idade do Jogador</Form.Label>
          <Form.Control
            type="number"
            value={idade}
            onChange={(e) => {
              const value = e.target.value.slice(0, 3); 
              setIdade(value);
            }}
            placeholder="Digite a idade do jogador"
            required
          />
        </Form.Group>

        <Form.Group controlId="cpf" className="mb-3">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            value={cpf}
            onChange={(e) => {
              const formattedCpf = formatarCpf(e.target.value);
              setCpf(formattedCpf);
            }}
            placeholder="999.999.999-99"
            required
          />
        </Form.Group>

        <Form.Group controlId="telefone" className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            value={telefone}
            onChange={(e) => {
              const formattedTelefone = formatarTelefone(e.target.value);
              setTelefone(formattedTelefone);
            }}
            placeholder="(99) 99999-9999"
            required
          />
        </Form.Group>

        <Form.Group controlId="plataforma" className="mb-3">
          <Form.Label>Plataforma</Form.Label>
          <div className="position-relative">
            <Form.Control
              as="select"
              value={plataforma}
              onChange={(e) => {
                setPlataforma(e.target.value);
                setJogoSelecionado('');
              }}
              required
            >
              <option value="">Selecione a plataforma</option>
              <option value="PC">PC</option>
              <option value="Console">Console</option>
              <option value="Mobile">Mobile</option>
            </Form.Control>
            <FaChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>
        </Form.Group>

        <Form.Group controlId="nacionalidade" className="mb-3">
  <Form.Label>Nacionalidade</Form.Label>
  <div className="position-relative">
    <Form.Control
      as="select"
      value={nacionalidade}
      onChange={(e) => setNacionalidade(e.target.value)}
      required
    >
      <option value="">Selecione a nacionalidade</option>
      <option value="Brasileira">Brasileira</option>
      <option value="Argentina">Argentina</option>
      <option value="Chilena">Chilena</option>
      <option value="Colombiana">Colombiana</option>
      <option value="Mexicana">Mexicana</option>
      <option value="Espanhola">Espanhola</option>
      <option value="Portuguesa">Portuguesa</option>
      <option value="Estadunidense">Estadunidense</option>
      <option value="Italiana">Italiana</option>
      <option value="Alemã">Alemã</option>
      <option value="Francesa">Francesa</option>
      <option value="Japonesa">Japonesa</option>
      <option value="Chinesa">Chinesa</option>
      <option value="Canadense">Canadense</option>
      <option value="Australiana">Australiana</option>
      <option value="Indiana">Indiana</option>
      <option value="Britânica">Britânica</option>
      <option value="Sul-Africana">Sul-Africana</option>
      <option value="Coreana">Coreana</option>
      <option value="Russa">Russa</option>
      {}
    </Form.Control>
    <FaChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
  </div>
</Form.Group>


        <Form.Group controlId="jogos" className="mb-3">
          <Form.Label>Jogos</Form.Label>
          {jogosFiltrados.length > 0 ? jogosFiltrados.map((jogo, index) => (
            <Form.Check
              key={index}
              type="radio"
              label={jogo.nome}
              value={jogo.nome}
              checked={jogoSelecionado === jogo.nome}
              onChange={(e) => setJogoSelecionado(e.target.value)}
              required
            />
          )) : (
            <p>Nenhum jogo disponível para a plataforma selecionada</p>
          )}
        </Form.Group>

        <Form.Group controlId="tempoJogo" className="mb-3">
          <Form.Label>Tempo de Jogo (horas)</Form.Label>
          <Form.Control
            type="text"
            value={tempoJogo}
            onChange={(e) => setTempoJogo(formatarTempoJogo(e.target.value))}
            placeholder="Digite o tempo total de jogo (ex: 2h, 20h)"
            required
          />
        </Form.Group>

        <Form.Group controlId="imagem" className="mb-3">
          <Form.Label>Imagem do Jogador</Form.Label>
          <Form.Control
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="Digite a URL da imagem do jogador"
          />
        </Form.Group>

        {}
        <Button variant="success" type="submit">
          Salvar
        </Button>
      </Form>
    </Pagina>
  );
}
