'use client'

import Pagina from '@/components/Pagina'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaCheck, FaTrashAlt } from "react-icons/fa";


export default function FormulariosNomePage() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  function handleNome(evento) {
    setNome(evento.target.value)
  }

  function handleEmail(evento) {
    setEmail(evento.target.value)
  }

  function reset(){
    console.log("CHAMOU O RESET")
    setNome('')
    setEmail('')
  }

  function submit(evento) {
    evento.preventDefault()
    console.log(nome, email)
  }

  return (
    <Pagina titulo="Formulário Nome">

      <div>
        <h2>Seu nome é: {nome}</h2>
        <h2>Seu email é: {email}</h2>
      </div>

      {/* Form do React Boostrap */}
      <Form onSubmit={submit}>
        {/* Input Nome */}
        <Form.Group className='mb-2'>
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type='text'
            name='nome'
            value={nome}
            onChange={handleNome}
            placeholder='Informe o seu nome'
          />
          <Form.Text>Informe o seu nome</Form.Text>
        </Form.Group>

        {/* Input email */}
        <Form.Group className='mb-2'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            onChange={handleEmail}
          />
          <Form.Text>Informe o seu e-mail</Form.Text>
        </Form.Group>

        <Button type='submit' className='me-2'><FaCheck /> Enviar</Button>
        <Button onClick={reset}><FaTrashAlt /> Limpar</Button>

      </Form>


    </Pagina>
  )
}
