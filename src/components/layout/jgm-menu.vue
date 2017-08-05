<template>
  <nav>
    <a class="nav-toggle" @click="toggleMenu">
      <span/><span/><span/>
    </a>
    <div :class="{ 'nav-menu': true, 'is-active': isMenuActive }">
      <span @click="closeMenu" v-for="link in mainMenu" :key="link.id" class="nav-item">
        <router-link :to="makeRoute(link.url)">{{link.title}}</router-link>
      </span>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {relativePath} from '../../modules/utils'

  export default {
    name: 'jgm-menu',
    data () {
      return {
        isMenuActive: false
      }
    },
    mounted () {
      this.pages.forEach(item => {
        console.log(item.id, item.title.rendered)
      })
    },
    computed: {
      ...mapGetters(['mainMenu', 'pages', 'hostName'])
    },
    methods: {
      toggleMenu () {
        this.isMenuActive = !this.isMenuActive
      },
      closeMenu () {
        this.isMenuActive = false
      },
      makeRoute (url) {
        return relativePath(url)
      }
    }
  }
</script>
