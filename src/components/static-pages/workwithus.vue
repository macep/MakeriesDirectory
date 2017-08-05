<template>
  <div id="workwithus" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond text-uppercase" v-html="workwithusData.title.rendered"></h1>
      <div v-html="workwithusData.content.rendered"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'workwithus-page',
    data () {
      return {
        workwithusData: {
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
      apiService.getPage(11).then((response) => {
        this.workwithusData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
