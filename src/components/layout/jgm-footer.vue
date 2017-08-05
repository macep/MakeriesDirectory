<template>
  <footer>
    <ul class="footer-social list-inline">
      <li>
        <a href="https://instagram.com/justgotmade/" target="_new">
          <i class="fa fa-instagram"/>
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/JustGotMade" target="_new">
          <i class="fa fa-facebook"/>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/Just_Got_Made" target="_new">
          <i class="fa fa-twitter"/>
        </a>
      </li>
      <li>
        <a href="http://the-dots.co.uk/justgotmade" target="_new">
          <i class="fa fa-snowflake-o"/>
        </a>
      </li>
    </ul>
    <ul class="footer-menu">
      <li v-for="link in secondaryMenu" :key="link.id" class="footer-menu-item">
        <router-link :to="makeRoute(link.url)">{{link.title}}</router-link>
      </li>
    </ul>
    <p>&copy; JustGotMade.com {{year}}</p>
  </footer>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {relativePath} from '../../modules/utils'

  export default {
    name: 'jgm-footer',
    computed: {
      ...mapGetters(['secondaryMenu', 'pages', 'hostName']),
      year () {
        return new Date().getFullYear()
      }
    },
    methods: {
      makeRoute (url) {
        return relativePath(url)
      }
    }
  }
</script>
