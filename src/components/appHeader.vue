<script>
import { store } from "../store.js";
export default {
    data() {
        return {
            store,
        }
    }
}
</script>
<template>
    <header>
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex justify-content-between p-3">
                    <a href="/" class="text-decoration-none navbar-brand">
                        <h1>Boolflix</h1>
                    </a>

                    <div class="col-md-3 d-flex">
                        <input class="rounded form-control" v-model="store.searchInput" @keyup.enter="$emit('search')"
                            type="text" placeholder="cerca">
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<style scoped>
header {
    background-color: black;
}

h1 {
    color: red;
}
</style>