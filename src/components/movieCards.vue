<script>
import { store } from '../store';

export default {
    data() {
        return {
            store
        }
    }
}
</script>
<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div v-for="movie in store.movieList" class="card m-3">
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted ">Titolo originale: {{ movie.original_title }}</h6>
                            <h6 class="card-subtitle mb-2 text-muted ">Lingua originale: {{ movie.original_language }}</h6>
                            <p class="card-text">{{ movie.overview }}</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped></style>