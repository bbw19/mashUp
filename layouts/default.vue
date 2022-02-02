<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
      centered
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/search"
        >
          <h1>Movie-Colada</h1>
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns" style="height:100%">
      <aside class="column is-2 section" style="background-color:pink;height:100%">
        
      </aside>

      <div class="container column is-8">
        <Nuxt />
      </div>

      <aside class="column is-2 section" style="background-color:green;height:100%">
        
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
