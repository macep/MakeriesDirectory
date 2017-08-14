<template>
  <nav>
    <span v-for="link in mainMenu" :key="link.id" class="nav-item">
      <router-link :to="link.url">{{link.title}}</router-link>
    </span>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'jgm-menu',
    computed: {
      ...mapGetters(['mainMenu'])
    }
  }
</script>
