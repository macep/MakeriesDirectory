<template>
  <div id="signup" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond text-uppercase" v-html="signupData.title.rendered"></h1>
      <div v-html="signupData.content.rendered"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'signup-page',
    data () {
      return {
        signupData: {
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
      apiService.getPage(112).then((response) => {
        this.signupData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
