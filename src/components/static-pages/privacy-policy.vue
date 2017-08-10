<template>
  <div id="privacy" class="row page">
    <div class="col-xs-10 col-xs-offset-1">
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
    computed: {
      ...mapGetters(['pages']),
      privacyData () {
        return this.pages.find(item => item.id === Config.pagesIDs.privacy)
      }
    }
  }
</script>
