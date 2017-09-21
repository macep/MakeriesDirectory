<template>
  <div id="login-form" class="row xlg-padding-top">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h3>{{title}}</h3>
          <p>{{description}}</p>
          <small class="login-register-alternatively">{{orRegisterHere}} <router-link to="register">register here</router-link></small>

        </div>
      </div>
      <hr>
      <div class="row form-horizontal small-gutter lg-padding">
        <div class="form-group">
          <div class="col-xs-7 col-xs-offset-4 text-center">
            <v-touch tag="button" @tap="auth.socialLogin('google-oauth2')" class="btn btn-block btn-danger btn-google">Sign in with Google</v-touch>
            <v-touch tag="button" @tap="auth.socialLogin('linkedin')" class="btn btn-block btn-primary btn-linkedin">Sign in with LinkedIn</v-touch>
            <v-touch tag="button" @tap="auth.socialLogin('facebook')" class="btn btn-block btn-info btn-facebook">Sign in with Facebook</v-touch>
            <div class="lg-padding-top alternative-to-auth">OR</div>
          </div>
        </div>
        <div class="form-group" :class="{'has-warning': !username.valid && username.value !=='', 'has-error': !formIsValid && !username.valid && username.value !==''}">
          <label for="input-username" class="col-sm-3 col-sm-offset-1 control-label">{{userNameLabel}}</label>
          <div class="col-sm-7">
            <template v-if="!formIsValid">
              <i class="icon-close is-invalid" v-if="!username.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-username" v-model="username.value" :placeholder="userNameLabel" autocorrect="off" autocomplete="off">
          </div>
        </div>
        <div class="form-group" :class="{'has-warning': !password.valid && password.value !=='', 'has-error': !formIsValid && !password.valid && password.value !==''}">
          <label for="input-password" class="col-sm-3 col-sm-offset-1 control-label">{{passwordLabel}}</label>
          <div class="col-sm-7">
            <template v-if="!formIsValid">
              <i class="icon-close is-invalid" v-if="!password.valid || password.value === ''"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="password" class="form-control" id="input-password" v-model="password.value" :placeholder="passwordLabel" autocorrect="off" autocomplete="off">
          </div>
        </div>
        <transition name="slide-errors" mode="out-in">
          <div v-if="showError" class="form-group invalid-form has-error">
            <label class="col-sm-4 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-8">
              <span>{{pleaseValidateLoginFormLabel}}</span>
            </div>
          </div>
          <v-touch @tap="closeServerMessage('error')" v-if="showServerErrorMessage" class="form-group invalid-form has-error">
            <label class="col-sm-4 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-8">
              <span>{{serverErrorMessage}}</span>
            </div>
          </v-touch>
        </transition>
        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-8">
            <div class="checkbox">
              <v-touch tag="button" @tap="loginUser" type="submit" class="btn btn-primary lg-margin-right">{{loginSubmitLabel}}</v-touch>
              <label><input v-model="keepassa.value" type="checkbox">{{keepPassLabel}}</label>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="col-sm-offset-4 col-sm-8">
        <a class="lost-password" href="http://uix.ro/wp-login.php?action=lostpassword" target="_new">Lost your password?</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'registration',
    props: ['auth', 'authenticated'],
    data () {
      return {
        title: Config.titles.registerAndAuthentication.titleAuth,
        description: Config.titles.registerAndAuthentication.descriptionAuth,
        orRegisterHere: Config.titles.registerAndAuthentication.orRegisterHere,
        userNameLabel: Config.titles.registerAndAuthentication.username,
        userNameOrEmailLabel: Config.titles.registerAndAuthentication.usernameOrEmail,
        passwordLabel: Config.titles.registerAndAuthentication.password,
        registerErrorLabel: Config.titles.registerAndAuthentication.registerError,
        keepPassLabel: Config.titles.registerAndAuthentication.keepPass,
        pleaseValidateLoginFormLabel: Config.titles.registerAndAuthentication.pleaseValidateLoginForm,
        loginSubmitLabel: Config.titles.registerAndAuthentication.loginSubmit,
        username: {value: '', required: true, valid: false},
        password: {value: '', required: true, valid: false},
        keepassa: {value: true, required: false, valid: true},
        formIsValid: true,
        showError: false,
        showServerErrorMessage: false
      }
    },
    computed: {
      ...mapGetters(['serverErrorMessage'])
    },
    methods: {
      loginUser () {
        this.formIsValid = this.username.valid && this.password.valid

        if (!this.formIsValid) {
          this.showError = true
          setTimeout(() => {
            this.showError = false
          }, 5e3)
        } else {
          this.auth.login(this.username.value, this.password.value)
        }
      },
      closeServerMessage () {
        this.showServerErrorMessage = false
        this.$store.commit('mutateServerErrorMessage', false)
      }
    },
    watch: {
      username: {
        handler () {
          this.username.valid = this.username.value.length !== '' && this.username.value.length > 5 && this.username.value.length < 31
        },
        deep: true
      },
      password: {
        handler () {
          this.password.valid = this.password.value.length > 8 && this.password.value.length < 25
        },
        deep: true
      },
      serverErrorMessage () {
        if (this.serverErrorMessage) {
          this.showServerErrorMessage = true
          setTimeout(() => {
            this.showServerErrorMessage = false
          }, 2e4)
        }
      }
    },
    metaInfo: {
      title: `${Config.titles.registerAndAuthentication.titleAuth}`
    }
  }
</script>
