<template>
  <div id="register-form" class="row xlg-padding-top">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h3>{{title}}</h3>
          <p>{{description}}</p>
          <small class="login-register-alternatively">{{orLoginHere}} <router-link to="login">login here</router-link></small>
        </div>
      </div>
      <hr>
      <div class="row form-horizontal small-gutter lg-padding">

        <div class="form-group required" :class="{'has-error': !username.valid && username.value !==''}">
          <label for="input-username" class="col-sm-3 control-label">{{userNameLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && username.value !==''">
              <i class="icon-close is-invalid" v-if="!username.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-username" v-model="username.value" :placeholder="userNameLabel">
          </div>
        </div>

        <div class="form-group required" :class="{'has-error': !email.valid && email.value !==''}">
          <label for="input-email" class="col-sm-3 control-label">{{emailLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && email.value !==''">
              <i class="icon-close is-invalid" v-if="!email.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="email" class="form-control" id="input-email" v-model="email.value" :placeholder="emailLabel">
          </div>
        </div>

        <div class="form-group">
          <label for="input-first-name" class="col-sm-3 control-label">{{fullNameLabel}}</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="input-first-name" v-model="firstName.value" :placeholder="firstNameLabel">
          </div>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="input-last-name" v-model="lastName.value" :placeholder="lastNameLabel">
          </div>
        </div>

        <div class="form-group" :class="{'has-warning': !website.valid}">
          <label for="input-website" class="col-sm-3 control-label">{{websiteLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formIsValid && website.value !== ''">
              <i v-if="!website.valid" class="icon-close is-invalid not-important"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-website" v-model="website.value" :placeholder="websiteLabel">
          </div>
        </div>

        <div class="form-group required" :class="{'has-error': (!password.valid && password.value !== '') || !passwordsAreEqual}">
          <label for="input-password" class="col-sm-3 control-label">{{passwordLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && password.value !== ''">
              <i class="icon-close is-invalid" v-if="!password.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="password" class="form-control" id="input-password" v-model="password.value" :placeholder="passwordLabel">
          </div>
        </div>

        <div class="form-group required" :class="{'has-error': (!password2.valid && password2.value !== '') || !passwordsAreEqual}">
          <label for="input-password" class="col-sm-3 control-label">{{passwordAgainLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && password2.value !== ''">
              <i class="icon-close is-invalid" v-if="!password2.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="password" class="form-control" id="input-password2" v-model="password2.value" :placeholder="passwordAgainPlaceholderLabel">
          </div>
        </div>

        <transition name="slide-errors" mode="out-in">
          <div v-if="showRegistrationValidationError" class="form-group invalid-form has-error">
            <label class="col-sm-3 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-8">
              <mega-alert v-model="showRegistrationValidationError" :closeAction="closeRegistrationClientMessages" duration="0" type="danger" width="100%" dismissable>
                {{pleaseValidateRegisterFormLabel}}
              </mega-alert>
            </div>
          </div>

          <div v-if="showServerRegistrationErrorMessage" class="form-group invalid-form has-error">
            <label class="col-sm-3 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-8">
              <mega-alert v-model="showServerRegistrationErrorMessage" :closeAction="closeRegistrationServerErrorMessage" duration="0" type="danger" width="100%" dismissable>
                {{serverRegistrationErrorMessage.message}}
              </mega-alert>
            </div>
          </div>

          <div v-if="showServerRegistrationSuccessMessage" class="form-group valid-form has-success">
            <label class="col-sm-3 control-label">{{registerSuccessLabel}}</label>
            <div class="col-sm-8">
              <mega-alert v-model="showServerRegistrationSuccessMessage" :closeAction="closeRegistrationServerSuccessMessage" duration="0" type="success" width="100%" dismissable>
                {{serverRegistrationSuccessMessage.message}}
              </mega-alert>
            </div>
          </div>
        </transition>

        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-8">
            <div class="checkbox">
              <v-touch tag="button" @tap="registerNewUser" type="submit" class="btn lg-margin-right"
              :class="{'btn-warning': !formIsValid, 'btn-danger disabled': !formCanPass, 'btn-success': formCanPass}">{{loginSubmitLabel}}</v-touch>
            </div>
          </div>
        </div>
      </div>
      <hr>

      <div class="form-group required legend">
        <div class="col-sm-offset-3 col-sm-8">
          <label>{{markedFieldsLabel}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import cookieService from '../../api/cookie.service'
  import megaAlert from '../overrides/megaAlert.vue'

  export default {
    name: 'registration',
    props: ['auth', 'authenticated'],
    components: {megaAlert},
    data () {
      return {
        title: Config.titles.registerAndAuthentication.titleReg,
        description: Config.titles.registerAndAuthentication.descriptionReg,
        orLoginHere: Config.titles.registerAndAuthentication.orLoginHere,
        userNameLabel: Config.titles.registerAndAuthentication.username,
        emailLabel: Config.titles.registerAndAuthentication.email,
        fullNameLabel: Config.titles.registerAndAuthentication.fullName,
        firstNameLabel: Config.titles.registerAndAuthentication.firstName,
        lastNameLabel: Config.titles.registerAndAuthentication.lastName,
        websiteLabel: Config.titles.registerAndAuthentication.website,
        passwordLabel: Config.titles.registerAndAuthentication.password,
        passwordAgainLabel: Config.titles.registerAndAuthentication.password2,
        passwordAgainPlaceholderLabel: Config.titles.registerAndAuthentication.password2placeholder,
        keepPassLabel: Config.titles.registerAndAuthentication.keepPass,
        registerErrorLabel: Config.titles.registerAndAuthentication.registerError,
        registerSuccessLabel: Config.titles.registerAndAuthentication.registerSuccess,
        pleaseValidateRegisterFormLabel: Config.titles.registerAndAuthentication.pleaseValidateRegisterForm,
        markedFieldsLabel: Config.titles.registerAndAuthentication.markedFields,
        loginSubmitLabel: Config.titles.registerAndAuthentication.registerSubmit,
        username: {value: '', required: true, valid: false},
        email: {value: '', required: true, valid: false},
        firstName: {value: '', required: false, valid: true},
        lastName: {value: '', required: false, valid: true},
        website: {value: '', required: false, valid: true},
        password: {value: '', required: true, valid: false},
        password2: {value: '', required: true, valid: false},
        passwordsAreEqual: true,
        keepassa: {value: true, required: false, valid: true},
        showRegistrationValidationError: false,
        showServerRegistrationErrorMessage: false,
        showServerRegistrationSuccessMessage: false
      }
    },
    computed: {
      ...mapGetters(['serverRegistrationErrorMessage', 'serverRegistrationSuccessMessage']),
      formCanPass () {
        return this.username.valid && this.email.valid && this.password.valid && this.password2.valid && this.passwordsAreEqual
      },
      formIsValid () {
        return this.username.valid && this.email.valid && this.password.valid && this.password2.valid && this.passwordsAreEqual && this.website.valid
      }
    },
    methods: {
      registerNewUser () {
        if (!this.formCanPass) {
          this.showRegistrationValidationError = true
        } else {
          this.showRegistrationValidationError = false
          let metadata = {
            userInformationCollected: 'false',
            askedForUserInformation: '0'
          }
          if (this.firstName.value !== '') {
            metadata.firstName = this.firstName.value
          }
          if (this.lastName.value !== '') {
            metadata.lastName = this.lastName.value
          }
          if (this.website.value !== '') {
            metadata.website = this.website.value
          }
          this.auth.signup(this.username.value, this.email.value, this.password.value, metadata)

          let cookieValue = JSON.stringify(Object.assign({username: this.username.value}, metadata))
          cookieService.setCookie(this.email.value, cookieValue)
        }
      },
      closeRegistrationClientMessages () {
        this.showRegistrationValidationError = false
      },
      closeRegistrationServerErrorMessage () {
        this.showServerRegistrationErrorMessage = false
        this.$store.commit('mutateServerRegistrationErrorMessage', {
          message: this.serverRegistrationErrorMessage.message,
          visible: false
        })
      },
      closeRegistrationServerSuccessMessage () {
        this.showServerRegistrationSuccessMessage = false
        this.$store.commit('mutateServerRegistrationSuccessMessage', {
          message: this.serverRegistrationSuccessMessage.message,
          visible: false
        })
      },
      closeNotificationsAny () {
        if (this.showRegistrationValidationError === true) {
          this.showRegistrationValidationError = false
        }
        if (this.showServerRegistrationErrorMessage === true) {
          this.closeRegistrationServerErrorMessage()
        }
        if (this.showServerRegistrationSuccessMessage === true) {
          this.closeRegistrationServerSuccessMessage()
        }
      }
    },
    watch: {
      username: {
        handler () {
          this.closeNotificationsAny()
          this.username.valid = this.username.value.length !== '' && this.username.value.length >= Config.username.length.min && this.username.value.length <= Config.username.length.max
        },
        deep: true
      },
      email: {
        handler () {
          this.closeNotificationsAny()
          this.email.valid = /^(([^<>()[\]\\.,;:#\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/.test(this.email.value)
        },
        deep: true
      },
      website: {
        handler () {
          this.closeNotificationsAny()
          this.website.valid = this.website.value === '' ? true : /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i.test(this.website.value)
        },
        deep: true
      },
      password: {
        handler () {
          this.closeNotificationsAny()
          this.password.valid = this.password.value.length >= Config.password.length.min && this.password.value.length <= Config.password.length.max
          this.passwordsAreEqual = this.password.value === this.password2.value
        },
        deep: true
      },
      password2: {
        handler () {
          this.closeNotificationsAny()
          this.password2.valid = this.password2.value.length >= Config.password.length.min && this.password2.value.length <= Config.password.length.max
          this.passwordsAreEqual = this.password.value === this.password2.value
        },
        deep: true
      },
      serverRegistrationErrorMessage () {
        if (this.serverRegistrationErrorMessage.visible) {
          this.showServerRegistrationErrorMessage = true
          this.showRegistrationValidationError = false
        }
      },
      serverRegistrationSuccessMessage () {
        if (this.serverRegistrationSuccessMessage.visible) {
          this.showServerRegistrationSuccessMessage = true
          this.showRegistrationValidationError = false
          this.username.value = ''
          this.firstName.value = ''
          this.lastName.value = ''
          this.email.value = ''
          this.website.value = ''
          this.password.value = ''
        }
      }
    },
    metaInfo: {
      title: `${Config.titles.registerAndAuthentication.titleReg}`
    }
  }
</script>
