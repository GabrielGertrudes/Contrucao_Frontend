'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import apiSeries from '../../apis/apiSeries'
import Pagina from '../../components/Pagina'

export default function SeriesNaTVHoje() {
  const [series, setSeries] = useState([])

  useEffect(() => {
    buscarSeries()
  }, [])

  async function buscarSeries() {
    const resultado = await apiSeries.get("/tv/airing_today?language=pt-BR")
    setSeries(resultado.data.results)
  }

  return (
    <Pagina titulo="Séries Na TV Hoje">
      <Row md={4}>
        {series.map(serie => (
          <Col className='py-2' key={serie.id}>
            <Card style={{ height: '100%' }}>
              <Card.Img src={"https://image.tmdb.org/t/p/w500/" + serie.poster_path} />
              <Card.Body>
                <Card.Title>{serie.name}</Card.Title>
                <p><b>Nota:</b> {serie.vote_average} ⭐</p>
                <p><b>Lançamento:</b> {serie.first_air_date}</p>
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={'/series/' + serie.id}>Detalhes</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  )
}