<template>
  <div>
    <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>Just Got Made</strong> by <a target="_new" rel="noopener" href="https://www.linkedin.com/in/cristimaghiar/">Cristian Maghiar</a>.
        </p>
      </div>
    </div>
    </footer>
  </div>
</template>
<script>
let Config = require('../app.config.js')
export default {
  name: 'app-footer',
  data: () => {
    return {
      wpDomain: ''
    }
  },
  created () {
    this.wpDomain = Config.wpDomain
  }
}
</script>
