<script>
import { store } from './store.js'
import appHeader from './components/appHeader.vue'
import movieCards from './components/movieCards.vue'
import tvCards from './components/tvCards.vue'
import axios from 'axios'


export default {
    components: {
        appHeader,
        movieCards,
        tvCards
    },
    data() {
        return {
            store,
            movieOptions: {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/search/movie',
                params: { query: store.searchInput, include_adult: 'false', language: 'it-IT', page: '1' },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRkMDAzMjg2ZjYwYjQ2OWMzNmIwZDhmZjM1NWY2NSIsInN1YiI6IjY1NmVkY2VjODg2MzQ4MDBjOWUyYzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4H-JapxVCb6usROrLw6E2EP2oy7tYrrtThkISi8jb2M'
                }
            },
            tvOptions: {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/search/tv',
                params: { query: store.searchInput, include_adult: 'false', language: 'it-IT', page: '1' },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRkMDAzMjg2ZjYwYjQ2OWMzNmIwZDhmZjM1NWY2NSIsInN1YiI6IjY1NmVkY2VjODg2MzQ4MDBjOWUyYzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4H-JapxVCb6usROrLw6E2EP2oy7tYrrtThkISi8jb2M'
                }
            }
        }
    },
    methods: {
        getCredits(id, i) {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/movie/${id}/credits`,
                params: { language: 'en-US' },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRkMDAzMjg2ZjYwYjQ2OWMzNmIwZDhmZjM1NWY2NSIsInN1YiI6IjY1NmVkY2VjODg2MzQ4MDBjOWUyYzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4H-JapxVCb6usROrLw6E2EP2oy7tYrrtThkISi8jb2M'
                }
            };
            axios
                .request(options)
                .then(function (response) {
                    /* soluzione 1 */
                    /*  store.movieCast.push(response.data.cast) */
                    /* soluzione 2 */
                    const array = []
                    for (let index = 0; index < 5; index++) {
                        array.push(response.data.cast[index].name)
                    }
                    store.fiveActors[i] = array
                    /* soluzione 3 */
                    /* store.movieCast[i] = (response.data.cast) */

                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        getMovies() {
            store.movieList = []
            this.movieOptions.params.query = store.searchInput
            axios.request(this.movieOptions)
                .then((response) => {
                    store.movieList.push(...response.data.results)
                    store.movieCast = []
                    response.data.results.forEach((element, i) => {
                        this.getCredits(element.id, i)
                    });
                    console.log(store.movieCast);
                    console.log(store.fiveActors);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getTvShows() {
            store.tvList = []
            this.tvOptions.params.query = store.searchInput
            axios.request(this.tvOptions).then(function (response) {
                store.tvList.push(...response.data.results)

            })
                .catch(function (error) {
                    console.error(error);
                })
        },


    }
}


</script>

<template>
    <appHeader @search="() => { getMovies(); getTvShows(); }"></appHeader>
    <main>
        <h1 class="text-center text-white mt-5" v-if="!store.movieList.length">Usa la barra di ricerca per trovare Film
            e Serie TV!</h1>
        <movieCards></movieCards>
        <tvCards></tvCards>
    </main>
</template>

<style scoped></style>
