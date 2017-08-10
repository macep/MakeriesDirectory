<template>
  <footer>
    <ul class="footer-social list-inline">
      <li>
        <a href="https://instagram.com/justgotmade/" target="_new">
          <i class="icon-instagram"/>
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/JustGotMade" target="_new">
          <i class="icon-facebook"/>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/Just_Got_Made" target="_new">
          <i class="icon-twitter"/>
        </a>
      </li>
      <li>
        <a href="http://the-dots.co.uk/justgotmade" target="_new">
          <i class="icon-snowflake-o"/>
        </a>
      </li>
    </ul>
    <ul class="footer-menu">
      <li v-for="link in secondaryMenu" :key="link.id" class="footer-menu-item">
        <router-link v-if="link.pathType === 'relative'" :to="link.url">{{link.title}}</router-link>
        <a v-else :href="link.url" target="_new">{{link.title}}</a>
      </li>
    </ul>
    <p>&copy; {{copy}}</p>
  </footer>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'jgm-footer',
    computed: {
      ...mapGetters(['secondaryMenu', 'pages', 'hostName']),
      copy () {
        return Config.appTitle + ' ' + new Date().getFullYear()
      }
    }
  }
</script>
