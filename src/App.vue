<script >
import { store } from './store.js'
import appHeader from './components/appHeader.vue'
import movieCards from './components/movieCards.vue'
import axios from 'axios'


export default {
    components: {
        appHeader,
        movieCards
    },
    data() {
        return {
            store,
            options: {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/search/movie',
                params: { query: store.searchInput, include_adult: 'false', language: 'it-IT', page: '1' },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRkMDAzMjg2ZjYwYjQ2OWMzNmIwZDhmZjM1NWY2NSIsInN1YiI6IjY1NmVkY2VjODg2MzQ4MDBjOWUyYzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4H-JapxVCb6usROrLw6E2EP2oy7tYrrtThkISi8jb2M'
                }
            },




        }
    },
    methods: {
        getMovies() {
            store.movieList = []
            this.options.params.query = store.searchInput
            axios.request(this.options)
                .then(function (response) {
                    store.movieList.push(...response.data.results)
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }
}

/* api key: 41dd003286f60b469c36b0d8ff355f65 
access token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRkMDAzMjg2ZjYwYjQ2OWMzNmIwZDhmZjM1NWY2NSIsInN1YiI6IjY1NmVkY2VjODg2MzQ4MDBjOWUyYzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4H-JapxVCb6usROrLw6E2EP2oy7tYrrtThkISi8jb2M*/
</script>

<template>
    <appHeader @search="getMovies"></appHeader>
    <main>
        <movieCards></movieCards>
    </main>
</template>

<style scoped></style>
