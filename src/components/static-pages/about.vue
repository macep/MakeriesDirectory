<template>
  <div id="about" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond text-uppercase" v-html="aboutData.title.rendered"></h1>
      <div v-html="aboutData.content.rendered"></div>
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
      apiService.getPage(2).then((response) => {
        this.aboutData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
