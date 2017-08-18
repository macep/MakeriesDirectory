<template>
  <div id="workwithus" class="row page">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1">
      <h1 v-html="weekenderData.title.rendered"/>
      <span v-html="weekenderData.content.rendered"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'workwithus-page',
    computed: {
      ...mapGetters(['pages']),
      weekenderData () {
        return this.pages.find(item => item.id === Config.pagesIDs.weekender)
      }
    },
    metaInfo: {
      title: Config.titles.weekender
    }
  }
</script>
