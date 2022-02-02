<template>
  <section class="section">

     <p class="content"><b>Selected:</b>{{ selected }}</p>
      <b-field label="Find a cocktail">
          <b-autocomplete
              v-model="cocktail_selected"
              placeholder="Type in the name of a cocktail you like"
              :data="cocktails_autocomplete_data.drinks"
              field="strDrink"
              max-height="500px"
              @select="option => update_option(option)"
              @typing="update_cocktails"
          >

          <template slot-scope="props">
                    <div class="media">
                        <div class="media-left">
                            <img width="200" :src="`${props.option.strDrinkThumb}`">
                        </div>
                        <div class="media-content">
                            {{ props.option.strDrink }}
                            <br>
                            <small>
                                {{ props.option.strCategory }},
                                <b>{{ props.option.strAlcoholic }}</b>
                            </small>
                        </div>
                    </div>
                </template>

          </b-autocomplete>
      </b-field> 
         
  </section>
</template>

<script>
export default {
  name: 'Search',
  layout: 'basic',
  data () {
      return {
        selected: null,
        cocktail_selected: '',
        cocktails_autocomplete_data: [],

      }
  },
  methods: {
    async update_cocktails (name) {
      this.cocktails_autocomplete_data = await this.$http.$get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
      console.log(this.cocktails_autocomplete_data)
    },
    update_option (option) {
        this.$store.commit('select_cocktail', option)
        this.$router.push('/result')
        this.selected = option
    }
  },
  mounted () {
  },
  async fetch() {
  },
  computed: {
  }
}
</script>
