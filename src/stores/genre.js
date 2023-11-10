import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useGenreStore = defineStore('genre', () => {
  const state = reactive({
    genres: [],
    currentGenreId: null,
  });
  
  const genres = computed(() => state.genres)
//   const getGenreName = (id) => state.genres.find((genre) => genre.id === id).name

  function getGenreName(id) {
    for (let genre in state.genres) {
        if(genre.id == id) {
            console.log(genre)
            return genre.name;
        }
    }
  }

  const currentGenreId = computed(() => state.currentGenreId);

const setCurrentGenreId = (genreId) => {
  state.currentGenreId = genreId;
};

  const getAllGenres = async (type) => {
    const response = await api.get(`genre/${type}/list?language=pt-BR`)
    state.genres = response.data.genres
    console.log(state.genres)
  }

  return { genres, getAllGenres, getGenreName, currentGenreId, setCurrentGenreId }
})

const genreStore = useGenreStore()
export default genreStore


