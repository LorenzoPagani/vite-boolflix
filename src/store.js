import { reactive } from 'vue'

export const store = reactive({
  searchInput: '',
  movieList: [],
  tvList: [],
  popMovieList: [],
  popTvList: [],
  vote: 3,
  movieCast: [],
  fiveActors: [],
  fiveTvActors: [],
})
