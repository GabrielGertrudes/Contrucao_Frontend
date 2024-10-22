'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaCheck, FaTrash } from 'react-icons/fa'
import ReactInputMask from 'react-input-mask'
import * as Yup from "yup"

export default function CadastroImovel() {

  function cadastrar(imovel) {
    const imoveis = JSON.parse(localStorage.getItem('imoveis')) || []
    imoveis.push(imovel)
    localStorage.setItem('imoveis', JSON.stringify(imoveis))
    alert("Imóvel cadastrado com sucesso!")
  }

  const initialValues = {
    tipo: '',
    finalidade: '',
    valor: '',
    area: '',
    quartos: '',
    banheiros: '',
    descricao: '',
    foto: '',
    vagasGaragem: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '', 
      bairro: '',
      cidade: '',
      UF: ''
    },
    proprietario: {
      nome: '',
      CPF: '',
      telefone: '',
      email: ''
    }
  }

  const validationSchema = Yup.object().shape({
    tipo: Yup.string().required("Campo obrigatório"),
    finalidade: Yup.string().required("Campo obrigatório"),
    valor: Yup.number().required("Campo obrigatório"),
    area: Yup.number().required("Campo obrigatório"),
    quartos: Yup.number().required("Campo obrigatório"),
    banheiros: Yup.number().required("Campo obrigatório"),
    descricao: Yup.string(),
    foto: Yup.string().url("Deve ser uma URL válida"),
    vagasGaragem: Yup.number(),
    endereco: Yup.object().shape({
      cep: Yup.string().required("Campo obrigatório"),
      logradouro: Yup.string().required("Campo obrigatório"),
      numero: Yup.string().required("Campo obrigatório"), 
      complemento: Yup.string(), 
      bairro: Yup.string().required("Campo obrigatório"),
      cidade: Yup.string().required("Campo obrigatório"),
      UF: Yup.string().required("Campo obrigatório")
    }),
    proprietario: Yup.object().shape({
      nome: Yup.string().required("Campo obrigatório"),
      CPF: Yup.string().required("Campo obrigatório"),
      telefone: Yup.string().required("Campo obrigatório"),
      email: Yup.string().email("E-mail inválido").required("Campo obrigatório")
    })
  })

  return (
    <Pagina titulo={"Cadastro de Imóvel"}>

      {/* Formulário de Cadastro de Imóvel */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={cadastrar}
      >
        {({ values, errors, touched, handleBlur, handleSubmit, handleReset, handleChange }) => (
          <Form onSubmit={handleSubmit}>

            {/* Dados do Imóvel */}
            <div className='text-center'>
              <h3>Dados do Imóvel</h3>
              <hr />
            </div>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Tipo:</Form.Label>
                <Form.Select
                  name='tipo'
                  value={values.tipo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.tipo && !!errors.tipo}
                >
                  <option value=''>Selecione</option>
                  <option value='casa'>Casa</option>
                  <option value='apartamento'>Apartamento</option>
                  <option value='terreno'>Terreno</option>
                  <option value='sala_comercial'>Sala Comercial</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.tipo}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Finalidade:</Form.Label>
                <Form.Select
                  name='finalidade'
                  value={values.finalidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.finalidade && !!errors.finalidade}
                >
                  <option value=''>Selecione</option>
                  <option value='venda'>Venda</option>
                  <option value='aluguel'>Aluguel</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.finalidade}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Valor:</Form.Label>
                <Form.Control
                  name='valor'
                  type='number'
                  value={values.valor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.valor && !!errors.valor}
                />
                <Form.Control.Feedback type='invalid'>{errors.valor}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Área (m²):</Form.Label>
                <Form.Control
                  name='area'
                  type='number'
                  value={values.area}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.area && !!errors.area}
                />
                <Form.Control.Feedback type='invalid'>{errors.area}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Quartos:</Form.Label>
                <Form.Control
                  name='quartos'
                  type='number'
                  value={values.quartos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.quartos && !!errors.quartos}
                />
                <Form.Control.Feedback type='invalid'>{errors.quartos}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Banheiros:</Form.Label>
                <Form.Control
                  name='banheiros'
                  type='number'
                  value={values.banheiros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.banheiros && !!errors.banheiros}
                />
                <Form.Control.Feedback type='invalid'>{errors.banheiros}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  as='textarea'
                  name='descricao'
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Foto (URL):</Form.Label>
                <Form.Control
                  name='foto'
                  value={values.foto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.foto && !!errors.foto}
                />
                <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Vagas de Garagem:</Form.Label>
                <Form.Control
                  name='vagasGaragem'
                  type='number'
                  value={values.vagasGaragem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
            </Row>

            {/* Endereço */}
            <div className='text-center'>
              <h3>Endereço</h3>
              <hr />
            </div>

            <Row className='mb-2'>
              <Form.Group as={Col} md={3}>
                <Form.Label>CEP:</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={"99999-999"}
                  name='endereco.cep'
                  value={values.endereco.cep}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.endereco?.cep && !!errors.endereco?.cep}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco?.cep}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Logradouro:</Form.Label>
                <Form.Control
                  name='endereco.logradouro'
                  value={values.endereco.logradouro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.endereco?.logradouro && !!errors.endereco?.logradouro}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco?.logradouro}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Número:</Form.Label>
                <Form.Control
                  name='endereco.numero'
                  value={values.endereco.numero}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.endereco?.numero && !!errors.endereco?.numero}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco?.numero}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Complemento:</Form.Label>
                <Form.Control
                  name='endereco.complemento'
                  value={values.endereco.complemento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Bairro:</Form.Label>
                <Form.Control
                  name='endereco.bairro'
                  value={values.endereco.bairro}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.endereco?.bairro && !!errors.endereco?.bairro}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco?.bairro}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Cidade:</Form.Label>
                <Form.Control
                  name='endereco.cidade'
                  value={values.endereco.cidade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.endereco?.cidade && !!errors.endereco?.cidade}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco?.cidade}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>UF:</Form.Label>
                <Form.Select
                  name='endereco.UF'
                  value={values.endereco.UF}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.endereco?.UF && !!errors.endereco?.UF}
                >
                  <option value=''>Selecione</option>
                  <option value='AC'>Acre</option>
                  <option value='AL'>Alagoas</option>
                  {/* Adicionar mais estados */}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.endereco?.UF}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Dados do Proprietário */}
            <div className='text-center'>
              <h3>Dados do Proprietário</h3>
              <hr />
            </div>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name='proprietario.nome'
                  value={values.proprietario.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.proprietario?.nome && !!errors.proprietario?.nome}
                />
                <Form.Control.Feedback type='invalid'>{errors.proprietario?.nome}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>CPF:</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={"999.999.999-99"}
                  name='proprietario.CPF'
                  value={values.proprietario.CPF}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.proprietario?.CPF && !!errors.proprietario?.CPF}
                />
                <Form.Control.Feedback type='invalid'>{errors.proprietario?.CPF}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control as={ReactInputMask}
                  mask={"(99) 99999-9999"}
                  name='proprietario.telefone'
                  value={values.proprietario.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.proprietario?.telefone && !!errors.proprietario?.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.proprietario?.telefone}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name='proprietario.email'
                  value={values.proprietario.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.proprietario?.email && !!errors.proprietario?.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.proprietario?.email}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Botões de ação */}
            <div className='text-center'>
              <Button variant="primary" type="submit" className="mb-3" >
                <FaCheck className="me-2" />
                Salvar
              </Button>
              <Button variant="danger" onClick={handleReset} className="ms-2 , mb-3">
                <FaTrash className="me-2" />
                Limpar
              </Button>
            </div>

          </Form>
        )}
      </Formik>

    </Pagina>
  )
}
