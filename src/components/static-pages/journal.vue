<template>
  <div id="journal" class="row page">
    <div class="col-xs-12">
      <h1 v-html="journalData.title.rendered"/>
      <span v-html="journalData.content.rendered"/>
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
