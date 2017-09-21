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
          <label for="input-username" class="col-sm-4 control-label">{{userNameLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && username.value !==''">
              <i class="icon-close is-invalid" v-if="!username.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-username" v-model="username.value" :placeholder="userNameLabel">
          </div>
        </div>
        <div class="form-group required" :class="{'has-error': !email.valid && email.value !==''}">
          <label for="input-email" class="col-sm-4 control-label">{{emailLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && email.value !==''">
              <i class="icon-close is-invalid" v-if="!email.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="email" class="form-control" id="input-email" v-model="email.value" :placeholder="emailLabel">
          </div>
        </div>
        <div class="form-group">
          <label for="input-first-name" class="col-sm-4 control-label">{{fullNameLabel}}</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="input-first-name" v-model="firstName.value" :placeholder="firstNameLabel">
          </div>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="input-last-name" v-model="lastName.value" :placeholder="lastNameLabel">
          </div>
        </div>
        <div class="form-group" :class="{'has-warning': !website.valid}">
          <label for="input-website" class="col-sm-4 control-label">{{websiteLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formIsValid && website.value !== ''">
              <i v-if="!website.valid" class="icon-close is-invalid not-important"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-website" v-model="website.value" :placeholder="websiteLabel">
          </div>
        </div>
        <div class="form-group required" :class="{'has-error': !password.valid && password.value !== ''}">
          <label for="input-password" class="col-sm-4 control-label">{{passwordLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && password.value !== ''">
              <i class="icon-close is-invalid" v-if="!password.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="password" class="form-control" id="input-password" v-model="password.value" :placeholder="passwordLabel">
          </div>
        </div>
        <transition name="slide-errors" mode="out-in">
          <div v-if="showError" class="form-group invalid-form has-error">
            <label class="col-sm-4 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-8">
              <span>{{pleaseValidateRegisterFormLabel}}</span>
            </div>
          </div>
          <v-touch @tap="closeServerMessage('error')" v-if="showServerErrorMessage" class="form-group invalid-form has-error">
            <label class="col-sm-4 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-8">
              <span>{{serverErrorMessage}}</span>
            </div>
          </v-touch>
          <v-touch @tap="closeServerMessage('success')" v-if="showServerSuccessMessage" class="form-group valid-form has-success">
            <label class="col-sm-4 control-label">{{registerSuccessLabel}}</label>
            <div class="col-sm-8">
              <span>{{serverSuccessMessage}}</span>
            </div>
          </v-touch>
        </transition>
        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-8">
            <div class="checkbox">
              <v-touch tag="button" @tap="registerNewUser" type="submit" class="btn lg-margin-right"
              :class="{'btn-warning': !formIsValid, 'btn-danger disabled': !formCanPass, 'btn-success': formCanPass}">{{loginSubmitLabel}}</v-touch>
              <label><input v-model="keepassa.value" type="checkbox">{{keepPassLabel}}</label>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="form-group required legend">
        <div class="col-sm-offset-4 col-sm-8">
          <label>{{markedFieldsLabel}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'registration',
    props: ['auth', 'authenticated'],
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
        keepassa: {value: true, required: false, valid: true},
        showError: false,
        showServerErrorMessage: false,
        showServerSuccessMessage: false
      }
    },
    computed: {
      ...mapGetters(['userInformationMissing', 'serverErrorMessage', 'serverSuccessMessage']),
      formCanPass () {
        return this.username.valid && this.email.valid && this.password.valid
      },
      formIsValid () {
        return this.username.valid && this.email.valid && this.password.valid && this.website.valid
      }
    },
    methods: {
      ...mapActions([]),
      registerNewUser () {
        if (!this.formCanPass) {
          this.showError = true
          setTimeout(() => {
            this.showError = false
          }, 5e3)
        } else {
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
        }
      },
      closeServerMessage (result) {
        if (result === 'error') {
          this.showServerErrorMessage = false
          this.$store.commit('mutateServerErrorMessage', false)
        } else {
          this.showServerSuccessMessage = false
          this.$store.commit('mutateServerSuccessMessage', false)
        }
      }
    },
    watch: {
      username: {
        handler () {
          this.username.valid = this.username.value.length !== '' && this.username.value.length > 5 && this.username.value.length < 31
        },
        deep: true
      },
      email: {
        handler () {
          this.email.valid = /^(([^<>()[\]\\.,;:#\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/.test(this.email.value)
        },
        deep: true
      },
      website: {
        handler () {
          this.website.valid = this.website.value === '' ? true : /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i.test(this.website.value)
        },
        deep: true
      },
      password: {
        handler () {
          this.password.valid = this.password.value.length >= Config.password.length.min && this.password.value.length <= Config.password.length.max
        },
        deep: true
      },
      serverErrorMessage () {
        if (this.serverErrorMessage) {
          this.showServerErrorMessage = true
          setTimeout(() => {
            this.showServerErrorMessage = false
          }, 5e3)
        }
      },
      serverSuccessMessage () {
        if (this.serverSuccessMessage) {
          this.showServerSuccessMessage = true
          this.username.value = ''
          this.firstName.value = ''
          this.lastName.value = ''
          this.email.value = ''
          this.website.value = ''
          this.password.value = ''
          setTimeout(() => {
            this.showServerSuccessMessage = false
          }, 5e3)
        }
      }
    },
    metaInfo: {
      title: `${Config.titles.registerAndAuthentication.titleReg}`
    }
  }
</script>
