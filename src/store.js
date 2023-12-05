import { reactive } from 'vue'

export const store = reactive({
  searchInput: '',
  movieList: [],
  tvList: [],
  vote: 3
})
