// site  https://dev.twitch.tv/console/apps

// .env  NEXT_PUBLIC_CLIENT_ID=rdh4iuy0kwh1yyowjr3ekn1ucoladx
// . env  NEXT_PUBLIC_ACCESS_TOKEN=qb41epeg8ntzzfbjrz34h58v5bjlu5

const axios = require('axios');

async function getAccessToken() {
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: 'rdh4iuy0kwh1yyowjr3ekn1ucoladx',
        client_secret: 'ckbwi52pvfriqdqhx2kvfyp7xi5btc',
        grant_type: 'client_credentials'
      }
    });
    console.log('Access Token:', response.data.access_token);
  } catch (error) {
    console.error('Erro ao obter o token:', error.response ? error.response.data : error.message);
  }
}

getAccessToken();