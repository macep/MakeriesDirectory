<template>
  <div id="about" class="row page">
    <div class="col-xs-12">
      <span v-html="aboutData.content.rendered"/>
      <span v-html="aboutMoreData.content.rendered"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'about-page',
    data () {
      return {
        aboutData: {
          content: {
            rendered: ''
          }
        },
        aboutMoreData: {
          content: {
            rendered: ''
          }
        }
      }
    },
    mounted () {
      apiService.getPage(2).then((response) => {
        this.aboutData = response.data
      })
      apiService.getPage(107).then((response) => {
        this.aboutMoreData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
