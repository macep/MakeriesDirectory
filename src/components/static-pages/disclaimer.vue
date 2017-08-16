<template>
  <div id="disclaimer" class="row page">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1">
      <h1 v-html="disclaimerData.title.rendered"/>
      <span v-html="disclaimerData.content.rendered"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'disclaimer-page',
    computed: {
      ...mapGetters(['pages']),
      disclaimerData () {
        return this.pages.find(item => item.id === Config.pagesIDs.disclaimer)
      }
    }
  }

</script>
