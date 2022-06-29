<template>
  <div class="app-wrapper-nav" >
    <navigation class="sidebar-container1"></navigation>
    <div class="main-container1">
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
