<template>
  <div id="app">
    <Menu />
    <IndexPage />
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import IndexPage from './components/IndexPage.vue'

export default {
  name: 'App',
  components: {
    Menu,
    IndexPage
  }
}
</script>

<style>
/* Ajoutez du CSS global ici si nécessaire */
</style>
