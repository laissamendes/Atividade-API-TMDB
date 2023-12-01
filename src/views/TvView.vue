<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import genreStore from '@/stores/genre'

const isLoading = ref(false);
const router = useRouter()
const genres = ref([])

onMounted(async () => {
  const response = await api.get('genre/tv/list?language=pt-BR')
  genres.value = response.data.genres
})
const TV = ref([]);
function openTV(TVId) {
  router.push({ name: 'MovieDetails', params: { TVId } });
}

const listTV = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/tv?language=pt-BR', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  console.log(response)
  TV.value = response.data.results
  isLoading.value = false;
};
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

  onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  isLoading.value = false
})
</script>

<template>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
      <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listTV(genre.id)" 
      class="genre-item"
    >
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />

  <div class="tv-list">
  <div v-for="tv in TV" :key="tv.id" class="tv-card">
    
    <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.title" @click="openTV(TV.id)"/>
    <div class="tv-details">
      <p class="tv-title">{{ tv.name}}</p>
      <p class="tv-original_name">{{ tv.original_name }}</p>
      <p class="tv-genres">
        <span v-for="genre_id in tv.genre_ids" :key="genre_id" @click="listTV(genre_id)">
    {{ genreStore.getGenreName(genre_id) }}
  </span>
</p>
    </div>
    
  </div>
</div>
</template>
  <style scoped>
  .genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    padding: 0;
  }
  
  .genre-item {
   background-color: #373b39;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    align-self: center;
    color: #fff;
    display: flex;
    justify-content: center;
  }
  
  .genre-item:hover {
    cursor: pointer;
  background-color: #4b4d4b;
  box-shadow: 0 0 0.5rem #151616;
  }
  .tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-name {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #6d6d6d;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #333333;
  box-shadow: 0 0 0.5rem #151616;
}
.tv-genres span:hover {
  cursor: pointer;
  background-color: #333333;
  box-shadow: 0 0 0.5rem #151616;
}

.active {
  background-color: #808080;
  font-weight: bolder;
}

.tv-genres span.active {
  background-color: #808080;
  color: #000;
  font-weight: bolder;
}

</style>