'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useState } from 'react'
import { Button, CardImg, Form, Modal } from 'react-bootstrap'
import { FaCheck, FaTrashAlt } from 'react-icons/fa'


export default function page() {

  const [showModal, setShowModal] = useState(false)

  const [imc, setImc] = useState(0)
  const [classificacao, setClasssificacao] = useState('')

  function calcular(dados) {
    console.log(dados)

    const resIMC = (dados.peso / (dados.altura * dados.altura)).toFixed(1)

    console.log(resIMC)

    let resClas = ''

    if (resIMC < 18.5) {
      resClas = 'Baixo Peso'
    } else if (resIMC >= 18, 5 && resIMC < 25) {
      resClas = 'Peso Normal'
    } else if (resIMC >= 25 && resIMC < 29.9) {
      resClas = 'Excesso de Peso'
    } else if (resIMC >= 30) {
      resClas = 'Obesidade'
    } else if (resIMC >= 35) {
      resClas = 'Obesidade Extrema'
    }
    console.log(resClas)

    setImc(resIMC)
    setClasssificacao(resClas)

    setShowModal(true)

  }


  return (
    <Pagina titulo="Calculadora de IMC - Formik">

      {/* Imagem da tabela */}
      <div>
        <CardImg src='/imc/imc.png' />
      </div>

      {/* Formulario */}
      <Formik
        initialValues={{
          nome: '',
          genero: '',
          peso: '0',
          altura: '0.0'
        }}
        onSubmit={values => calcular(values)}
      >
        {({ values, handleChange, handleSubmit, handleReset }) => (

          <Form>
            <Form.Group className='mb-2'>
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type='text'
                name='nome'
                value={values.nome}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Gênero:</Form.Label>
              <Form.Select
                name='genero'
                value={values.genero}
                onChange={handleChange}
              >
                <option>Selecione</option>
                <option value="Masculino" >Masculino</option>
                <option value="Feminino">Feminino</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Peso:</Form.Label>
              <Form.Control
                name='peso'
                type='number'
                min={1}
                value={values.peso}
                onChange={handleChange}
              />
              <Form.Text>Peso em kg. Ex: 80</Form.Text>
            </Form.Group>

            <Form.Group className='mb-2'>
              <Form.Label>Altura:</Form.Label>
              <Form.Control
                name='altura'
                type='number'
                min={0.01}
                step={0.01}
                value={values.altura}
                onChange={handleChange}
              />
              <Form.Text>Altura em metros. Ex: 1,75</Form.Text>
            </Form.Group>

            <Form.Group className='mb-2 text-center'>
              <Button
                onClick={handleSubmit}
                className='me-2'
              >
                <FaCheck /> Enviar
              </Button>
              <Button
                onClick={handleReset}
              >
                <FaTrashAlt /> Limpar
              </Button>
            </Form.Group>

          </Form>

        )}

      </Formik>

      {/* Modal do resultado */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>O seu imc é {imc}</p>
          <p>Sua classificação é {classificacao}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>


    </Pagina>
  )
}