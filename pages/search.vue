<template>
  <section class="section">

     <p class="content"><b>Selected:</b></p>
      <b-field label="Find a cocktail">
          <b-autocomplete
              v-model="cocktail_selected"
              placeholder="Type in the name of a cocktail you like"
              :data="cocktails_autocomplete_data.drinks"
              field="strDrink"
              @select="option => (selected = option)"
              @typing="update_cocktails"
          >
          </b-autocomplete>
          <p class="control">
            <b-button class="button is-primary">Search</b-button>
          </p>
      </b-field>

      <b-field label="Simple">
          <b-select placeholder="Select a name">
              <option
                  v-for="option in genres"
                  :value="option.id"
                  :key="option.id">
                  {{ option }}
              </option>
          </b-select>
      </b-field>

      <b-field label="Drinks">
          <b-select placeholder="Select a drink">
              <option
                  v-for="option in drink_categories.drinks"
                  :value="option.id"
                  :key="option.id">
                  {{ option.strIngredient1 }}
              </option>
          </b-select>
      </b-field>
    
  </section>
</template>

<script>
export default {
  name: 'Search',
  layout: 'BasicLayout',
  data () {
      return {
        cocktail_selected: '',
        cocktails_autocomplete_data: [],


        data: [],
        genres: [
          'Horror',
          'Drama',
          'Comedy',
          'Mystery'
        ],
        drink_categories: []
      }
  },
  methods: {
    async update_cocktails (name) {
      this.cocktails_autocomplete_data = await this.$http.$get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
      console.log(this.cocktail_selected)
    }
  },
  mounted () {
      // console.log(this.data)
      // console.log(this.drink_categories.drinks)
  },
  async fetch() {
    this.drink_categories = await this.$http.$get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
      {
        mode: 'no-cors'
      })


    this.data = await this.$http.$get('https://imdb-api.com/API/AdvancedSearch/k_9rmt8p4t?genres=mystery&plot=Gin',
      {
        mode: 'no-cors',
        headers: {
          'api_key': 'd5d6b6b082f51b7059b233ba32cf3634',
          'query': 'Fat'
        }
      })
  },
  computed: {
    filteredDataObj() {
      this.$store.commit('set_cocktails_autocomplete', this.cocktail_selected)
      console.log(this.$store.getters.get_cocktails_autocomplete)
      return this.$store.getters.get_cocktails_autocomplete
    }
  }
}
</script>
