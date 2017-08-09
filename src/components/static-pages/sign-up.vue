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
  import Config from '../../api/app.config'

  export default {
    name: 'signup-page',
    computed: {
      ...mapGetters(['pages']),
      signupData () {
        return this.pages.find(item => item.id === Config.pagesIDs.signup)
      }
    }
  }
</script>
