import axios from 'axios';

console.log(process.env.NEXT_PUBLIC_TMDB_API_KEY)

const apiFilmes = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY
    }
})

export default apiFilmes