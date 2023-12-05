<script >
import { store } from './store.js'
import appHeader from './components/appHeader.vue'
export default {
    components: {
        appHeader
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <appHeader></appHeader>
</template>

<style scoped></style>
