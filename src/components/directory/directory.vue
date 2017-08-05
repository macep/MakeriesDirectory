<template>
  <div id="directory" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond text-uppercase" v-html="directoryData.title.rendered"></h1>
      <div class="serif" v-html="directoryData.content.rendered"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'directory-page',
    data () {
      return {
        directoryData: {
          title: {
            rendered: ''
          },
          content: {
            rendered: ''
          }
        }
      }
    },
    mounted () {
      apiService.getPage(5).then((response) => {
        this.directoryData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
