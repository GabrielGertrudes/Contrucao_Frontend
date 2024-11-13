'use client'; 

import React, { useEffect, useState } from 'react';
import Pagina from '@/components/Pagina';
import { Table, Button, Container, Badge, Form } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaEye, FaClipboardList, FaPlus } from 'react-icons/fa';

export default function TorneiosPage() {
  // armazenar torneios, filtro de busca e lista de jogos
  const [torneios, setTorneios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [jogos, setJogos] = useState([]);
  const router = useRouter();

  // Carrega os torneios e jogos 
  useEffect(() => {
    const torneiosSalvos = JSON.parse(localStorage.getItem('torneios')) || [];
    const jogosSalvos = JSON.parse(localStorage.getItem('jogos')) || [];
    setTorneios(torneiosSalvos);
    setJogos(jogosSalvos);
  }, []);

  // informações do jogo pelo nome
  const getJogoInfo = (nomeJogo) => {
    return jogos.find(jogo => jogo.nome === nomeJogo) || {};
  };

  // página de edição do torneio
  const handleEdit = (index) => {
    router.push(`/torneios/form?id=${index}`);
  };

  // excluir um torneio
  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este torneio?');
    if (confirmDelete) {
      const torneiosSalvos = JSON.parse(localStorage.getItem('torneios')) || [];
      torneiosSalvos.splice(index, 1); 
      localStorage.setItem('torneios', JSON.stringify(torneiosSalvos));
      setTorneios(torneiosSalvos); 
    }
  };

  // detalhes do torneio específico
  const handleViewDetails = (index) => {
    router.push(`/torneios/${index}`);
  };

  //torneios com base no nome ou status, utilizando o valor do filtro
  const torneiosFiltrados = torneios.filter(torneio => 
    (torneio.nome && torneio.nome.toLowerCase().includes(filtro.toLowerCase())) || 
    (torneio.status && torneio.status.toLowerCase().includes(filtro.toLowerCase()))
  );

  return (
    <Pagina titulo="Lista de Torneios">
      <Container className="mb-3">
        {}
        <Button
          variant="outline-light"
          onClick={() => router.push('/torneios/form')}
          className="mb-3 d-flex align-items-center"
          style={{
            backgroundColor: '#1E90FF',
            color: '#FFFFFF',
            borderRadius: '8px',
            fontWeight: '500',
            boxShadow: '0px 0px 10px rgba(30, 144, 255, 0.3)',
          }}
        >
          <FaPlus className="me-2" /> Criar Novo Torneio
        </Button>

        {}
        <Form.Control
          type="text"
          placeholder="Buscar torneios por nome ou status"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="mb-3"
        />

        {}
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
              <th>Nome do Torneio</th>
              <th>Jogo</th>
              <th>Imagem do Jogo</th>
              <th>Status</th>
              <th>Equipes Participantes</th>
              <th>Data de Criação</th>
              <th>Campeão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {torneiosFiltrados.map((torneio, index) => {
              const jogoInfo = getJogoInfo(torneio.jogo); 
              const status = torneio.status || 'Não iniciado';
              return (
                <tr key={index}>
                  <td>{torneio.nome}</td>
                  <td>{torneio.jogo}</td>
                  <td>
                    {jogoInfo.imagem ? (
                      <img
                        src={jogoInfo.imagem}
                        alt={torneio.jogo}
                        style={{
                          width: '60px',
                          height: 'auto',
                          borderRadius: '5px',
                          boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
                        }}
                      />
                    ) : (
                      'Imagem não disponível'
                    )}
                  </td>
                  <td>
                    <Badge bg={
                      status === 'Concluído' ? 'success' : status === 'Em andamento' ? 'warning' : 'secondary'
                    }>
                      {status}
                    </Badge>
                  </td>
                  <td>{torneio.selecoes ? torneio.selecoes.length : 0}</td>
                  <td>{new Date(torneio.dataCriacao).toLocaleDateString('pt-BR')}</td>
                  <td>{torneio.fases && torneio.fases.length > 0 ? torneio.fases[torneio.fases.length - 1].jogos[0]?.vencedor || 'Em progresso' : 'Em progresso'}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="info"
                        onClick={() => handleViewDetails(index)}
                        className="d-flex align-items-center"
                        style={{
                          color: '#FFFFFF',
                          fontWeight: '500',
                          backgroundColor: '#17a2b8',
                          borderRadius: '8px',
                        }}
                      >
                        <FaClipboardList className="me-1" /> Gerenciar
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => handleEdit(index)}
                        className="d-flex align-items-center"
                        style={{
                          backgroundColor: '#FFC107',
                          color: '#000',
                          borderRadius: '8px',
                          fontWeight: '500',
                        }}
                      >
                        <FaEdit className="me-1" /> Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(index)}
                        className="d-flex align-items-center"
                        style={{
                          backgroundColor: '#dc3545',
                          color: '#FFFFFF',
                          borderRadius: '8px',
                          fontWeight: '500',
                        }}
                      >
                        <FaTrash className="me-1" /> Deletar
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Pagina>
  );
}
