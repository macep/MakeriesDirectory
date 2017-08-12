<script>
  export default {
    name: 'page-not-found-page',
    template: '',
    created () {
      window.location.href = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/static/404.html'
    }
  }
</script>
