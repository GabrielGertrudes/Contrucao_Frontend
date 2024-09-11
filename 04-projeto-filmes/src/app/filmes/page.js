'use client'

import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import apiFilmes from '../apis/apiFilmes'
import Pagina from '../components/Pagina'


export default function page() {

  const [filmes, setFilmes] = useState([])

  // Fazer algo quando iniciar o componente

  useEffect(() => {
    
    // Buscar os filmes
    buscarFilmes()

  }, [])


  async function buscarFilmes() {
    const resultado = await apiFilmes.get("/movie/popular?language=pt-BR")
    console.log(resultado.data.results)
    const filmesRecebidos = resultado.data.results
    setFilmes(filmesRecebidos)
  }


  return (

    <Pagina titulo="Filmes">

      <Row>

        {filmes.map(filme => {
          return (
            <Col>
              <p>{filme.original_title}</p>
            </Col>
          )
        })}


      </Row>

    </Pagina>


  )
}
