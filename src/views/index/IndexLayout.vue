<template>
  <div class="app-wrapper" :class="classObj">
    <navigation class="sidebar-container"></navigation>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { navigation,  AppMain } from './components'

export default {
  name: 'IndexLayout',
  components: {
    navigation,
    AppMain
  }
}
</script>

<style >

</style>
