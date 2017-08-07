<template>
  <div id="signup" class="row page">
    <div class="col-xs-12">
      <h1 v-html="signupData.title.rendered"/>
      <span v-html="signupData.content.rendered"/>
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
