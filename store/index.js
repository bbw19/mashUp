export const state = () => ({
    selected_cocktail: null,
    cocktails_autocomplete: null
})

export const mutations = {
    select_cocktail (state, cocktail) {
        state.selected_cocktail = cocktail
    },
    async set_cocktails_autocomplete (state, string) {

        const search = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=te'
        // const search = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + string.trim(string)
        // console.log(search)
        state.cocktails_autocomplete = await this.$axios.$get(search, {mode: 'no-cors'})
        console.log(state.cocktails_autocomplete)
    }
}

export const getters = {
    get_selected_cocktail: (state) => {
        return state.selected_cocktail
    },
    get_cocktails_autocomplete: (state) => state.cocktails_autocomplete
}