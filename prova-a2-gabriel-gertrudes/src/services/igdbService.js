// services/igdbService.js
import axios from 'axios';

export const buscarJogoDetalhes = async (nomeDoJogo) => {
  try {
    const response = await axios.post('/api/igdb', {
      query: `fields name, release_dates.y, genres.name, cover.url, summary; search "${nomeDoJogo}"; limit 5;`,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do jogo:', error);
    return [];
  }
};
