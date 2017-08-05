<template>
  <div id="privacy" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond text-uppercase" v-html="privacyData.title.rendered"></h1>
      <div v-html="privacyData.content.rendered"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'privacy-page',
    data () {
      return {
        privacyData: {
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
      apiService.getPage(19).then((response) => {
        this.privacyData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
