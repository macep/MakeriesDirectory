<template>
  <div id="privacy" class="row page">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1">
      <h1 v-html="privacyData.title.rendered"/>
      <span v-html="privacyData.content.rendered"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/api.service'
  import Config from '../../api/app.config'

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
    computed: {
      ...mapGetters(['pages'])
    },
    mounted () {
      apiService.getPage(Config.pagesIDs.privacy).then((response) => {
        this.privacyData = response.data
      })
    },
    metaInfo: {
      title: Config.titles.privacyPolicy
    }
  }
</script>
