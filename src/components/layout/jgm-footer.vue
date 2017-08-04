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
      <li class="footer-menu-item">
        <router-link to="/sign-up-to-newsletter/">Sign up to newsletter</router-link>
      </li>
      <li class="footer-menu-item">
        <router-link to="/privacy-policy/">Privacy Policy</router-link>
      </li>
      <li class="footer-menu-item">
        <router-link to="/disclaimer-and-terms/">Disclaimer & Terms</router-link>
      </li>
      <li class="footer-menu-item">
        <router-link to="/contact/">Contact</router-link>
      </li>
    </ul>
    <p>&copy; JustGotMade.com {{year}}</p>
  </footer>
</template>

<script>
  export default {
    name: 'jgm-footer',
    computed: {
      year () {
        return new Date().getFullYear()
      }
    }
  }
</script>
