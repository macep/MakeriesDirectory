<template>
  <div id="about" class="row page">
    <div class="col-xs-12">
      <h1 v-html="aboutData.title.rendered"/>
      <span v-html="aboutData.content.rendered"/>
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
