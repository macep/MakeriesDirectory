<template>
  <div id="signup" class="row page">
    <div class="col-xs-12">
      <span class="hereshow" v-html="signupData.content.rendered"/>
    </div>

    <div class="col-xs-10 col-xs-offset-1 step">
      <div class="row">
        <div class="col-xs-2">
          <img src="/static/images/jgm-star-empty.svg">
          <span class="step-number">1</span>
        </div>
        <div class="col-xs-10">
          <span class="hereshow" v-html="stepOneData.content.rendered"/>
        </div>
      </div>
    </div>

    <div class="col-xs-10 col-xs-offset-1 step">
      <div class="row">
        <div class="col-xs-2">
          <img src="/static/images/jgm-star-empty.svg">
          <span class="step-number">2</span>
        </div>
        <div class="col-xs-10">
          <span class="hereshow" v-html="stepTwoData.content.rendered"/>
        </div>
      </div>
    </div>

    <div class="col-xs-10 col-xs-offset-1 step">
      <div class="row">
        <div class="col-xs-2">
          <img src="/static/images/jgm-star-empty.svg">
          <span class="step-number">3</span>
        </div>
        <div class="col-xs-10">
          <span class="hereshow" v-html="stepThreeData.content.rendered"/>
        </div>
      </div>
    </div>

    <div class="col-xs-10 col-xs-offset-1 step">
      <span class="sign-up-form" v-html="signUpFormData.content.rendered"/>
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
      },
      stepOneData () {
        return this.pages.find(item => item.id === Config.pagesIDs.step1)
      },
      stepTwoData () {
        return this.pages.find(item => item.id === Config.pagesIDs.step2)
      },
      stepThreeData () {
        return this.pages.find(item => item.id === Config.pagesIDs.step3)
      },
      signUpFormData () {
        return this.pages.find(item => item.id === Config.pagesIDs.signupForm)
      }
    }
  }
</script>
