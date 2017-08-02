<template>
  <div id="directory" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond">directory</h1>
    </div>
  </div>
</template>

<script>
//  import apiService from '../../api/app.service'

  export default {
    name: 'jgm-directory',
    mounted () {
      // big bang
      console.log('Calling .NET API...')
//      apiService.callDotNetApi('api/makers/GetByGroupId/3').then((data) => {
//        console.log('Directory data: ', data)
//      })
    }
  }
</script>
