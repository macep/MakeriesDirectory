<template>
  <footer>
    <ul class="footer-menu">
      <li class="footer-menu-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="footer-menu-item">
        <router-link to="/sign-up-to-newsletter/">Sign up to newsletter</router-link>
      </li>
      <li class="footer-menu-item">
        <router-link to="/privacy-policy/">Privacy Policy</router-link>
      </li>
      <li class="footer-menu-item">
        <router-link to="/events-and-blog/">Disclaimer & Terms</router-link>
      </li>
      <li class="footer-menu-item">
        <router-link to="/maker-factory-sign-up/">Contact</router-link>
      </li>
    </ul>
    <p>&copy; JustGotMade.com {{year}}</p>
  </footer>
</template>

<script>
  export default {
    name: 'jgm-footer',
    data () {
      return {}
    },

    computed: {
      year () {
        return new Date().getFullYear()
      }
    }
  }
</script>
