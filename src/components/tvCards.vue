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
                        <div class="card-body">
                            <h5 class="card-title">{{ show.name }}</h5>
                            <h6 class="card-subtitle mb-2  ">Titolo originale: {{ show.original_name }}</h6>
                            <h6 class="card-subtitle mb-2  ">Lingua originale: {{ show.original_language }}</h6>
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

.card {
    min-height: 450px;
    width: 300px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-color: rgb(39, 37, 35);
    color: whitesmoke;
}

.card::-webkit-scrollbar {
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