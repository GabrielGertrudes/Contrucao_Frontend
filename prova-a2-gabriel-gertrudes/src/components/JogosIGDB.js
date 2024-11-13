// components/JogosIGDB.js
import React, { useState } from 'react';
import { buscarJogoDetalhes } from '@/services/igdbService';

const JogosIGDB = ({ nomeDoJogo }) => {
  const [jogoDetalhes, setJogoDetalhes] = useState(null);

  const buscarDetalhes = async () => {
    try {
      const detalhes = await buscarJogoDetalhes(nomeDoJogo);
      setJogoDetalhes(detalhes);
    } catch (error) {
      console.error('Erro ao buscar detalhes do jogo:', error);
    }
  };

  return (
    <div>
      <h4>Busca por: {nomeDoJogo}</h4>
      <button onClick={buscarDetalhes}>Buscar Detalhes</button>
      {jogoDetalhes && (
        <div className="mt-4">
          <h5>{jogoDetalhes.name}</h5>
          {jogoDetalhes.release_dates && (
            <p><strong>Ano de Lançamento:</strong> {jogoDetalhes.release_dates[0].y}</p>
          )}
          {jogoDetalhes.genres && (
            <p><strong>Gênero:</strong> {jogoDetalhes.genres[0].name}</p>
          )}
          <p><strong>Descrição:</strong> {jogoDetalhes.summary || 'Descrição não disponível.'}</p>
          {jogoDetalhes.cover && (
            <img src={jogoDetalhes.cover.url.replace('t_thumb', 't_cover_big')} alt={jogoDetalhes.name} />
          )}
        </div>
      )}
    </div>
  );
};

export default JogosIGDB;
