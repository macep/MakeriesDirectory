<template>
  <div id="signup" class="row page">
    <div class="col-xs-12">
      <span class="hereshow" v-html="signupData.content.rendered"/>
    </div>

    <div class="col-xs-12 col-sm-10 col-sm-offset-1 step">
      <div class="row">
        <div class="col-xs-3 col-sm-2">
          <starred-item :text="1"/>
        </div>
        <div class="col-xs-9 col-sm-10">
          <span class="hereshow" v-html="stepOneData.content.rendered"/>
        </div>
      </div>
    </div>

    <div class="col-xs-12 col-sm-10 col-sm-offset-1 step">
      <div class="row">
        <div class="col-xs-3 col-sm-2">
          <starred-item :text="2"/>
        </div>
        <div class="col-xs-9 col-sm-10">
          <span class="hereshow" v-html="stepTwoData.content.rendered"/>
        </div>
      </div>
    </div>

    <div class="col-xs-12 col-sm-10 col-sm-offset-1 step">
      <div class="row">
        <div class="col-xs-3 col-sm-2">
          <starred-item :text="3"/>
        </div>
        <div class="col-xs-9 col-sm-10">
          <span class="hereshow" v-html="stepThreeData.content.rendered"/>
        </div>
      </div>
    </div>

    <div class="col-xs-12 col-sm-10 col-sm-offset-1 step">
      <div class="sign-up-form" v-html="signUpFormData.content.rendered"/>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import starredItem from '../common/starred-item.vue'

  export default {
    name: 'signup-page',
    components: {starredItem},
    data () {
      return {
        signupData: {
          content: {
            rendered: ''
          }
        },
        stepOneData: {
          content: {
            rendered: ''
          }
        },
        stepTwoData: {
          content: {
            rendered: ''
          }
        },
        stepThreeData: {
          content: {
            rendered: ''
          }
        },
        signUpFormData: {
          content: {
            rendered: ''
          }
        }
      }
    },
    computed: {
      ...mapGetters(['pages'])
    },
    mounted () {
      if (this.pages.length > 0) {
        this.signupData = this.pages.find(item => item.id === Config.pagesIDs.signup)
        this.stepOneData = this.pages.find(item => item.id === Config.pagesIDs.step1)
        this.stepTwoData = this.pages.find(item => item.id === Config.pagesIDs.step2)
        this.stepThreeData = this.pages.find(item => item.id === Config.pagesIDs.step3)
        this.signUpFormData = this.pages.find(item => item.id === Config.pagesIDs.signupForm)
      }
    },
    metaInfo: {
      title: Config.titles.signUp
    },
    watch: {
      pages () {
        if (this.pages.length > 0) {
          this.signupData = this.pages.find(item => item.id === Config.pagesIDs.signup)
          this.stepOneData = this.pages.find(item => item.id === Config.pagesIDs.step1)
          this.stepTwoData = this.pages.find(item => item.id === Config.pagesIDs.step2)
          this.stepThreeData = this.pages.find(item => item.id === Config.pagesIDs.step3)
          this.signUpFormData = this.pages.find(item => item.id === Config.pagesIDs.signupForm)
        }
      }
    }
  }
</script>
