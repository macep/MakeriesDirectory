<template>
  <nav>
    <a class="nav-toggle" @click="toggleMenu">
      <span/><span/><span/>
    </a>
    <div :class="{ 'nav-menu': true, 'is-active': isMenuActive }">
      <span @click="closeMenu" v-for="link in mainMenu" :key="link.id" class="nav-item">
        <router-link :to="link.url">{{link.title}}</router-link>
      </span>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'jgm-menu',
    data () {
      return {
        isMenuActive: false
      }
    },
    computed: {
      ...mapGetters(['mainMenu'])
    },
    methods: {
      toggleMenu () {
        this.isMenuActive = !this.isMenuActive
      },
      closeMenu () {
        this.isMenuActive = false
      }
    }
  }
</script>
