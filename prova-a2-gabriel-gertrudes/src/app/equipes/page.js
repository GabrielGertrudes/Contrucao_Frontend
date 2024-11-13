'use client'; // Marcar como Client Component

import React, { useEffect, useState } from 'react';
import Pagina from '@/components/Pagina';
import { Table, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function EquipesPage() {

  const [equipes, setEquipes] = useState([]);
  const [jogadoresExpandido, setJogadoresExpandido] = useState([]);
  const router = useRouter();

  // equipes salvas 
  useEffect(() => {
    const equipesSalvas = JSON.parse(localStorage.getItem('equipes')) || [];
    setEquipes(equipesSalvas);
    setJogadoresExpandido(Array(equipesSalvas.length).fill(false)); 
  }, []);

  const handleEdit = (index) => {
    router.push(`/equipes/form?id=${index}`);
  };

  const handleDelete = (index) => {
    const equipesSalvas = JSON.parse(localStorage.getItem('equipes')) || [];
    equipesSalvas.splice(index, 1); 
    localStorage.setItem('equipes', JSON.stringify(equipesSalvas)); 
    setEquipes(equipesSalvas); 
  };

  //equipe específica
  const toggleJogadores = (index) => {
    const novosJogadoresExpandido = [...jogadoresExpandido];
    novosJogadoresExpandido[index] = !novosJogadoresExpandido[index];
    setJogadoresExpandido(novosJogadoresExpandido);
  };

  // equipes pelo jogo
  const equipesPorJogo = equipes.reduce((acc, equipe) => {
    acc[equipe.jogo] = acc[equipe.jogo] || [];
    acc[equipe.jogo].push(equipe);
    return acc;
  }, {});

  return (
    <Pagina titulo="Lista de Equipes">
      <Container className="mb-3">
        <Button
          variant="outline-light"
          onClick={() => router.push('/equipes/form')}
          className="mb-3 d-flex align-items-center"
          style={{
            backgroundColor: '#1E90FF',
            color: '#FFFFFF',
            borderRadius: '8px',
            fontWeight: '500',
            boxShadow: '0px 0px 10px rgba(30, 144, 255, 0.3)',
          }}
        >
          <FaPlus className="me-2" /> Adicionar Equipe
        </Button>
      </Container>

      {/*tabela*/}
      {Object.keys(equipesPorJogo).map((jogo, jogoIndex) => (
        <div key={jogoIndex} className="mb-5">
          <h4 style={{ color: '#FFFFFF' }} className="mb-3">
            {jogo} <small>({equipesPorJogo[jogo].length} equipes)</small>
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
                <th style={{ width: '8%' }}>Imagem</th>
                <th style={{ width: '15%' }}>Nome da Equipe</th>
                <th style={{ width: '12%' }}>Slogan</th>
                <th style={{ width: '15%' }}>Descrição</th>
                <th style={{ width: '10%' }}>Capitão</th>
                <th style={{ width: '10%' }}>Sub-capitão</th>
                <th style={{ width: '15%' }}>Jogadores</th>
                <th style={{ width: '8%' }}>Qtd. de Jogadores</th>
                <th style={{ width: '10%' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipesPorJogo[jogo].map((equipe, index) => (
                <tr key={index}>
                  <td>
                    {/*  imagem */}
                    {equipe.imagem ? (
                      <img
                        src={equipe.imagem}
                        alt={equipe.nomeEquipe}
                        style={{ width: '70px', height: 'auto', borderRadius: '5px' }}
                      />
                    ) : (
                      <span>Sem imagem</span>
                    )}
                  </td>
                  <td style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{equipe.nomeEquipe}</td>
                  <td style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{equipe.slogan}</td>
                  <td style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{equipe.descricao}</td>
                  <td style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{equipe.capitao}</td>
                  <td style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{equipe.subCapitao}</td>
                  <td>
                    <div style={{ maxHeight: jogadoresExpandido[index] ? 'none' : '60px', overflow: 'hidden' }}>
                      {equipe.jogadores.join(', ')}
                    </div>
                    {equipe.jogadores.length > 3 && (
                      <Button
                        variant="link"
                        onClick={() => toggleJogadores(index)}
                        style={{ padding: 0, color: '#1E90FF' }}
                      >
                        {jogadoresExpandido[index] ? 'Ler menos' : 'Ler mais'}
                      </Button>
                    )}
                  </td>
                  <td>{equipe.jogadores.length}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-light"
                        onClick={() => handleEdit(index)}
                        style={{
                          backgroundColor: '#ffc107',
                          color: '#000',
                          borderRadius: '8px',
                          fontWeight: '500',
                        }}
                      >
                        <FaEdit /> Editar
                      </Button>
                      <Button
                        variant="outline-light"
                        onClick={() => handleDelete(index)}
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
