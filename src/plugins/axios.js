import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODFmZTc4ZTYwODlmOWYxNDYyZjhhN2Y4YzEzODYwMCIsInN1YiI6IjY1MDQ2N2Y3ZWEzN2UwMDBlM2E1NDBlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lfXqdflgZkcGmd18uYBHOc-I04khF26IIkqLAfcL_RY`
  }
})

export default api
