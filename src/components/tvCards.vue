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
            const container = document.getElementById("series-container");
            container.scrollTo({
                left: container.scrollLeft + 1000,
                behavior: 'smooth'
            });
        },
        backScroll() {
            const container = document.getElementById("series-container");
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
                <div v-if="store.tvList.length > 0" class="col-12 mt-5">
                    <h2 class="text-white text-center">Series</h2>
                </div>
                <div class="col-1 d-flex align-items-center justify-content-center">
                    <button class="btn btn-outline-danger d-none d-md-block" @click="backScroll"
                        v-if="store.tvList.length"><i class="fa-solid fa-caret-left"></i></button>
                </div>
                <div id="series-container" class="col-10 movie-wrapper">
                    <div v-for="show in store.tvList" class="flip-card m-3">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <img class="card-img-top poster"
                                    :src="`https://image.tmdb.org/t/p/w342/${show.poster_path}`" :alt="`${show.name}`">
                            </div>
                            <div class="flip-card-back">
                                <h5 class="card-title">{{ show.name }}</h5>
                                <h6 class="card-subtitle mb-2  ">Titolo originale: {{ show.original_name }}</h6>
                                <h6 class="card-subtitle mb-2  ">Lingua originale: {{ show.original_language }}</h6>
                                <i v-for="index in getStars(show.vote_average)" class="fa-solid fa-star"
                                    aria-hidden="true"></i>
                                <i v-for="index in (5 - getStars(show.vote_average))" class="fa-regular fa-star"></i>
                                <img :src="getflag(show.original_language)" alt="flag">
                                <p class="card-text">{{ show.overview }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-1 d-flex align-items-center justify-content-center">
                    <button class="btn btn-outline-danger d-none d-md-block" v-if="store.tvList.length"
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