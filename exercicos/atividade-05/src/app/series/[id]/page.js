'use client';

import { useEffect, useState } from 'react';
import { CardImg, Col, Row } from 'react-bootstrap';
import apiSeries from '../../apis/apiSeries';
import Pagina from '../../components/Pagina';

export default function DetalhesSerie(props) {
  const [serie, setSerie] = useState({});

  useEffect(() => {
    buscarSerie();
  }, []);

  async function buscarSerie() {
    try {
      const resultado = await apiSeries.get(`/tv/${props.params.id}?language=pt-BR`);
      setSerie(resultado.data);
    } catch (error) {
      console.error("Erro ao buscar série:", error);
    }
  }

  return (
    <Pagina titulo={serie.name}>
      {serie.id && (
        <Row>
          <Col md={3}>
            <CardImg src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} />
          </Col>
          <Col md={9}>
            <p><b>Data de Lançamento:</b> {serie.first_air_date}</p>
            <p><b>Nota:</b> {serie.vote_average}</p>
            <p><b>Temporadas:</b> {serie.number_of_seasons}</p>
            <p><b>Episódios:</b> {serie.number_of_episodes}</p>
            <p><b>Sinopse:</b> {serie.overview}</p>
            <p><b>Gêneros:</b></p>
            <ul>
              {serie.genres && serie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </Col>
        </Row>
        
      )}
    </Pagina>
  );
}
