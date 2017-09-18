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
      if (this.pages.length > 0) {
        this.privacyData = this.pages.find(item => item.id === Config.pagesIDs.privacy)
      }
    },
    metaInfo: {
      title: Config.titles.privacyPolicy
    },
    watch: {
      pages () {
        if (this.pages.length > 0) {
          this.privacyData = this.pages.find(item => item.id === Config.pagesIDs.privacy)
        }
      }
    }
  }
</script>
