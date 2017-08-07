<template>
  <div id="disclaimer" class="row page">
    <div class="col-xs-12">
      <h1 v-html="disclaimerData.title.rendered"/>
      <span v-html="disclaimerData.content.rendered"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

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
    mounted () {
      apiService.getPage(21).then((response) => {
        this.disclaimerData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
