<template>
  <div id="login-form" class="row xlg-padding-top">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h3>{{title}}</h3>
          <p>{{description}}</p>
          <p>{{description2}}</p>
          <small class="login-register-alternatively">{{orRegisterHere}} <router-link to="register">register here</router-link></small>
        </div>
      </div>
      <hr>
      <div class="row form-horizontal small-gutter lg-padding">
        <div class="form-group">
          <div class="col-sm-7 col-sm-offset-3 text-center">
            <h6 class="text-italic">{{ socialSignIn }}</h6>

            <div class="row">
              <div class="col-xs-4">
                <v-touch tag="button" @tap="auth.socialLogin('google-oauth2')" class="btn btn-block btn-danger btn-google">Google</v-touch>
              </div>
              <div class="col-xs-4">
                <v-touch tag="button" @tap="auth.socialLogin('linkedin')" class="btn btn-block btn-primary btn-linkedin">LinkedIn</v-touch>
              </div>
              <div class="col-xs-4">
                <v-touch tag="button" @tap="auth.socialLogin('facebook')" class="btn btn-block btn-info btn-facebook">Facebook</v-touch>
              </div>
            </div>
            <div class="lg-padding-top alternative-to-auth">OR</div>
          </div>
        </div>

        <div class="form-group" :class="{'has-error': !email.valid && email.value !==''}">
          <label for="input-username" class="col-sm-3 control-label">{{emailLabel}}</label>
          <div class="col-sm-7">
            <template v-if="!formIsValid && email.value !==''">
              <i class="icon-close is-invalid" v-if="!email.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-username" ref="inputUsername" v-model="email.value" :placeholder="emailLabel" autocorrect="off" autocomplete="off">
          </div>
        </div>

        <div class="form-group" :class="{'has-error': !password.valid && password.value !==''}">
          <label for="input-password" class="col-sm-3 control-label">{{passwordLabel}}</label>
          <div class="col-sm-7">
            <template v-if="!formIsValid && password.value !== ''">
              <i class="icon-close is-invalid" v-if="!password.valid || password.value === ''"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="password" class="form-control" id="input-password" ref="inputPassword" v-model="password.value" :placeholder="passwordLabel" autocorrect="off" autocomplete="off">
          </div>
        </div>

        <transition name="slide-errors" mode="out-in">
          <div v-if="showLoginValidationError" class="form-group invalid-form has-error">
            <label class="col-sm-3 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-7">
              <mega-alert v-model="showLoginValidationError" :closeAction="closeClientMessage" duration="0" type="danger" width="100%" dismissable>
                {{pleaseValidateLoginFormLabel}}
              </mega-alert>
            </div>
          </div>
          <div v-if="showLoginServerErrorMessage" class="form-group invalid-form has-error">
            <label class="col-sm-3 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-7">
              <mega-alert id="server-error-login-messages" v-model="showLoginServerErrorMessage" :closeAction="closeServerMessage" duration="0" type="danger" closeFunc="closeServerMessage" width="100%" dismissable>
                {{serverLoginErrorMessage.message}}
              </mega-alert>
            </div>
          </div>
        </transition>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-8">
            <v-touch tag="button" @tap="loginUser" type="submit" class="btn"
                     :class="{'btn-danger disabled': !formIsValid, 'btn-outline-default': formIsValid}">{{loginSubmitLabel}}</v-touch>
            <small class="lg-margin-left login-register-alternatively">{{resetPass}} <router-link to="reset-password">here</router-link></small>
          </div>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import {isEmail} from '../../modules/utils'
  import megaAlert from '../overrides/megaAlert.vue'

  export default {
    name: 'registration',
    props: ['auth', 'authenticated'],
    components: {megaAlert},
    data () {
      return {
        title: Config.titles.registerAndAuthentication.titleAuth,
        description: Config.titles.registerAndAuthentication.descriptionAuth,
        description2: Config.titles.registerAndAuthentication.descriptionAuth2,
        resetPass: Config.titles.registerAndAuthentication.titleResetPass,
        orRegisterHere: Config.titles.registerAndAuthentication.orRegisterHere,
        socialSignIn: Config.titles.registerAndAuthentication.socialSignIn,
        emailLabel: Config.titles.registerAndAuthentication.email,
        passwordLabel: Config.titles.registerAndAuthentication.password,
        registerErrorLabel: Config.titles.registerAndAuthentication.registerError,
        keepPassLabel: Config.titles.registerAndAuthentication.keepPass,
        pleaseValidateLoginFormLabel: Config.titles.registerAndAuthentication.pleaseValidateLoginForm,
        loginSubmitLabel: Config.titles.registerAndAuthentication.loginSubmit,
        email: {value: '', required: true, valid: false},
        password: {value: '', required: true, valid: false},
        keepassa: {value: true, required: false, valid: true},
        showLoginValidationError: false,
        showLoginServerErrorMessage: false
      }
    },
    mounted () {
      if (this.passwordResetResult !== {}) {
        if (this.passwordResetResult.success === 'true') {
          this.description = this.passwordResetResult.message
          this.email.value = this.passwordResetResult.email
          this.$refs.inputPassword.focus()
        }
      }
    },
    computed: {
      ...mapGetters(['serverLoginErrorMessage', 'passwordResetResult']),
      formIsValid () {
        return this.email.valid && this.password.valid
      }
    },
    methods: {
      loginUser () {
        if (!this.formIsValid) {
          this.showLoginValidationError = true
        } else {
          this.showLoginValidationError = false
          this.auth.login(this.email.value, this.password.value)
        }
      },
      closeClientMessage () {
        this.showLoginValidationError = false
      },
      closeServerMessage () {
        this.showLoginServerErrorMessage = false
        this.$store.commit('mutateServerLoginErrorMessage', {
          message: this.serverLoginErrorMessage.message,
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
      password: {
        handler () {
          this.password.valid = this.password.value.length >= Config.password.length.min && this.password.value.length <= Config.password.length.max
        },
        deep: true
      },
      serverLoginErrorMessage () {
        if (this.serverLoginErrorMessage.visible) {
          this.showLoginServerErrorMessage = true
          this.showLoginValidationError = false
        }
      }
    },
    metaInfo: {
      title: `${Config.titles.registerAndAuthentication.titleAuth}`
    }
  }
</script>
