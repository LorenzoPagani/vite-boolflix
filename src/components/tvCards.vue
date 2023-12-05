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
            console.log(import.meta.url);
            return new URL(`../assets/flags/${lang}.svg`, import.meta.url).href

        },
        getStars(vote) {
            return Math.ceil(vote / 2)
        }
    }
}
</script>
<template>
    <main>
        <div class="container">
            <div class="row">
                <div v-if="store.tvList.length > 0" class="col-12 mt-5">
                    <h2>Series</h2>
                </div>
                <div class="col-12 movie-wrapper">
                    <div v-for="show in store.tvList" class="card m-3">
                        <img class="card-img-top poster" :src="`https://image.tmdb.org/t/p/w342/${show.poster_path}`"
                            alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">{{ show.name }}</h5>
                            <h6 class="card-subtitle mb-2  ">Titolo originale: {{ show.original_name }}</h6>
                            <h6 class="card-subtitle mb-2  ">Lingua originale: {{ show.original_language }}</h6>
                            <i v-for="index in getStars(show.vote_average)" class="fa-solid fa-star" aria-hidden="true"></i>
                            <i v-for="index in (5 - getStars(show.vote_average))" class="fa-regular fa-star"></i>
                            <img :src="getflag(show.original_language)" alt="flag">
                            <p class="card-text">{{ show.overview }}</p>

                        </div>
                    </div>
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
    height: 40%;
    object-fit: contain;
    object-position: center;
}

.card {
    min-height: 450px;
    width: 300px;

    background-color: rgb(39, 37, 35);
    color: whitesmoke;
}

.card-body {
    height: 60%;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.card-body::-webkit-scrollbar {
    display: none;
}

p {
    font-size: .8em;
}

.movie-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    max-height: 500px;
}
</style>