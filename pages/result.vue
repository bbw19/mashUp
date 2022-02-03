<template>
  <section class="section">

      <div v-if="loading == true" class="loading-block">
          <img src="~/assets/loading.gif">
      </div>

      <div v-if="loading == false" class="content-block">
          <div class="cocktail-block">

            <div class="cocktail-image">
              <img :src="cocktail.strDrinkThumb" alt="Image of Cocktail">
            </div>

            <div class="cocktail-title">
              <h3>
              {{ cocktail.strDrink }}
              </h3>
            </div>
              
              <div  class="cocktail-engridients">
                <h4>Stuff you need</h4>
                <ul>
                  <li v-for="n in getIngredients" :key="n">
                    <h4>
                    {{ n }}
                    </h4>
                  </li>
                </ul>
              </div>
              
              <div class="cocktail-instructions">
                <p>
                  {{ cocktail.strInstructions }}
                </p>
              </div>
          </div>

          <div class="movie-block">
            
          <div v-for="movie in selection" :key="movie.id" class="movie-card">
            <div class="movie-image">
              <img :src="movie.image" width="200px" height="200px">
            </div>
            <div class="movie-content">
              <div class="movie-title">
                <h4>{{ movie.title }}</h4>
              </div>
              <div class="movie-plot">
                <p>{{ movie.plot }}</p>
              </div>
              <div class="movie-genre">
                <small>{{ movie.genre }}</small>
              </div>
            </div>
          </div>

          </div>
        
      </div>
    
  </section>
</template>

<script>
export default {
  name: 'Result',
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
  },
  async created () {
    this.cocktail = this.$store.getters.get_selected_cocktail
  },
  async fetch() {
      this.loading = true
      // console.log(this.cocktail.strInstructions)
      if (this.cocktail != null) {
          const name = this.cocktail.strDrink.split(' ')
        const arar = []
        for (let word of name) {
            const data = await this.$http.$get(`https://imdb-api.com/API/AdvancedSearch/k_9rmt8p4t?title=${word}`)
            arar.push(data.results)
        }
        this.movies = arar.flat()
        this.selection = arar.flat().sort(() => 0.5 - Math.random()).slice(0,5)
      }
      this.loading = false
  },
  computed: {
    getIngredients () {
      let ing = [];
      for (let i = 1; i < 15; i++) {
        // console.log(this.cocktail[`strIngredient${i}`])
        if (this.cocktail[`strIngredient${i}`] != null) {
          ing.push(this.cocktail[`strIngredient${i}`])
        }
      }
      return ing
    }
  }
}
</script>
