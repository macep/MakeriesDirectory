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
  import apiService from '../../api/api.service'
  import Config from '../../api/app.config'

  export default {
    name: 'disclaimer-page',
    data () {
      return {
        disclaimerData: {
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
      apiService.getPage(Config.pagesIDs.disclaimer).then((response) => {
        this.disclaimerData = response.data
      })
    },
    metaInfo: {
      title: Config.titles.disclaimer
    }
  }

</script>
