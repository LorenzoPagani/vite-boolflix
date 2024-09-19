<script>
import { store } from './store.js'
import appHeader from './components/appHeader.vue'
import AppCards from './components/AppCards.vue'
import axios from 'axios'


export default {
    components: {
        appHeader,
        AppCards
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
            },
            popMovieOptions: {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/popular',
                params: { language: 'it-IT', page: '1', },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRkMDAzMjg2ZjYwYjQ2OWMzNmIwZDhmZjM1NWY2NSIsInN1YiI6IjY1NmVkY2VjODg2MzQ4MDBjOWUyYzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4H-JapxVCb6usROrLw6E2EP2oy7tYrrtThkISi8jb2M'
                }
            },
            popTvOptions: {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/tv/popular',
                params: { language: 'it-IT', page: '1', },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRkMDAzMjg2ZjYwYjQ2OWMzNmIwZDhmZjM1NWY2NSIsInN1YiI6IjY1NmVkY2VjODg2MzQ4MDBjOWUyYzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4H-JapxVCb6usROrLw6E2EP2oy7tYrrtThkISi8jb2M'
                }
            },

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
                        array.push(response.data.cast[index]?.name)
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
        getPopMovies() {
            store.popMovieList = []
            axios.request(this.popMovieOptions).then(function (response) {
                store.popMovieList.push(...response.data.results)
            })
                .catch(function (error) {
                    console.error(error);
                })
        },
        getPopTv() {
            store.popTvList = []
            axios.request(this.popTvOptions).then(function (response) {
                store.popTvList.push(...response.data.results)
            })
                .catch(function (error) {
                    console.error(error);
                })
        },


    },
    mounted() {
        this.getPopMovies(),
            this.getPopTv()
    }
}


</script>

<template>
    <appHeader @search="() => { getMovies(); getTvShows(); }"></appHeader>
    <main>
        <template v-if="!store.movieList.length && !store.tvList.length">
            <h1 class="text-center text-white mt-5">Usa la barra di
                ricerca per trovare Film
                e Serie TV!</h1>
            <appCards title="Film Popolari" :movies="store.popMovieList"></appCards>
            <appCards title="Serie Popolari" :movies="store.popTvList"></appCards>
        </template>
        <appCards title="Film" :movies="store.movieList"></appCards>
        <appCards title="Serie" :movies="store.tvList"></appCards>
    </main>
</template>

<style scoped></style>
