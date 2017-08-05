<template>
  <div id="about" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond">{{aboutPage.title}}</h1>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'jgm-menu',
    computed: {
      ...mapGetters(['pages']),
      aboutPage () {
        return apiService.getPage(2).then((response) => {
          return response.data
        })
      }
    }
  }
</script>
