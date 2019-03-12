<template>
  <div id="login-form" class="row xlg-padding-top">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h3>{{title}}</h3>
          <p>{{description}}</p>
          <small class="login-register-alternatively">{{orRegisterHere}} <router-link to="register">register here</router-link>. {{orIfRememberHere}} <router-link to="login">here</router-link></small>
        </div>
      </div>
      <hr>
      <div class="row form-horizontal small-gutter lg-padding">
        <div class="form-group required" :class="{'has-error': !email.valid && email.value !==''}">
          <label for="input-email" class="col-sm-3 control-label">{{emailLabel}}</label>
          <div class="col-sm-7">
            <template v-if="!formIsValid && email.value !==''">
              <i class="icon-close is-invalid" v-if="!email.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="email" class="form-control" id="input-email" v-model="email.value" :placeholder="emailLabel">
          </div>
        </div>
        <div class="form-group no-margin-bottom">
          <div class="col-sm-offset-3 col-sm-7">
            <v-touch tag="button" @tap="resetPass" type="submit" class="btn btn-primary"
                     :class="{'btn-danger disabled': !formIsValid}">{{resetPassSubmitLabel}}</v-touch>
          </div>
        </div>
      </div>

      <div v-if="showClientResetPassErrorMessage || showServerResetPassErrorMessage || showServerResetPassSuccessMessage" class="row form-horizontal small-gutter lg-padding">
        <transition name="slide-errors" mode="out-in">
          <div v-if="showClientResetPassErrorMessage" class="form-group invalid-form has-error">
            <label class="col-sm-3 control-label md-margin-top">{{errorLabel}}</label>
            <div class="col-sm-7">
              <mega-alert v-model="showClientResetPassErrorMessage" :closeAction="closeClientMessage" duration="0" type="danger" width="100%" dismissable>
                {{pleaseValidateResetPassForm}}
              </mega-alert>
            </div>
          </div>

          <div v-if="showServerResetPassErrorMessage" class="form-group invalid-form has-error">
            <label class="col-sm-3 control-label md-margin-top">{{errorLabel}}</label>
            <div class="col-sm-7">
              <mega-alert v-model="showServerResetPassErrorMessage" :closeAction="closeServerErrorMessage" duration="0" type="danger" closeFunc="closeServerMessage" width="100%" dismissable>
                {{serverResetPassErrorMessage.message}}
              </mega-alert>
            </div>
          </div>

          <div v-if="showServerResetPassSuccessMessage" class="form-group valid-form has-success">
            <label class="col-sm-3 control-label md-margin-top"></label>
            <div class="col-sm-7">
              <mega-alert v-model="showServerResetPassSuccessMessage" :closeAction="closeServerSuccessMessage" duration="5000" type="success" closeFunc="closeServerMessage" width="100%" dismissable>
                {{serverResetPassSuccessMessage.message}}
              </mega-alert>
            </div>
          </div>
        </transition>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import megaAlert from '../overrides/megaAlert.vue'
  import {isEmail} from '../../modules/utils'

  export default {
    name: 'reset-password',
    props: ['auth', 'authenticated'],
    components: {megaAlert},
    data () {
      return {
        title: Config.titles.registerAndAuthentication.titleResetPass,
        description: Config.titles.registerAndAuthentication.descriptionResetPass,
        orRegisterHere: Config.titles.registerAndAuthentication.orRegisterHere,
        orIfRememberHere: Config.titles.registerAndAuthentication.orIfRememberHere,
        emailLabel: Config.titles.registerAndAuthentication.email,
        errorLabel: Config.titles.registerAndAuthentication.error,
        resetPassSubmitLabel: Config.titles.registerAndAuthentication.resetPassSubmit,
        pleaseValidateResetPassForm: Config.titles.registerAndAuthentication.pleaseValidateResetPassForm,
        email: {value: '', required: true, valid: false},
        showClientResetPassErrorMessage: false,
        showServerResetPassErrorMessage: false,
        showServerResetPassSuccessMessage: false
      }
    },
    computed: {
      ...mapGetters(['serverResetPassErrorMessage', 'serverResetPassSuccessMessage']),
      formIsValid () {
        return this.email.valid
      }
    },
    methods: {
      resetPass () {
        if (!this.formIsValid) {
          this.showClientResetPassErrorMessage = true
        } else {
          this.showClientResetPassErrorMessage = false
          this.auth.resetPassword(this.email.value)
        }
      },
      closeClientMessage () {
        this.showClientResetPassErrorMessage = false
      },
      closeServerErrorMessage () {
        this.showServerResetPassErrorMessage = false
        this.$store.commit('mutateServerResetPassErrorMessage', {
          message: this.serverResetPassErrorMessage.message,
          visible: false
        })
      },
      closeServerSuccessMessage () {
        this.showServerResetPassSuccessMessage = false
        this.$store.commit('mutateServerResetPassSuccessMessage', {
          message: this.serverResetPassSuccessMessage.message,
          visible: false
        })
      }
    },
    watch: {
      email: {
        handler () {
          this.email.valid = isEmail(this.email.value)
        },
        deep: true
      },
      serverResetPassErrorMessage () {
        if (this.serverResetPassErrorMessage.visible) {
          console.log(this.serverResetPassErrorMessage)
          this.showServerResetPassErrorMessage = true
          this.showClientResetPassErrorMessage = false
        }
      },
      serverResetPassSuccessMessage () {
        if (this.serverResetPassSuccessMessage.visible) {
          this.showServerResetPassSuccessMessage = true
          console.log(this.serverResetPassSuccessMessage, this.showServerResetPassSuccessMessage)
          this.showClientResetPassErrorMessage = false
          this.email.value = ''
        }
      }
    },
    metaInfo: {
      title: `${Config.titles.registerAndAuthentication.titleResetPass}`
    }
  }
</script>
