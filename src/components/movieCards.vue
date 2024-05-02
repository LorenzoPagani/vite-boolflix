<script>
import { store } from '../store';

export default {
    data() {
        return {
            store,

        }
    },
    methods: {
        getflag(lang) {
            return new URL(`../assets/flags/${lang}.svg`, import.meta.url).href
        },
        getStars(vote) {
            return Math.ceil(vote / 2)
        },
        FWDScroll() {
            const container = document.getElementById("movie-container");
            container.scrollTo({
                left: container.scrollLeft + 1000,
                behavior: 'smooth'
            });
        },
        backScroll() {
            const container = document.getElementById("movie-container");
            container.scrollTo({
                left: container.scrollLeft - 1000,
                behavior: 'smooth'
            });
        },

    }
}
</script>
<template>
    <main>
        <div class="container-fluid">

            <div class="row">
                <div v-if="store.movieList.length" class="col-12 mt-5">
                    <h2 class="text-white text-center">Movies</h2>
                </div>
                <div class="col-1 d-flex align-items-center justify-content-center">
                    <button class="btn btn-outline-danger d-none d-md-block" @click="backScroll"
                        v-if="store.movieList.length"><i class="fa-solid fa-caret-left"></i></button>
                </div>
                <div id="movie-container" class="col-10 movie-wrapper overflow-md-hidden">
                    <div v-for="(movie, i) in store.movieList" class=" flip-card m-3">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img class="card-img-top poster"
                                    :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`"
                                    :alt="`${movie.title}`">

                            </div>
                            <div class="flip-card-back">

                                <h5 class="card-title">{{ movie.title }}</h5>
                                <h6 class="card-subtitle mb-2  ">Titolo originale: {{ movie.original_title }}</h6>
                                <h6 class="card-subtitle mb-2  ">Lingua originale: {{ movie.original_language }}</h6>
                                <i v-for="index in getStars(movie.vote_average)" class="text-warning  fa-solid fa-star"
                                    aria-hidden="true"></i>
                                <i v-for="index in (5 - getStars(movie.vote_average))"
                                    class="text-warning fa-regular fa-star"></i>
                                <img :src="getflag(movie.original_language)" alt="flag">
                                <button @click="getCast(movie.id)"></button>
                                <div class="mb-3">

                                    <li class="list-unstyled" v-for="actor in store.fiveActors[i]">{{ actor }} </li>
                                </div>


                                <!--  <p v-for="actor in store.movieCast[i]">{{ actor.name }}</p> -->
                                <!-- <p v-if="store.movieCast[i].length" v-for="n in 5">
                                    <template v-if="store.movieCast[i][n - 1]">
                                        {{ store.movieCast[i][n - 1].name }}
                                    </template>
</p> -->
                                <p class="card-text">{{ movie.overview }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-1 d-flex align-items-center justify-content-center">
                    <button class="btn btn-outline-danger d-none d-md-block" v-if="store.movieList.length"
                        @click="FWDScroll"><i class="fa-solid fa-caret-right"></i></button>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
img {
    width: 50px;
}

.poster {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    border-radius: 20px;
}

.flip-card {
    min-height: 450px;
    width: 300px;
    color: whitesmoke;
    perspective: 1000px;

}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.flip-card-front {
    background-color: rgb(39, 37, 35);
    color: white;
    border-radius: 20px;
}


.flip-card-back {
    background-color: rgb(39, 37, 35);
    color: white;
    transform: rotateY(180deg);
    border-radius: 20px;
    padding: 10px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.flip-card-back::-webkit-scrollbar {
    display: none;
}

p {
    font-size: .8em;
}

.movie-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow: auto;
    transition: 2s;
    max-height: 500px;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.movie-wrapper::-webkit-scrollbar {
    display: none;
}
</style>