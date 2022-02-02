<template>
  <section class="section">

      <div v-if="loading == true" class="loading-block">
          <img src="~/assets/loading.gif">
          <p>We are mixing your drink...</p>
      </div>

      <div v-if="loading == false" class="tile is-ancestor tile-block">
          <div class="tile is-6 cocktail-tile">
              {{ cocktail.strDrink }}
              
              <div v-for="n in 10" :key="n">
                {{ cocktail[`strIngredient${n}`] }}
              </div>
              
              {{ cocktail.strIngredient }}
          </div>

          <div v-for="movie in selection" :key="movie.id" class="tile">
            <p>{{ movie.title }}</p>
          </div>
        
      </div>
    
  </section>
</template>

<script>
export default {
  name: 'Movies',
  layout: 'basic',
  data () {
      return {
        cocktail: null,
        movies: [],
        selection: null,
        loading: false
      }
  },
  methods: {
    checkRoute () {
      if (this.cocktail == null) {
          this.$router.push('/home')
      }
    }
  },
  async created () {
    this.cocktail = this.$store.getters.get_selected_cocktail
    // window.addEventListener('beforeunload', this.checkRoute)
    //   this.cocktail = this.$store.getters.get_selected_cocktail
    //   console.log(this.cocktail)
    //   if (this.cocktail == null) {
    //       this.$router.push('/home')
    //   }
  },
  async fetch() {
      this.loading = true
      // this.cocktail = this.$store.getters.get_selected_cocktail
      console.log(this.cocktail.strInstructions)
      if (this.cocktail == 'hello') {
          const name = this.cocktail.strDrink.split(' ')
        const arar = []
        for (let word of name) {
            const data = await this.$http.$get(`https://imdb-api.com/API/AdvancedSearch/k_9rmt8p4t?title=${word}`)
            arar.push(data.results)
        }
        this.movies = arar.flat()
        this.selection = arar.flat().sort(() => 0.5 - Math.random()).slice(0,5)
      }
      
      // console.log(this.movies)
      // console.log(this.selection)
      this.loading = false
  },
  computed: {
  }
}
</script>
