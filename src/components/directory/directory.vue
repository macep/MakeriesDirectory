<template>
  <div id="directory" class="row page">
    <div class="col-xs-12">
      <h1 v-html="directoryData.title.rendered"/>
      <span v-html="directoryData.content.rendered"/>
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
