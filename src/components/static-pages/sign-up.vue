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
  import apiService from '../../api/api.service'
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
      apiService.getPage(Config.pagesIDs.signup).then((response) => {
        this.signupData = response.data
        apiService.getPage(Config.pagesIDs.step1).then((response) => {
          this.stepOneData = response.data
          apiService.getPage(Config.pagesIDs.step2).then((response) => {
            this.stepTwoData = response.data
            apiService.getPage(Config.pagesIDs.step3).then((response) => {
              this.stepThreeData = response.data
              apiService.getPage(Config.pagesIDs.signupForm).then((response) => {
                this.signUpFormData = response.data
              })
            })
          })
        })
      })
    },
    metaInfo: {
      title: Config.titles.signUp
    }
  }
</script>
