'use client'

import Pagina from '@/components/Pagina'
import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'

export default function CadastroDisciplina() {

const cursos = JSON.parse(localStorage.getItem('cursos')) || []
const professores = JSON.parse(localStorage.getItem('professores')) || []

  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('')
  const [curso, setCurso] = useState('')
  const [professor, setProfessor] = useState('')

  function salvar() {
    const disciplina = {
      nome,
      descricao,
      status,
      curso,
      professor
    }

    console.log(disciplina)
  }

  return (
    <Pagina titulo={"Cadastro de Disciplina"}>

      <Form>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome da disciplina"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="descricao">
          <Form.Label>Descrição:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a descrição da disciplina"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status:</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Selecione...</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="curso">
          <Form.Label>Curso:</Form.Label>
          <Form.Select
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
          >
            
            {}
            <option value=''>Selecione</option>
            {cursos.map(curso => <option value={curso.nome}>{curso.nome}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="professor">
          <Form.Label>Professor:</Form.Label>
          <Form.Select
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          >
            {}
            <option value=''>Selecione</option>
            {professores.map(professor => <option value={professor.nome}>{professor.nome}</option>)}
            
          </Form.Select>
        </Form.Group>

        <div className="text-end">
          <Button variant="secondary" href="/disciplinas" className="me-2">
            Voltar
          </Button>
          <Button variant="primary" onClick={() => setNome('')}>
            Limpar
          </Button>
          <Button variant="success" className="ms-2" onClick={salvar}>
            Salvar
          </Button>
        </div>

      </Form>

    </Pagina>
  )
}