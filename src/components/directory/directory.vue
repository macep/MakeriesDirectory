<template>
  <div id="directory" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond">directory</h1>
    </div>
  </div>
</template>

<script>
  import apiService from '../../api/app.service'

  export default {
    name: 'jgm-directory',
    data () {
      return {}
    },
    mounted () {
      // big bang
      console.log('loading directory data...')
      apiService.callDotNetApi('api/makers/GetByGroupId/3').then((data) => {
        console.log('directory data is here: ', data)
      })
    },
    computed: {}
  }
</script>
