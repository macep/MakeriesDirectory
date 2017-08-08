<template>
  <div id="workwithus" class="row page">
    <div class="col-xs-12">
      <h1 v-html="workwithusData.title.rendered"/>
      <span v-html="workwithusData.content.rendered"/>
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
      workwithusData () {
        return this.pages.find(item => {
          return item.id === Config.pagesIDs.workwithusData
        })
      }
    }
  }
</script>
