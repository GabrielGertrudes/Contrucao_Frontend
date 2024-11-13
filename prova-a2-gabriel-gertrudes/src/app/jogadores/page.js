'use client'; 

import React, { useEffect, useState } from 'react';
import Pagina from '@/components/Pagina';
import { Table, Button, Container } from 'react-bootstrap'; 
import { useRouter } from 'next/navigation'; 
import { FaEye, FaEdit, FaTrash, FaPlus, FaMale, FaFemale } from 'react-icons/fa'; 
export default function JogadoresPage() {

  const [jogadores, setJogadores] = useState([]);

  const [dadosVisiveis, setDadosVisiveis] = useState([]);
  const router = useRouter(); 


  useEffect(() => {
    const jogadoresExistentes = JSON.parse(localStorage.getItem('jogadores')) || [];
    setJogadores(jogadoresExistentes); 
    setDadosVisiveis(Array(jogadoresExistentes.length).fill(false)); 
  }, []);

  const handleEdit = (cpf) => {
    router.push(`/jogadores/form?cpf=${cpf}`); 
  };


  const handleDelete = (cpf) => {
    const jogadoresExistentes = JSON.parse(localStorage.getItem('jogadores')) || [];
    const novosJogadores = jogadoresExistentes.filter(jogador => jogador.cpf !== cpf); 
    localStorage.setItem('jogadores', JSON.stringify(novosJogadores)); 
    setJogadores(novosJogadores);
  };


  const toggleDadosVisiveis = (index) => {
    const novosDadosVisiveis = [...dadosVisiveis];
    novosDadosVisiveis[index] = !novosDadosVisiveis[index]; 
    setDadosVisiveis(novosDadosVisiveis);
  };


  const jogadoresPorJogo = jogadores.reduce((acc, jogador) => {
    const jogo = jogador.jogos[0]; 
    acc[jogo] = acc[jogo] || []; 
    acc[jogo].push(jogador); 
    return acc;
  }, {});

  return (

    <Pagina titulo="Lista de Jogadores">
      <Container className="mb-3">
        {}
        <Button
          variant="outline-light"
          onClick={() => router.push('/jogadores/form')}
          className="mb-3 d-flex align-items-center"
          style={{
            backgroundColor: '#1E90FF',
            color: '#FFFFFF',
            borderRadius: '8px',
            fontWeight: '500',
            boxShadow: '0px 0px 10px rgba(30, 144, 255, 0.3)', 
          }}
        >
          <FaPlus className="me-2" /> Adicionar Jogador
        </Button>
      </Container>

      {}
      {Object.keys(jogadoresPorJogo).map((jogo, jogoIndex) => (
        <div key={jogoIndex} className="mb-5">
          <h4 style={{ color: '#FFFFFF' }} className="mb-3">
            {jogo} <small>({jogadoresPorJogo[jogo].length} jogadores)</small>
          </h4>
          <Table
            striped
            bordered
            hover
            responsive
            className="text-center"
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: '#2c2f33',
              color: '#FFFFFF',
            }}
          >
            <thead className="table-dark">
              <tr>
                <th style={{ width: '10%' }}>Imagem</th>
                <th style={{ width: '15%' }}>Nome</th>
                <th style={{ width: '7%' }}>Gênero</th>
                <th style={{ width: '7%' }}>Idade</th>
                <th style={{ width: '15%' }}>Dados Pessoais</th>
                <th style={{ width: '10%' }}>Plataforma</th>
                <th style={{ width: '10%' }}>Nacionalidade</th>
                <th style={{ width: '10%' }}>Tempo de Jogo</th>
                <th style={{ width: '18%' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {}
              {jogadoresPorJogo[jogo].map((jogador, index) => (
                <tr key={index}>
                  <td>
                    {}
                    {jogador.imagem ? (
                      <img
                        src={jogador.imagem}
                        alt={jogador.nome}
                        style={{
                          width: '80px',
                          height: 'auto',
                          borderRadius: '5px',
                          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
                        }}
                      />
                    ) : (
                      <span>Sem Imagem</span>
                    )}
                  </td>
                  <td>{jogador.nome}</td>
                  <td>{jogador.genero === 'Masculino' ? <FaMale color="blue" /> : <FaFemale color="pink" />}</td>
                  <td>{jogador.idade}</td>
                  <td>
                    {}
                    <Button
                      variant="link"
                      onClick={() => toggleDadosVisiveis(index)}
                      style={{ padding: 0, color: '#1E90FF' }}
                    >
                      <FaEye />
                    </Button>
                    {}
                    {dadosVisiveis[index] && (
                      <div className="mt-2 text-start">
                        <strong>CPF:</strong> {jogador.cpf} <br />
                        <strong>Telefone:</strong> {jogador.telefone}
                      </div>
                    )}
                  </td>
                  <td>{jogador.plataforma}</td>
                  <td>{jogador.nacionalidade}</td>
                  <td>{jogador.tempoJogo}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      {}
                      <Button
                        variant="outline-light"
                        onClick={() => handleEdit(jogador.cpf)}
                        style={{
                          backgroundColor: '#ffc107',
                          color: '#000',
                          borderRadius: '8px',
                          fontWeight: '500',
                        }}
                      >
                        <FaEdit /> Editar
                      </Button>
                      {}
                      <Button
                        variant="outline-light"
                        onClick={() => handleDelete(jogador.cpf)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: '#FFFFFF',
                          borderRadius: '8px',
                          fontWeight: '500',
                        }}
                      >
                        <FaTrash /> Deletar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </Pagina>
  );
}
