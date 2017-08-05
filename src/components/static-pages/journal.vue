<template>
  <div id="journal" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond text-uppercase" v-html="journalData.title.rendered"></h1>
      <div class="serif" v-html="journalData.content.rendered"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'journal-page',
    data () {
      return {
        journalData: {
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
      apiService.getPage(7).then((response) => {
        this.journalData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
