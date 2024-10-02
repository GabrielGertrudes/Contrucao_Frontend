import axios from "axios";

const apiCopa = axios.create({
    baseURL: " https://my-json-server.typicode.com/gustavoclay/sport"
})

export default apiCopa