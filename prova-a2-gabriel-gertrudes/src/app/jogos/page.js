'use client'; 

import React, { useEffect, useState } from 'react';
import Pagina from '@/components/Pagina';
import { Table, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaStar, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

export default function JogosPage() {

  const [jogos, setJogos] = useState([]);
  const router = useRouter(); 
  const [descricaoExpandida, setDescricaoExpandida] = useState([]);


  useEffect(() => {
    const jogosExistentes = JSON.parse(localStorage.getItem('jogos')) || [];
    setJogos(jogosExistentes);
    setDescricaoExpandida(Array(jogosExistentes.length).fill(false)); 
  }, []);


  const handleEdit = (index) => {
    router.push(`/jogos/form?id=${index}`);
  };


  const handleDelete = (index) => {
    const jogosExistentes = JSON.parse(localStorage.getItem('jogos')) || [];
    jogosExistentes.splice(index, 1);
    localStorage.setItem('jogos', JSON.stringify(jogosExistentes));
    setJogos(jogosExistentes);
  };


  const toggleDescricao = (index) => {
    const newDescricaoExpandida = [...descricaoExpandida];
    newDescricaoExpandida[index] = !newDescricaoExpandida[index];
    setDescricaoExpandida(newDescricaoExpandida);
  };

  return (

    <Pagina titulo="Lista de Jogos">
      <Container className="mb-3">
        {}
        <Button
          variant="outline-light"
          onClick={() => router.push('/jogos/form')}
          className="mb-3 d-flex align-items-center"
          style={{
            backgroundColor: '#1E90FF',
            color: '#FFFFFF',
            borderRadius: '8px',
            fontWeight: '500',
            boxShadow: '0px 0px 10px rgba(30, 144, 255, 0.3)', 
          }}
        >
          <FaPlus className="me-2" /> Adicionar Jogo
        </Button>
      </Container>

      {/* tabela */}
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
            <th>Imagem</th>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Plataforma</th>
            <th>Data de Lançamento</th>
            <th>Classificação</th>
            <th>Descrição</th>
            <th>Avaliação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {jogos.map((jogo, index) => (
            <tr key={index}>
              {/* Imagem */}
              <td>
                <img
                  src={jogo.imagem}
                  alt={jogo.nome}
                  style={{
                    width: '80px',
                    height: 'auto',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
                  }}
                />
              </td>
              <td>{jogo.nome}</td>
              <td>{jogo.genero}</td>
              
              {}
              <td>{Array.isArray(jogo.plataforma) ? jogo.plataforma.join(', ') : jogo.plataforma}</td>

              <td>{jogo.dataLancamento}</td>

              {}
              <td>
                <Button
                  variant="outline-light"
                  style={{
                    backgroundColor: '#1E90FF',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontWeight: '500',
                  }}
                >
                  {jogo.classificacao}
                </Button>
              </td>

              {}
              <td>
                <div
                  style={{
                    maxHeight: descricaoExpandida[index] ? 'none' : '50px', 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {jogo.descricao}
                </div>
                {jogo.descricao.length > 100 && (
                  <Button
                    variant="link"
                    onClick={() => toggleDescricao(index)}
                    style={{ padding: 0, color: '#1E90FF' }}
                  >
                    {descricaoExpandida[index] ? 'Ler menos' : 'Ler mais'}
                  </Button>
                )}
              </td>

              {/* Avaliação */}
              <td style={{ color: 'orange' }}>
                <FaStar /> {jogo.avaliacao}
              </td>

              {}
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
    </Pagina>
  );
}
